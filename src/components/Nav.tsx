import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────
   Wordmark — ++ spins on scroll (returns to 0°),
   CRASHED banishes into them as they spin.
   ───────────────────────────────────────────── */
function Logo({ compact }: { compact: boolean }) {
  // Increment each time compact toggles → forces remount of + spans → restarts animation
  const [animKey, setAnimKey] = useState(0);
  const prevCompact = useRef(compact);

  useEffect(() => {
    if (compact !== prevCompact.current) {
      prevCompact.current = compact;
      setAnimKey((k) => k + 1);
    }
  }, [compact]);

  const ease = "cubic-bezier(0.4,0,0.2,1)";

  const txt: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    textTransform: "uppercase" as const,
    color: "var(--ink)",
    display: "inline-block",
    lineHeight: 1,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        gap: 0,
        userSelect: "none",
      }}
    >
      {/* ── C — never animates ── */}
      <span style={txt}>C</span>

      {/* ── First + — spins CW and returns to 0° ── */}
      <span
        key={`p1-${animKey}`}
        className={animKey > 0 ? "plus-spin-cw" : ""}
        style={{ ...txt }}
      >
        +
      </span>

      {/* ── Second + — spins CW same direction ── */}
      <span
        key={`p2-${animKey}`}
        className={animKey > 0 ? "plus-spin-cw" : ""}
        style={{ ...txt }}
      >
        +
      </span>

      {/* ── CRASHED — banishes left into the ++ while they spin ── */}
      <span
        aria-hidden={compact}
        style={{
          ...txt,
          maxWidth: compact ? 0 : 160,
          overflow: "hidden",
          whiteSpace: "nowrap",
          opacity: compact ? 0 : 1,
          transform: compact
            ? "translateX(-20px) scale(0.75)"
            : "translateX(0px) scale(1)",
          transformOrigin: "left center",
          paddingLeft: compact ? 0 : 5,
          transition: [
            `max-width 0.45s ${ease}`,
            `opacity 0.28s ease`,
            `transform 0.42s ${ease}`,
            `padding-left 0.45s ${ease}`,
          ].join(", "),
          flexShrink: 0,
        }}
      >
        CRASHED
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Nav — two variants: landing vs inner pages
   ───────────────────────────────────────────── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const isLanding = routerState.location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* On non-landing pages scrolled is always "true" visually (compact) */
  const compact = isLanding ? scrolled : true;

  return (
    <header
      className="border-b border-hairline backdrop-blur-sm"
      style={{
        position: isLanding ? "fixed" : "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: isLanding
          ? scrolled
            ? "var(--canvas)"           /* solid after scroll */
            : "transparent"             /* transparent on hero */
          : "var(--canvas)",
        height: compact ? 52 : 64,
        borderBottom: isLanding && !scrolled ? "1px solid transparent" : undefined,
        transition:
          "height 0.45s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-ink"
          style={{ lineHeight: 0, textDecoration: "none" }}
          aria-label="C++ Crashed — home"
        >
          <Logo compact={compact} />
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] text-body">
          <Link to="/lectures"   className="hover:text-ink transition-colors story-link">Lectures</Link>
          <Link to="/playground" className="hover:text-ink transition-colors story-link">Playground</Link>
          <Link to="/flowchart"  className="hover:text-ink transition-colors story-link">Flowcharts</Link>
          <Link to="/cheatsheet" className="hover:text-ink transition-colors story-link">Cheat Sheet</Link>
          <Link to="/syllabus"   className="hover:text-ink transition-colors story-link">Syllabus</Link>
          <Link to="/verify"     className="hover:text-ink transition-colors story-link">Verify</Link>
          <Link to="/about"      className="hover:text-ink transition-colors story-link">About</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-muted bg-surface-card border border-hairline px-2 py-1 rounded-md">
            <kbd>⌘</kbd><kbd>K</kbd>
          </span>
          <ThemeToggle />

          {/* CTA — only on landing page */}
          {isLanding && (
            <Link
              to="/lectures"
              className="btn-primary transition-transform hover:-translate-y-0.5"
            >
              Start learning
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
