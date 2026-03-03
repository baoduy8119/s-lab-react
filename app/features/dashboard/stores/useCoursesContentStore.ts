import { create } from "zustand";
import type {
  HomepageContent,
  SectionConfig,
  SectionContent,
} from "../types/content";

const STORAGE_KEY = "slab-courses-content";

// --- Course helpers ---

const COURSE_FIELDS: SectionConfig["fields"] = [
  { key: "name", label: "Name", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
  { key: "price", label: "Price", type: "text" },
  { key: "oldPrice", label: "Old Price", type: "text" },
  { key: "features", label: "Features (one per line)", type: "textarea" },
  { key: "availability", label: "Availability", type: "text" },
];

const NEW_COURSE_DEFAULTS: SectionContent = {
  name: "New Course",
  duration: "2-4 hours/class",
  price: "$0",
  oldPrice: "",
  features: "",
  availability: "",
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

const NEW_CARD_DEFAULTS: SectionContent = {
  title: "New Card",
  description: "",
  image: "",
  category: "",
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

const DEFAULT_COURSE_IDS = ["course1", "course2", "course3", "course4"];
const DEFAULT_CARD_IDS = ["card1", "card2", "card3"];

const defaultCardDesc =
  "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.";

export const defaultCoursesContent: HomepageContent = {
  courseHero: {
    title: "/The S-LAB\nProgrammes and\nCourses",
    subtitle: "Learning goes beyond textbooks",
    formTitle: "FILL FOR REGISTRATION",
    submitButton: "Send your answer",
    heroImage: "/images/courses/hero-bg.jpg",
  },
  courseListGeneral: {
    heading: "/Most choices courses.",
    description:
      "The course is transparent, covering every stage of your development. No hidden fees. No long-term contracts.",
    rating: "4.9 / 5",
    socialProof:
      "We've helped over 105+ people achieve their goals — you could be the next one.",
    registerBtn: "Register now",
  },
  course1: {
    name: "Operations & Execution Systems",
    duration: "2-4 hours/class",
    price: "$100",
    oldPrice: "$150",
    features: featurePlaceholder,
    availability: "Next available: Jan 18.2026",
  },
  course2: {
    name: "Marketing Essentials",
    duration: "3 hours/class",
    price: "$250",
    oldPrice: "$350",
    features: featurePlaceholder,
    availability: "Next available: Jun 10.2024",
  },
  course3: {
    name: "Decision Intelligence with Data & AI",
    duration: "2-4 hours/class",
    price: "$350",
    oldPrice: "$550",
    features: featurePlaceholder,
    availability: "Next available: Jan 20.2026",
  },
  course4: {
    name: "DePIN / AI / Infra Overview",
    duration: "3-5 hours/class",
    price: "$250",
    oldPrice: "$350",
    features: featurePlaceholder,
    availability: "Next available: Feb 1.2026",
  },
  card1: {
    title: "Marketing Essentials",
    description: defaultCardDesc,
    image: "/images/courses/mar-1.jpg",
    category: "Marketing Foundations",
  },
  card2: {
    title: "Business Model & Offer Design",
    description: defaultCardDesc,
    image: "/images/courses/mar-2.jpg",
    category: "Business Fundamentals",
  },
  card3: {
    title: "Customer & Market Insight",
    description: defaultCardDesc,
    image: "/images/courses/mar-3.jpg",
    category: "Advanced Marketing",
  },
};

// --- Store ---

interface StoredData {
  courseIds: string[];
  cardIds: string[];
  content: HomepageContent;
}

interface CoursesContentState {
  content: HomepageContent;
  courseIds: string[];
  cardIds: string[];
  isDirty: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => void;
  resetContent: () => void;
  resetSection: (sectionId: string) => void;
  addCourse: () => void;
  removeCourse: (courseId: string) => void;
  addCard: () => void;
  removeCard: (cardId: string) => void;
  hydrate: () => void;
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

    updateField: (sectionId, key, value) => {
      set((state) => ({
        content: {
          ...state.content,
          [sectionId]: { ...state.content[sectionId], [key]: value },
        },
        isDirty: true,
      }));
    },

    saveContent: () => {
      const { content, courseIds, cardIds } = get();
      if (typeof window !== "undefined") {
        const data: StoredData = { courseIds, cardIds, content };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      set({ isDirty: false });
    },

    resetContent: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      set({
        content: defaultCoursesContent,
        courseIds: DEFAULT_COURSE_IDS,
        cardIds: DEFAULT_CARD_IDS,
        isDirty: false,
      });
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

    hydrate: () => {
      if (typeof window === "undefined") return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw);

        let savedContent: HomepageContent;
        let savedCourseIds: string[];
        let savedCardIds: string[];

        if (parsed.courseIds && parsed.content) {
          savedContent = parsed.content as HomepageContent;
          savedCourseIds = parsed.courseIds as string[];
          savedCardIds = (parsed.cardIds as string[]) ?? DEFAULT_CARD_IDS;
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

        set({
          content: merged,
          courseIds: savedCourseIds,
          cardIds: savedCardIds,
          isDirty: false,
        });
      } catch {
        // ignore
      }
    },

    getSection: (sectionId) => get().content[sectionId] ?? {},
  })
);
