import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin · Oxbridge Knights",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section
      aria-labelledby="admin-login-heading"
      className="w-full px-[5vw] md:px-[6vw] pt-[26vh] pb-[20vh] flex flex-col"
      style={{ background: "var(--ink)", color: "var(--white)", minHeight: "100svh" }}
    >
      <div className="text-meta text-white/60">
        <span style={{ color: "var(--vermilion)" }}>(000)</span> Studio access
      </div>

      <h1
        id="admin-login-heading"
        className="mt-8 font-display"
        style={{
          fontSize: "var(--step-display-xl)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        Admin
      </h1>

      <div className="mt-16 w-full max-w-[32rem]">
        <LoginForm />
      </div>
    </section>
  );
}
