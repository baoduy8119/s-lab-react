import { fetchContent, saveContentToDb, setContentMergeBase } from "@/app/lib/contentApi";
import { create } from "zustand";
import type { HomepageContent, SectionConfig, SectionContent } from "../types/content";

const CONTENT_KEY = "the-s-lab";

const EMPTY_SECTION_CONTENT = Object.freeze({}) as SectionContent;

export const theSlabSections: SectionConfig[] = [
  {
    id: "slabHero",
    title: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "p1Prefix", label: "Paragraph 1 - Prefix", type: "text" },
      { key: "p1Highlight1", label: "Paragraph 1 - Highlight 1", type: "text" },
      { key: "p1Highlight2", label: "Paragraph 1 - Highlight 2", type: "text" },
      { key: "p1Suffix", label: "Paragraph 1 - Suffix", type: "text" },
      { key: "p2Highlight1", label: "Paragraph 2 - Highlight 1", type: "text" },
      { key: "p2Middle", label: "Paragraph 2 - Middle", type: "text" },
      { key: "p2Highlight2", label: "Paragraph 2 - Highlight 2", type: "text" },
      { key: "p2Suffix", label: "Paragraph 2 - Suffix", type: "text" },
      { key: "p3Prefix", label: "Paragraph 3 - Prefix", type: "text" },
      { key: "p3Highlight1", label: "Paragraph 3 - Highlight 1", type: "text" },
      { key: "p3Highlight2", label: "Paragraph 3 - Highlight 2", type: "text" },
      { key: "p3Highlight3", label: "Paragraph 3 - Highlight 3", type: "text" },
      { key: "p3Suffix", label: "Paragraph 3 - Suffix", type: "text" },
      { key: "bgImageTop", label: "Background Top Image", type: "image" },
      { key: "bgImageLeft", label: "Background Left Image", type: "image" },
    ],
  },
  {
    id: "slabLimitlessDesire",
    title: "Limitless Desire",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "item1Title", label: "Item 1 - Title", type: "text" },
      { key: "item1Subtitle", label: "Item 1 - Subtitle", type: "text" },
      { key: "item1Description", label: "Item 1 - Description", type: "textarea" },
      { key: "item1Image1", label: "Item 1 - Image 1", type: "image" },
      { key: "item1Image2", label: "Item 1 - Image 2", type: "image" },
      { key: "item1Image3", label: "Item 1 - Image 3", type: "image" },
      { key: "item2Title", label: "Item 2 - Title", type: "text" },
      { key: "item2Subtitle", label: "Item 2 - Subtitle", type: "text" },
      { key: "item2Description", label: "Item 2 - Description", type: "textarea" },
      { key: "item2Image1", label: "Item 2 - Image 1", type: "image" },
      { key: "item2Image2", label: "Item 2 - Image 2", type: "image" },
      { key: "item2Image3", label: "Item 2 - Image 3", type: "image" },
      { key: "item3Title", label: "Item 3 - Title", type: "text" },
      { key: "item3Subtitle", label: "Item 3 - Subtitle", type: "text" },
      { key: "item3Description", label: "Item 3 - Description", type: "textarea" },
      { key: "item3Image1", label: "Item 3 - Image 1", type: "image" },
      { key: "item3Image2", label: "Item 3 - Image 2", type: "image" },
      { key: "item3Image3", label: "Item 3 - Image 3", type: "image" },
    ],
  },
  {
    id: "slabKeyActivities",
    title: "Key Activities",
    fields: [
      { key: "titleDesktop", label: "Desktop Title", type: "text" },
      { key: "titleMobile", label: "Mobile Title", type: "text" },
      { key: "joinButtonText", label: "Join Button Text", type: "text" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "patternImage", label: "Pattern Image", type: "image" },
      { key: "item1Title", label: "Item 1 - Title", type: "text" },
      { key: "item1Description", label: "Item 1 - Description", type: "textarea" },
      { key: "item2Title", label: "Item 2 - Title", type: "text" },
      { key: "item2Description", label: "Item 2 - Description", type: "textarea" },
      { key: "item3Title", label: "Item 3 - Title", type: "text" },
      { key: "item3Description", label: "Item 3 - Description", type: "textarea" },
      { key: "item4Title", label: "Item 4 - Title", type: "text" },
      { key: "item4Description", label: "Item 4 - Description", type: "textarea" },
    ],
  },
  {
    id: "slabTrainers",
    title: "Trainers",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "text" },
      { key: "t1Name", label: "Trainer 1 - Name", type: "text" },
      { key: "t1Role", label: "Trainer 1 - Role", type: "text" },
      { key: "t1Bio", label: "Trainer 1 - Bio", type: "textarea" },
      { key: "t1Image", label: "Trainer 1 - Image", type: "image" },
      { key: "t2Name", label: "Trainer 2 - Name", type: "text" },
      { key: "t2Role", label: "Trainer 2 - Role", type: "text" },
      { key: "t2Bio", label: "Trainer 2 - Bio", type: "textarea" },
      { key: "t2Image", label: "Trainer 2 - Image", type: "image" },
      { key: "t3Name", label: "Trainer 3 - Name", type: "text" },
      { key: "t3Role", label: "Trainer 3 - Role", type: "text" },
      { key: "t3Bio", label: "Trainer 3 - Bio", type: "textarea" },
      { key: "t3Image", label: "Trainer 3 - Image", type: "image" },
      { key: "t4Name", label: "Trainer 4 - Name", type: "text" },
      { key: "t4Role", label: "Trainer 4 - Role", type: "text" },
      { key: "t4Bio", label: "Trainer 4 - Bio", type: "textarea" },
      { key: "t4Image", label: "Trainer 4 - Image", type: "image" },
    ],
  },
  {
    id: "slabAdvisors",
    title: "Advisors Credentials",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
      { key: "item1Title", label: "Item 1 - Title", type: "text" },
      { key: "item1Description", label: "Item 1 - Description", type: "textarea" },
      { key: "item2Title", label: "Item 2 - Title", type: "text" },
      { key: "item2Description", label: "Item 2 - Description", type: "textarea" },
      { key: "item3Title", label: "Item 3 - Title", type: "text" },
      { key: "item3Description", label: "Item 3 - Description", type: "textarea" },
      { key: "item4Title", label: "Item 4 - Title", type: "text" },
      { key: "item4Description", label: "Item 4 - Description", type: "textarea" },
      { key: "item5Title", label: "Item 5 - Title", type: "text" },
      { key: "item5Description", label: "Item 5 - Description", type: "textarea" },
    ],
  },
  {
    id: "slabCtaBanner",
    title: "CTA Banner",
    fields: [
      { key: "mainTextPrefix", label: "Main Text Prefix", type: "text" },
      { key: "mainTextHighlight", label: "Main Text Highlight", type: "text" },
      { key: "secondaryPrefix", label: "Secondary Prefix", type: "text" },
      { key: "secondaryHighlight", label: "Secondary Highlight", type: "text" },
      { key: "secondarySuffix", label: "Secondary Suffix", type: "text" },
      { key: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { key: "secondaryLinkText", label: "Secondary Link Text", type: "text" },
    ],
  },
];

export const defaultTheSlabContent: HomepageContent = {
  slabHero: {
    title: "/About THE S-LAB.",
    title_vi: "/Về THE S-LAB.",
    p1Prefix: "Where",
    p1Prefix_vi: "Nơi",
    p1Highlight1: "professionals build",
    p1Highlight1_vi: "chuyên gia tạo nên",
    p1Highlight2: "solutions",
    p1Highlight2_vi: "giải pháp",
    p1Suffix: "for real work.",
    p1Suffix_vi: "cho công việc thực tế.",
    p2Highlight1: "Bridging",
    p2Highlight1_vi: "Kết nối",
    p2Middle: "real problems and",
    p2Middle_vi: "vấn đề thực tế và",
    p2Highlight2: "execution",
    p2Highlight2_vi: "thực thi",
    p2Suffix: "at S-Lab",
    p2Suffix_vi: "tại S-Lab",
    p3Prefix: "Turning learning",
    p3Prefix_vi: "Biến việc học",
    p3Highlight1: "into",
    p3Highlight1_vi: "thành",
    p3Highlight2: "action",
    p3Highlight2_vi: "hành động",
    p3Highlight3: "through",
    p3Highlight3_vi: "thông qua",
    p3Suffix: "real project.",
    p3Suffix_vi: "dự án thực tế.",
    bgImageTop: "/images/slab/bg-image-top-7c576e.png",
    bgImageLeft: "/images/slab/bg-image-left-4bf67d.png",
  },
  slabLimitlessDesire: {
    sectionTitle: "/We work for the Limitless Desire.",
    sectionTitle_vi: "/Chúng tôi vì khát vọng không giới hạn.",
    item1Title: "/Our Desire",
    item1Title_vi: "/Khát vọng của chúng tôi",
    item1Subtitle: "We work for the Limitless Desire",
    item1Subtitle_vi: "Chúng tôi vì khát vọng không giới hạn",
    item1Description:
      "The S-LAB is where theory and practice unite to empower marketers and businessmen in their pursuit of real-world success. We serve as a dynamic platform for hands-on learning, fostering collaboration among students, professionals, businesses, and promoting the harmonious coexistence of education, innovation, practical experience.",
    item1Description_vi:
      "The S-LAB là nơi lý thuyết và thực hành kết hợp để trao quyền cho marketer và doanh nhân trên hành trình thành công thực tế. Chúng tôi là nền tảng học tập thực chiến, thúc đẩy cộng tác giữa sinh viên, chuyên gia và doanh nghiệp, đồng thời nuôi dưỡng sự hòa hợp giữa giáo dục, đổi mới và trải nghiệm thực tiễn.",
    item1Image1: "/images/slab/desire-img-1.png",
    item1Image2: "/images/slab/desire-img-2.png",
    item1Image3: "/images/slab/desire-img-3.png",
    item2Title: "/Our Mission",
    item2Title_vi: "/Sứ mệnh của chúng tôi",
    item2Subtitle: "Empowering the Next Generation",
    item2Subtitle_vi: "Trao quyền cho thế hệ tiếp theo",
    item2Description:
      "Our mission is to bridge the gap between academic knowledge and real-world application. We provide hands-on training, mentorship, and resources to help individuals and businesses thrive in today's competitive landscape.",
    item2Description_vi:
      "Sứ mệnh của chúng tôi là thu hẹp khoảng cách giữa kiến thức học thuật và ứng dụng thực tế. Chúng tôi cung cấp đào tạo thực hành, cố vấn và nguồn lực để giúp cá nhân và doanh nghiệp phát triển trong môi trường cạnh tranh ngày nay.",
    item2Image1: "/images/slab/desire-img-1.png",
    item2Image2: "/images/slab/desire-img-2.png",
    item2Image3: "/images/slab/desire-img-3.png",
    item3Title: "/Our Vision",
    item3Title_vi: "/Tầm nhìn của chúng tôi",
    item3Subtitle: "Building a Thriving Community",
    item3Subtitle_vi: "Xây dựng cộng đồng phát triển mạnh mẽ",
    item3Description:
      "We envision a world where learning is accessible, practical, and transformative. Through our programs, we aim to create a community of skilled professionals who drive innovation and growth in their respective fields.",
    item3Description_vi:
      "Chúng tôi hướng tới một thế giới nơi việc học dễ tiếp cận, thực tiễn và tạo chuyển đổi. Thông qua các chương trình, chúng tôi mong muốn xây dựng cộng đồng chuyên gia lành nghề thúc đẩy đổi mới và tăng trưởng trong lĩnh vực của họ.",
    item3Image1: "/images/slab/desire-img-1.png",
    item3Image2: "/images/slab/desire-img-2.png",
    item3Image3: "/images/slab/desire-img-3.png",
  },
  slabKeyActivities: {
    titleDesktop: "Our Key Activities",
    titleDesktop_vi: "Hoat dong trong tam",
    titleMobile: "/Our Key Activities.",
    titleMobile_vi: "/Hoat dong trong tam.",
    joinButtonText: "Join us now",
    joinButtonText_vi: "Tham gia ngay",
    backgroundImage: "/images/slab/key-activities-bg.png",
    patternImage: "/images/slab/our-key-frame-16.png",
    item1Title: "Business and Marketing Courses:",
    item1Title_vi: "Khoa hoc Kinh doanh va Marketing:",
    item1Description:
      "Explore our comprehensive courses designed to enhance your business and marketing skills, led by industry experts.",
    item1Description_vi:
      "Kham pha cac khoa hoc toan dien duoc thiet ke de nang cao ky nang kinh doanh va marketing cua ban, duoc dan dat boi cac chuyen gia trong nganh.",
    item2Title: "Valuable Events",
    item2Title_vi: "Su kien gia tri",
    item2Description:
      "Join our exclusive events tailored to businessmen, offering networking opportunities, knowledge sharing, and insights.",
    item2Description_vi:
      "Tham gia cac su kien doc quyen danh cho doanh nhan, mang den co hoi ket noi, chia se kien thuc va thong tin gia tri.",
    item3Title: "Insightful Market Content",
    item3Title_vi: "Noi dung thi truong chuyen sau",
    item3Description:
      "Stay updated with our informative content, providing valuable market insights and new trends.",
    item3Description_vi:
      "Cap nhat lien tuc voi noi dung huu ich, cung cap goc nhin gia tri ve thi truong va xu huong moi.",
    item4Title: "Web 3 Industry Community",
    item4Title_vi: "Cong dong nganh Web3",
    item4Description:
      "Be a part of our thriving community dedicated to building and advancing the web 3 industry in Central Vietnam.",
    item4Description_vi:
      "Tro thanh mot phan cua cong dong nang dong chung tay xay dung va phat trien nganh Web3 tai mien Trung Viet Nam.",
  },
  slabTrainers: {
    title: "Our Trainers: The Heart of The S-Lab",
    title_vi: "Doi ngu trainer: trai tim cua The S-Lab",
    subtitle: "Who brings value to leverage the talents",
    subtitle_vi: "Nhung nguoi tao gia tri de khai phong tai nang",
    t1Name: "/Alex Morgan",
    t1Name_vi: "/Alex Morgan",
    t1Role: "Technical Lead",
    t1Role_vi: "Technical Lead",
    t1Bio: "Having completed a degree in philosophy, Mike Trow started out in fashion working on Bizarre magazine as photo editor and photographer. He has been the picture editor of British Vogue 2005-2018 - responsible for commissioning, production and art direction of most of the portraits, reportage and house shoots of the magazine.",
    t1Bio_vi:
      "Sau khi tot nghiep nganh triet hoc, Mike Trow bat dau trong linh vuc thoi trang voi vai tro bien tap anh va nhiep anh cho tap chi Bizarre. Anh tung la picture editor cua British Vogue giai doan 2005-2018, phu trach dat bai, san xuat va dinh huong nghe thuat cho phan lon bo anh chan dung, phong su va chup tai studio.",
    t1Image: "/images/slab/trainer-1.png",
    t2Name: "/Alex Morgan",
    t2Name_vi: "/Alex Morgan",
    t2Role: "Technical Lead",
    t2Role_vi: "Technical Lead",
    t2Bio: "A seasoned marketing strategist with over 10 years of experience in digital transformation and brand development.",
    t2Bio_vi:
      "Chuyen gia chien luoc marketing voi hon 10 nam kinh nghiem trong chuyen doi so va phat trien thuong hieu.",
    t2Image: "/images/slab/trainer-2.png",
    t3Name: "/Alex Morgan",
    t3Name_vi: "/Alex Morgan",
    t3Role: "Technical Lead",
    t3Role_vi: "Technical Lead",
    t3Bio: "Specializing in business analytics and data-driven decision making, bringing innovative solutions to complex challenges.",
    t3Bio_vi:
      "Chuyen ve phan tich kinh doanh va ra quyet dinh dua tren du lieu, mang den cac giai phap dot pha cho bai toan phuc tap.",
    t3Image: "/images/slab/trainer-3.png",
    t4Name: "/Alex Morgan",
    t4Name_vi: "/Alex Morgan",
    t4Role: "Technical Lead",
    t4Role_vi: "Technical Lead",
    t4Bio: "Expert in Web3 technologies and blockchain implementation, leading the charge in decentralized business models.",
    t4Bio_vi:
      "Chuyen gia cong nghe Web3 va trien khai blockchain, tien phong trong mo hinh kinh doanh phi tap trung.",
    t4Image: "/images/slab/trainer-4.png",
  },
  slabAdvisors: {
    title: "/Advisors' Credentials",
    title_vi: "/Nang luc doi ngu co van",
    subtitle:
      "Each phase is handled by specialists who work together seamlessly, ensuring nothing falls through the cracks.",
    subtitle_vi:
      "Moi giai doan duoc phu trach boi chuyen gia phoi hop nhip nhang, dam bao khong bo sot bat ky chi tiet nao.",
    item1Title: "Extensive Business Background.",
    item1Title_vi: "Nen tang kinh doanh chuyen sau.",
    item1Description:
      "Our trainers boast extensive experience in the business realm. They have been at the forefront of various industries, bringing a wealth of knowledge to the classroom.",
    item1Description_vi:
      "Doi ngu trainer so huu kinh nghiem sau rong trong kinh doanh, tung tien phong o nhieu linh vuc va mang den kho tri thuc phong phu cho nguoi hoc.",
    item2Title: "Theoretical Expertise.",
    item2Title_vi: "Nen tang ly thuyet vung chac.",
    item2Description:
      "Beyond their practical know-how, our trainers have a solid foundation in business theory, ensuring that they can provide learners with a well-rounded education.",
    item2Description_vi:
      "Khong chi gioi thuc hanh, trainer con co nen tang ly thuyet kinh doanh vung chac, dam bao mang den trai nghiem hoc tap toan dien.",
    item3Title: "Real-World Insights.",
    item3Title_vi: "Goc nhin thuc tien.",
    item3Description:
      "What sets our trainers apart is their ability to translate theory into practice. They use real case studies to mentor and coach learners, helping them apply their knowledge effectively.",
    item3Description_vi:
      "Diem khac biet nam o kha nang chuyen hoa ly thuyet thanh hanh dong. Trainer su dung case study thuc te de huong dan nguoi hoc ap dung kien thuc hieu qua.",
    item4Title: "Mentors and Guides.",
    item4Title_vi: "Nguoi dong hanh va dinh huong.",
    item4Description:
      "Our trainers don't just deliver lessons; they provide personalized guidance and mentorship. They're here to support learners every step of the way, making sure they understand how to navigate the business landscape.",
    item4Description_vi:
      "Trainer khong chi day hoc ma con dong hanh va co van theo tung ca nhan, ho tro nguoi hoc tung buoc de hieu cach van hanh trong moi truong kinh doanh.",
    item5Title: "Practical Learning.",
    item5Title_vi: "Hoc tap thuc chien.",
    item5Description:
      "With our trainers, learners don't just gain theoretical knowledge. They acquire practical skills and insights that can be immediately applied in the business world.",
    item5Description_vi:
      "Nguoi hoc khong chi tiep thu ly thuyet ma con nhan duoc ky nang va goc nhin co the ap dung ngay vao cong viec thuc te.",
  },
  slabCtaBanner: {
    mainTextPrefix: "At The S-Lab, learning goes",
    mainTextPrefix_vi: "Tai The S-Lab, viec hoc vuot xa",
    mainTextHighlight: "beyond textbooks.",
    mainTextHighlight_vi: "giao trinh.",
    secondaryPrefix: "Join us at The S-Lab to",
    secondaryPrefix_vi: "Dong hanh cung The S-Lab de",
    secondaryHighlight: "gain the knowledge and mentorship",
    secondaryHighlight_vi: "nhan duoc kien thuc va su co van",
    secondarySuffix: "you need to succeed in the business world.",
    secondarySuffix_vi: "ban can de thanh cong trong moi truong kinh doanh.",
    primaryButtonText: "Our courses",
    primaryButtonText_vi: "Khoa hoc cua chung toi",
    secondaryLinkText: "Meet the minds behind your success",
    secondaryLinkText_vi: "Gap go nhung bo oc tao nen thanh cong cua ban",
  },
};

export function mergeTheSlabFromSaved(
  saved: HomepageContent | null | undefined
): HomepageContent {
  const merged: HomepageContent = {};
  for (const key of Object.keys(defaultTheSlabContent)) {
    merged[key] = { ...defaultTheSlabContent[key], ...saved?.[key] };
  }
  return merged;
}

interface TheSlabContentState {
  content: HomepageContent;
  isRemoteHydrated: boolean;
  isDirty: boolean;
  isSaving: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => Promise<void>;
  resetContent: () => Promise<void>;
  resetSection: (sectionId: string) => void;
  hydrate: () => Promise<void>;
  getSection: (sectionId: string) => SectionContent;
}

export const useTheSlabContentStore = create<TheSlabContentState>((set, get) => ({
  content: defaultTheSlabContent,
  isRemoteHydrated: false,
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
    if (!get().isRemoteHydrated) return;
    const { content } = get();
    set({ isSaving: true });
    try {
      const persisted = await saveContentToDb(CONTENT_KEY, content);
      set({ content: persisted, isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetContent: async () => {
    if (!get().isRemoteHydrated) return;
    set({ isSaving: true });
    try {
      const persisted = await saveContentToDb(CONTENT_KEY, defaultTheSlabContent);
      set({ content: persisted, isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetSection: (sectionId) => {
    set((state) => ({
      content: {
        ...state.content,
        [sectionId]: defaultTheSlabContent[sectionId],
      },
      isDirty: true,
    }));
  },

  hydrate: async () => {
    try {
      const saved = await fetchContent<HomepageContent>(CONTENT_KEY);
      const content = mergeTheSlabFromSaved(saved ?? undefined);
      setContentMergeBase(CONTENT_KEY, content);
      set({ content, isDirty: false, isRemoteHydrated: true });
    } catch {
      set({ isRemoteHydrated: true });
    }
  },

  getSection: (sectionId) => {
    return get().content[sectionId] ?? EMPTY_SECTION_CONTENT;
  },
}));
