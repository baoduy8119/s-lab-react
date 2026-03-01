"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import type { SectionConfig, SectionContent } from "../types/content";
import styles from "./SectionEditor.module.scss";

interface SectionEditorProps {
  config: SectionConfig;
  content: SectionContent;
  updateField: (sectionId: string, key: string, value: string) => void;
  resetSection: (sectionId: string) => void;
}

const SectionEditor = React.memo(function SectionEditor({
  config,
  content,
  updateField,
  resetSection,
}: SectionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleResetSection = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm(`Reset "${config.title}" to defaults?`)) {
        resetSection(config.id);
      }
    },
    [config.id, config.title, resetSection]
  );

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.headerLeft}>
          <h3 className={styles.sectionTitle}>{config.title}</h3>
          <span className={styles.fieldCount}>
            {config.fields.length} fields
          </span>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.resetSectionBtn}
            onClick={handleResetSection}
          >
            Reset
          </button>
          <svg
            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.body}>
          {config.fields.map((field) => (
            <FieldRenderer
              key={field.key}
              sectionId={config.id}
              fieldKey={field.key}
              label={field.label}
              type={field.type}
              value={(content[field.key] as string) ?? ""}
              onChange={updateField}
            />
          ))}
        </div>
      )}
    </div>
  );
});

SectionEditor.displayName = "SectionEditor";

interface FieldRendererProps {
  sectionId: string;
  fieldKey: string;
  label: string;
  type: "text" | "textarea" | "image";
  value: string;
  onChange: (sectionId: string, key: string, value: string) => void;
}

const FieldRenderer = React.memo(function FieldRenderer({
  sectionId,
  fieldKey,
  label,
  type,
  value,
  onChange,
}: FieldRendererProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(sectionId, fieldKey, e.target.value);
    },
    [sectionId, fieldKey, onChange]
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(sectionId, fieldKey, reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [sectionId, fieldKey, onChange]
  );

  if (type === "image") {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel}>{label}</label>
        <div className={styles.imageField}>
          {value && (
            <div className={styles.imagePreview}>
              <Image
                src={value}
                alt={label}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={value.startsWith("data:")}
              />
            </div>
          )}
          <div className={styles.imageInputRow}>
            <input
              type="text"
              className={styles.imagePathInput}
              value={value}
              onChange={handleChange}
              placeholder="/images/..."
            />
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel}>{label}</label>
        <textarea
          className={styles.fieldTextarea}
          value={value}
          onChange={handleChange}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <input
        type="text"
        className={styles.fieldInput}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});

FieldRenderer.displayName = "FieldRenderer";

export default SectionEditor;
