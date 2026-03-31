import type { Locale } from "../stores/useLanguageStore";

const translations = {
  en: {
    brand: "THE S-LAB",
    brandSub: "Content Dashboard",
    signOut: "Sign out",
    loading: "Loading...",

    navHomepage: "Homepage",
    navTheSlab: "The S-Lab",
    navSLibrary: "S-Library",
    navCourses: "Courses",
    navFooter: "Footer",

    unsavedChanges: "Unsaved changes",
    resetToDefaults: "Reset to defaults",
    saving: "Saving…",
    saveChanges: "Save changes",

    saveSuccess: "Content saved successfully!",
    saveFail: "Failed to save. Please try again.",
    resetConfirm: "Reset all content to defaults? This cannot be undone.",
    resetSuccess: "Content reset to defaults",
    resetFail: "Failed to reset. Please try again.",

    pageHomepage: "Homepage Content",
    pageTheSlab: "The S-Lab Content",
    pageSLibrary: "S-Library Content",
    pageCourses: "Courses Content",
    pageFooter: "Footer Content",

    fields: "fields",
    reset: "Reset",
    resetSectionConfirm: (title: string) => `Reset "${title}" to defaults?`,
    upload: "Upload",
    imagePlaceholder: "/images/...",

    coursesCount: (n: number) => `Courses (${n})`,
    addCourse: "Add Course",
    cardsCount: (n: number) => `Marketing Cards (${n})`,
    addCard: "Add Card",
    remove: "Remove",
    removeCourseConfirm: (name: string) =>
      `Remove "${name}"? This cannot be undone.`,
    removeCardConfirm: (name: string) =>
      `Remove "${name}"? This cannot be undone.`,
    atLeastOneCourse: "At least one course is required",
    atLeastOneCard: "At least one card is required",
    removeTooltip: (title: string) => `Remove ${title}`,
  },

  vi: {
    brand: "THE S-LAB",
    brandSub: "Bảng điều khiển nội dung",
    signOut: "Đăng xuất",
    loading: "Đang tải...",

    navHomepage: "Trang chủ",
    navTheSlab: "The S-Lab",
    navSLibrary: "Thư viện S",
    navCourses: "Khóa học",
    navFooter: "Footer",

    unsavedChanges: "Chưa lưu thay đổi",
    resetToDefaults: "Đặt lại mặc định",
    saving: "Đang lưu…",
    saveChanges: "Lưu thay đổi",

    saveSuccess: "Nội dung đã được lưu thành công!",
    saveFail: "Lưu thất bại. Vui lòng thử lại.",
    resetConfirm:
      "Đặt lại tất cả nội dung về mặc định? Hành động này không thể hoàn tác.",
    resetSuccess: "Nội dung đã được đặt lại mặc định",
    resetFail: "Đặt lại thất bại. Vui lòng thử lại.",

    pageHomepage: "Nội dung Trang chủ",
    pageTheSlab: "Nội dung The S-Lab",
    pageSLibrary: "Nội dung Thư viện S",
    pageCourses: "Nội dung Khóa học",
    pageFooter: "Nội dung Footer",

    fields: "trường",
    reset: "Đặt lại",
    resetSectionConfirm: (title: string) =>
      `Đặt lại "${title}" về mặc định?`,
    upload: "Tải lên",
    imagePlaceholder: "/images/...",

    coursesCount: (n: number) => `Khóa học (${n})`,
    addCourse: "Thêm khóa học",
    cardsCount: (n: number) => `Thẻ tiếp thị (${n})`,
    addCard: "Thêm thẻ",
    remove: "Xóa",
    removeCourseConfirm: (name: string) =>
      `Xóa "${name}"? Hành động này không thể hoàn tác.`,
    removeCardConfirm: (name: string) =>
      `Xóa "${name}"? Hành động này không thể hoàn tác.`,
    atLeastOneCourse: "Cần ít nhất một khóa học",
    atLeastOneCard: "Cần ít nhất một thẻ",
    removeTooltip: (title: string) => `Xóa ${title}`,
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string | ((...args: never[]) => string) {
  return translations[locale][key];
}

export function useTranslations(locale: Locale) {
  return translations[locale];
}

export default translations;
