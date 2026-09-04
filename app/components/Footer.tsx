import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer
      className="w-full px-[6vw] pt-24 pb-10"
      style={{ background: "var(--ink)", color: "var(--white)" }}
    >
      <div
        className="font-display leading-none tracking-tight"
        style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}
      >
        Oxbridge Knights
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="text-meta opacity-60">Lagos</div>
          <div className="mt-2 text-white/85">Lagos, Nigeria</div>
        </div>

        <div>
          <div className="text-meta opacity-60">London</div>
          <div className="mt-2 text-white/85">London, United Kingdom</div>
        </div>

        <div>
          <div className="text-meta opacity-60">Contact</div>
          <a
            href="mailto:izunnewuihe@gmail.com"
            data-cursor="view"
            data-cursor-label="Email"
            className="mt-2 block text-white/85 hover:text-white transition-colors"
          >
            izunnewuihe@gmail.com
          </a>
          <a
            href="tel:+2348130218143"
            data-cursor="view"
            data-cursor-label="Call"
            className="mt-1 block text-white/85 hover:text-white transition-colors"
          >
            +234 813 021 8143
          </a>
        </div>

        <div>
          <div className="text-meta opacity-60">Follow</div>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="view"
            data-cursor-label="Instagram"
            className="mt-2 block text-white/85 hover:text-white transition-colors"
          >
            Instagram ↗
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="view"
            data-cursor-label="LinkedIn"
            className="mt-1 block text-white/85 hover:text-white transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div
        className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6"
        style={{ borderTop: "1px solid rgba(251, 250, 247, 0.14)" }}
      >
        <div className="text-meta opacity-60">
          © Oxbridge Knights 2026 / Lagos / London
        </div>
        <BackToTop />
      </div>
    </footer>
  );
}
