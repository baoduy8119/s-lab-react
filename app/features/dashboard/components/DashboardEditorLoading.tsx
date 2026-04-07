"use client";

import { useLanguageStore } from "../stores/useLanguageStore";
import { useTranslations } from "../i18n/translations";

export default function DashboardEditorLoading() {
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);
  return <div style={{ padding: "2rem", color: "#999" }}>{tt.loading}</div>;
}
