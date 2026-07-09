import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type Variant = "up" | "left" | "right" | "scale";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "p";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const variantClass =
    variant === "left" ? "reveal-left" :
    variant === "right" ? "reveal-right" :
    variant === "scale" ? "reveal-scale" : "";
  return (
    <As
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${variantClass} ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </As>
  );
}
