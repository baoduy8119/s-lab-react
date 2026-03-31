"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  DASHBOARD_LOCALE_COOKIE_NAME,
  DASHBOARD_LOCALE_STORAGE_KEY,
} from "@/app/lib/localeConstants";

export type Locale = "en" | "vi";

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365;

interface LanguageState {
  locale: Locale;
  _hydrated: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  hydrate: () => void;
}

function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${DASHBOARD_LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function noopHydrate() {}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(DASHBOARD_LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    setLocaleCookie(next);
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "en" ? "vi" : "en";
      try {
        localStorage.setItem(DASHBOARD_LOCALE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      setLocaleCookie(next);
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(DASHBOARD_LOCALE_STORAGE_KEY);
      if (stored === "en" || stored === "vi") {
        setLocaleState((current) => {
          if (stored === current) return current;
          setLocaleCookie(stored);
          return stored;
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLanguageStore<T>(selector: (s: LanguageState) => T): T {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLanguageStore must be used within LocaleProvider");
  }
  const snapshot = useMemo(
    (): LanguageState => ({
      locale: ctx.locale,
      _hydrated: true,
      setLocale: ctx.setLocale,
      toggleLocale: ctx.toggleLocale,
      hydrate: noopHydrate,
    }),
    [ctx.locale, ctx.setLocale, ctx.toggleLocale]
  );
  return selector(snapshot);
}
