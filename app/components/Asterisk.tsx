/* A drawn asterisk, not the character. iOS and some Android font stacks
   substitute a colour emoji for the eight-spoked asterisk codepoint (and its
   neighbours), which no CSS can override, so the glyph is geometry we own. */
export default function Asterisk({
  size = "0.7em",
  className,
  style,
}: {
  size?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        color: "var(--vermilion)",
        display: "inline-block",
        lineHeight: 0,
        verticalAlign: "middle",
        ...style,
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Three strokes through the centre = six points, 60° apart. */}
        <line x1="12" y1="2.5" x2="12" y2="21.5" />
        <line x1="3.77" y1="7.25" x2="20.23" y2="16.75" />
        <line x1="3.77" y1="16.75" x2="20.23" y2="7.25" />
      </svg>
    </span>
  );
}
