import { getPrisma } from "@/app/lib/prisma";

type SectionContent = Record<string, string>;
type HomepageContent = Record<string, SectionContent>;

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function extractLegacySectionsForCourse(legacyJson: unknown, courseId: string): HomepageContent {
  const content: unknown =
    isPlainObject(legacyJson) && isPlainObject(legacyJson.content) ? legacyJson.content : legacyJson;
  if (!isPlainObject(content)) return {};

  const out: HomepageContent = {};
  const prefix = `${courseId}__`;
  for (const [k, v] of Object.entries(content)) {
    if (!k.startsWith(prefix)) continue;
    if (!isPlainObject(v)) continue;
    out[k] = v as SectionContent;
  }
  return out;
}

/**
 * Server-only helper: load per-course detail sections.
 * Prefers the new per-section table; falls back to legacy SiteContent(courseDetails).
 */
export async function loadCourseDetailSections(courseId: string): Promise<HomepageContent> {
  const prisma = getPrisma();

  const rows = await prisma.courseDetailSection.findMany({
    where: { courseId },
    select: { sectionId: true, data: true },
  });

  if (rows.length) {
    const out: HomepageContent = {};
    for (const r of rows) out[r.sectionId] = (r.data ?? {}) as SectionContent;
    return out;
  }

  const legacy = await prisma.siteContent.findUnique({
    where: { key: "courseDetails" },
    select: { data: true },
  });
  const legacyJson = legacy?.data ? JSON.parse(legacy.data) : null;
  return extractLegacySectionsForCourse(legacyJson, courseId);
}

