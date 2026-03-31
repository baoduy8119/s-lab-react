"use client";

import React, { useCallback, useMemo } from "react";
import type { SectionContent } from "../types/content";
import { useLanguageStore } from "../stores/useLanguageStore";
import styles from "./FaqListEditor.module.scss";
import fieldStyles from "./SectionEditor.module.scss";

type FaqItem = { index: number; question: string; answer: string; enQuestion?: string; enAnswer?: string };

function getFaqIndices(content: SectionContent): number[] {
  const indices = new Set<number>();
  for (const k of Object.keys(content)) {
    const m = /^faq(\d+)(Q|A)(_vi)?$/.exec(k);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0) indices.add(n);
  }
  return Array.from(indices).sort((a, b) => a - b);
}

interface FaqListEditorProps {
  sectionId: string;
  content: SectionContent;
  updateField: (sectionId: string, key: string, value: string) => void;
  deleteFields: (sectionId: string, keys: string[]) => void;
  title?: string;
  maxFaqs?: number;
}

const FaqListEditor = React.memo(function FaqListEditor({
  sectionId,
  content,
  updateField,
  deleteFields,
  title = "FAQs",
  maxFaqs = 30,
}: FaqListEditorProps) {
  const locale = useLanguageStore((s) => s.locale);

  const items = useMemo((): FaqItem[] => {
    const indices = getFaqIndices(content);
    const effective = indices;

    return effective
      .map((n) => {
        const qKey = locale === "vi" ? `faq${n}Q_vi` : `faq${n}Q`;
        const aKey = locale === "vi" ? `faq${n}A_vi` : `faq${n}A`;
        const question = (content[qKey] as string) ?? "";
        const answer = (content[aKey] as string) ?? "";
        const enQuestion = locale === "vi" ? ((content[`faq${n}Q`] as string) ?? "") : undefined;
        const enAnswer = locale === "vi" ? ((content[`faq${n}A`] as string) ?? "") : undefined;
        return { index: n, question, answer, enQuestion, enAnswer };
      });
  }, [content, locale]);

  const nextIndex = useMemo(() => {
    const indices = getFaqIndices(content);
    const max = indices.length ? indices[indices.length - 1] : 0;
    return max + 1;
  }, [content]);

  const handleAdd = useCallback(() => {
    if (nextIndex > maxFaqs) return;
    // Add both EN & VI keys so localization stays consistent.
    updateField(sectionId, `faq${nextIndex}Q`, "");
    updateField(sectionId, `faq${nextIndex}A`, "");
    updateField(sectionId, `faq${nextIndex}Q_vi`, "");
    updateField(sectionId, `faq${nextIndex}A_vi`, "");
  }, [maxFaqs, nextIndex, sectionId, updateField]);

  const handleRemove = useCallback(
    (n: number) => {
      deleteFields(sectionId, [
        `faq${n}Q`,
        `faq${n}A`,
        `faq${n}Q_vi`,
        `faq${n}A_vi`,
      ]);
    },
    [deleteFields, sectionId]
  );

  const canAdd = nextIndex <= maxFaqs;

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
            Add FAQ
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {items.length === 0 ? (
          <div className={styles.empty}>No FAQs yet. Click “Add FAQ” to create one.</div>
        ) : (
          items.map((faq) => (
            <div key={faq.index} className={styles.faqCard}>
              <div className={styles.faqCardHeader}>
                <div className={styles.faqLabel}>FAQ {faq.index}</div>
                <button type="button" className={styles.removeBtn} onClick={() => handleRemove(faq.index)}>
                  Remove
                </button>
              </div>

              <div className={styles.grid}>
                <div className={fieldStyles.field}>
                  <label className={fieldStyles.fieldLabel}>Question</label>
                  {locale === "vi" && (
                    <div className={fieldStyles.reference}>
                      <span className={fieldStyles.referenceLabel}>EN:</span>{" "}
                      {faq.enQuestion?.trim() ? faq.enQuestion : <span className={fieldStyles.referenceEmpty}>(empty)</span>}
                    </div>
                  )}
                  <input
                    type="text"
                    className={fieldStyles.fieldInput}
                    value={faq.question}
                    onChange={(e) =>
                      updateField(sectionId, locale === "vi" ? `faq${faq.index}Q_vi` : `faq${faq.index}Q`, e.target.value)
                    }
                  />
                </div>

                <div className={fieldStyles.field}>
                  <label className={fieldStyles.fieldLabel}>Answer</label>
                  {locale === "vi" && (
                    <div className={fieldStyles.reference}>
                      <span className={fieldStyles.referenceLabel}>EN:</span>{" "}
                      {faq.enAnswer?.trim() ? faq.enAnswer : <span className={fieldStyles.referenceEmpty}>(empty)</span>}
                    </div>
                  )}
                  <textarea
                    className={fieldStyles.fieldTextarea}
                    value={faq.answer}
                    onChange={(e) =>
                      updateField(sectionId, locale === "vi" ? `faq${faq.index}A_vi` : `faq${faq.index}A`, e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

FaqListEditor.displayName = "FaqListEditor";

export default FaqListEditor;

