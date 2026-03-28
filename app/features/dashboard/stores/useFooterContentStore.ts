import { fetchContent, saveContentToDb } from "@/app/lib/contentApi";
import { create } from "zustand";
import type { HomepageContent, SectionConfig, SectionContent } from "../types/content";

const CONTENT_KEY = "footer";

export const footerSections: SectionConfig[] = [
  {
    id: "footer",
    title: "Global Footer",
    fields: [
      { key: "newsletterHeading", label: "Newsletter Heading", type: "text" },
      { key: "newsletterSubtitle", label: "Newsletter Subtitle", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "yearTop", label: "Year Top", type: "text" },
      { key: "yearBottom", label: "Year Bottom", type: "text" },
      { key: "navLabel", label: "Navigation Label", type: "text" },
      { key: "navHome", label: "Navigation - Home", type: "text" },
      { key: "navTheSlab", label: "Navigation - The S-Lab", type: "text" },
      { key: "navCourse", label: "Navigation - Course", type: "text" },
      { key: "navBlog", label: "Navigation - Blog", type: "text" },
      { key: "navEvent", label: "Navigation - Event", type: "text" },
    ],
  },
];

export const defaultFooterContent: HomepageContent = {
  footer: {
    newsletterHeading: "/Stay in the loop.",
    newsletterHeading_vi: "/Cập nhật tin mới.",
    newsletterSubtitle: "Smart updates for smart people.",
    newsletterSubtitle_vi: "Thông tin thông minh cho người thông minh.",
    phone: "(+84) 935-979-353",
    phone_vi: "(+84) 935-979-353",
    email: "info@slab-edu.com",
    email_vi: "info@slab-edu.com",
    location: "Lorem ipsum Location is here. Danang",
    location_vi: "Lorem ipsum Địa chỉ tại đây. Đà Nẵng",
    description:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
    description_vi:
      "Chiếc balo vững chãi trên hành trình chinh phục kiến thức kinh doanh và kinh nghiệm thực tiễn",
    yearTop: "20©",
    yearTop_vi: "20©",
    yearBottom: "26",
    yearBottom_vi: "26",
    navLabel: "/Navigation",
    navLabel_vi: "/Điều hướng",
    navHome: "Home",
    navHome_vi: "Trang chủ",
    navTheSlab: "The S-Lab",
    navTheSlab_vi: "The S-Lab",
    navCourse: "Course",
    navCourse_vi: "Khóa học",
    navBlog: "Blog",
    navBlog_vi: "Blog",
    navEvent: "Event",
    navEvent_vi: "Sự kiện",
  },
};

interface FooterContentState {
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

export const useFooterContentStore = create<FooterContentState>((set, get) => ({
  content: defaultFooterContent,
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
      await saveContentToDb(CONTENT_KEY, defaultFooterContent);
      set({ content: defaultFooterContent, isDirty: false });
    } finally {
      set({ isSaving: false });
    }
  },

  resetSection: (sectionId) => {
    set((state) => ({
      content: {
        ...state.content,
        [sectionId]: defaultFooterContent[sectionId],
      },
      isDirty: true,
    }));
  },

  hydrate: async () => {
    try {
      const saved = await fetchContent<HomepageContent>(CONTENT_KEY);
      if (saved?.footer) {
        set({
          content: {
            footer: { ...defaultFooterContent.footer, ...saved.footer },
          },
          isDirty: false,
        });
        return;
      }

      // Back-compat: migrate footer content from older per-page storage
      // (homepage.footer or the-s-lab.slabFooter) if present.
      const [homeSaved, slabSaved] = await Promise.all([
        fetchContent<HomepageContent>("homepage"),
        fetchContent<HomepageContent>("the-s-lab"),
      ]);

      const legacyFooter =
        (homeSaved?.footer as SectionContent | undefined) ??
        (slabSaved?.slabFooter as SectionContent | undefined);

      if (legacyFooter) {
        const migrated: HomepageContent = {
          footer: { ...defaultFooterContent.footer, ...legacyFooter },
        };
        set({ content: migrated, isDirty: false });
        await saveContentToDb(CONTENT_KEY, migrated);
      }
    } catch {
      // fallback to defaults on network error
    }
  },

  getSection: (sectionId) => get().content[sectionId] ?? {},
}));

