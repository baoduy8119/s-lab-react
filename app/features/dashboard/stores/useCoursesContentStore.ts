import { create } from "zustand";
import { fetchContent, saveContentToDb } from "@/app/lib/contentApi";
import type {
  HomepageContent,
  SectionConfig,
  SectionContent,
} from "../types/content";

const CONTENT_KEY = "courses";

// --- Course helpers ---

const COURSE_FIELDS: SectionConfig["fields"] = [
  { key: "name", label: "Name", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
  { key: "price", label: "Price", type: "text" },
  { key: "oldPrice", label: "Old Price", type: "text" },
  { key: "features", label: "Features (one per line)", type: "textarea" },
  { key: "availability", label: "Availability", type: "text" },
];

export const NEW_COURSE_DEFAULTS: SectionContent = {
  name: "New Course",
  name_vi: "Khóa học mới",
  duration: "2-4 hours/class",
  duration_vi: "2-4 giờ/buổi",
  price: "$0",
  price_vi: "$0",
  oldPrice: "",
  oldPrice_vi: "",
  features: "",
  features_vi: "",
  availability: "",
  availability_vi: "",
};

export function buildCourseSectionConfig(
  courseId: string,
  index: number,
  name?: string
): SectionConfig {
  const displayName = name || `Course ${index + 1}`;
  return {
    id: courseId,
    title: `Course ${index + 1} – ${displayName}`,
    fields: COURSE_FIELDS,
  };
}

// --- Marketing card helpers ---

const CARD_FIELDS: SectionConfig["fields"] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image", label: "Image", type: "image" },
  { key: "category", label: "Category", type: "text" },
];

export const NEW_CARD_DEFAULTS: SectionContent = {
  title: "New Card",
  title_vi: "Thẻ mới",
  description: "",
  description_vi: "",
  image: "",
  category: "",
  category_vi: "",
};

export function buildCardSectionConfig(
  cardId: string,
  index: number,
  title?: string
): SectionConfig {
  const displayTitle = title || `Card ${index + 1}`;
  return {
    id: cardId,
    title: `Card ${index + 1} – ${displayTitle}`,
    fields: CARD_FIELDS,
  };
}

// --- Static sections ---

export const staticSections: SectionConfig[] = [
  {
    id: "courseHero",
    title: "Hero Section",
    fields: [
      { key: "title", label: "Title", type: "textarea" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "formTitle", label: "Form Title", type: "text" },
      { key: "submitButton", label: "Submit Button Text", type: "text" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "placeholderName", label: "Form: Name (required)", type: "text" },
      { key: "placeholderEmail", label: "Form: Email (required)", type: "text" },
      { key: "placeholderPhone", label: "Form: Phone (required)", type: "text" },
      { key: "placeholderCareer", label: "Form: Career / occupation", type: "text" },
      { key: "placeholderAge", label: "Form: Age", type: "text" },
      { key: "placeholderNeeds", label: "Form: Needs / message", type: "text" },
    ],
  },
  {
    id: "courseListGeneral",
    title: "Course List – General",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "description", label: "Section Description", type: "textarea" },
      { key: "rating", label: "Rating", type: "text" },
      { key: "socialProof", label: "Social Proof Text", type: "textarea" },
      { key: "registerBtn", label: "Register Button Text", type: "text" },
    ],
  },
];

// --- Defaults ---

const featurePlaceholder =
  "The S-LAB is where theory meet practice\nThe S-LAB is where theory meet practice\nThe S-LAB is where theory meet practice\nThe S-LAB is where theory meet practice\nThe S-LAB is where theory meet practice";

const featurePlaceholderVi =
  "The S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành";

export const DEFAULT_COURSE_IDS = ["course1", "course2", "course3", "course4"];
export const DEFAULT_CARD_IDS = [
  "card1",
  "card2",
  "card3",
  "card4",
  "card5",
  "card6",
  "card7",
  "card8",
  "card9",
];

const defaultCardDescVi =
  "Khách hàng không chỉ chọn chúng tôi vì kỹ năng — họ ở lại vì chúng tôi luôn mang đến sự rõ ràng, tốc độ và kết quả đo lường được.";

export const defaultCoursesContent: HomepageContent = {
  courseHero: {
    title: "/The S-LAB\nProgrammes and\nCourses",
    title_vi: "/The S-LAB\nChương trình và\nKhóa học",
    subtitle: "Learning goes beyond textbooks",
    subtitle_vi: "Học tập vượt xa sách vở",
    formTitle: "FILL FOR REGISTRATION",
    formTitle_vi: "ĐIỀN ĐỂ ĐĂNG KÝ",
    submitButton: "Send your answer",
    submitButton_vi: "Gửi câu trả lời",
    heroImage: "/images/courses/hero-bg.jpg",
    placeholderName: "Name *",
    placeholderName_vi: "Tên *",
    placeholderEmail: "Email *",
    placeholderEmail_vi: "Email *",
    placeholderPhone: "Phone number *",
    placeholderPhone_vi: "Số điện thoại *",
    placeholderCareer: "Career",
    placeholderCareer_vi: "Nghề nghiệp",
    placeholderAge: "Age",
    placeholderAge_vi: "Tuổi",
    placeholderNeeds: "Your needs...",
    placeholderNeeds_vi: "Nhu cầu của bạn...",
  },
  courseListGeneral: {
    heading: "/Most choices courses.",
    heading_vi: "/Khóa học được chọn nhiều nhất.",
    description:
      "The course is transparent, covering every stage of your development. No hidden fees. No long-term contracts.",
    description_vi:
      "Khóa học minh bạch, bao quát mọi giai đoạn phát triển của bạn. Không phí ẩn. Không hợp đồng dài hạn.",
    rating: "4.9 / 5",
    rating_vi: "4.9 / 5",
    socialProof:
      "We've helped over 105+ people achieve their goals — you could be the next one.",
    socialProof_vi:
      "Chúng tôi đã giúp hơn 105+ người đạt được mục tiêu — bạn có thể là người tiếp theo.",
    registerBtn: "Register now",
    registerBtn_vi: "Đăng ký ngay",
  },
  course1: {
    name: "Marketing Foundation",
    name_vi: "Marketing Foundation",
    duration: "2-3 hours/session | Private 1:4",
    duration_vi: "2-3 tiếng/buổi | Private 1:4",
    price: "$300",
    price_vi: "8.000.000",
    oldPrice: "$350",
    oldPrice_vi: "9.000.000",
    features:
      "Systematic marketing mindset\nApply AI to improve productivity\nUpgrade your capabilities through a personalized roadmap\nPractical IMC plan & KPI framework",
    features_vi:
      "Tư duy Marketing có hệ thống\nỨng dụng AI nâng cao hiệu suất\nNâng cấp năng lực theo lộ trình cá nhân hóa\nIMC plan & KPI khả thi",
    availability: "Next available: April 14, 2026",
    availability_vi: "Lịch khai giảng: 20/04/2026",
  },
  course2: {
    name: "Master Marketing Planning",
    name_vi: "Master Marketing Planning",
    duration: "2 hours/session | Private 1:4",
    duration_vi: "2 tiếng/buổi | Private 1:4",
    price: "$260",
    price_vi: "7.000.000",
    oldPrice: "$300",
    oldPrice_vi: "7.500.000",
    features:
      "End-to-end planning with a structured, practical approach\nApply AI to improve productivity and feasibility\nStrengthen lead planning, decision-making, and plan defense\nBuild Marketing Plans & IMC Plans aligned with business goals\nReady-to-use templates and frameworks",
    features_vi:
      "Planning end-to-end, bài bản và thực chiến 2026\nỨng dụng AI nâng cao hiệu suất và tính khả thi\nNâng cấp năng lực Lead Plan: ra quyết định và bảo vệ plan có logic\nMarketing Plan & IMC Plan gắn Business Goal\nBộ template/framework thực chiến",
    availability: "Next available: May 10, 2026",
    availability_vi: "Lịch khai giảng: 10/05/2026",
  },
  course3: {
    name: "Content Marketing: Content Starter",
    name_vi: "Content Marketing: Content Starter",
    duration: "2 hours/session | Coaching 1:1",
    duration_vi: "2 tiếng/buổi | Coaching 1:1",
    price: "$260",
    price_vi: "7.000.000",
    oldPrice: "$300",
    oldPrice_vi: "7.500.000",
    features:
      "Understand core concepts and how to apply them in real cases\nLearn how each platform works, how to read metrics, and how to optimize\nExpand content skills and strategy toward business effectiveness\nBuild templates and workflows for multi-format content with effective AI support (articles, images, short videos)",
    features_vi:
      "Nắm được các khái niệm và cách hiện thực hoá trong case thực tế\nNguyên tắc vận hành của từng nền tảng, đọc chỉ số và tối ưu\nMở rộng kỹ năng và chiến lược nội dung theo hướng \"ra hiệu quả kinh doanh\"\nTạo được bộ template + quy trình để sản xuất đa định dạng kết hợp sử dụng AI hiệu quả (bài viết, ảnh, video ngắn)",
    availability: "Next available: April 15, 2026",
    availability_vi: "Lịch khai giảng: 15/04/2026",
  },
  course4: {
    name: "Facebook Ads",
    name_vi: "Facebook ADS",
    duration: "1-2 hours/session | Coaching 1:1",
    duration_vi: "1-2 tiếng/buổi | Coaching 1:1",
    price: "$190",
    price_vi: "5.000.000",
    oldPrice: "$220",
    oldPrice_vi: "6.000.000",
    features:
      "Build a structured Meta Ads system with a sustainable workflow\nSet the right goals and KPIs for your business objectives\nDesign testing frameworks to find winning points faster\nRead data and optimize based on clear decision-making principles\nScale budget while maintaining long-term performance\nApply AI to speed up research, creativity, and reporting",
    features_vi:
      "Xây hệ vận hành Meta Ads bài bản, chạy bền theo quy trình\nĐặt mục tiêu và KPI đúng theo bài toán kinh doanh\nThiết kế ma trận testing để tìm “điểm thắng” nhanh hơn\nĐọc số và tối ưu theo nguyên tắc ra quyết định\nScale ngân sách và duy trì hiệu quả dài hạn\nỨng dụng AI để tăng tốc research, sáng tạo và reporting",
    availability: "Next available: April 15, 2026",
    availability_vi: "Lịch khai giảng: 15/04/2026",
  },
  card1: {
    title: "Marketing Foundation",
    title_vi: "Marketing Foundation",
    description:
      "Helps you build a clear end-to-end marketing mindset and execution approach. Learn how to create plans based on data instead of intuition, and apply AI in the right places to work faster and improve output quality.",
    description_vi:
      "Giúp bạn hệ thống lại toàn bộ tư duy end-to-end và cách triển khai. Học cách lập kế hoạch dựa trên dữ liệu để tránh cảm tính, ứng dụng AI đúng chỗ để tăng tốc làm việc và nâng chất lượng đầu ra.",
    image: "/images/courses/mar-1.jpg",
    category: "Marketing Foundations",
    category_vi: "Nền tảng Marketing",
  },
  card2: {
    title: "Master Marketing Planning",
    title_vi: "Master Marketing Planning",
    description:
      "Helps you build a solid framework from strategy to execution. Step by step, you will learn how to create plans with clear logic, strong feasibility, and effective control mechanisms.",
    description_vi:
      "Giúp bạn xây dựng một bộ khung từ chiến lược đến vận hành. Bằng cách đi từng bước trong chu trình làm việc để kế hoạch có logic rõ ràng, khả thi và có cơ chế kiểm soát hiệu quả.",
    image: "/images/courses/mar-2.jpg",
    category: "Business Fundamentals",
    category_vi: "Kiến thức kinh doanh cơ bản",
  },
  card3: {
    title: "Facebook Ads",
    title_vi: "Facebook ADS",
    description:
      "Helps you prepare your Meta assets, set the right goals and KPIs for your business, then build campaign structures with clear objectives and a proper process for testing, optimization, and scaling based on performance metrics.",
    description_vi:
      "Bạn sẽ chuẩn hóa tài sản Meta (BM, Fanpage, Pixel, Events), thiết lập mục tiêu và KPI theo bài toán kinh doanh, sau đó triển khai cấu trúc campaign theo mục tiêu và quy trình test, tối ưu, scale theo ngưỡng chỉ số.",
    image: "/images/courses/mar-3.jpg",
    category: "Advanced Marketing",
    category_vi: "Marketing nâng cao",
  },
  card4: {
    title: "Content Marketing",
    title_vi: "Content Marketing",
    description:
      "Build a practical, structured content system with clear strategy, process, and measurement. Start from the fundamentals, learn how each platform works, and grow toward more strategic content planning.",
    description_vi:
      "Giúp bạn xây một cách làm bài bản nhưng thực tế, trở thành một hệ thống có chiến lược, có quy trình, có đo lường. Bạn bắt đầu từ nền tảng để gỡ rối và khơi thông ý tưởng, đi sâu cách vận hành từng nền tảng social để phát triển đa kênh, sau đó nâng cấp sang các lớp chiến lược",
    image: "/images/courses/mar-1.jpg",
    category: "Marketing Foundations",
    category_vi: "Nền tảng Marketing",
  },
  card5: {
    title: "UI/UX Design Foundation",
    title_vi: "UI/UX Design Foundation",
    description:
      "Learn the full UI/UX process through a real-project approach in Figma, from problem framing and user understanding to flows, wireframes, prototypes, handoff files, and case studies, with AI applied where needed.",
    description_vi:
      "Đi theo quy trình end-to-end như một dự án thật, làm trên Figma với tiêu chuẩn bàn giao rõ ràng, từ xác định vấn đề, hiểu người dùng, thiết kế luồng và khung, triển khai UI theo hệ thống, làm prototype để review, đến chuẩn bị file handoff và case study để ứng tuyển hoặc áp dụng ngay trong công việc.",
    image: "/images/courses/mar-2.jpg",
    category: "Business Fundamentals",
    category_vi: "Kiến thức kinh doanh cơ bản",
  },
  card6: {
    title: "YouTube AI Mastery",
    title_vi: "Youtube AI Mastery",
    description:
      "Through a 2-day, 4-session learning journey, learners not only gain knowledge but also build a clear channel direction, content production workflow, and execution roadmap that can be applied right after the course.",
    description_vi:
      "Thông qua lộ trình 2 ngày - 4 buổi học, học viên không chỉ nắm kiến thức mà còn xây được định hướng kênh, quy trình sản xuất và lộ trình triển khai rõ ràng sau khóa học.",
    image: "/images/courses/mar-3.jpg",
    category: "Advanced Marketing",
    category_vi: "Marketing nâng cao",
  },
  card7: {
    title: "TikTok Ads Growth System",
    title_vi: "TikTok ADS Growth System",
    description:
      "Designed to help learners execute end-to-end: define goals and KPIs by funnel stage, standardize tracking, build audience maps, develop creative angles (Hook-Story-Proof-CTA), and run campaigns through a test-learn-scale workflow, with AI integrated as a tool to boost speed.",
    description_vi:
      "Được thiết kế để học viên triển khai end-to-end: xác định mục tiêu và KPI theo funnel, chuẩn hóa tracking, xây audience map, phát triển hệ creative (Hook-Story-Proof-CTA) và vận hành theo nhịp test-learn-scale, AI được tích hợp như công cụ tăng tốc.",
    image: "/images/courses/mar-1.jpg",
    category: "Marketing Foundations",
    category_vi: "Nền tảng Marketing",
  },
  card8: {
    title: "YouTube MMO",
    title_vi: "Youtube MMO",
    description:
      "This course is built from the platform mechanism to execution: choose a niche with potential, research content ideas, create and edit your first videos, optimize titles, thumbnails, and SEO, read performance data for improvement, and build a 90-day roadmap for sustainable channel growth.",
    description_vi:
      "Khóa học này được thiết kế từ cơ chế nền tảng -> chọn niche có cơ hội -> research đúng cách -> làm và đăng video đầu tiên -> tối ưu tiêu đề/thumbnail/SEO -> đọc số để sửa -> ra roadmap 90 ngày để phát triển kênh bền.",
    image: "/images/courses/mar-2.jpg",
    category: "Business Fundamentals",
    category_vi: "Kiến thức kinh doanh cơ bản",
  },
  card9: {
    title: "Google Ads",
    title_vi: "Google ADS Thuc chien",
    description:
      "Learn how practitioners actually work: with checklists, optimization logic, decision-making rules, and dashboards built to report with insight, not just numbers.",
    description_vi:
      "Bạn sẽ học theo cách của người làm nghề: có checklist, có log tối ưu, có rule ra quyết định và có dashboard để báo cáo bằng insight, không chỉ bằng số.",
    image: "/images/courses/mar-3.jpg",
    category: "Advanced Marketing",
    category_vi: "Marketing nâng cao",
  },
};

export interface CoursesStoredData {
  courseIds: string[];
  cardIds: string[];
  content: HomepageContent;
}

export function mergeCoursesFromSaved(
  parsed: CoursesStoredData | HomepageContent | null | undefined
): { content: HomepageContent; courseIds: string[]; cardIds: string[] } {
  if (!parsed) {
    return {
      content: defaultCoursesContent,
      courseIds: DEFAULT_COURSE_IDS,
      cardIds: DEFAULT_CARD_IDS,
    };
  }

  let savedContent: HomepageContent;
  let savedCourseIds: string[];
  let savedCardIds: string[];

  const asStored = parsed as CoursesStoredData;
  if (asStored.courseIds && asStored.content) {
    savedContent = asStored.content;
    savedCourseIds = asStored.courseIds;
    savedCardIds = asStored.cardIds ?? DEFAULT_CARD_IDS;
  } else {
    savedContent = parsed as HomepageContent;
    savedCourseIds = DEFAULT_COURSE_IDS;
    savedCardIds = DEFAULT_CARD_IDS;
  }

  const merged: HomepageContent = {};
  for (const key of Object.keys(defaultCoursesContent)) {
    merged[key] = { ...defaultCoursesContent[key], ...savedContent[key] };
  }
  for (const id of savedCourseIds) {
    if (!merged[id]) {
      merged[id] = { ...NEW_COURSE_DEFAULTS, ...savedContent[id] };
    }
  }
  for (const id of savedCardIds) {
    if (!merged[id]) {
      merged[id] = { ...NEW_CARD_DEFAULTS, ...savedContent[id] };
    }
  }

  return {
    content: merged,
    courseIds: savedCourseIds,
    cardIds: savedCardIds,
  };
}

// --- Store ---

interface CoursesContentState {
  content: HomepageContent;
  courseIds: string[];
  cardIds: string[];
  isDirty: boolean;
  isSaving: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => Promise<void>;
  resetContent: () => Promise<void>;
  resetSection: (sectionId: string) => void;
  addCourse: () => void;
  removeCourse: (courseId: string) => void;
  addCard: () => void;
  removeCard: (cardId: string) => void;
  hydrate: () => Promise<void>;
  getSection: (sectionId: string) => SectionContent;
}

function nextId(ids: string[], prefix: string): string {
  const nums = ids.map((id) => parseInt(id.replace(prefix, ""), 10));
  return `${prefix}${Math.max(0, ...nums) + 1}`;
}

export const useCoursesContentStore = create<CoursesContentState>(
  (set, get) => ({
    content: defaultCoursesContent,
    courseIds: DEFAULT_COURSE_IDS,
    cardIds: DEFAULT_CARD_IDS,
    isDirty: false,
    isSaving: false,

    updateField: (sectionId, key, value) => {
      set((state) => ({
        content: {
          ...state.content,
          [sectionId]: { ...state.content[sectionId], [key]: value },
        },
        isDirty: true,
      }));
    },

    saveContent: async () => {
      const { content, courseIds, cardIds } = get();
      set({ isSaving: true });
      try {
        const data: CoursesStoredData = { courseIds, cardIds, content };
        await saveContentToDb(CONTENT_KEY, data);
        set({ isDirty: false });
      } finally {
        set({ isSaving: false });
      }
    },

    resetContent: async () => {
      set({ isSaving: true });
      try {
        const data: CoursesStoredData = {
          courseIds: DEFAULT_COURSE_IDS,
          cardIds: DEFAULT_CARD_IDS,
          content: defaultCoursesContent,
        };
        await saveContentToDb(CONTENT_KEY, data);
        set({
          content: defaultCoursesContent,
          courseIds: DEFAULT_COURSE_IDS,
          cardIds: DEFAULT_CARD_IDS,
          isDirty: false,
        });
      } finally {
        set({ isSaving: false });
      }
    },

    resetSection: (sectionId) => {
      set((state) => ({
        content: {
          ...state.content,
          [sectionId]:
            defaultCoursesContent[sectionId] ??
            (sectionId.startsWith("card")
              ? NEW_CARD_DEFAULTS
              : NEW_COURSE_DEFAULTS),
        },
        isDirty: true,
      }));
    },

    addCourse: () => {
      set((state) => {
        const newId = nextId(state.courseIds, "course");
        return {
          courseIds: [...state.courseIds, newId],
          content: { ...state.content, [newId]: { ...NEW_COURSE_DEFAULTS } },
          isDirty: true,
        };
      });
    },

    removeCourse: (courseId) => {
      set((state) => {
        if (state.courseIds.length <= 1) return state;
        const newContent = { ...state.content };
        delete newContent[courseId];
        return {
          courseIds: state.courseIds.filter((id) => id !== courseId),
          content: newContent,
          isDirty: true,
        };
      });
    },

    addCard: () => {
      set((state) => {
        const newId = nextId(state.cardIds, "card");
        return {
          cardIds: [...state.cardIds, newId],
          content: { ...state.content, [newId]: { ...NEW_CARD_DEFAULTS } },
          isDirty: true,
        };
      });
    },

    removeCard: (cardId) => {
      set((state) => {
        if (state.cardIds.length <= 1) return state;
        const newContent = { ...state.content };
        delete newContent[cardId];
        return {
          cardIds: state.cardIds.filter((id) => id !== cardId),
          content: newContent,
          isDirty: true,
        };
      });
    },

    hydrate: async () => {
      try {
        const parsed = await fetchContent<CoursesStoredData | HomepageContent>(
          CONTENT_KEY
        );
        if (!parsed) return;
        set({
          ...mergeCoursesFromSaved(parsed),
          isDirty: false,
        });
      } catch {
        // fallback to defaults on network error
      }
    },

    getSection: (sectionId) => get().content[sectionId] ?? {},
  })
);
