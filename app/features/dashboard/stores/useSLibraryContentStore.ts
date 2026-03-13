import { create } from "zustand";
import type {
  HomepageContent,
  SectionConfig,
  SectionContent,
} from "../types/content";

const STORAGE_KEY = "slab-slibrary-content";

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
    subtitle1: "Where Vision Meets Action",
    subtitle2: "in Business and Creativity",
    description1:
      "Our courses in business, marketing, and creativity are the launchpad for visionaries ready to challenge the status quo.",
    description2:
      "Transform your dreams into reality and carve your path in the ever-evolving landscape of industry and imagination.",
    cardLabel: "Marketing",
    cardLabel2: "Marketing Planning",
    cardLabel3: "",
    heroImage1: "/images/slib/marketing-hero.png",
    heroImage2: "/images/slib/marketing-planning-hero.jpg",
    heroImage3: "/images/slib/person-hero.png",
  },
  slibBestForYou: {
    heading: "/Best for you.",
    subtitle: "Suit you best",
    c1Title: "Marketing Planning",
    c1Instructor: "Kira Dinh",
    c1Duration: "20H",
    c1Documents: "15 documents",
    c1OrigPrice: "899.000",
    c1Price: "399.000",
    c1Image: "/images/slib/lib-card-1.jpg",
    c2Title: "Content Strategy",
    c2Instructor: "Sarah Lee",
    c2Duration: "18H",
    c2Documents: "12 documents",
    c2OrigPrice: "799.000",
    c2Price: "349.000",
    c2Image: "/images/slib/lib-card-4.jpg",
    c3Title: "Digital Marketing",
    c3Instructor: "John Smith",
    c3Duration: "25H",
    c3Documents: "20 documents",
    c3OrigPrice: "999.000",
    c3Price: "499.000",
    c3Image: "/images/slib/lib-card-2.png",
    c4Title: "Content Strategy",
    c4Instructor: "Sarah Lee",
    c4Duration: "18H",
    c4Documents: "12 documents",
    c4OrigPrice: "799.000",
    c4Price: "349.000",
    c4Image: "/images/slib/lib-card-3.jpg",
    c5Title: "Content Strategy",
    c5Instructor: "Sarah Lee",
    c5Duration: "18H",
    c5Documents: "12 documents",
    c5OrigPrice: "799.000",
    c5Price: "349.000",
    c5Image: "/images/slib/lib-card-5.jpg",
  },
  slibLibrarySystem: {
    heading: "/The S-Lab library system.",
    cat1Name: "Design and Media",
    cat1Image: "/images/slib/design-media.png",
    cat2Name: "Content Writing",
    cat2Image: "/images/slib/content-writing.png",
    cat3Name: "Data Analytics",
    cat3Image: "/images/slib/data-analytics.png",
    cat4Name: "Marketing Planning",
    cat4Image: "/images/slib/marketing-planning-lib.png",
    card1Title: "Data Analytics",
    card1Image: "/images/slib/data-analytics.png",
    card2Title: "Content Writing",
    card2Image: "/images/slib/content-writing.png",
    card3Title: "Marketing Planning",
    card3Image: "/images/slib/marketing-planning-lib.png",
    card4Title: "Design and Media",
    card4Image: "/images/slib/design-media.png",
    card5Title: "Logo/Illustration",
    card5Image: "/images/slib/lib-card-5.svg",
  },
  slibFaq: {
    heading: "/Frequently\nasked questions.",
    faqImage: "/images/slib/faq-image.png",
    q1: "How do I purchase a course on S-Lab?",
    a1: 'To purchase a course, simply navigate to the course catalog on the S-Lab website, select the course you\'re interested in, and click the "Buy Now" button. You\'ll be prompted to complete your payment information. Once the purchase is confirmed, you\'ll have immediate access to the course materials.',
    q2: "Can I preview a course before purchasing?",
    a2: "Yes, you can preview select course materials before making a purchase.",
    q3: "What payment methods are accepted?",
    a3: "We accept all major credit cards, PayPal, and bank transfers.",
    q4: "How long do I have access to a course after purchasing it?",
    a4: "You have lifetime access to all purchased courses.",
    q5: "How can I track my progress in a course?",
    a5: "Your progress is automatically tracked and displayed on your dashboard.",
    q6: "Can I interact with instructors or other students?",
    a6: "Yes, you can interact through our community forums and live Q&A sessions.",
    q7: "Are there any assessments or certifications upon completing a course?",
    a7: "Yes, most courses include assessments and provide certificates upon completion.",
    q8: "What should I do if I encounter technical issues with a course?",
    a8: "Please contact our support team at hello@theslab.agency for assistance.",
    q9: "How can I make the most out of the courses I enroll in?",
    a9: "Stay consistent, participate in discussions, complete all assignments, and apply what you learn.",
  },
};

interface SLibraryContentState {
  content: HomepageContent;
  isDirty: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => void;
  resetContent: () => void;
  resetSection: (sectionId: string) => void;
  hydrate: () => void;
  getSection: (sectionId: string) => SectionContent;
}

export const useSLibraryContentStore = create<SLibraryContentState>(
  (set, get) => ({
    content: defaultSLibraryContent,
    isDirty: false,

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

    saveContent: () => {
      const { content } = get();
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      }
      set({ isDirty: false });
    },

    resetContent: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      set({ content: defaultSLibraryContent, isDirty: false });
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

    hydrate: () => {
      if (typeof window === "undefined") return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as HomepageContent;
          const merged: HomepageContent = {};
          for (const key of Object.keys(defaultSLibraryContent)) {
            merged[key] = { ...defaultSLibraryContent[key], ...saved[key] };
          }
          set({ content: merged, isDirty: false });
        }
      } catch {
        // ignore parse errors
      }
    },

    getSection: (sectionId) => {
      return get().content[sectionId] ?? {};
    },
  })
);
