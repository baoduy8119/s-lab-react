export type ContentFieldType = "text" | "textarea" | "image" | "select";

export interface ContentFieldConfig {
  key: string;
  label: string;
  type: ContentFieldType;
  options?: string[];
}

export interface SectionConfig {
  id: string;
  title: string;
  fields: ContentFieldConfig[];
}

export type SectionContent = Record<string, string>;
export type HomepageContent = Record<string, SectionContent>;
