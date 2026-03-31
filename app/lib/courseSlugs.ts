export function courseTitleToSlug(title: string): string {
  const base = (title ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return base;
}

export function courseIdAndTitleToSlug(courseId: string, title: string): string {
  const t = courseTitleToSlug(title);
  return t || courseId;
}

export function resolveCourseIdFromSlug(
  slugOrId: string,
  opts: { cardIds: string[]; contentById: Record<string, Record<string, unknown> | undefined> }
): string {
  // Backward compatible: allow direct id usage.
  if (opts.cardIds.includes(slugOrId)) return slugOrId;

  // Match against EN title stored on the card content (not localized).
  for (const id of opts.cardIds) {
    const title = (opts.contentById[id]?.title as string) ?? "";
    const slug = courseIdAndTitleToSlug(id, title);
    if (slug === slugOrId) return id;
  }

  // Fallback to treating it as id (keeps existing deep links working).
  return slugOrId;
}

