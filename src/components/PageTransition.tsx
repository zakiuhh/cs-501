import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Soft fade + blur on route changes. Driven by pathname so hash links
 * inside a page don't re-trigger.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [shown, setShown] = useState(pathname);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (pathname === shown) return;
    setPhase("out");
    const t = setTimeout(() => {
      setShown(pathname);
      setPhase("in");
    }, 180);
    return () => clearTimeout(t);
  }, [pathname, shown]);

  return (
    <div
      key={shown}
      className={phase === "in" ? "page-transition-in" : "page-transition-out"}
    >
      {children}
    </div>
  );
}
