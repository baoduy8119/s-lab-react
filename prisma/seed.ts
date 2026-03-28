import "dotenv/config";
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  defaultCoursesContent,
  DEFAULT_CARD_IDS,
  DEFAULT_COURSE_IDS,
} from "../app/features/dashboard/stores/useCoursesContentStore";
import { defaultSLibraryContent } from "../app/features/dashboard/stores/useSLibraryContentStore";

const root = path.join(__dirname, "..");
loadEnv({ path: path.join(root, ".env.local") });
loadEnv({ path: path.join(root, ".env") });

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for db:seed (e.g. in .env.local).");
}

const prisma = new PrismaClient({
  datasources: { db: { url: databaseUrl } },
});

const defaultContent = {
  hero: {
    heading: "THE S-LΛB",
    heading_vi: "THE S-LΛB",
    tagline:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
    tagline_vi:
      "An execution lab helping professionals build solutions for real work.",
    buttonPrimary: "Start coaching now",
    buttonPrimary_vi: "Bắt đầu",
    buttonSecondary: "See our work",
    buttonSecondary_vi: "Khám phá Khóa học Slab",
    yellowBadge: "Theory is where you practice",
    yellowBadge_vi: "Practice is where learning happens.",
    rating: "4.9 / 5",
    rating_vi: "4.9 / 5",
    feedbackText:
      "We have helped over 950+ students achieve their goals — you could be the next one.",
    feedbackText_vi:
      "Được tin tưởng bởi 950+ chuyên gia tham gia giải quyết bài toán thực tế — hãy là người kế tiếp.",
    heroImage: "/images/hero-image-76f7dd.png",
  },
  section2: {
    sectionTitle: "What Makes The Slab Different",
    sectionTitle_vi: "Điều gì khiến The S-Lab trở nên khác biệt",
    feature1Title: "Structured curriculum, easy to follow",
    feature1Title_vi: "Execution-First Learning",
    feature1Desc:
      "Clear stages, objectives, and checklists—so you always know what to focus on next.",
    feature1Desc_vi:
      "S-Lab ưu tiên năng lực thực thi, giúp người học chuyển hóa việc học thành hành động, đầu ra cụ thể và khả năng giải quyết vấn đề trong thực tế.",
    feature2Title: "Flexible learning, with a consistent rhythm",
    feature2Title_vi: "Lab Methodology",
    feature2Desc:
      "Self-paced materials combined with scheduled guidance and reviews, so you stay on track without feeling overwhelmed.",
    feature2Desc_vi:
      "Mỗi chương trình được vận hành theo một framework có cấu trúc, giúp người học bắt đầu từ vấn đề thực tế, hiểu cách tiếp cận, xây giải pháp, nhận phản hồi, cải thiện và áp dụng trực tiếp vào công việc.",
    feature3Title: "Outcome-driven by design",
    feature3Title_vi: "Mentor Feedback Loop",
    feature3Desc:
      "Every module produces tangible deliverables—plans, systems, or assets you can apply immediately.",
    feature3Desc_vi:
      "Mentor cung cấp framework, phản biện tư duy và định hướng người học nâng cao năng lực thực thi cũng như cải thiện chất lượng đầu ra.",
    feature4Title: "Project-first execution",
    feature4Title_vi: "Career Capability Development",
    feature4Desc:
      "You learn by building and refining real work, not by consuming theory alone.",
    feature4Desc_vi:
      "Phát triển năng lực gắn với lộ trình nghề nghiệp dài hạn, giúp người học xây dựng hệ năng lực bài bản, phù hợp với từng vai trò thay vì chỉ tích lũy những kỹ năng rời rạc.",
    feature5Title: "High-touch advisor feedback",
    feature5Title_vi: "Business Impact Measurement",
    feature5Desc:
      "Targeted reviews and actionable improvements to steadily raise the quality of your output.",
    feature5Desc_vi:
      "Kết quả học tập không chỉ nằm ở việc hoàn thành, mà còn ở chất lượng đầu ra, năng lực nghề nghiệp và tác động thực tế lên doanh nghiệp.",
    feature6Title: "AI-enabled workflows + systems thinking",
    feature6Title_vi: "Quy trình tích hợp AI + tư duy hệ thống",
    feature6Desc:
      "Practical AI integration to speed up research and iteration, supported by repeatable frameworks—not isolated tactics.",
    feature6Desc_vi:
      "Tích hợp AI thực tế để đẩy nhanh nghiên cứu và lặp lại, được hỗ trợ bởi các khung làm việc có thể lặp lại — không phải chiến thuật rời rạc.",
  },
  whoSupports: {
    heading: "Who The Slab Supports",
    heading_vi: "The S-Lab dành cho ai",
    counterNumber: "/04+",
    counterNumber_vi: "/05+",
    counterLabel: "The S-Lab supports",
    counterLabel_vi:
      "Những người làm nghề đang giải quyết các bài toán thực tế, không chỉ học khái niệm.",
    labelSupport: "Support staff",
    labelSupport_vi: "Hỗ trợ",
    labelProfession: "Profession",
    labelProfession_vi: "Trình độ",
    labelDescription: "Description",
    labelDescription_vi: "Mô tả",
    item1Title: "/Students",
    item1Title_vi: "/Career Starters (0-2 years)",
    item1Profession: "High School & University",
    item1Profession_vi: "High School & University",
    item1Description:
      "Build strong foundations and a portfolio you can show.\nGuided learning path + clear track selection\nProject-based assignments with mentor feedback",
    item1Description_vi:
      "Xây dựng nền tảng vững chắc và portfolio ấn tượng.\nLộ trình học có hướng dẫn + lựa chọn track rõ ràng\nBài tập dựa trên dự án với phản hồi từ mentor",
    item1Image: "/images/home-who-supports/students.png",
    item2Title: "/Early-Career",
    item2Title_vi: "/Mid-level Professionals",
    item2Profession: "Junior & Mid-level",
    item2Profession_vi: "Mid-level",
    item2Description:
      "Accelerate your career growth with practical skills.\nReal-world case studies + industry mentorship\nNetworking opportunities with peers and experts",
    item2Description_vi:
      "Đẩy nhanh phát triển sự nghiệp với kỹ năng thực tiễn.\nCase study thực tế + mentorship từ chuyên gia\nCơ hội kết nối với đồng nghiệp và chuyên gia",
    item2Image: "/images/home-who-supports/early-career.png",
    item3Title: "/Professionals",
    item3Title_vi: "/Managers & Team Leads",
    item3Profession: "Senior & Executives",
    item3Profession_vi: "Senior & Executives",
    item3Description:
      "Deepen your expertise and stay ahead of trends.\nAdvanced workshops + strategic frameworks\nPeer-to-peer learning in executive cohorts",
    item3Description_vi:
      "Đào sâu chuyên môn và đi trước xu hướng.\nWorkshop nâng cao + framework chiến lược\nHọc hỏi ngang hàng trong nhóm lãnh đạo",
    item3Image: "/images/home-who-supports/professionals.png",
    item4Title: "/Teams & Companies",
    item4Title_vi: "/Teams & Companies",
    item4Profession: "Corporate Training",
    item4Profession_vi: "Corporate Training",
    item4Description:
      "Upskill your entire team with customized programs.\nTailored curriculum + progress tracking\nScalable learning solutions for organizations",
    item4Description_vi:
      "Nâng cao kỹ năng cho cả đội ngũ với chương trình tùy chỉnh.\nGiáo trình riêng + theo dõi tiến độ\nGiải pháp học tập có thể mở rộng cho tổ chức",
    item4Image: "/images/home-who-supports/teams.png",
  },
  testimonials: {
    heading: "/Our Testimonials.",
    heading_vi: "/Phản hồi từ Học viên.",
    subtitle:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    subtitle_vi:
      "Khách hàng không chỉ tìm đến vì chuyên môn, mà gắn bó lâu dài vì chúng tôi mang lại định hướng rõ ràng, tốc độ triển khai và kết quả thực tế có thể đo lường.",
    t1Text:
      "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    t1Text_vi:
      "The S-Lab đã thực hiện tái thương hiệu và website hoàn chỉnh, nắm bắt chính xác tầm nhìn của chúng tôi. Cách tiếp cận tích hợp đã tiết kiệm hàng tháng trao đổi qua lại.",
    t1Name: "Lora K.",
    t1Name_vi: "Lora K.",
    t1Role: "Student, InnovateHealth",
    t1Role_vi: "Sinh viên, InnovateHealth",
    t1Image: "/images/avatar.png",
    t2Text:
      "Working with The S-Lab was a game-changer. Their strategic insights helping us navigate complex market shifts with confidence gave us a clear competitive advantage.",
    t2Text_vi:
      "Làm việc với The S-Lab là bước ngoặt. Những insight chiến lược giúp chúng tôi tự tin vượt qua biến động thị trường phức tạp, mang lại lợi thế cạnh tranh rõ ràng.",
    t2Name: "Michael C.",
    t2Name_vi: "Michael C.",
    t2Role: "Founder, TechFlow",
    t2Role_vi: "Nhà sáng lập, TechFlow",
    t2Image: "/images/avatar.png",
    t3Text:
      "They don't just execute; they think. The team challenged our assumptions and delivered a product that exceeded our expectations in every measurable way.",
    t3Text_vi:
      "Họ không chỉ thực thi; họ tư duy. Đội ngũ đã thách thức các giả định của chúng tôi và mang đến sản phẩm vượt xa kỳ vọng.",
    t3Name: "Sarah J.",
    t3Name_vi: "Sarah J.",
    t3Role: "Marketing Director, OmniGroup",
    t3Role_vi: "Giám đốc Marketing, OmniGroup",
    t3Image: "/images/avatar.png",
  },
  partners: {
    heading: "The S-Lab's Partners",
    heading_vi: "Đối tác The S-Lab",
  },
  articles: {
    heading: "/More articles.",
    heading_vi: "/Thêm bài viết.",
    a1Title: "How integration drives success",
    a1Title_vi: "Tích hợp thúc đẩy thành công như thế nào",
    a1Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a1Excerpt_vi:
      "Khách hàng không chỉ chọn chúng tôi vì kỹ năng — họ ở lại vì chúng tôi luôn mang đến sự rõ ràng, tốc độ và kết quả đo lường được.",
    a1Date: "May 29, 2026",
    a1Date_vi: "29 Tháng 5, 2026",
    a1Image: "/images/blogs/blog1.jpg",
    a2Title: "How integration drives success",
    a2Title_vi: "Tích hợp thúc đẩy thành công như thế nào",
    a2Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a2Excerpt_vi:
      "Khách hàng không chỉ chọn chúng tôi vì kỹ năng — họ ở lại vì chúng tôi luôn mang đến sự rõ ràng, tốc độ và kết quả đo lường được.",
    a2Date: "May 29, 2026",
    a2Date_vi: "29 Tháng 5, 2026",
    a2Image: "/images/blogs/blog2.jpg",
    a3Title: "How integration drives success",
    a3Title_vi: "Tích hợp thúc đẩy thành công như thế nào",
    a3Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a3Excerpt_vi:
      "Khách hàng không chỉ chọn chúng tôi vì kỹ năng — họ ở lại vì chúng tôi luôn mang đến sự rõ ràng, tốc độ và kết quả đo lường được.",
    a3Date: "May 29, 2026",
    a3Date_vi: "29 Tháng 5, 2026",
    a3Image: "/images/blogs/blog3.jpg",
  },
  footer: {
    newsletterHeading: "/Stay in the loop.",
    newsletterHeading_vi: "/Cập nhật tin mới.",
    newsletterSubtitle: "Smart updates for smart people.",
    newsletterSubtitle_vi: "Thông tin thông minh cho người thông minh.",
    phone: "(312) 555-2468",
    phone_vi: "(312) 555-2468",
    email: "hello@theslab.agency",
    email_vi: "hello@theslab.agency",
    location: "Lorem ipsum Location is here. Danang",
    location_vi: "Lorem ipsum Địa chỉ tại đây. Đà Nẵng",
    description:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
    description_vi:
      "Chiếc balo vững chãi trên hành trình chinh phục kiến thức kinh doanh và kinh nghiệm thực tiễn",
  },
};

type SectionContent = Record<string, string>;
type HomepageContent = Record<string, SectionContent>;

const COURSES_CONTENT_KEY = "courses";
const SLIBRARY_CONTENT_KEY = "slibrary";

/** Figma node 162:9444 — course cards only; preserve saved courseListGeneral. */
const COURSE_CARD_SECTIONS_FROM_FIGMA = [
  "course1",
  "course2",
  "course3",
  "course4",
] as const;

type StoredCoursesData = {
  courseIds: string[];
  cardIds: string[];
  content: HomepageContent;
};

function buildCoursesSeedPayload(
  existingData: string | null
): StoredCoursesData {
  const base: StoredCoursesData = {
    courseIds: [...DEFAULT_COURSE_IDS],
    cardIds: [...DEFAULT_CARD_IDS],
    content: { ...defaultCoursesContent },
  };

  if (!existingData) return base;

  let saved: StoredCoursesData | null = null;
  try {
    saved = JSON.parse(existingData) as StoredCoursesData;
  } catch {
    return base;
  }

  if (!saved?.content) return base;

  const merged: HomepageContent = { ...defaultCoursesContent };
  for (const [sectionKey, section] of Object.entries(saved.content)) {
    if (
      (COURSE_CARD_SECTIONS_FROM_FIGMA as readonly string[]).includes(
        sectionKey
      )
    ) {
      continue;
    }
    merged[sectionKey] = {
      ...(defaultCoursesContent[sectionKey] ?? {}),
      ...section,
    };
  }

  return {
    courseIds: saved.courseIds?.length ? saved.courseIds : base.courseIds,
    cardIds: saved.cardIds?.length ? saved.cardIds : base.cardIds,
    content: merged,
  };
}

async function main() {
  const key = "homepage";

  const existing = await prisma.siteContent.findUnique({ where: { key } });
  let saved: HomepageContent | null = null;

  if (existing) {
    try {
      saved = JSON.parse(existing.data) as HomepageContent;
    } catch {
      saved = null;
    }
  }

  const merged: HomepageContent = {};
  for (const sectionKey of Object.keys(defaultContent)) {
    const defaults = (defaultContent as HomepageContent)[sectionKey];
    const savedSection = saved?.[sectionKey] ?? {};

    merged[sectionKey] = { ...savedSection };
    for (const fieldKey of Object.keys(defaults)) {
      if (!(fieldKey in merged[sectionKey]) || fieldKey.endsWith("_vi")) {
        merged[sectionKey][fieldKey] = defaults[fieldKey];
      }
    }
  }

  await prisma.siteContent.upsert({
    where: { key },
    create: { key, data: JSON.stringify(merged) },
    update: { data: JSON.stringify(merged) },
  });

  console.log("Seeded homepage content.");
  console.log("Sections:", Object.keys(merged).join(", "));

  const viFieldCount = Object.values(merged).reduce(
    (sum, section) =>
      sum + Object.keys(section).filter((k) => k.endsWith("_vi")).length,
    0
  );
  console.log(`Total _vi fields written: ${viFieldCount}`);

  const coursesRow = await prisma.siteContent.findUnique({
    where: { key: COURSES_CONTENT_KEY },
  });
  const coursesPayload = buildCoursesSeedPayload(coursesRow?.data ?? null);

  await prisma.siteContent.upsert({
    where: { key: COURSES_CONTENT_KEY },
    create: { key: COURSES_CONTENT_KEY, data: JSON.stringify(coursesPayload) },
    update: { data: JSON.stringify(coursesPayload) },
  });

  console.log("Seeded courses content (four course cards aligned with Figma).");
  console.log("Course ids:", coursesPayload.courseIds.join(", "));

  const slibraryRow = await prisma.siteContent.findUnique({
    where: { key: SLIBRARY_CONTENT_KEY },
  });

  let slibrarySaved: Record<string, Record<string, string>> | null = null;
  if (slibraryRow?.data) {
    try {
      slibrarySaved = JSON.parse(slibraryRow.data) as Record<
        string,
        Record<string, string>
      >;
    } catch {
      slibrarySaved = null;
    }
  }

  const slibraryMerged: Record<string, Record<string, string>> = {};
  for (const sectionKey of Object.keys(defaultSLibraryContent)) {
    const defaults =
      defaultSLibraryContent[sectionKey as keyof typeof defaultSLibraryContent];
    slibraryMerged[sectionKey] = {
      ...defaults,
      ...(slibrarySaved?.[sectionKey] ?? {}),
    };
  }
  slibraryMerged.slibFaq = {
    ...defaultSLibraryContent.slibFaq,
  };

  await prisma.siteContent.upsert({
    where: { key: SLIBRARY_CONTENT_KEY },
    create: {
      key: SLIBRARY_CONTENT_KEY,
      data: JSON.stringify(slibraryMerged),
    },
    update: { data: JSON.stringify(slibraryMerged) },
  });

  console.log(
    "Seeded slibrary content; slibFaq (EN + VI) set from app defaults."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
