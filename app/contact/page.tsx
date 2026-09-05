import LineMask from "../components/LineMask";
import ContactForm from "./ContactForm";
import Asterisk from "../components/Asterisk";

const details: { label: string; value: string; href?: string; ext?: boolean }[] =
  [
    { label: "Studio", value: "Lagos, Nigeria" },
    { label: "Presence", value: "London, UK" },
    {
      label: "Email",
      value: "izunnewuihe@gmail.com",
      href: "mailto:izunnewuihe@gmail.com",
    },
    { label: "Phone", value: "+234 813 021 8143", href: "tel:+2348130218143" },
    {
      label: "Instagram",
      value: "Instagram ↗",
      href: "https://instagram.com/",
      ext: true,
    },
    {
      label: "LinkedIn",
      value: "LinkedIn ↗",
      href: "https://linkedin.com/",
      ext: true,
    },
  ];

export default function ContactPage() {
  return (
    <>
      <section
        aria-labelledby="contact-heading"
        className="w-full px-[5vw] md:px-[6vw] pt-[26vh] pb-[14vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <div className="text-meta text-white/60">
          <span style={{ color: "var(--vermilion)" }}>(004)</span> Contact
        </div>

        <h1
          id="contact-heading"
          className="mt-8 font-display max-w-[15ch]"
          style={{
            fontSize: "var(--step-display-xl)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          <LineMask className="block">
            <span>Tell us what you</span>
            <span>
              want to{" "}
              <em
                className="italic"
                style={{ color: "var(--vermilion)", fontStyle: "italic" }}
              >
                build.
              </em>
            </span>
          </LineMask>
        </h1>
      </section>

      <section
        className="w-full px-[5vw] md:px-[6vw] py-[14vh]"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-20">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-meta" style={{ color: "var(--slate)" }}>
              The brief
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <h2 className="text-meta" style={{ color: "var(--slate)" }}>
              Details
            </h2>

            <ul className="mt-10 flex flex-col">
              {details.map((d) => (
                <li
                  key={d.label}
                  className="py-5"
                  style={{ borderTop: "1px solid var(--hair)" }}
                >
                  <div
                    className="text-meta"
                    style={{ color: "var(--slate)", opacity: 0.8 }}
                  >
                    {d.label}
                  </div>
                  <div className="mt-2">
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.ext ? "_blank" : undefined}
                        rel={d.ext ? "noreferrer noopener" : undefined}
                        data-cursor="view"
                        data-cursor-label={d.label}
                        className="ok-ul"
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-meta" style={{ color: "var(--slate)" }}>
              Lagos <Asterisk /> London / Since 2016
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
