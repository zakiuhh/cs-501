import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface RevealFooterProps {
  children: ReactNode;
  footer: ReactNode;
}

export function RevealFooter({ children, footer }: RevealFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile viewport (width < 768px) to safely fall back to standard layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up scroll progress detection scoped to the bottom spacer element area.
  // "start end": starts when top of spacerRef enters viewport bottom
  // "end end": finishes when bottom of spacerRef reaches viewport bottom (scrolled to end)
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end end"],
  });

  // Main page content scale: 1 -> 0.92
  const scale = useTransform(
    scrollYProgress,
    [0, 1], // Animates over the entire entry of the spacer
    [1, shouldReduceMotion ? 1 : 0.92]
  );

  // Main page content y-translate to lift it off the footer
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -35]
  );

  // Dynamic border radius for a "curling up" visual lift effect
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px 0px 12px 12px", shouldReduceMotion ? "0px 0px 12px 12px" : "0px 0px 48px 48px"]
  );

  // Footer opacity animation: 0 -> 1
  const footerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.95],
    [0, 1]
  );

  // Footer slide animation: 40px -> 0px
  const footerY = useTransform(
    scrollYProgress,
    [0.1, 0.95],
    [shouldReduceMotion ? 0 : 40, 0]
  );

  // Mobile Fallback layout: standard non-fixed layout with standard fade in scroll reveal
  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="relative z-10 bg-canvas overflow-hidden rounded-b-xl shadow-md">
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="relative z-0"
        >
          {footer}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full bg-surface-dark overflow-hidden isolate z-0">
      {/* Main page content container - lifts and curls up as footer reveals */}
      <motion.div
        style={{
          scale,
          y: contentY,
          borderRadius,
        }}
        className="relative z-20 bg-canvas overflow-hidden shadow-2xl origin-bottom"
      >
        {children}
      </motion.div>

      {/* Spacer containing a transparent layout-copy of the footer to establish height immediately on mount */}
      <div ref={spacerRef} className="w-full opacity-0 pointer-events-none select-none relative z-0">
        {footer}
      </div>

      {/* Fixed background footer revealed under the main content */}
      <motion.div
        ref={footerRef}
        style={{
          opacity: footerOpacity,
          y: footerY,
        }}
        className="fixed bottom-0 left-0 w-full z-10 pointer-events-auto"
      >
        {footer}
      </motion.div>
    </div>
  );
}
