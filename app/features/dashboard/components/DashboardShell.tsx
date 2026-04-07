"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../stores/useAuthStore";
import { useHomeContentStore } from "../stores/useHomeContentStore";
import { useSLibraryContentStore } from "../stores/useSLibraryContentStore";
import { useCoursesContentStore } from "../stores/useCoursesContentStore";
import { useTheSlabContentStore } from "../stores/useTheSlabContentStore";
import { useFooterContentStore } from "../stores/useFooterContentStore";
import { useLanguageStore } from "../stores/useLanguageStore";
import { useTranslations } from "../i18n/translations";
import LanguageToggle from "./LanguageToggle";
import styles from "./DashboardShell.module.scss";

interface NavItem {
  href: string;
  labelKey:
    | "navHomepage"
    | "navTheSlab"
    | "navSLibrary"
    | "navCourses"
    | "navFooter";
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    labelKey: "navHomepage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/dashboard/the-s-lab",
    labelKey: "navTheSlab",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M12 7v10M8 11h8" />
      </svg>
    ),
  },
  {
    href: "/dashboard/s-library",
    labelKey: "navSLibrary",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/courses",
    labelKey: "navCourses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/footer",
    labelKey: "navFooter",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7h18M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7" />
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
        <path d="M10 11h4M10 15h4" />
      </svg>
    ),
  },
];

interface DashboardShellProps {
  children: React.ReactNode;
  pageTitle: string;
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

const DashboardShell = React.memo(function DashboardShell({
  children,
  pageTitle,
  isDirty,
  isSaving,
  onSave,
  onReset,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, checkSession, logout } = useAuthStore();
  const hydrateHome = useHomeContentStore((s) => s.hydrate);
  const hydrateSLib = useSLibraryContentStore((s) => s.hydrate);
  const hydrateCourses = useCoursesContentStore((s) => s.hydrate);
  const hydrateTheSlab = useTheSlabContentStore((s) => s.hydrate);
  const hydrateFooter = useFooterContentStore((s) => s.hydrate);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);
  const [toast, setToast] = useState("");

  useEffect(() => {
    checkSession();
    hydrateHome();
    hydrateTheSlab();
    hydrateSLib();
    hydrateCourses();
    hydrateFooter();
  }, [
    checkSession,
    hydrateHome,
    hydrateTheSlab,
    hydrateSLib,
    hydrateCourses,
    hydrateFooter,
  ]);

  const handleSave = useCallback(async () => {
    try {
      await onSave();
      setToast(tt.saveSuccess);
    } catch (err) {
      setToast(tt.saveFail);
    }
    setTimeout(() => setToast(""), 2500);
  }, [onSave, tt]);

  const handleReset = useCallback(async () => {
    if (window.confirm(tt.resetConfirm)) {
      try {
        await onReset();
        setToast(tt.resetSuccess);
      } catch {
        setToast(tt.resetFail);
      }
      setTimeout(() => setToast(""), 2500);
    }
  }, [onReset, tt]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/dashboard/login");
  }, [logout, router]);

  const shellClassName = `${styles.shell} ${locale === "vi" ? styles.viFont : ""}`;

  if (isLoading || !isAuthenticated) {
    return (
      <div className={shellClassName}>
        <div style={{ margin: "auto", color: "#999" }}>{tt.loading}</div>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.headerTop}>
            <div>
              <div className={styles.brand}>{tt.brand}</div>
              <div className={styles.brandSub}>{tt.brandSub}</div>
            </div>
            <LanguageToggle />
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {tt[item.labelKey]}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {tt.signOut}
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.topActions}>
            {isDirty && <span className={styles.dirtyBadge}>{tt.unsavedChanges}</span>}
            <button className={styles.resetBtn} onClick={handleReset}>
              {tt.resetToDefaults}
            </button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={!isDirty || isSaving}>
              {isSaving ? tt.saving : tt.saveChanges}
            </button>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
});

DashboardShell.displayName = "DashboardShell";

export default DashboardShell;
