import Link from "next/link";

const links: { href: string; label: string }[] = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ mixBlendMode: "difference", color: "var(--white)" }}
    >
      <div className="flex items-center justify-between px-[6vw] py-6">
        <Link
          href="/"
          data-cursor="view"
          data-cursor-label="Home"
          className="font-display text-[1.35rem] leading-none tracking-tight"
        >
          Oxbridge Knights
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-meta">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="view"
              data-cursor-label={l.label}
              className="text-meta hover:opacity-70 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden flex flex-col gap-[5px]"
          data-cursor="view"
          data-cursor-label="Menu"
        >
          <span className="block h-px w-6 bg-current" />
          <span className="block h-px w-6 bg-current" />
        </button>
      </div>
    </header>
  );
}
