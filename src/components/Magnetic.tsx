import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Wraps a single child and gently pulls it toward the cursor on hover.
 * Pure CSS transform - does not interfere with click/Link semantics.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
