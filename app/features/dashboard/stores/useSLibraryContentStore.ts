import { fetchContent, saveContentToDb } from "@/app/lib/contentApi";
import { create } from "zustand";
import type { HomepageContent, SectionConfig, SectionContent } from "../types/content";

const CONTENT_KEY = "slibrary";

const EMPTY_SECTION_CONTENT = Object.freeze({}) as SectionContent;

export const sLibrarySections: SectionConfig[] = [
  {
    id: "slibHero",
    title: "Hero Section",
    fields: [
      { key: "title", label: "Main Title", type: "text" },
      { key: "subtitle1", label: "Subtitle Line 1", type: "text" },
      { key: "subtitle2", label: "Subtitle Line 2", type: "text" },
      { key: "description1", label: "Description 1", type: "textarea" },
      { key: "description2", label: "Description 2", type: "textarea" },
      { key: "cardLabel", label: "Card 1 Label", type: "text" },
      { key: "cardLabel2", label: "Card 2 Label", type: "text" },
      { key: "cardLabel3", label: "Card 3 Label", type: "text" },
      { key: "heroImage1", label: "Large Card Image", type: "image" },
      { key: "heroImage2", label: "Medium Card Image", type: "image" },
      { key: "heroImage3", label: "Small Card Image", type: "image" },
    ],
  },
  {
    id: "slibBestForYou",
    title: "Best For You (Courses)",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "c1Title", label: "Course 1 – Title", type: "text" },
      { key: "c1Instructor", label: "Course 1 – Instructor", type: "text" },
      { key: "c1Duration", label: "Course 1 – Duration", type: "text" },
      { key: "c1Documents", label: "Course 1 – Documents", type: "text" },
      { key: "c1OrigPrice", label: "Course 1 – Original Price", type: "text" },
      { key: "c1Price", label: "Course 1 – Price", type: "text" },
      { key: "c1Image", label: "Course 1 – Image", type: "image" },
      { key: "c2Title", label: "Course 2 – Title", type: "text" },
      { key: "c2Instructor", label: "Course 2 – Instructor", type: "text" },
      { key: "c2Duration", label: "Course 2 – Duration", type: "text" },
      { key: "c2Documents", label: "Course 2 – Documents", type: "text" },
      { key: "c2OrigPrice", label: "Course 2 – Original Price", type: "text" },
      { key: "c2Price", label: "Course 2 – Price", type: "text" },
      { key: "c2Image", label: "Course 2 – Image", type: "image" },
      { key: "c3Title", label: "Course 3 – Title", type: "text" },
      { key: "c3Instructor", label: "Course 3 – Instructor", type: "text" },
      { key: "c3Duration", label: "Course 3 – Duration", type: "text" },
      { key: "c3Documents", label: "Course 3 – Documents", type: "text" },
      { key: "c3OrigPrice", label: "Course 3 – Original Price", type: "text" },
      { key: "c3Price", label: "Course 3 – Price", type: "text" },
      { key: "c3Image", label: "Course 3 – Image", type: "image" },
      { key: "c4Title", label: "Course 4 – Title", type: "text" },
      { key: "c4Instructor", label: "Course 4 – Instructor", type: "text" },
      { key: "c4Duration", label: "Course 4 – Duration", type: "text" },
      { key: "c4Documents", label: "Course 4 – Documents", type: "text" },
      { key: "c4OrigPrice", label: "Course 4 – Original Price", type: "text" },
      { key: "c4Price", label: "Course 4 – Price", type: "text" },
      { key: "c4Image", label: "Course 4 – Image", type: "image" },
      { key: "c5Title", label: "Course 5 – Title", type: "text" },
      { key: "c5Instructor", label: "Course 5 – Instructor", type: "text" },
      { key: "c5Duration", label: "Course 5 – Duration", type: "text" },
      { key: "c5Documents", label: "Course 5 – Documents", type: "text" },
      { key: "c5OrigPrice", label: "Course 5 – Original Price", type: "text" },
      { key: "c5Price", label: "Course 5 – Price", type: "text" },
      { key: "c5Image", label: "Course 5 – Image", type: "image" },
    ],
  },
  {
    id: "slibLibrarySystem",
    title: "Library System",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "cat1Name", label: "Category 1 – Name", type: "text" },
      { key: "cat1Image", label: "Category 1 – Image", type: "image" },
      { key: "cat2Name", label: "Category 2 – Name", type: "text" },
      { key: "cat2Image", label: "Category 2 – Image", type: "image" },
      { key: "cat3Name", label: "Category 3 – Name", type: "text" },
      { key: "cat3Image", label: "Category 3 – Image", type: "image" },
      { key: "cat4Name", label: "Category 4 – Name", type: "text" },
      { key: "cat4Image", label: "Category 4 – Image", type: "image" },
      { key: "card1Title", label: "Card 1 – Title", type: "text" },
      { key: "card1Image", label: "Card 1 – Image", type: "image" },
      { key: "card2Title", label: "Card 2 – Title", type: "text" },
      { key: "card2Image", label: "Card 2 – Image", type: "image" },
      { key: "card3Title", label: "Card 3 – Title", type: "text" },
      { key: "card3Image", label: "Card 3 – Image", type: "image" },
      { key: "card4Title", label: "Card 4 – Title", type: "text" },
      { key: "card4Image", label: "Card 4 – Image", type: "image" },
      { key: "card5Title", label: "Card 5 – Title", type: "text" },
      { key: "card5Image", label: "Card 5 – Image", type: "image" },
    ],
  },
  {
    id: "slibFaq",
    title: "FAQ",
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "faqImage", label: "FAQ Image", type: "image" },
      { key: "q1", label: "FAQ 1 – Question", type: "text" },
      { key: "a1", label: "FAQ 1 – Answer", type: "textarea" },
      { key: "q2", label: "FAQ 2 – Question", type: "text" },
      { key: "a2", label: "FAQ 2 – Answer", type: "textarea" },
      { key: "q3", label: "FAQ 3 – Question", type: "text" },
      { key: "a3", label: "FAQ 3 – Answer", type: "textarea" },
      { key: "q4", label: "FAQ 4 – Question", type: "text" },
      { key: "a4", label: "FAQ 4 – Answer", type: "textarea" },
      { key: "q5", label: "FAQ 5 – Question", type: "text" },
      { key: "a5", label: "FAQ 5 – Answer", type: "textarea" },
      { key: "q6", label: "FAQ 6 – Question", type: "text" },
      { key: "a6", label: "FAQ 6 – Answer", type: "textarea" },
      { key: "q7", label: "FAQ 7 – Question", type: "text" },
      { key: "a7", label: "FAQ 7 – Answer", type: "textarea" },
      { key: "q8", label: "FAQ 8 – Question", type: "text" },
      { key: "a8", label: "FAQ 8 – Answer", type: "textarea" },
      { key: "q9", label: "FAQ 9 – Question", type: "text" },
      { key: "a9", label: "FAQ 9 – Answer", type: "textarea" },
    ],
  },
];

export const defaultSLibraryContent: HomepageContent = {
  slibHero: {
    title: "/Shape Tomorrow Today",
    title_vi: "/Định hình tương lai hôm nay",
    subtitle1: "Where Vision Meets Action",
    subtitle1_vi: "Nơi tầm nhìn gặp hành động",
    subtitle2: "in Business and Creativity",
    subtitle2_vi: "trong kinh doanh và sáng tạo",
    description1:
      "Our courses in business, marketing, and creativity are the launchpad for visionaries ready to challenge the status quo.",
    description1_vi:
      "Các khóa học về kinh doanh, marketing và sáng tạo là bệ phóng cho những người có tầm nhìn sẵn sàng thách thức hiện trạng.",
    description2:
      "Transform your dreams into reality and carve your path in the ever-evolving landscape of industry and imagination.",
    description2_vi:
      "Biến ước mơ thành hiện thực và tạo lối đi riêng trong bối cảnh ngành công nghiệp và trí tưởng tượng luôn thay đổi.",
    cardLabel: "Marketing",
    cardLabel_vi: "Marketing",
    cardLabel2: "Marketing Planning",
    cardLabel2_vi: "Kế hoạch Marketing",
    cardLabel3: "",
    cardLabel3_vi: "",
    heroImage1: "/images/slib/marketing-hero.png",
    heroImage2: "/images/slib/marketing-planning-hero.jpg",
    heroImage3: "/images/slib/person-hero.png",
  },
  slibBestForYou: {
    heading: "/Best for you.",
    heading_vi: "/Phù hợp nhất cho bạn.",
    subtitle: "Suit you best",
    subtitle_vi: "Phù hợp nhất với bạn",
    c1Title: "Marketing Planning",
    c1Title_vi: "Kế hoạch Marketing",
    c1Instructor: "Kira Dinh",
    c1Instructor_vi: "Kira Dinh",
    c1Duration: "20H",
    c1Duration_vi: "20H",
    c1Documents: "15 documents",
    c1Documents_vi: "15 tài liệu",
    c1OrigPrice: "899.000",
    c1OrigPrice_vi: "899.000",
    c1Price: "399.000",
    c1Price_vi: "399.000",
    c1Image: "/images/slib/lib-card-1.jpg",
    c2Title: "Content Strategy",
    c2Title_vi: "Chiến lược nội dung",
    c2Instructor: "Sarah Lee",
    c2Instructor_vi: "Sarah Lee",
    c2Duration: "18H",
    c2Duration_vi: "18H",
    c2Documents: "12 documents",
    c2Documents_vi: "12 tài liệu",
    c2OrigPrice: "799.000",
    c2OrigPrice_vi: "799.000",
    c2Price: "349.000",
    c2Price_vi: "349.000",
    c2Image: "/images/slib/lib-card-4.jpg",
    c3Title: "Digital Marketing",
    c3Title_vi: "Marketing số",
    c3Instructor: "John Smith",
    c3Instructor_vi: "John Smith",
    c3Duration: "25H",
    c3Duration_vi: "25H",
    c3Documents: "20 documents",
    c3Documents_vi: "20 tài liệu",
    c3OrigPrice: "999.000",
    c3OrigPrice_vi: "999.000",
    c3Price: "499.000",
    c3Price_vi: "499.000",
    c3Image: "/images/slib/lib-card-2.png",
    c4Title: "Content Strategy",
    c4Title_vi: "Chiến lược nội dung",
    c4Instructor: "Sarah Lee",
    c4Instructor_vi: "Sarah Lee",
    c4Duration: "18H",
    c4Duration_vi: "18H",
    c4Documents: "12 documents",
    c4Documents_vi: "12 tài liệu",
    c4OrigPrice: "799.000",
    c4OrigPrice_vi: "799.000",
    c4Price: "349.000",
    c4Price_vi: "349.000",
    c4Image: "/images/slib/lib-card-3.jpg",
    c5Title: "Content Strategy",
    c5Title_vi: "Chiến lược nội dung",
    c5Instructor: "Sarah Lee",
    c5Instructor_vi: "Sarah Lee",
    c5Duration: "18H",
    c5Duration_vi: "18H",
    c5Documents: "12 documents",
    c5Documents_vi: "12 tài liệu",
    c5OrigPrice: "799.000",
    c5OrigPrice_vi: "799.000",
    c5Price: "349.000",
    c5Price_vi: "349.000",
    c5Image: "/images/slib/lib-card-5.jpg",
  },
  slibLibrarySystem: {
    heading: "/The S-Lab library system.",
    heading_vi: "/Hệ thống thư viện The S-Lab.",
    cat1Name: "Design and Media",
    cat1Name_vi: "Thiết kế và Truyền thông",
    cat1Image: "/images/slib/design-media.png",
    cat2Name: "Content Writing",
    cat2Name_vi: "Viết nội dung",
    cat2Image: "/images/slib/content-writing.png",
    cat3Name: "Data Analytics",
    cat3Name_vi: "Phân tích dữ liệu",
    cat3Image: "/images/slib/data-analytics.png",
    cat4Name: "Marketing Planning",
    cat4Name_vi: "Kế hoạch Marketing",
    cat4Image: "/images/slib/marketing-planning-lib.png",
    card1Title: "Data Analytics",
    card1Title_vi: "Phân tích dữ liệu",
    card1Image: "/images/slib/data-analytics.png",
    card2Title: "Content Writing",
    card2Title_vi: "Viết nội dung",
    card2Image: "/images/slib/content-writing.png",
    card3Title: "Marketing Planning",
    card3Title_vi: "Kế hoạch Marketing",
    card3Image: "/images/slib/marketing-planning-lib.png",
    card4Title: "Design and Media",
    card4Title_vi: "Thiết kế và Truyền thông",
    card4Image: "/images/slib/design-media.png",
    card5Title: "Logo/Illustration",
    card5Title_vi: "Logo/Minh họa",
    card5Image: "/images/slib/lib-card-5.svg",
  },
  slibFaq: {
    heading: "/Frequently\nasked questions.",
    heading_vi: "/Câu hỏi\nthường gặp.",
    faqImage: "/images/slib/faq-image.png",
    q1: "How do I register for a course at The S-Lab?",
    q1_vi: "Làm sao để đăng ký Khoá học tại The S-Lab?",
    a1: 'To register, open the course catalog on The S-Lab website, choose the program that fits you, and click "Register Now". After payment is complete, you will get immediate access to the course materials and content.',
    a1_vi:
      'Để đăng ký khóa học, bạn chỉ cần vào danh mục khóa học trên website The S-Lab, chọn chương trình phù hợp và nhấn "Register Now". Sau khi hoàn tất thanh toán, bạn sẽ được cấp quyền truy cập ngay vào tài liệu và nội dung khóa học.',
    q2: "Can I preview course content before enrolling?",
    q2_vi: "Tôi có thể xem trước nội dung Khóa học không?",
    a2: "Yes. Selected programs let you preview materials before you register.",
    a2_vi:
      "Có. Một số chương trình cho phép bạn xem trước nội dung trước khi đăng ký.",
    q3: "What payment methods does The S-Lab offer?",
    q3_vi: "The S-Lab có những Phương thức thanh toán nào?",
    a3: "We accept major credit cards, PayPal, and bank transfers.",
    a3_vi:
      "Chúng tôi chấp nhận các thẻ thanh toán quốc tế phổ biến, PayPal và chuyển khoản ngân hàng.",
    q4: "After I register, how soon can I start the course?",
    q4_vi: "Sau khi đăng kí Khóa học, sau bao lâu có thể bắt đầu?",
    a4: "As soon as your payment is confirmed, you can usually start within minutes. If your course has a scheduled cohort or kickoff, the start date is shown in your confirmation email and on your dashboard.",
    a4_vi:
      "Ngay sau khi thanh toán được xác nhận, bạn thường có thể bắt đầu trong vài phút. Nếu khóa học có lịch khai giảng hoặc lớp cố định, ngày bắt đầu sẽ được ghi trong email xác nhận và trên bảng điều khiển của bạn.",
    q5: "How do I track my progress in a course?",
    q5_vi: "Làm sao để để theo dõi quá trình tham gia Khóa học?",
    a5: "Your progress is tracked automatically and shown on your learner dashboard.",
    a5_vi:
      "Tiến độ của bạn được hệ thống ghi nhận tự động và hiển thị trên bảng điều khiển học viên.",
    q6: "Can I interact with mentors and other students?",
    q6_vi: "Có thể tương tác với Mentor và các học viên khác không?",
    a6: "Yes. You can join community forums, live Q&A sessions, and mentor channels where your program offers them.",
    a6_vi:
      "Có. Bạn có thể tham gia diễn đàn cộng đồng, các buổi hỏi đáp trực tiếp và kênh Mentor khi chương trình có hỗ trợ.",
    q7: "After completing a course, does The S-Lab provide exit assessments or certificates?",
    q7_vi:
      "Sau khi hoàn thành khóa học, The S-Lab có bài kiểm tra đầu ra hoặc cấp chứng chỉ nào không?",
    a7: "Most courses include assessments; many award a certificate when you meet the requirements. Details are on each course page.",
    a7_vi:
      "Hầu hết khóa học có bài kiểm tra; nhiều chương trình cấp chứng chỉ khi bạn hoàn thành yêu cầu. Chi tiết được ghi trên từng trang khóa học.",
    q8: "What should I do if I run into technical issues while studying?",
    q8_vi: "Nên làm gì nếu gặp sự cố kỹ thuật trong quá trình học?",
    a8: "Please contact our support team at info@slab-edu.com for help.",
    a8_vi:
      "Vui lòng liên hệ đội hỗ trợ tại info@slab-edu.com để được trợ giúp.",
    q9: "How can I get the most out of the courses I signed up for?",
    q9_vi: "Làm sao để tận dụng tối đa các Khóa học đã đăng ký?",
    a9: "Study consistently, join discussions, complete all assignments, and apply what you learn in practice.",
    a9_vi:
      "Học đều đặn, tham gia thảo luận, hoàn thành đầy đủ bài tập và áp dụng kiến thức vào thực tế.",
  },
};

export function mergeSLibraryFromSaved(
  saved: HomepageContent | null | undefined
): HomepageContent {
  const merged: HomepageContent = {};
  for (const key of Object.keys(defaultSLibraryContent)) {
    merged[key] = { ...defaultSLibraryContent[key], ...saved?.[key] };
  }
  return merged;
}

interface SLibraryContentState {
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

export const useSLibraryContentStore = create<SLibraryContentState>((set, get) => ({
  content: defaultSLibraryContent,
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
      await saveContentToDb(CONTENT_KEY, defaultSLibraryContent);
      set({ content: defaultSLibraryContent, isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetSection: (sectionId) => {
    set((state) => ({
      content: {
        ...state.content,
        [sectionId]: defaultSLibraryContent[sectionId],
      },
      isDirty: true,
    }));
  },

  hydrate: async () => {
    try {
      const saved = await fetchContent<HomepageContent>(CONTENT_KEY);
      set({ content: mergeSLibraryFromSaved(saved ?? undefined), isDirty: false });
    } catch {
      // fallback to defaults on network error
    }
  },

  getSection: (sectionId) => {
    return get().content[sectionId] ?? EMPTY_SECTION_CONTENT;
  },
}));
