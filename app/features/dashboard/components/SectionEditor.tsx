"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import type { SectionConfig, SectionContent } from "../types/content";
import { useLanguageStore } from "../stores/useLanguageStore";
import { useTranslations } from "../i18n/translations";
import styles from "./SectionEditor.module.scss";

interface SectionEditorProps {
  config: SectionConfig;
  content: SectionContent;
  updateField: (sectionId: string, key: string, value: string) => void;
  resetSection: (sectionId: string) => void;
  extra?: React.ReactNode;
}

const SectionEditor = React.memo(function SectionEditor({
  config,
  content,
  updateField,
  resetSection,
  extra,
}: SectionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleResetSection = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm(tt.resetSectionConfirm(config.title))) {
        resetSection(config.id);
      }
    },
    [config.id, config.title, resetSection, tt]
  );

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.headerLeft}>
          <h3 className={styles.sectionTitle}>{config.title}</h3>
          {config.fields.length > 0 && (
            <span className={styles.fieldCount}>
              {config.fields.length} {tt.fields}
            </span>
          )}
          {locale === "vi" && (
            <span className={styles.langBadge}>VI</span>
          )}
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.resetSectionBtn}
            onClick={handleResetSection}
          >
            {tt.reset}
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
          {config.fields.map((field) => {
            const isShared =
              field.type === "image" || field.localeShared === true;
            const effectiveKey =
              locale === "vi" && !isShared
                ? `${field.key}_vi`
                : field.key;
            const referenceValue =
              locale === "vi" && !isShared
                ? (content[field.key] as string) ?? ""
                : undefined;

            return (
              <FieldRenderer
                key={`${field.key}-${locale}`}
                sectionId={config.id}
                fieldKey={effectiveKey}
                label={field.label}
                type={field.type}
                options={field.options}
                localeShared={field.localeShared === true}
                value={(content[effectiveKey] as string) ?? ""}
                referenceValue={referenceValue}
                onChange={updateField}
              />
            );
          })}
          {extra}
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
  type:
    | "text"
    | "textarea"
    | "image"
    | "select"
    | "multiselect"
    | "checkbox";
  options?: string[];
  localeShared?: boolean;
  value: string;
  referenceValue?: string;
  onChange: (sectionId: string, key: string, value: string) => void;
}

const FieldRenderer = React.memo(function FieldRenderer({
  sectionId,
  fieldKey,
  label,
  type,
  options,
  localeShared,
  value,
  referenceValue,
  onChange,
}: FieldRendererProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
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

  const referenceBlock =
    referenceValue !== undefined && !localeShared ? (
      <div className={styles.reference}>
        <span className={styles.referenceLabel}>EN:</span>{" "}
        {referenceValue || <span className={styles.referenceEmpty}>(empty)</span>}
      </div>
    ) : null;

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
              placeholder={tt.imagePlaceholder}
            />
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              {tt.upload}
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
        {referenceBlock}
        <textarea
          className={styles.fieldTextarea}
          value={value}
          onChange={handleChange}
          rows={3}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel}>{label}</label>
        {referenceBlock}
        <select
          className={styles.fieldInput}
          value={value}
          onChange={handleChange}
        >
          <option value="">Select…</option>
          {(options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "multiselect") {
    let selected = new Set<string>();
    try {
      const parsed = JSON.parse(value || "[]");
      if (Array.isArray(parsed)) {
        selected = new Set(parsed.filter((x) => typeof x === "string"));
      }
    } catch {
      /* keep empty */
    }

    const toggleOption = (opt: string) => {
      const next = new Set(selected);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      onChange(sectionId, fieldKey, JSON.stringify([...next]));
    };

    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel}>{label}</label>
        {referenceBlock}
        <div className={styles.multiselectList}>
          {(options ?? []).map((opt) => (
            <label key={opt} className={styles.multiselectOption}>
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => toggleOption(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className={styles.field}>
        <label className={styles.checkboxField}>
          <input
            type="checkbox"
            checked={value === "true"}
            onChange={(e) =>
              onChange(sectionId, fieldKey, e.target.checked ? "true" : "false")
            }
          />
          <span className={styles.fieldLabelInline}>{label}</span>
        </label>
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {referenceBlock}
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
