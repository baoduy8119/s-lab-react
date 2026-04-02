export type ContentFieldType =
  | "text"
  | "textarea"
  | "image"
  | "select"
  | "multiselect"
  | "checkbox";

export interface ContentFieldConfig {
  key: string;
  label: string;
  type: ContentFieldType;
  options?: string[];
  /** When true, field is not split into EN / `_vi` keys (same as image fields). */
  localeShared?: boolean;
}

export interface SectionConfig {
  id: string;
  title: string;
  fields: ContentFieldConfig[];
}

export type SectionContent = Record<string, string>;
export type HomepageContent = Record<string, SectionContent>;
