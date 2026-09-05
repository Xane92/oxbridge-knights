"use client";

import { useEffect, useState, type FormEvent } from "react";
import Asterisk from "../components/Asterisk";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!ACCESS_KEY) {
      console.warn(
        "[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set, so the form cannot " +
          "send. Add the Web3Forms access key to .env.local and restart the " +
          "dev server. The form still renders, and submitting will report the " +
          "failure rather than fake a success.",
      );
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // No key, no send, and no pretending otherwise.
    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const data = new FormData(form);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New enquiry from oxbridgeknights.com",
          from_name: "Oxbridge Knights website",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.message ?? res.statusText);

      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("[contact] Web3Forms submission failed:", err);
      setStatus("error");
    }
  };

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="flex flex-col gap-10">
      {fields.map((f) => (
        <div key={f.name}>
          <label
            htmlFor={`contact-${f.name}`}
            className="text-meta block"
            style={{ color: "var(--slate)" }}
          >
            {f.label}
            {f.required ? <Asterisk style={{ marginLeft: "0.3em" }} /> : null}
          </label>
          <input
            id={`contact-${f.name}`}
            name={f.name}
            type={f.type}
            required={f.required}
            disabled={busy}
            autoComplete={
              f.name === "name"
                ? "name"
                : f.name === "email"
                  ? "email"
                  : "tel"
            }
            className="ok-field mt-3"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="contact-message"
          className="text-meta block"
          style={{ color: "var(--slate)" }}
        >
          Message
          <Asterisk style={{ marginLeft: "0.3em" }} />
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          disabled={busy}
          className="ok-field mt-3 resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={busy}
          data-cursor="view"
          data-cursor-label={status === "sent" ? "Sent" : "Send"}
          className="ok-send font-display ok-ul"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            lineHeight: 1,
            letterSpacing: "-0.015em",
          }}
        >
          {status === "sending" ? "Sending" : status === "sent" ? "Sent" : "Send"}{" "}
          {status === "sent" ? (
            <Asterisk size="0.8em" />
          ) : (
            <span aria-hidden style={{ color: "var(--vermilion)" }}>
              →
            </span>
          )}
        </button>

        {/* Body type, not meta: tracked uppercase is for labels, not sentences. */}
        <p
          aria-live="polite"
          className="max-w-[42ch]"
          style={{ color: status === "error" ? "var(--vermilion)" : "var(--slate)" }}
        >
          {status === "sent"
            ? "Thank you. We will come back to you shortly."
            : null}
          {status === "error" ? (
            <>
              That didn&apos;t send. Try again, or email us directly at{" "}
              <a
                href="mailto:izunnewuihe@gmail.com"
                className="ok-ul"
                data-cursor="view"
                data-cursor-label="Email"
              >
                izunnewuihe@gmail.com
              </a>
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
