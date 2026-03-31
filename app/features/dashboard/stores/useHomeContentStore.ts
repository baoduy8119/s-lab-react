import { fetchContent, saveContentToDb } from "@/app/lib/contentApi";
import { create } from "zustand";
import type { HomepageContent, SectionConfig, SectionContent } from "../types/content";

const CONTENT_KEY = "homepage";

const EMPTY_SECTION_CONTENT = Object.freeze({}) as SectionContent;

export const homepageSections: SectionConfig[] = [
  {
    id: "hero",
    title: "Hero Section",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "buttonPrimary", label: "Primary Button Text", type: "text" },
      { key: "buttonSecondary", label: "Secondary Button Text", type: "text" },
      { key: "yellowBadge", label: "Yellow Badge Text", type: "text" },
      { key: "rating", label: "Rating", type: "text" },
      { key: "feedbackText", label: "Feedback Text", type: "textarea" },
      { key: "heroImage", label: "Hero Image", type: "image" },
    ],
  },
  {
    id: "section2",
    title: "What Makes The Slab Different",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "feature1Title", label: "Feature 1 – Title", type: "text" },
      {
        key: "feature1Desc",
        label: "Feature 1 – Description",
        type: "textarea",
      },
      { key: "feature2Title", label: "Feature 2 – Title", type: "text" },
      {
        key: "feature2Desc",
        label: "Feature 2 – Description",
        type: "textarea",
      },
      { key: "feature3Title", label: "Feature 3 – Title", type: "text" },
      {
        key: "feature3Desc",
        label: "Feature 3 – Description",
        type: "textarea",
      },
      { key: "feature4Title", label: "Feature 4 – Title", type: "text" },
      {
        key: "feature4Desc",
        label: "Feature 4 – Description",
        type: "textarea",
      },
      { key: "feature5Title", label: "Feature 5 – Title", type: "text" },
      {
        key: "feature5Desc",
        label: "Feature 5 – Description",
        type: "textarea",
      },
      { key: "feature6Title", label: "Feature 6 – Title", type: "text" },
      {
        key: "feature6Desc",
        label: "Feature 6 – Description",
        type: "textarea",
      },
    ],
  },
  {
    id: "whoSupports",
    title: "Who The Slab Supports",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "item1Title", label: "Item 1 – Title", type: "textarea" },
      { key: "item1Profession", label: "Item 1 – Profession", type: "text" },
      {
        key: "item1Description",
        label: "Item 1 – Description (one per line)",
        type: "textarea",
      },
      { key: "item1Image", label: "Item 1 – Image", type: "image" },
      { key: "item2Title", label: "Item 2 – Title", type: "textarea" },
      { key: "item2Profession", label: "Item 2 – Profession", type: "text" },
      {
        key: "item2Description",
        label: "Item 2 – Description (one per line)",
        type: "textarea",
      },
      { key: "item2Image", label: "Item 2 – Image", type: "image" },
      { key: "item3Title", label: "Item 3 – Title", type: "textarea" },
      { key: "item3Profession", label: "Item 3 – Profession", type: "text" },
      {
        key: "item3Description",
        label: "Item 3 – Description (one per line)",
        type: "textarea",
      },
      { key: "item3Image", label: "Item 3 – Image", type: "image" },
      { key: "item4Title", label: "Item 4 – Title", type: "textarea" },
      { key: "item4Profession", label: "Item 4 – Profession", type: "text" },
      {
        key: "item4Description",
        label: "Item 4 – Description (one per line)",
        type: "textarea",
      },
      { key: "item4Image", label: "Item 4 – Image", type: "image" },
      { key: "item5Title", label: "Item 5 – Title", type: "textarea" },
      { key: "item5Profession", label: "Item 5 – Profession", type: "text" },
      {
        key: "item5Description",
        label: "Item 5 – Description (one per line)",
        type: "textarea",
      },
      { key: "item5Image", label: "Item 5 – Image", type: "image" },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "subtitle", label: "Navigation Subtitle", type: "textarea" },
      { key: "t1Text", label: "Testimonial 1 – Quote", type: "textarea" },
      { key: "t1Name", label: "Testimonial 1 – Name", type: "text" },
      { key: "t1Role", label: "Testimonial 1 – Role", type: "text" },
      { key: "t1Image", label: "Testimonial 1 – Avatar", type: "image" },
      { key: "t2Text", label: "Testimonial 2 – Quote", type: "textarea" },
      { key: "t2Name", label: "Testimonial 2 – Name", type: "text" },
      { key: "t2Role", label: "Testimonial 2 – Role", type: "text" },
      { key: "t2Image", label: "Testimonial 2 – Avatar", type: "image" },
      { key: "t3Text", label: "Testimonial 3 – Quote", type: "textarea" },
      { key: "t3Name", label: "Testimonial 3 – Name", type: "text" },
      { key: "t3Role", label: "Testimonial 3 – Role", type: "text" },
      { key: "t3Image", label: "Testimonial 3 – Avatar", type: "image" },
    ],
  },
  {
    id: "partners",
    title: "Partners",
    fields: [{ key: "heading", label: "Section Heading", type: "text" }],
  },
  {
    id: "articles",
    title: "More Articles",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "a1Title", label: "Article 1 – Title", type: "text" },
      { key: "a1Excerpt", label: "Article 1 – Excerpt", type: "textarea" },
      { key: "a1Date", label: "Article 1 – Date", type: "text" },
      { key: "a1Image", label: "Article 1 – Image", type: "image" },
      { key: "a2Title", label: "Article 2 – Title", type: "text" },
      { key: "a2Excerpt", label: "Article 2 – Excerpt", type: "textarea" },
      { key: "a2Date", label: "Article 2 – Date", type: "text" },
      { key: "a2Image", label: "Article 2 – Image", type: "image" },
      { key: "a3Title", label: "Article 3 – Title", type: "text" },
      { key: "a3Excerpt", label: "Article 3 – Excerpt", type: "textarea" },
      { key: "a3Date", label: "Article 3 – Date", type: "text" },
      { key: "a3Image", label: "Article 3 – Image", type: "image" },
    ],
  },
];

export const defaultContent: HomepageContent = {
  hero: {
    heading: "THE S-LΛB",
    heading_vi: "THE S-LΛB",
    tagline:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
    tagline_vi: "An execution lab helping professionals build solutions for real work.",
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
    feature4Desc: "You learn by building and refining real work, not by consuming theory alone.",
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
    counterNumber: "/5+",
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
    item5Title: "/Career Switchers",
    item5Title_vi: "/Career Switchers",
    item5Profession: "Transitioning Professionals",
    item5Profession_vi: "Transitioning Professionals",
    item5Description:
      "Move into a new role with practical, portfolio-ready projects.\nRole-mapping roadmap + mentor checkpoints\nHands-on assignments tailored to your target position",
    item5Description_vi:
      "Chuyển hướng nghề nghiệp với các dự án thực tiễn cho portfolio.\nLộ trình theo vai trò + mốc kiểm tra với mentor\nBài tập thực hành thiết kế theo vị trí mục tiêu",
    item5Image: "/images/home-who-supports/students.png",
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
};

export function mergeHomepageFromSaved(
  saved: HomepageContent | null | undefined
): HomepageContent {
  const merged: HomepageContent = {};
  for (const key of Object.keys(defaultContent)) {
    merged[key] = { ...defaultContent[key], ...saved?.[key] };
  }
  return merged;
}

interface HomeContentState {
  content: HomepageContent;
  isDirty: boolean;
  isSaving: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => Promise<void>;
  resetContent: () => Promise<void>;
  resetSection: (sectionId: string) => void;
  hydrate: () => Promise<void>;
  getSection: (sectionId: string) => SectionContent;
}

export const useHomeContentStore = create<HomeContentState>((set, get) => ({
  content: defaultContent,
  isDirty: false,
  isSaving: false,

  updateField: (sectionId, key, value) => {
    set((state) => ({
      content: {
        ...state.content,
        [sectionId]: {
          ...state.content[sectionId],
          [key]: value,
        },
      },
      isDirty: true,
    }));
  },

  saveContent: async () => {
    const { content } = get();
    set({ isSaving: true });
    try {
      await saveContentToDb(CONTENT_KEY, content);
      set({ isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetContent: async () => {
    set({ isSaving: true });
    try {
      await saveContentToDb(CONTENT_KEY, defaultContent);
      set({ content: defaultContent, isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetSection: (sectionId) => {
    set((state) => ({
      content: {
        ...state.content,
        [sectionId]: defaultContent[sectionId],
      },
      isDirty: true,
    }));
  },

  hydrate: async () => {
    try {
      const saved = await fetchContent<HomepageContent>(CONTENT_KEY);
      set({ content: mergeHomepageFromSaved(saved ?? undefined), isDirty: false });
    } catch {
      // fallback to defaults on network error
    }
  },

  getSection: (sectionId) => {
    return get().content[sectionId] ?? EMPTY_SECTION_CONTENT;
  },
}));
