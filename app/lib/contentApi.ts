const etagByKey = new Map<string, string>();
const baseByKey = new Map<string, Json>();

type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

export class ContentConflictError extends Error {
  status: number;
  etag?: string | null;
  constructor(message: string, status: number, etag?: string | null) {
    super(message);
    this.name = "ContentConflictError";
    this.status = status;
    this.etag = etag;
  }
}

function rememberEtag(key: string, res: Response) {
  const etag = res.headers.get("etag");
  if (etag) etagByKey.set(key, etag);
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) {
      if (!(k in b)) return false;
      if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
  }
  return false;
}

type PatchOp =
  | { path: string[]; op: "set"; value: Json }
  | { path: string[]; op: "delete" };

function diffJson(base: Json, local: Json, path: string[] = []): PatchOp[] {
  if (deepEqual(base, local)) return [];

  // For arrays / primitives / type changes: replace whole value.
  const baseIsObj = isPlainObject(base);
  const localIsObj = isPlainObject(local);
  if (!baseIsObj || !localIsObj) {
    return [{ path, op: "set", value: local }];
  }

  const ops: PatchOp[] = [];
  const keys = new Set([...Object.keys(base as Record<string, Json>), ...Object.keys(local as Record<string, Json>)]);
  for (const k of keys) {
    const b = (base as Record<string, Json>)[k];
    const l = (local as Record<string, Json>)[k];
    const nextPath = [...path, k];
    if (!(k in (local as Record<string, Json>))) {
      ops.push({ path: nextPath, op: "delete" });
    } else if (!(k in (base as Record<string, Json>))) {
      ops.push({ path: nextPath, op: "set", value: l });
    } else {
      ops.push(...diffJson(b, l, nextPath));
    }
  }
  return ops;
}

function applyPatch(remote: Json, ops: PatchOp[]): Json {
  // Only supports object-path mutations; if root is replaced, ops will contain path=[] set.
  let out: Json = remote;
  for (const op of ops) {
    if (op.path.length === 0) {
      if (op.op === "set") out = op.value;
      continue;
    }
    if (!isPlainObject(out)) {
      // If remote isn't an object but we need to apply nested changes, coerce.
      out = {};
    }
    let cursor: Record<string, Json> = out as Record<string, Json>;
    for (let i = 0; i < op.path.length - 1; i++) {
      const key = op.path[i]!;
      const next = cursor[key];
      if (!isPlainObject(next)) cursor[key] = {};
      cursor = cursor[key] as Record<string, Json>;
    }
    const leaf = op.path[op.path.length - 1]!;
    if (op.op === "delete") {
      delete cursor[leaf];
    } else {
      cursor[leaf] = op.value;
    }
  }
  return out;
}

export async function fetchContent<T>(key: string): Promise<T | null> {
  const res = await fetch(`/api/content/${key}`, { cache: "no-store" });
  if (!res.ok) return null;
  rememberEtag(key, res);
  const json = await res.json();
  // Keep a base snapshot in memory for 3-way merge on conflicts.
  baseByKey.set(key, (json.data ?? null) as Json);
  return json.data ?? null;
}

export async function saveContentToDb<T>(key: string, data: T): Promise<void> {
  // Ensure we have a concurrency token for existing rows.
  if (!etagByKey.get(key)) {
    await fetchContent(key);
  }

  async function putWithEtag(payload: T, ifMatch: string | undefined) {
    return fetch(`/api/content/${key}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(ifMatch ? { "If-Match": ifMatch } : {}),
      },
      body: JSON.stringify({ data: payload }),
    });
  }

  const ifMatch = etagByKey.get(key);
  const res = await putWithEtag(data, ifMatch);

  if (!res.ok) {
    const etag = res.headers.get("etag") ?? undefined;
    if (res.status === 409 || res.status === 428) {
      // If we somehow missed an ETag, refresh it and retry once.
      if (res.status === 428) {
        await fetchContent(key);
        const refreshed = await putWithEtag(data, etagByKey.get(key));
        if (refreshed.ok) {
          rememberEtag(key, refreshed);
          baseByKey.set(key, (data as unknown as Json) ?? null);
          return;
        }
      }

      // On conflict, automatically fetch latest server data (provided in response),
      // 3-way merge (base -> local) onto remote, then retry save once with the new ETag.
      const base = (baseByKey.get(key) ?? null) as Json;
      let remote: Json = null;
      try {
        const body = await res.json();
        remote = (body?.data ?? null) as Json;
      } catch {
        // ignore
      }
      const local = (data as unknown as Json) ?? null;
      const ops = diffJson(base, local);
      const merged = applyPatch(remote ?? base, ops) as unknown as T;

      // If server didn't return an ETag, we can't safely retry without reloading token.
      const retryEtag = etag ?? etagByKey.get(key);
      if (retryEtag) {
        const retry = await putWithEtag(merged, retryEtag);
        if (retry.ok) {
          rememberEtag(key, retry);
          baseByKey.set(key, (merged as unknown as Json) ?? null);
          return;
        }
      }

      // If auto-resolve couldn't complete (another concurrent save loop, missing ETag, etc)
      // we surface an error so the user can retry saving.
      throw new ContentConflictError(
        "Content conflict. Please try saving again.",
        409,
        retryEtag
      );
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to save content");
  }

  rememberEtag(key, res);
  baseByKey.set(key, (data as unknown as Json) ?? null);
}
