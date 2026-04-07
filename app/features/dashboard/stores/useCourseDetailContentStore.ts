import { create } from "zustand";
import type {
  ContentFieldConfig,
  HomepageContent,
  SectionConfig,
  SectionContent,
} from "../types/content";

const THEME_OPTIONS = ["light", "dark"];
const COLOR_OPTIONS = ["black", "red"];

const EMPTY_SECTION_CONTENT = Object.freeze({}) as SectionContent;

function detailSectionId(courseId: string, section: string): string {
  return `${courseId}__${section}`;
}

function buildDefaultDetailContent(courseId: string): HomepageContent {
  const heroId = detailSectionId(courseId, "hero");
  const needId = detailSectionId(courseId, "needToKnow");
  const keyId = detailSectionId(courseId, "keyLearning");
  const structId = detailSectionId(courseId, "structure");
  const capstoneId = detailSectionId(courseId, "capstone");
  const sliderId = detailSectionId(courseId, "testimonialSlider");
  const listId = detailSectionId(courseId, "testimonialsList");
  const includesId = detailSectionId(courseId, "includes");
  const relatedId = detailSectionId(courseId, "relatedCourses");

  return {
    [heroId]: {
      title: "/Marketing\n[→] Essentials",
      title_vi: "/Marketing\n[→] Cốt lõi",
      ctaText: "Sign up now",
      ctaText_vi: "Đăng ký ngay",
      duration: "2 hours/class",
      duration_vi: "2 giờ/buổi",
      nextAvailableLabel: "Next available:",
      nextAvailableLabel_vi: "Lịch khai giảng:",
      nextAvailableValue: "Jan 14, 2026",
      nextAvailableValue_vi: "14/01/2026",
      imageTopCenter: "/images/courses/mar-7.jpg",
      imageTopRight: "/images/courses/mar-5.jpg",
      imageBottomLeft: "/images/courses/mar-6.jpg",
      imageBottomRight: "/images/courses/mar-4.jpg",
    },
    [needId]: {
      heading: "/Your need-to-know\nabout this course.",
      heading_vi: "/Những điều bạn cần biết\nvề khóa học này.",
      overviewLabel: "/Overview information",
      overviewLabel_vi: "/Thông tin tổng quan",
      overviewP1:
        "Today, marketing content is everywhere—but most learners are still piecing things together from scattered tips, random tools, and channel-by-channel tutorials. The result is common: you try a few tactics, feel busy, but struggle to explain why it works, what to do next, or how to measure progress.",
      overviewP1_vi:
        "Ngày nay, nội dung marketing xuất hiện ở khắp nơi — nhưng phần lớn người học vẫn đang chắp vá kiến thức từ mẹo vặt rời rạc, công cụ ngẫu nhiên và các tutorial theo từng kênh. Kết quả rất quen thuộc: thử vài chiến thuật, bận rộn liên tục, nhưng khó giải thích vì sao nó hiệu quả, bước tiếp theo là gì, và đo lường tiến bộ ra sao.",
      overviewP2:
        "Marketing Essentials is necessary because it builds the foundation many people skip. It helps you understand how marketing actually works as a system—audience, positioning, channels, and measurement—so you can make smarter decisions, execute with clarity, and improve consistently. Instead of chasing trends, you leave with a structured framework you can apply to any project, role, or industry.",
      overviewP2_vi:
        "Marketing Essentials cần thiết vì nó xây nền tảng mà nhiều người thường bỏ qua. Khóa học giúp bạn hiểu marketing vận hành như một hệ thống — khách hàng mục tiêu, định vị, kênh triển khai và đo lường — để bạn ra quyết định sáng hơn, triển khai rõ ràng và cải thiện đều đặn. Thay vì chạy theo xu hướng, bạn có một framework có cấu trúc để áp dụng cho bất kỳ dự án, vai trò hay ngành nào.",

      tab1Label: "Who it's for",
      tab1Label_vi: "Dành cho ai",
      tab1Item1Title: "Students & Career Switchers",
      tab1Item1Title_vi: "Sinh viên & Người chuyển ngành",
      tab1Item1Desc:
        "You need a clear foundation and a structured roadmap—so you stop learning random tips and understand how marketing actually works.",
      tab1Item1Desc_vi:
        "Bạn cần nền tảng rõ ràng và lộ trình có cấu trúc — để dừng việc học mẹo ngẫu nhiên và hiểu marketing vận hành thực sự như thế nào.",
      tab1Item1Image: "/images/courses/be-strong.jpg",
      tab1Item2Title: "Early-career Marketers\n(Freshers/Juniors)",
      tab1Item2Title_vi: "Marketers giai đoạn đầu\n(Fresher/Junior)",
      tab1Item2Desc:
        "You're doing tasks but lack a system—this course helps you connect goals → strategy → execution → basic measurement.",
      tab1Item2Desc_vi:
        "Bạn đang làm việc theo task nhưng thiếu hệ thống — khóa học giúp bạn nối mục tiêu → chiến lược → triển khai → đo lường cơ bản.",
      tab1Item2Image: "/images/courses/marketing-essentials.png",
      tab1Item3Title: "Founders & Non-Marketing\nProfessionals",
      tab1Item3Title_vi: "Founders & Người không chuyên\nMarketing",
      tab1Item3Desc:
        "You need marketing clarity to make better decisions, manage teams/agencies, and evaluate performance without guesswork.",
      tab1Item3Desc_vi:
        "Bạn cần sự rõ ràng về marketing để ra quyết định tốt hơn, quản lý team/agency và đánh giá hiệu quả mà không phải “đoán mò”.",
      tab1Item3Image: "/images/courses/mar-8.jpg",

      tab2Label: "What you'll get",
      tab2Label_vi: "Bạn sẽ nhận được",
      tab2Bullets:
        "A clear end-to-end marketing framework (goals → strategy → execution → measurement)\nPractical tools to define audience, positioning, and messaging\nGuidance to choose the right channels and set basic KPIs\nSimple templates/checklists they can apply immediately to real projects",
      tab2Bullets_vi:
        "Một framework marketing end-to-end rõ ràng (mục tiêu → chiến lược → triển khai → đo lường)\nBộ công cụ thực hành để xác định khách hàng mục tiêu, định vị và thông điệp\nHướng dẫn chọn kênh phù hợp và thiết lập KPI cơ bản\nTemplate/checklist đơn giản có thể áp dụng ngay cho dự án thực tế",
      tab2Image: "/images/courses/september-pro.png",

      tab3Label: "FAQs",
      tab3Label_vi: "Câu hỏi thường gặp",
      tab3Image: "/images/slib/faq-image.png",
    },
    [keyId]: {
      heading: "/Key Learning Points.",
      heading_vi: "/Các điểm học trọng tâm.",
      p1: "Understand modern marketing as a system: audience → positioning → channels → measurement",
      p1_vi:
        "Hiểu marketing hiện đại như một hệ thống: khách hàng → định vị → kênh → đo lường",
      p2: "Define an ideal customer profile (ICP) and map the buyer journey",
      p2_vi: "Xác định ICP (khách hàng lý tưởng) và phác họa hành trình mua",
      p3: "Craft clear positioning, value propositions, and core messaging",
      p3_vi: "Xây định vị, value proposition và thông điệp cốt lõi rõ ràng",
      p4: "Choose channels based on strategy—not trends—and plan execution basics",
      p4_vi:
        "Chọn kênh dựa trên chiến lược — không chạy theo trend — và lập kế hoạch triển khai cơ bản",
      p5: "Set meaningful KPIs and build a simple reporting/dashboard rhythm",
      p5_vi: "Đặt KPI có ý nghĩa và xây nhịp reporting/dashboard đơn giản",
    },
    [structId]: {
      heading: "/Course Structure.",
      heading_vi: "/Cấu trúc khóa học.",
      ch1Title: "Marketing System Overview",
      ch1Title_vi: "Tổng quan hệ thống Marketing",
      ch1Theme: "light",
      ch1Theme_vi: "light",
      ch1Content:
        "How marketing works end-to-end (goals → strategy → execution → measurement)\nKey frameworks & terminology",
      ch1Content_vi:
        "Marketing vận hành end-to-end (mục tiêu → chiến lược → triển khai → đo lường)\nFramework & thuật ngữ cốt lõi",
      ch1Time: "WEEK 01",
      ch1Time_vi: "TUẦN 01",

      ch2Title: "Audience & Customer Insight",
      ch2Title_vi: "Khách hàng & Insight",
      ch2Theme: "dark",
      ch2Theme_vi: "dark",
      ch2Content: "ICP definition + segmentation basics\nBuyer journey mapping",
      ch2Content_vi: "Xác định ICP + phân khúc cơ bản\nMapping hành trình mua",
      ch2Time: "WEEK 01",
      ch2Time_vi: "TUẦN 01",

      ch3Title: "Positioning & Messaging",
      ch3Title_vi: "Định vị & Thông điệp",
      ch3Theme: "light",
      ch3Theme_vi: "light",
      ch3Content: "Value proposition + differentiation\nMessaging house (core message, proof, tone)",
      ch3Content_vi:
        "Value proposition + khác biệt hóa\nMessaging house (thông điệp cốt lõi, bằng chứng, tone)",
      ch3Time: "WEEK 01",
      ch3Time_vi: "TUẦN 01",

      ch4Title: "Channels & Execution Planning",
      ch4Title_vi: "Kênh & Lập kế hoạch triển khai",
      ch4Theme: "light",
      ch4Theme_vi: "light",
      ch4Content:
        "Channel selection logic (organic/paid/owned/community)\nBasic campaign plan + content planning",
      ch4Content_vi:
        "Logic chọn kênh (organic/paid/owned/community)\nCampaign plan cơ bản + content planning",
      ch4Time: "WEEK 01",
      ch4Time_vi: "TUẦN 01",

      ch5Title: "Measurement & Optimization Basics",
      ch5Title_vi: "Đo lường & Tối ưu cơ bản",
      ch5Theme: "dark",
      ch5Theme_vi: "dark",
      ch5Content: "KPI selection + dashboard basics\nHow to review results and iterate",
      ch5Content_vi:
        "Chọn KPI + dashboard cơ bản\nCách review kết quả và lặp cải tiến",
      ch5Time: "WEEK 01",
      ch5Time_vi: "TUẦN 01",
    },
    [capstoneId]: {
      heading:
        "Capstone / Final Output (Deliverables)\nA simple marketing plan: ICP + positioning + channel plan + KPI tracker\nOptional: mini campaign brief + content calendar",
      heading_vi:
        "Capstone / Đầu ra cuối khóa (Deliverables)\nMột marketing plan đơn giản: ICP + định vị + kế hoạch kênh + KPI tracker\nTuỳ chọn: mini campaign brief + content calendar",
      image: "/images/courses/capstone-project.jpg",
    },
    [sliderId]: {
      t1Name: "Jacob B.",
      t1Name_vi: "Jacob B.",
      t1Role: "HR Manager Bank Central Indo",
      t1Role_vi: "HR Manager, Bank Central Indo",
      t1Quote:
        "“We’re a boundary-pushing creative agency from Yogyakarta — crafting innovative design, strategic narratives, and unforgettable brand journeys for those who dare to dream big.”",
      t1Quote_vi:
        "“Chúng tôi là một creative agency dám bứt phá từ Yogyakarta — tạo nên thiết kế sáng tạo, câu chuyện chiến lược và hành trình thương hiệu đáng nhớ cho những ai dám mơ lớn.”",
      t1Image: "/images/courses/jacob.jpg",

      t2Name: "Sarah Jenkins",
      t2Name_vi: "Sarah Jenkins",
      t2Role: "CMO TechFlow",
      t2Role_vi: "CMO, TechFlow",
      t2Quote:
        "“The strategic insights from this course transformed our marketing approach. We moved from guessing to precision targeting in just weeks.”",
      t2Quote_vi:
        "“Những insight chiến lược từ khóa học đã thay đổi cách chúng tôi làm marketing. Chỉ sau vài tuần, chúng tôi chuyển từ ‘đoán’ sang nhắm mục tiêu chính xác.”",
      t2Image: "/images/courses/jacob.jpg",

      t3Name: "Michael Chen",
      t3Name_vi: "Michael Chen",
      t3Role: "Founder StartupX",
      t3Role_vi: "Founder, StartupX",
      t3Quote:
        "“Excellent curriculum that balances theory with real-world application. The templates alone are worth the investment.”",
      t3Quote_vi:
        "“Giáo trình rất tốt, cân bằng giữa lý thuyết và ứng dụng thực tế. Chỉ riêng bộ template cũng đã xứng đáng với khoản đầu tư.”",
      t3Image: "/images/courses/jacob.jpg",
    },
    [listId]: {
      heading: "/Testimonials.",
      heading_vi: "/Cảm nhận học viên.",
      l1Text:
        "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
      l1Text_vi:
        "S-Lab giúp chúng tôi tái định vị thương hiệu và xây dựng website một cách trọn vẹn, đúng với tầm nhìn ban đầu. Cách làm tích hợp giúp tiết kiệm hàng tháng làm việc qua lại với nhiều bên.",
      l1Name: "Lora K.",
      l1Name_vi: "Lora K.",
      l1Role: "Student, InnovateHealth",
      l1Role_vi: "Học viên, InnovateHealth",
      l1Image: "/images/avatar.png",
      l2Text:
        "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
      l2Text_vi:
        "S-Lab giúp chúng tôi tái định vị thương hiệu và xây dựng website một cách trọn vẹn, đúng với tầm nhìn ban đầu. Cách làm tích hợp giúp tiết kiệm hàng tháng làm việc qua lại với nhiều bên.",
      l2Name: "Lora K.",
      l2Name_vi: "Lora K.",
      l2Role: "Student, InnovateHealth",
      l2Role_vi: "Học viên, InnovateHealth",
      l2Image: "/images/avatar.png",
      l3Text:
        "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
      l3Text_vi:
        "S-Lab giúp chúng tôi tái định vị thương hiệu và xây dựng website một cách trọn vẹn, đúng với tầm nhìn ban đầu. Cách làm tích hợp giúp tiết kiệm hàng tháng làm việc qua lại với nhiều bên.",
      l3Name: "Lora K.",
      l3Name_vi: "Lora K.",
      l3Role: "Student, InnovateHealth",
      l3Role_vi: "Học viên, InnovateHealth",
      l3Image: "/images/avatar.png",
      l4Text:
        "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
      l4Text_vi:
        "S-Lab giúp chúng tôi tái định vị thương hiệu và xây dựng website một cách trọn vẹn, đúng với tầm nhìn ban đầu. Cách làm tích hợp giúp tiết kiệm hàng tháng làm việc qua lại với nhiều bên.",
      l4Name: "Lora K.",
      l4Name_vi: "Lora K.",
      l4Role: "Student, InnovateHealth",
      l4Role_vi: "Học viên, InnovateHealth",
      l4Image: "/images/avatar.png",
    },
    [includesId]: {
      bgImage: "/images/courses/hero-bg.png",
      badge: "FOR YOU",
      badge_vi: "DÀNH CHO BẠN",
      priceLabel: "Price:",
      priceLabel_vi: "Học phí:",
      originalPrice: "15.000.000 VND",
      originalPrice_vi: "15.000.000 VND",
      earlyBirdText: "Early bird register before 1/11/2023",
      earlyBirdText_vi: "Ưu đãi early bird khi đăng ký trước 01/11/2023",
      finalPrice: "8.350.000 VND",
      finalPrice_vi: "8.350.000 VND",
      includesTitle: "/Course includes:",
      includesTitle_vi: "/Khóa học bao gồm:",
      benefit1Strong: "10 lessons cover",
      benefit1Strong_vi: "10 buổi học",
      benefit1Text: "a deep range of knowledge about digital marketing.",
      benefit1Text_vi: "bao quát kiến thức nền tảng và trọng tâm về digital marketing.",
      benefit2Strong: "Mentorship",
      benefit2Strong_vi: "Mentorship",
      benefit2Text: "for students' work in the class and even in real",
      benefit2Text_vi: "cho bài tập trên lớp và cả tình huống thực tế",
      benefit3Strong: "Forever discount",
      benefit3Strong_vi: "Ưu đãi trọn đời",
      benefit3Text: "for events held by The S-LAB",
      benefit3Text_vi: "cho các sự kiện do The S-LAB tổ chức",
      benefit4Strong: "Become a member",
      benefit4Strong_vi: "Trở thành thành viên",
      benefit4Text: "in the S-Community",
      benefit4Text_vi: "của S-Community",
      benefit5Strong: "Completion certificate",
      benefit5Strong_vi: "Chứng nhận hoàn thành",
      benefit5Text: "",
      benefit5Text_vi: "",
      ctaHref: "#",
      ctaText: "Register now",
      ctaText_vi: "Đăng ký ngay",
    },
    [relatedId]: {
      heading: "/Other related courses.",
      heading_vi: "/Các khóa học liên quan khác.",
      c1Title: "/Operations & Execution Systems",
      c1Title_vi: "/Hệ thống Vận hành & Thực thi",
      c1Duration: "3-4 hours/class",
      c1Duration_vi: "3-4 giờ/buổi",
      c1OriginalPrice: "$150",
      c1OriginalPrice_vi: "$150",
      c1Price: "$100",
      c1Price_vi: "$100",
      c1Popular: "false",
      c1Popular_vi: "false",
      c1ButtonColor: "black",
      c1ButtonColor_vi: "black",
      c1CheckboxColor: "black",
      c1CheckboxColor_vi: "black",
      c1Features:
        "The S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice",
      c1Features_vi:
        "The S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành",
      c1NextAvailable: "Jan 14, 2026",
      c1NextAvailable_vi: "14/01/2026",

      c2Title: "/Decision Intelligence with Data & AI",
      c2Title_vi: "/Decision Intelligence với Data & AI",
      c2Duration: "3-4 hours/class",
      c2Duration_vi: "3-4 giờ/buổi",
      c2OriginalPrice: "$550",
      c2OriginalPrice_vi: "$550",
      c2Price: "$350",
      c2Price_vi: "$350",
      c2Popular: "true",
      c2Popular_vi: "true",
      c2ButtonColor: "red",
      c2ButtonColor_vi: "red",
      c2CheckboxColor: "red",
      c2CheckboxColor_vi: "red",
      c2Features:
        "The S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice",
      c2Features_vi:
        "The S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành",
      c2NextAvailable: "Jan 20, 2026",
      c2NextAvailable_vi: "20/01/2026",

      c3Title: "/Operations & Execution Systems",
      c3Title_vi: "/Hệ thống Vận hành & Thực thi",
      c3Duration: "3-4 hours/class",
      c3Duration_vi: "3-4 giờ/buổi",
      c3OriginalPrice: "$150",
      c3OriginalPrice_vi: "$150",
      c3Price: "$100",
      c3Price_vi: "$100",
      c3Popular: "false",
      c3Popular_vi: "false",
      c3ButtonColor: "black",
      c3ButtonColor_vi: "black",
      c3CheckboxColor: "black",
      c3CheckboxColor_vi: "black",
      c3Features:
        "The S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice",
      c3Features_vi:
        "The S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành",
      c3NextAvailable: "Jan 14, 2026",
      c3NextAvailable_vi: "14/01/2026",

      c4Title: "/Decision Intelligence with Data & AI",
      c4Title_vi: "/Decision Intelligence với Data & AI",
      c4Duration: "3-4 hours/class",
      c4Duration_vi: "3-4 giờ/buổi",
      c4OriginalPrice: "$550",
      c4OriginalPrice_vi: "$550",
      c4Price: "$350",
      c4Price_vi: "$350",
      c4Popular: "true",
      c4Popular_vi: "true",
      c4ButtonColor: "red",
      c4ButtonColor_vi: "red",
      c4CheckboxColor: "red",
      c4CheckboxColor_vi: "red",
      c4Features:
        "The S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice\nThe S-LAB is where theory and practice",
      c4Features_vi:
        "The S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành\nThe S-LAB là nơi lý thuyết gặp thực hành",
      c4NextAvailable: "Jan 20, 2026",
      c4NextAvailable_vi: "20/01/2026",
    },
  };
}

export function buildCourseDetailSectionConfigs(courseId: string): SectionConfig[] {
  const heroId = detailSectionId(courseId, "hero");
  const needId = detailSectionId(courseId, "needToKnow");
  const keyId = detailSectionId(courseId, "keyLearning");
  const structId = detailSectionId(courseId, "structure");
  const capstoneId = detailSectionId(courseId, "capstone");
  const sliderId = detailSectionId(courseId, "testimonialSlider");
  const listId = detailSectionId(courseId, "testimonialsList");
  const includesId = detailSectionId(courseId, "includes");
  const relatedId = detailSectionId(courseId, "relatedCourses");

  return [
    {
      id: heroId,
      title: "Course Detail – Hero",
      fields: [
        { key: "title", label: "Title", type: "textarea" },
        { key: "ctaText", label: "CTA Text", type: "text" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "nextAvailableLabel", label: "Next Available Label", type: "text" },
        { key: "nextAvailableValue", label: "Next Available Value", type: "text" },
        { key: "imageTopCenter", label: "Image – Top Center", type: "image" },
        { key: "imageTopRight", label: "Image – Top Right", type: "image" },
        { key: "imageBottomLeft", label: "Image – Bottom Left", type: "image" },
        { key: "imageBottomRight", label: "Image – Bottom Right", type: "image" },
      ],
    },
    {
      id: needId,
      title: "Course Detail – Need to know",
      fields: [
        { key: "heading", label: "Section Heading", type: "textarea" },
        { key: "overviewLabel", label: "Overview Label", type: "text" },
        { key: "overviewP1", label: "Overview Paragraph 1", type: "textarea" },
        { key: "overviewP2", label: "Overview Paragraph 2", type: "textarea" },

        { key: "tab1Label", label: "Tab 1 Label", type: "text" },
        { key: "tab1Item1Title", label: "Tab 1 – Item 1 Title", type: "text" },
        { key: "tab1Item1Desc", label: "Tab 1 – Item 1 Description", type: "textarea" },
        { key: "tab1Item1Image", label: "Tab 1 – Item 1 Image", type: "image" },
        { key: "tab1Item2Title", label: "Tab 1 – Item 2 Title", type: "text" },
        { key: "tab1Item2Desc", label: "Tab 1 – Item 2 Description", type: "textarea" },
        { key: "tab1Item2Image", label: "Tab 1 – Item 2 Image", type: "image" },
        { key: "tab1Item3Title", label: "Tab 1 – Item 3 Title", type: "text" },
        { key: "tab1Item3Desc", label: "Tab 1 – Item 3 Description", type: "textarea" },
        { key: "tab1Item3Image", label: "Tab 1 – Item 3 Image", type: "image" },

        { key: "tab2Label", label: "Tab 2 Label", type: "text" },
        { key: "tab2Bullets", label: "Tab 2 Bullets (one per line)", type: "textarea" },
        { key: "tab2Image", label: "Tab 2 Image", type: "image" },

        { key: "tab3Label", label: "Tab 3 Label", type: "text" },
        { key: "tab3Image", label: "Tab 3 Image", type: "image" },
      ],
    },
    {
      id: keyId,
      title: "Course Detail – Key learning points",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "p1", label: "Point 1", type: "textarea" },
        { key: "p2", label: "Point 2", type: "textarea" },
        { key: "p3", label: "Point 3", type: "textarea" },
        { key: "p4", label: "Point 4", type: "textarea" },
        { key: "p5", label: "Point 5", type: "textarea" },
      ],
    },
    {
      id: structId,
      title: "Course Detail – Structure",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "ch1Title", label: "Chapter 1 Title", type: "text" },
        { key: "ch1Theme", label: "Chapter 1 Theme", type: "select", options: THEME_OPTIONS },
        { key: "ch1Content", label: "Chapter 1 Content (one per line)", type: "textarea" },
        { key: "ch1Time", label: "Chapter 1 Time", type: "text" },
        { key: "ch2Title", label: "Chapter 2 Title", type: "text" },
        { key: "ch2Theme", label: "Chapter 2 Theme", type: "select", options: THEME_OPTIONS },
        { key: "ch2Content", label: "Chapter 2 Content (one per line)", type: "textarea" },
        { key: "ch2Time", label: "Chapter 2 Time", type: "text" },
        { key: "ch3Title", label: "Chapter 3 Title", type: "text" },
        { key: "ch3Theme", label: "Chapter 3 Theme", type: "select", options: THEME_OPTIONS },
        { key: "ch3Content", label: "Chapter 3 Content (one per line)", type: "textarea" },
        { key: "ch3Time", label: "Chapter 3 Time", type: "text" },
        { key: "ch4Title", label: "Chapter 4 Title", type: "text" },
        { key: "ch4Theme", label: "Chapter 4 Theme", type: "select", options: THEME_OPTIONS },
        { key: "ch4Content", label: "Chapter 4 Content (one per line)", type: "textarea" },
        { key: "ch4Time", label: "Chapter 4 Time", type: "text" },
        { key: "ch5Title", label: "Chapter 5 Title", type: "text" },
        { key: "ch5Theme", label: "Chapter 5 Theme", type: "select", options: THEME_OPTIONS },
        { key: "ch5Content", label: "Chapter 5 Content (one per line)", type: "textarea" },
        { key: "ch5Time", label: "Chapter 5 Time", type: "text" },
      ],
    },
    {
      id: capstoneId,
      title: "Course Detail – Capstone",
      fields: [
        { key: "heading", label: "Heading", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
      ],
    },
    {
      id: sliderId,
      title: "Course Detail – Testimonial slider",
      fields: [],
    },
    {
      id: listId,
      title: "Course Detail – Testimonials list",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
      ],
    },
    {
      id: includesId,
      title: "Course Detail – Includes & pricing",
      fields: [
        { key: "bgImage", label: "Background Image", type: "image" },
        { key: "badge", label: "Badge", type: "text" },
        { key: "priceLabel", label: "Price Label", type: "text" },
        { key: "originalPrice", label: "Original Price", type: "text" },
        { key: "earlyBirdText", label: "Early Bird Text", type: "text" },
        { key: "finalPrice", label: "Final Price", type: "text" },
        { key: "includesTitle", label: "Includes Title", type: "text" },
        { key: "benefit1Strong", label: "Benefit 1 Strong", type: "text" },
        { key: "benefit1Text", label: "Benefit 1 Text", type: "text" },
        { key: "benefit2Strong", label: "Benefit 2 Strong", type: "text" },
        { key: "benefit2Text", label: "Benefit 2 Text", type: "text" },
        { key: "benefit3Strong", label: "Benefit 3 Strong", type: "text" },
        { key: "benefit3Text", label: "Benefit 3 Text", type: "text" },
        { key: "benefit4Strong", label: "Benefit 4 Strong", type: "text" },
        { key: "benefit4Text", label: "Benefit 4 Text", type: "text" },
        { key: "benefit5Strong", label: "Benefit 5 Strong", type: "text" },
        { key: "benefit5Text", label: "Benefit 5 Text", type: "text" },
        { key: "ctaHref", label: "CTA Link", type: "text" },
        { key: "ctaText", label: "CTA Text", type: "text" },
      ],
    },
    {
      id: relatedId,
      title: "Course Detail – Related courses",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        ...([1, 2, 3, 4].flatMap((i) => [
          { key: `c${i}Title`, label: `Card ${i} Title`, type: "text" },
          { key: `c${i}Duration`, label: `Card ${i} Duration`, type: "text" },
          { key: `c${i}OriginalPrice`, label: `Card ${i} Original Price`, type: "text" },
          { key: `c${i}Price`, label: `Card ${i} Price`, type: "text" },
          {
            key: `c${i}Popular`,
            label: `Card ${i} Popular (true/false)`,
            type: "select",
            options: ["true", "false"],
          },
          {
            key: `c${i}ButtonColor`,
            label: `Card ${i} Button Color`,
            type: "select",
            options: COLOR_OPTIONS,
          },
          {
            key: `c${i}CheckboxColor`,
            label: `Card ${i} Checkbox Color`,
            type: "select",
            options: COLOR_OPTIONS,
          },
          { key: `c${i}Features`, label: `Card ${i} Features (one per line)`, type: "textarea" },
          { key: `c${i}NextAvailable`, label: `Card ${i} Next Available`, type: "text" },
        ]) as ContentFieldConfig[]),
      ],
    },
  ];
}

export interface CourseDetailStoredData {
  courseIds: string[];
  content: HomepageContent;
}

export function mergeCourseDetailsFromSaved(
  parsed: CourseDetailStoredData | HomepageContent | null | undefined,
  courseIds: string[]
): HomepageContent {
  const merged: HomepageContent = {};
  const defaults = buildDefaultDetailContent(courseIds[0] ?? "card1");

  const savedContent: HomepageContent =
    parsed && (parsed as CourseDetailStoredData).content
      ? (parsed as CourseDetailStoredData).content
      : ((parsed as HomepageContent) ?? {});

  // Always ensure each course has default sections.
  for (const id of courseIds) {
    const d = buildDefaultDetailContent(id);
    for (const sectionKey of Object.keys(d)) {
      merged[sectionKey] = { ...d[sectionKey], ...savedContent[sectionKey] };
    }
  }

  // Keep any unknown sections (forward compatible)
  for (const sectionKey of Object.keys(savedContent)) {
    if (!merged[sectionKey]) merged[sectionKey] = savedContent[sectionKey];
  }

  // Ensure at least one default exists (in case courseIds empty)
  for (const sectionKey of Object.keys(defaults)) {
    if (!merged[sectionKey]) merged[sectionKey] = defaults[sectionKey];
  }

  return merged;
}

interface CourseDetailContentState {
  content: HomepageContent;
  courseIds: string[];
  isRemoteHydrated: boolean;
  isDirty: boolean;
  isSaving: boolean;
  lockTokenByCourse: Record<string, string | undefined>;
  lockExpiresAtByCourse: Record<string, string | undefined>;
  setCourseIds: (courseIds: string[]) => void;
  updateField: (sectionId: string, key: string, value: string) => void;
  deleteFields: (sectionId: string, keys: string[]) => void;
  acquireLock: (courseId: string) => Promise<void>;
  releaseLock: (courseId: string) => Promise<void>;
  saveContent: (courseId: string) => Promise<void>;
  resetSection: (sectionId: string) => void;
  resetCourse: (courseId: string) => void;
  hydrate: (courseId?: string) => Promise<void>;
  getSection: (sectionId: string) => SectionContent;
}

export const useCourseDetailContentStore = create<CourseDetailContentState>(
  (set, get) => ({
    content: buildDefaultDetailContent("card1"),
    courseIds: ["card1"],
    isRemoteHydrated: false,
    isDirty: false,
    isSaving: false,
    lockTokenByCourse: {},
    lockExpiresAtByCourse: {},

    setCourseIds: (courseIds) => {
      set((state) => ({
        courseIds,
        content: mergeCourseDetailsFromSaved(
          { content: state.content, courseIds: state.courseIds },
          courseIds
        ),
      }));
    },

    updateField: (sectionId, key, value) => {
      set((state) => ({
        content: {
          ...state.content,
          [sectionId]: { ...(state.content[sectionId] ?? {}), [key]: value },
        },
        isDirty: true,
      }));
    },

    deleteFields: (sectionId, keys) => {
      set((state) => {
        const current = { ...(state.content[sectionId] ?? {}) };
        for (const k of keys) delete current[k];
        return {
          content: { ...state.content, [sectionId]: current },
          isDirty: true,
        };
      });
    },

    acquireLock: async (courseId: string) => {
      const res = await fetch(`/api/course-details/${courseId}/lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.error ?? "Failed to acquire course lock");
      }
      set((state) => ({
        lockTokenByCourse: { ...state.lockTokenByCourse, [courseId]: body.lockToken },
        lockExpiresAtByCourse: { ...state.lockExpiresAtByCourse, [courseId]: body.expiresAt },
      }));
    },

    releaseLock: async (courseId: string) => {
      const token = get().lockTokenByCourse[courseId];
      if (!token) return;
      await fetch(`/api/course-details/${courseId}/unlock`, {
        method: "POST",
        headers: { "X-Course-Lock": token },
      }).catch(() => null);
      set((state) => {
        const nextTokens = { ...state.lockTokenByCourse };
        const nextExp = { ...state.lockExpiresAtByCourse };
        delete nextTokens[courseId];
        delete nextExp[courseId];
        return { lockTokenByCourse: nextTokens, lockExpiresAtByCourse: nextExp };
      });
    },

    saveContent: async (courseId: string) => {
      if (!get().isRemoteHydrated) return;
      set({ isSaving: true });
      try {
        // Ensure we hold a lock before saving.
        if (!get().lockTokenByCourse[courseId]) {
          await get().acquireLock(courseId);
        }
        const lockToken = get().lockTokenByCourse[courseId];
        if (!lockToken) throw new Error("Failed to acquire course lock");

        const { content } = get();
        const prefix = `${courseId}__`;
        const sections: Record<string, SectionContent> = {};
        for (const [sectionId, section] of Object.entries(content)) {
          if (sectionId.startsWith(prefix)) sections[sectionId] = section;
        }

        const res = await fetch(`/api/course-details/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Course-Lock": lockToken,
          },
          body: JSON.stringify({ sections }),
        });

        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body?.error ?? "Failed to save course details");
        }

        // Lock TTL may refresh on save.
        if (body?.expiresAt) {
          set((state) => ({
            lockExpiresAtByCourse: { ...state.lockExpiresAtByCourse, [courseId]: body.expiresAt },
          }));
        }

        set({ isDirty: false });
      } finally {
        set({ isSaving: false });
      }
    },

    resetSection: (sectionId: string) => {
      set((state) => {
        const courseId = sectionId.split("__")[0] || "card1";
        const defaults = buildDefaultDetailContent(courseId);
        const nextDefault = defaults[sectionId];
        if (!nextDefault) return state;
        return {
          content: { ...state.content, [sectionId]: nextDefault },
          isDirty: true,
        };
      });
    },

    resetCourse: (courseId: string) => {
      if (!get().isRemoteHydrated) return;
      set((state) => {
        const defaults = buildDefaultDetailContent(courseId);
        const next = { ...state.content };
        for (const key of Object.keys(defaults)) next[key] = defaults[key];
        return { content: next, isDirty: true };
      });
    },

    hydrate: async (courseId?: string) => {
      try {
        const ids = courseId ? [courseId] : get().courseIds;
        let nextContent: HomepageContent = { ...get().content };

        for (const id of ids) {
          const res = await fetch(`/api/course-details/${id}`, { cache: "no-store" });
          if (!res.ok) continue;
          const json = await res.json().catch(() => null);
          const sections = (json?.sections ?? {}) as HomepageContent;
          nextContent = mergeCourseDetailsFromSaved(
            { content: { ...nextContent, ...sections }, courseIds: get().courseIds },
            get().courseIds
          );
        }

        set({ content: nextContent, isDirty: false, isRemoteHydrated: true });
      } catch {
        set({ isRemoteHydrated: true });
      }
    },

    getSection: (sectionId) => get().content[sectionId] ?? EMPTY_SECTION_CONTENT,
  })
);

export { detailSectionId };

