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

/** Resolves footer from dedicated `footer` row or legacy homepage / the-s-lab rows. */
export function mergeFooterFromSavedRows(
  footerRow: unknown,
  homepageRow: unknown,
  theSlabRow: unknown
): HomepageContent {
  const footerKey = footerRow as HomepageContent | null | undefined;
  const home = homepageRow as HomepageContent | null | undefined;
  const slab = theSlabRow as HomepageContent | null | undefined;

  if (footerKey?.footer) {
    return {
      footer: { ...defaultFooterContent.footer, ...footerKey.footer },
    };
  }

  const legacyFooter =
    (home?.footer as SectionContent | undefined) ??
    (slab?.slabFooter as SectionContent | undefined);

  if (legacyFooter) {
    return {
      footer: { ...defaultFooterContent.footer, ...legacyFooter },
    };
  }

  return defaultFooterContent;
}

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
      const [footerSaved, homeSaved, slabSaved] = await Promise.all([
        fetchContent<HomepageContent>(CONTENT_KEY),
        fetchContent<HomepageContent>("homepage"),
        fetchContent<HomepageContent>("the-s-lab"),
      ]);

      const hadDedicatedFooter = Boolean(footerSaved?.footer);
      const merged = mergeFooterFromSavedRows(footerSaved, homeSaved, slabSaved);
      set({ content: merged, isDirty: false });

      if (!hadDedicatedFooter) {
        const legacyFooter =
          (homeSaved?.footer as SectionContent | undefined) ??
          (slabSaved?.slabFooter as SectionContent | undefined);
        if (legacyFooter) {
          await saveContentToDb(CONTENT_KEY, merged);
        }
      }
    } catch {
      // fallback to defaults on network error
    }
  },

  getSection: (sectionId) => get().content[sectionId] ?? {},
}));

