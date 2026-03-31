"use client";

import React, { useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import type { SectionContent } from "../types/content";
import { useLanguageStore } from "../stores/useLanguageStore";
import styles from "./RepeatableItemsEditor.module.scss";
import fieldStyles from "./SectionEditor.module.scss";

type SliderItem = {
  index: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  enName?: string;
  enRole?: string;
  enQuote?: string;
};

function getIndices(content: SectionContent): number[] {
  const indices = new Set<number>();
  for (const k of Object.keys(content)) {
    const m = /^t(\d+)(Name|Role|Quote|Image)(_vi)?$/.exec(k);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0) indices.add(n);
  }
  return Array.from(indices).sort((a, b) => a - b);
}

interface TestimonialSliderItemsEditorProps {
  sectionId: string;
  content: SectionContent;
  updateField: (sectionId: string, key: string, value: string) => void;
  deleteFields: (sectionId: string, keys: string[]) => void;
  title?: string;
  maxItems?: number;
}

const TestimonialSliderItemsEditor = React.memo(function TestimonialSliderItemsEditor({
  sectionId,
  content,
  updateField,
  deleteFields,
  title = "Testimonial slider items",
  maxItems = 30,
}: TestimonialSliderItemsEditorProps) {
  const locale = useLanguageStore((s) => s.locale);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const items = useMemo((): SliderItem[] => {
    const indices = getIndices(content);
    return indices.map((n) => {
      const nameKey = locale === "vi" ? `t${n}Name_vi` : `t${n}Name`;
      const roleKey = locale === "vi" ? `t${n}Role_vi` : `t${n}Role`;
      const quoteKey = locale === "vi" ? `t${n}Quote_vi` : `t${n}Quote`;

      const name = (content[nameKey] as string) ?? "";
      const role = (content[roleKey] as string) ?? "";
      const quote = (content[quoteKey] as string) ?? "";
      const image = (content[`t${n}Image`] as string) ?? "";

      const enName = locale === "vi" ? ((content[`t${n}Name`] as string) ?? "") : undefined;
      const enRole = locale === "vi" ? ((content[`t${n}Role`] as string) ?? "") : undefined;
      const enQuote = locale === "vi" ? ((content[`t${n}Quote`] as string) ?? "") : undefined;

      return { index: n, name, role, quote, image, enName, enRole, enQuote };
    });
  }, [content, locale]);

  const nextIndex = useMemo(() => {
    const indices = getIndices(content);
    const max = indices.length ? indices[indices.length - 1] : 0;
    return max + 1;
  }, [content]);

  const handleAdd = useCallback(() => {
    if (nextIndex > maxItems) return;
    updateField(sectionId, `t${nextIndex}Name`, "");
    updateField(sectionId, `t${nextIndex}Role`, "");
    updateField(sectionId, `t${nextIndex}Quote`, "");
    updateField(sectionId, `t${nextIndex}Name_vi`, "");
    updateField(sectionId, `t${nextIndex}Role_vi`, "");
    updateField(sectionId, `t${nextIndex}Quote_vi`, "");
    updateField(sectionId, `t${nextIndex}Image`, "");
  }, [maxItems, nextIndex, sectionId, updateField]);

  const handleRemove = useCallback(
    (n: number) => {
      deleteFields(sectionId, [
        `t${n}Name`,
        `t${n}Role`,
        `t${n}Quote`,
        `t${n}Name_vi`,
        `t${n}Role_vi`,
        `t${n}Quote_vi`,
        `t${n}Image`,
      ]);
    },
    [deleteFields, sectionId]
  );

  const handleImageUpload = useCallback(
    (n: number, file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField(sectionId, `t${n}Image`, reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [sectionId, updateField]
  );

  const canAdd = nextIndex <= maxItems;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.actions}>
          <button type="button" className={styles.addBtn} onClick={handleAdd} disabled={!canAdd}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
            Add item
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {items.length === 0 ? (
          <div className={styles.empty}>No items yet. Click “Add item” to create one.</div>
        ) : (
          items.map((it) => (
            <div key={it.index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardLabel}>Item {it.index}</div>
                <button type="button" className={styles.removeBtn} onClick={() => handleRemove(it.index)}>
                  Remove
                </button>
              </div>

              <div className={styles.grid}>
                <div className={fieldStyles.field}>
                  <label className={fieldStyles.fieldLabel}>Name</label>
                  {locale === "vi" && (
                    <div className={fieldStyles.reference}>
                      <span className={fieldStyles.referenceLabel}>EN:</span>{" "}
                      {it.enName?.trim() ? it.enName : <span className={fieldStyles.referenceEmpty}>(empty)</span>}
                    </div>
                  )}
                  <input
                    type="text"
                    className={fieldStyles.fieldInput}
                    value={it.name}
                    onChange={(e) =>
                      updateField(sectionId, locale === "vi" ? `t${it.index}Name_vi` : `t${it.index}Name`, e.target.value)
                    }
                  />
                </div>

                <div className={fieldStyles.field}>
                  <label className={fieldStyles.fieldLabel}>Role</label>
                  {locale === "vi" && (
                    <div className={fieldStyles.reference}>
                      <span className={fieldStyles.referenceLabel}>EN:</span>{" "}
                      {it.enRole?.trim() ? it.enRole : <span className={fieldStyles.referenceEmpty}>(empty)</span>}
                    </div>
                  )}
                  <input
                    type="text"
                    className={fieldStyles.fieldInput}
                    value={it.role}
                    onChange={(e) =>
                      updateField(sectionId, locale === "vi" ? `t${it.index}Role_vi` : `t${it.index}Role`, e.target.value)
                    }
                  />
                </div>

                <div className={fieldStyles.field} style={{ gridColumn: "1 / -1" }}>
                  <label className={fieldStyles.fieldLabel}>Quote</label>
                  {locale === "vi" && (
                    <div className={fieldStyles.reference}>
                      <span className={fieldStyles.referenceLabel}>EN:</span>{" "}
                      {it.enQuote?.trim() ? it.enQuote : <span className={fieldStyles.referenceEmpty}>(empty)</span>}
                    </div>
                  )}
                  <textarea
                    className={fieldStyles.fieldTextarea}
                    value={it.quote}
                    onChange={(e) =>
                      updateField(sectionId, locale === "vi" ? `t${it.index}Quote_vi` : `t${it.index}Quote`, e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className={fieldStyles.field} style={{ gridColumn: "1 / -1" }}>
                  <label className={fieldStyles.fieldLabel}>Image</label>
                  <div className={fieldStyles.imageField}>
                    {it.image && (
                      <div className={fieldStyles.imagePreview}>
                        <Image
                          src={it.image}
                          alt={`Item ${it.index} image`}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized={it.image.startsWith("data:")}
                        />
                      </div>
                    )}
                    <div className={fieldStyles.imageInputRow}>
                      <input
                        type="text"
                        className={fieldStyles.imagePathInput}
                        value={it.image}
                        onChange={(e) => updateField(sectionId, `t${it.index}Image`, e.target.value)}
                        placeholder="Enter image URL/path or upload"
                      />
                      <button
                        type="button"
                        className={fieldStyles.uploadBtn}
                        onClick={() => fileInputRefs.current[it.index]?.click()}
                      >
                        Upload
                      </button>
                      <input
                        ref={(el) => {
                          fileInputRefs.current[it.index] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          handleImageUpload(it.index, f);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

TestimonialSliderItemsEditor.displayName = "TestimonialSliderItemsEditor";

export default TestimonialSliderItemsEditor;

