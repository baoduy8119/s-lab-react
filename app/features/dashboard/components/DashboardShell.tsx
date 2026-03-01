"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../stores/useAuthStore";
import { useHomeContentStore } from "../stores/useHomeContentStore";
import { useSLibraryContentStore } from "../stores/useSLibraryContentStore";
import styles from "./DashboardShell.module.scss";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Homepage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/dashboard/s-library",
    label: "S-Library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
];

interface DashboardShellProps {
  children: React.ReactNode;
  pageTitle: string;
  isDirty: boolean;
  onSave: () => void;
  onReset: () => void;
}

const DashboardShell = React.memo(function DashboardShell({
  children,
  pageTitle,
  isDirty,
  onSave,
  onReset,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, checkSession, logout } = useAuthStore();
  const hydrateHome = useHomeContentStore((s) => s.hydrate);
  const hydrateSLib = useSLibraryContentStore((s) => s.hydrate);
  const [toast, setToast] = useState("");

  useEffect(() => {
    checkSession();
    hydrateHome();
    hydrateSLib();
  }, [checkSession, hydrateHome, hydrateSLib]);

  const handleSave = useCallback(() => {
    onSave();
    setToast("Content saved successfully!");
    setTimeout(() => setToast(""), 2500);
  }, [onSave]);

  const handleReset = useCallback(() => {
    if (window.confirm("Reset all content to defaults? This cannot be undone.")) {
      onReset();
      setToast("Content reset to defaults");
      setTimeout(() => setToast(""), 2500);
    }
  }, [onReset]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/dashboard/login");
  }, [logout, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className={styles.shell}>
        <div style={{ margin: "auto", color: "#999" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>THE S-LAB</div>
          <div className={styles.brandSub}>Content Dashboard</div>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
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
            Sign out
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.topActions}>
            {isDirty && <span className={styles.dirtyBadge}>Unsaved changes</span>}
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset to defaults
            </button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={!isDirty}>
              Save changes
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
