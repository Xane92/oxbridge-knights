"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Deliberately generic: never reveal which field was wrong, and never
      // log the credentials or the raw error.
      setError("Incorrect email or password.");
      setBusy(false);
      return;
    }

    // The session cookie is set; a full navigation lets the proxy re-evaluate
    // the request and admit us to the dashboard.
    router.replace("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <div>
        <label
          htmlFor="admin-email"
          className="text-meta block"
          style={{ color: "var(--slate)" }}
        >
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={busy}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ok-field ok-field-invert mt-3"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="text-meta block"
          style={{ color: "var(--slate)" }}
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={busy}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="ok-field ok-field-invert mt-3"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={busy}
          data-cursor="view"
          data-cursor-label="Sign in"
          className="ok-send font-display ok-ul"
          style={{
            fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)",
            lineHeight: 1,
            letterSpacing: "-0.015em",
            color: "var(--white)",
          }}
        >
          {busy ? "Signing in" : "Sign in"}{" "}
          <span aria-hidden style={{ color: "var(--vermilion)" }}>
            &rarr;
          </span>
        </button>

        <p
          aria-live="polite"
          role={error ? "alert" : undefined}
          className="max-w-[42ch]"
          style={{ color: "var(--vermilion)", minHeight: "1.5em" }}
        >
          {error}
        </p>
      </div>
    </form>
  );
}
