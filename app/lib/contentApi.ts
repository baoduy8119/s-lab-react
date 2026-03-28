export async function fetchContent<T>(key: string): Promise<T | null> {
  const res = await fetch(`/api/content/${key}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export async function saveContentToDb<T>(key: string, data: T): Promise<void> {
  const res = await fetch(`/api/content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to save content");
  }
}
