import { create } from "zustand";
import type {
  HomepageContent,
  SectionConfig,
  SectionContent,
} from "../types/content";

const STORAGE_KEY = "slab-homepage-content";

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
      { key: "item1Title", label: "Item 1 – Title", type: "text" },
      { key: "item1Profession", label: "Item 1 – Profession", type: "text" },
      {
        key: "item1Description",
        label: "Item 1 – Description (one per line)",
        type: "textarea",
      },
      { key: "item1Image", label: "Item 1 – Image", type: "image" },
      { key: "item2Title", label: "Item 2 – Title", type: "text" },
      { key: "item2Profession", label: "Item 2 – Profession", type: "text" },
      {
        key: "item2Description",
        label: "Item 2 – Description (one per line)",
        type: "textarea",
      },
      { key: "item2Image", label: "Item 2 – Image", type: "image" },
      { key: "item3Title", label: "Item 3 – Title", type: "text" },
      { key: "item3Profession", label: "Item 3 – Profession", type: "text" },
      {
        key: "item3Description",
        label: "Item 3 – Description (one per line)",
        type: "textarea",
      },
      { key: "item3Image", label: "Item 3 – Image", type: "image" },
      { key: "item4Title", label: "Item 4 – Title", type: "text" },
      { key: "item4Profession", label: "Item 4 – Profession", type: "text" },
      {
        key: "item4Description",
        label: "Item 4 – Description (one per line)",
        type: "textarea",
      },
      { key: "item4Image", label: "Item 4 – Image", type: "image" },
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
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
    ],
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
  {
    id: "footer",
    title: "Footer",
    fields: [
      {
        key: "newsletterHeading",
        label: "Newsletter Heading",
        type: "text",
      },
      {
        key: "newsletterSubtitle",
        label: "Newsletter Subtitle",
        type: "text",
      },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "description", label: "Footer Description", type: "textarea" },
    ],
  },
];

export const defaultContent: HomepageContent = {
  hero: {
    heading: "THE S-LΛB",
    tagline:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
    buttonPrimary: "Start coaching now",
    buttonSecondary: "See our work",
    yellowBadge: "Theory is where you practice",
    rating: "4.9 / 5",
    feedbackText:
      "We have helped over 950+ students achieve their goals — you could be the next one.",
    heroImage: "/images/hero-image-76f7dd.png",
  },
  section2: {
    sectionTitle: "What Makes The Slab Different",
    feature1Title: "Structured curriculum, easy to follow",
    feature1Desc:
      "Clear stages, objectives, and checklists—so you always know what to focus on next.",
    feature2Title: "Flexible learning, with a consistent rhythm",
    feature2Desc:
      "Self-paced materials combined with scheduled guidance and reviews, so you stay on track without feeling overwhelmed.",
    feature3Title: "Outcome-driven by design",
    feature3Desc:
      "Every module produces tangible deliverables—plans, systems, or assets you can apply immediately.",
    feature4Title: "Project-first execution",
    feature4Desc:
      "You learn by building and refining real work, not by consuming theory alone.",
    feature5Title: "High-touch advisor feedback",
    feature5Desc:
      "Targeted reviews and actionable improvements to steadily raise the quality of your output.",
    feature6Title: "AI-enabled workflows + systems thinking",
    feature6Desc:
      "Practical AI integration to speed up research and iteration, supported by repeatable frameworks—not isolated tactics.",
  },
  whoSupports: {
    heading: "Who The Slab Supports",
    item1Title: "/Students",
    item1Profession: "High School & University",
    item1Description:
      "Build strong foundations and a portfolio you can show.\nGuided learning path + clear track selection\nProject-based assignments with mentor feedback",
    item1Image: "/images/home-who-supports/students.png",
    item2Title: "/Early-Career",
    item2Profession: "Junior & Mid-level",
    item2Description:
      "Accelerate your career growth with practical skills.\nReal-world case studies + industry mentorship\nNetworking opportunities with peers and experts",
    item2Image: "/images/home-who-supports/early-career.png",
    item3Title: "/Professionals",
    item3Profession: "Senior & Executives",
    item3Description:
      "Deepen your expertise and stay ahead of trends.\nAdvanced workshops + strategic frameworks\nPeer-to-peer learning in executive cohorts",
    item3Image: "/images/home-who-supports/professionals.png",
    item4Title: "/Teams & Companies",
    item4Profession: "Corporate Training",
    item4Description:
      "Upskill your entire team with customized programs.\nTailored curriculum + progress tracking\nScalable learning solutions for organizations",
    item4Image: "/images/home-who-supports/teams.png",
  },
  testimonials: {
    heading: "/Our Testimonials.",
    subtitle:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    t1Text:
      "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    t1Name: "Lora K.",
    t1Role: "Student, InnovateHealth",
    t1Image: "/images/avatar.png",
    t2Text:
      "Working with The S-Lab was a game-changer. Their strategic insights helping us navigate complex market shifts with confidence gave us a clear competitive advantage.",
    t2Name: "Michael C.",
    t2Role: "Founder, TechFlow",
    t2Image: "/images/avatar.png",
    t3Text:
      "They don't just execute; they think. The team challenged our assumptions and delivered a product that exceeded our expectations in every measurable way.",
    t3Name: "Sarah J.",
    t3Role: "Marketing Director, OmniGroup",
    t3Image: "/images/avatar.png",
  },
  partners: {
    heading: "The S-Lab's Partners",
  },
  articles: {
    heading: "/More articles.",
    a1Title: "How integration drives success",
    a1Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a1Date: "May 29, 2026",
    a1Image: "/images/blogs/blog1.jpg",
    a2Title: "How integration drives success",
    a2Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a2Date: "May 29, 2026",
    a2Image: "/images/blogs/blog2.jpg",
    a3Title: "How integration drives success",
    a3Excerpt:
      "Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    a3Date: "May 29, 2026",
    a3Image: "/images/blogs/blog3.jpg",
  },
  footer: {
    newsletterHeading: "/Stay in the loop.",
    newsletterSubtitle: "Smart updates for smart people.",
    phone: "(312) 555-2468",
    email: "hello@theslab.agency",
    location: "Lorem ipsum Location is here. Danang",
    description:
      "A sturdy backpack on your journey to conquer business knowledge and practical experience",
  },
};

interface HomeContentState {
  content: HomepageContent;
  isDirty: boolean;
  updateField: (sectionId: string, key: string, value: string) => void;
  saveContent: () => void;
  resetContent: () => void;
  resetSection: (sectionId: string) => void;
  hydrate: () => void;
  getSection: (sectionId: string) => SectionContent;
}

export const useHomeContentStore = create<HomeContentState>((set, get) => ({
  content: defaultContent,
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
    set({ content: defaultContent, isDirty: false });
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

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as HomepageContent;
        const merged: HomepageContent = {};
        for (const key of Object.keys(defaultContent)) {
          merged[key] = { ...defaultContent[key], ...saved[key] };
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
}));
