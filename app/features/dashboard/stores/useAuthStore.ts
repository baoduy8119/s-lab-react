import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  isLoading: true,

  login: async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return data.error || "Login failed";
      }

      set({ isAuthenticated: true, username: data.username });
      return null;
    } catch {
      return "Network error. Please try again.";
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // proceed with client cleanup regardless
    }
    set({ isAuthenticated: false, username: null });
  },

  checkSession: async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (res.ok && data.authenticated) {
        set({ isAuthenticated: true, username: data.username, isLoading: false });
      } else {
        set({ isAuthenticated: false, username: null, isLoading: false });
      }
    } catch {
      set({ isAuthenticated: false, username: null, isLoading: false });
    }
  },
}));
