// Decorative, code-themed SVG illustrations floating in the background.
// Pointer-events disabled; low opacity so they sit behind real content.

type Item = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  rotate: number;
  variant: "braces" | "arrow" | "semicolon" | "hash" | "slash" | "plus" | "paren" | "star";
  anim: "animate-float-orbit" | "animate-float-orbit-2" | "animate-float";
};

const items: Item[] = [
  { top: "6%",  left: "4%",  size: 90,  delay: "0s",   duration: "16s", rotate: -8,  variant: "braces",   anim: "animate-float-orbit" },
  { top: "18%", left: "88%", size: 70,  delay: "1.5s", duration: "18s", rotate: 12,  variant: "plus",     anim: "animate-float-orbit-2" },
  { top: "32%", left: "10%", size: 60,  delay: "3s",   duration: "14s", rotate: 20,  variant: "semicolon",anim: "animate-float-orbit-2" },
  { top: "48%", left: "82%", size: 110, delay: "0.8s", duration: "20s", rotate: -15, variant: "arrow",    anim: "animate-float-orbit" },
  { top: "62%", left: "6%",  size: 85,  delay: "2.2s", duration: "17s", rotate: 8,   variant: "hash",     anim: "animate-float-orbit-2" },
  { top: "74%", left: "78%", size: 75,  delay: "1s",   duration: "15s", rotate: -22, variant: "slash",    anim: "animate-float-orbit" },
  { top: "84%", left: "16%", size: 65,  delay: "2.8s", duration: "19s", rotate: 18,  variant: "paren",    anim: "animate-float-orbit-2" },
  { top: "12%", left: "48%", size: 55,  delay: "3.5s", duration: "13s", rotate: 0,   variant: "star",     anim: "animate-float" },
  { top: "92%", left: "52%", size: 70,  delay: "0.5s", duration: "16s", rotate: -10, variant: "braces",   anim: "animate-float-orbit" },
];

function Glyph({ variant, size }: { variant: Item["variant"]; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (variant) {
    case "braces":
      return (
        <svg {...common}>
          <path d="M22 8c-6 0-8 4-8 10v6c0 4-2 6-6 8 4 2 6 4 6 8v6c0 6 2 10 8 10" />
          <path d="M42 8c6 0 8 4 8 10v6c0 4 2 6 6 8-4 2-6 4-6 8v6c0 6-2 10-8 10" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M10 32h44" />
          <path d="M40 18l14 14-14 14" />
        </svg>
      );
    case "semicolon":
      return (
        <svg {...common}>
          <circle cx="32" cy="22" r="4" fill="currentColor" />
          <path d="M30 40c0 6-2 10-8 14" strokeWidth="3" />
        </svg>
      );
    case "hash":
      return (
        <svg {...common}>
          <path d="M22 8l-6 48M48 8l-6 48M10 22h44M8 42h44" />
        </svg>
      );
    case "slash":
      return (
        <svg {...common}>
          <path d="M44 8L20 56" />
          <path d="M22 16h6M16 28h6M10 40h6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M32 12v40M12 32h40" />
          <circle cx="32" cy="32" r="22" />
        </svg>
      );
    case "paren":
      return (
        <svg {...common}>
          <path d="M22 8c-8 8-8 40 0 48" />
          <path d="M42 8c8 8 8 40 0 48" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M32 6l4 18 18 4-18 4-4 18-4-18-18-4 18-4z" />
        </svg>
      );
  }
}

export function FloatingIllustrations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => {
        const tone = i % 3 === 0 ? "tone-teal" : i % 3 === 1 ? "" : "tone-amber";
        return (
          <div
            key={i}
            className={`float-glyph absolute ${tone} ${it.anim}`}
            style={{
              top: it.top,
              left: it.left,
              transform: `rotate(${it.rotate}deg)`,
              animationDelay: it.delay,
              animationDuration: it.duration,
            }}
          >
            <Glyph variant={it.variant} size={it.size} />
          </div>
        );
      })}
    </div>
  );
}

