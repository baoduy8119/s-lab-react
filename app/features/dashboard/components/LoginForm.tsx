"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import styles from "./LoginForm.module.scss";

const LoginForm = React.memo(function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      const errorMsg = await login(username, password);

      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    },
    [username, password, login, router]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span>THE S-LAB</span>
        </div>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Sign in to manage your content</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
