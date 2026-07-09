import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

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
        className={`logo-plus-1 ${animKey > 0 ? "plus-spin-cw" : ""}`}
        style={{ ...txt }}
      >
        +
      </span>

      {/* ── Second + — spins CW same direction ── */}
      <span
        key={`p2-${animKey}`}
        className={`logo-plus-2 ${animKey > 0 ? "plus-spin-cw" : ""}`}
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
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const isLanding = routerState.location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [routerState.location.pathname]);

  /* On non-landing pages scrolled is always "true" visually (compact) */
  const compact = isLanding ? scrolled : true;

  return (
    <>
      <header
        className="border-b border-hairline backdrop-blur-sm"
        style={{
          position: isLanding ? "fixed" : "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: isLanding
            ? scrolled || isOpen
              ? "var(--canvas)"           /* solid after scroll or when menu open */
              : "transparent"             /* transparent on hero */
            : "var(--canvas)",
          height: compact ? 52 : 64,
          borderBottom: isLanding && !scrolled && !isOpen ? "1px solid transparent" : undefined,
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
            {!isOpen && (
              <>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-muted bg-surface-card border border-hairline px-2 py-1 rounded-md">
                  <kbd>⌘</kbd><kbd>K</kbd>
                </span>
                <ThemeToggle />

                {/* CTA — only on landing page */}
                {isLanding && (
                  <Link
                    to="/lectures"
                    className="hidden sm:inline-block btn-primary transition-transform hover:-translate-y-0.5"
                  >
                    Start learning
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-md hover:bg-surface-card text-ink transition-colors border border-transparent hover:border-hairline"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden fixed inset-x-0 border-b border-hairline bg-canvas/95 backdrop-blur-md shadow-lg z-30 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          top: compact ? 52 : 64,
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        <nav className="flex flex-col px-6 py-6 gap-4 text-[15px] font-medium text-body">
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between pb-3 border-b border-hairline/40">
            <span className="text-muted text-[13px] font-mono uppercase tracking-wider">Switch Theme</span>
            <ThemeToggle />
          </div>

          <Link 
            to="/lectures" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Lectures
          </Link>
          <Link 
            to="/playground" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Playground
          </Link>
          <Link 
            to="/flowchart" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Flowcharts
          </Link>
          <Link 
            to="/cheatsheet" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Cheat Sheet
          </Link>
          <Link 
            to="/syllabus" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Syllabus
          </Link>
          <Link 
            to="/verify" 
            className="hover:text-ink transition-colors pb-2 border-b border-hairline/30"
          >
            Verify
          </Link>
          <Link 
            to="/about" 
            className="hover:text-ink transition-colors pb-2"
          >
            About
          </Link>
          
          {/* Mobile CTA inside menu if on landing page */}
          {isLanding && (
            <Link
              to="/lectures"
              className="btn-primary mt-2 text-center py-2.5 w-full justify-center"
            >
              Start learning
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
