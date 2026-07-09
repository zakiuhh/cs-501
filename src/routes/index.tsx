import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingIllustrations } from "@/components/FloatingIllustrations";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ResumePill } from "@/components/ResumePill";
import { CertificateProgress } from "@/components/CertificateProgress";
import { useRef, useEffect } from "react";
import { lectures } from "@/data/lectures";
import { drawCertificateCanvas } from "@/lib/export";
import { 
  ChevronRight, 
  ArrowUpRight, 
  Cpu, 
  Network, 
  BookOpen, 
  FileSpreadsheet, 
  Bookmark, 
  Award,
  Play
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "C++ Crashed - CS501 Interactive Course" },
      { name: "description", content: "Learn CS501 C++ as an interactive experience - slides, code playgrounds, quizzes, and progress tracking in a warm editorial interface." },
    ],
  }),
  component: Landing,
});

const features = [
  { 
    t: "Live C++ Compiler", 
    d: "Built-in WebAssembly-powered compiler runs C++17 code directly in your browser. Write, compile, and execute instantly - no setup required.", 
    k: "01", 
    icon: Cpu 
  },
  { 
    t: "Interactive Flowchart Puzzles", 
    d: "Drag-and-drop algorithm blocks to build complete program flows. Master logic structures, loops, and decision-making with 8+ challenging puzzles.", 
    k: "02", 
    icon: Network 
  },
  { 
    t: "Rich Slides & Inline Quizzes", 
    d: "Beautifully designed slides break down complex topics into digestible chunks. Test comprehension with embedded quizzes after every key concept.", 
    k: "03", 
    icon: BookOpen 
  },
  { 
    t: "Comprehensive Cheat Sheet", 
    d: "Quick-reference guide covering C++ syntax, data types, operators, control structures, and common patterns - all in one searchable page.", 
    k: "04", 
    icon: FileSpreadsheet 
  },
  { 
    t: "Progress Tracking & Sync", 
    d: "Bookmark lectures for review. Export and import your complete progress as JSON to continue learning across any device seamlessly.", 
    k: "05", 
    icon: Bookmark 
  },
  { 
    t: "Earn Your Certificate", 
    d: "Complete all modules to unlock a personalized certificate of achievement. Download as high-resolution PNG and showcase your accomplishment.", 
    k: "06", 
    icon: Award 
  },
];

function Headline() {
  const words = ["C++,", "crashed", "into", "something", "you", "can", "actually", "read."];
  return (
    <h1 className="font-serif text-[40px] sm:text-5xl md:text-[80px] leading-[1.05] md:leading-[1.02] text-ink mt-5 sm:mt-6 blur-words">
      {words.map((w, i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 90}ms` }}
          className={w === "crashed" ? "italic text-primary mr-2 sm:mr-3" : "mr-2 sm:mr-3"}
        >
          {w}
        </span>
      ))}
    </h1>
  );
}

function CertificatePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 1600;
    const H = 1131;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      drawCertificateCanvas(ctx, W, H, "Ada Lovelace");
    };

    draw();

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto block rounded-lg shadow-xl shadow-ink/10"
      style={{ aspectRatio: "1600/1131" }}
    />
  );
}

function Landing() {
  const stats = [
    { n: `${lectures.length}+`, l: "Interactive lectures" },
    { n: "100%", l: "Browser-based" },
    { n: "Free", l: "No account needed" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">
      <FloatingIllustrations />
      <div className="relative z-10 flex flex-col flex-1">
        <Nav />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl animate-float pointer-events-none" />
          <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-accent-teal/10 blur-3xl animate-float delay-300 pointer-events-none" />
          <div className="relative max-w-[1180px] mx-auto px-5 sm:px-6 pt-20 pb-14 sm:pt-24 sm:pb-20 md:pt-36 md:pb-32 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-muted bg-surface-card px-3 py-1 rounded-pill animate-blur-in-soft">
                  CS501 · Programming Fundamentals
                </span>
                <ResumePill />
              </div>
              <Headline />
              <p className="text-body text-base sm:text-lg mt-5 sm:mt-7 max-w-xl leading-relaxed animate-blur-in-soft delay-500">
                Master C++ Programming Fundamentals through an interactive learning journey. Engage with slides, write and execute code, solve flowchart puzzles, and test your knowledge - all seamlessly integrated in one platform.
              </p>
              <div className="flex flex-wrap gap-3 mt-7 sm:mt-9 animate-blur-in-soft delay-700">
                <Link to="/lectures" className="btn-primary hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                  <span>Enter the lectures</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/flowchart" className="btn-secondary hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                  <span>Play flowcharts</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
                <Link to="/playground" className="btn-secondary hover:-translate-y-0.5 hidden sm:inline-flex items-center gap-1.5 cursor-pointer">
                  <span>Open playground</span>
                </Link>
              </div>
              <p className="mt-8 sm:mt-10 text-[12px] sm:text-[13px] text-muted animate-blur-in-soft delay-700">
                {lectures.length} interactive lectures · 8 flowchart puzzles · real-time C++ compiler · progress tracking
              </p>
            </div>

            <div className="md:col-span-5 animate-blur-in delay-300">
              <div className="bg-surface-dark rounded-xl p-4 sm:p-6 border border-[#2a2825] card-lift">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-on-dark-soft text-[11px] font-mono">welcome.cpp</span>
                </div>
                <pre className="text-on-dark font-mono text-[12px] sm:text-[13.5px] leading-relaxed whitespace-pre overflow-x-auto">
                  {`#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to CS501";
    return 0;
}`}
                </pre>
                <div className="mt-4 pt-4 border-t border-[#2a2825] text-[11px] sm:text-[12px] text-on-dark-soft font-mono">
                  <span className="text-success">●</span> Compiled · Welcome to CS501
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b border-hairline bg-surface-soft">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-6 py-7 sm:py-10 grid grid-cols-3 gap-3 sm:gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.l} variant="scale" delay={i * 120} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary">{s.n}</div>
                <div className="text-muted text-[11px] sm:text-[13px] mt-1">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
            <Reveal variant="left">
              <p className="text-muted text-[11px] sm:text-[12px] tracking-[0.15em] uppercase mb-3">Why C++ Crashed</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl max-w-2xl text-shimmer">
                Learning by doing, not just reading.
              </h2>
              <p className="text-body mt-3 sm:mt-4 max-w-xl text-[14px] sm:text-base">
                Every feature is crafted to transform passive reading into active learning - making C++ fundamentals stick through hands-on practice.
              </p>
            </Reveal>

            <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.k} delay={i * 100} className="bg-surface-card rounded-lg p-5 sm:p-7 card-lift flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[12px] text-muted">{f.k}</span>
                        <Icon className="w-5 h-5 text-primary opacity-80" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ink">{f.t}</h3>
                      <p className="text-body mt-2.5 text-[14px] leading-relaxed">{f.d}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Certificate progress tracker (live) */}
            <Reveal variant="scale" className="mt-12 sm:mt-16">
              <CertificateProgress />
            </Reveal>

            {/* Certificate showcase */}
            <Reveal variant="scale" className="mt-8 sm:mt-12">
              <div className="bg-surface-card rounded-xl p-5 sm:p-6 md:p-10 border border-hairline">
                <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  <div className="md:col-span-5">
                    <span className="font-mono text-[12px] text-muted">07</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ink mt-2">Complete the journey - earn recognition.</h3>
                    <p className="text-body mt-3 text-[14px] sm:text-base leading-relaxed">
                      Master all modules to unlock your personalized certificate of completion. Beautifully designed to match the course aesthetic, download it as high-resolution PNG ready for LinkedIn, portfolios, or printing.
                    </p>
                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 text-[12px]">
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">PNG · retina</span>
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">Light & dark</span>
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">Your name on it</span>
                    </div>
                    <Link to="/lectures" className="text-link mt-5 sm:mt-6 inline-flex hover:translate-x-1 transition-transform items-center gap-1">
                      <span>See sample on the Lectures page</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="md:col-span-7">
                    <div className="rounded-lg overflow-hidden border border-hairline shadow-xl shadow-ink/10 animate-tilt origin-center">
                      <CertificatePreview />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PREVIEW LECTURES */}
        <section className="py-20 bg-surface-soft border-y border-hairline">
          <div className="max-w-[1180px] mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
                <div>
                  <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">Start anywhere</p>
                  <h2 className="font-serif text-4xl md:text-5xl text-ink">First few lectures.</h2>
                </div>
                <Link to="/lectures" className="text-link hover:translate-x-1 transition-transform inline-block">
                  See all {lectures.length} →
                </Link>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {lectures.slice(0, 3).map((l, i) => (
                <Reveal key={l.id} variant="scale" delay={i * 120}>
                  <Link
                    to="/lecture/$id"
                    params={{ id: l.id }}
                    className="block bg-canvas rounded-lg p-6 card-lift group"
                  >
                    <span className="font-mono text-[12px] text-muted">Lecture {l.number}</span>
                    <h3 className="font-serif text-xl mt-2 text-ink group-hover:text-primary transition-colors">{l.title}</h3>
                    <p className="text-body text-[14px] mt-2 leading-relaxed line-clamp-3">{l.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ZENITH C++ */}
        <section className="py-16 bg-surface-soft border-y border-hairline">
          <div className="max-w-[1180px] mx-auto px-6">
            <Reveal variant="scale">
              <a
                href="https://zenith-cpp.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="block bg-surface-dark text-on-dark rounded-xl p-10 md:p-12 card-lift hover:bg-surface-dark-elevated transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="flex-1">
                    <p className="text-primary text-[12px] tracking-[0.15em] uppercase font-mono mb-3">
                      Companion tool · External
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-on-dark group-hover:text-primary transition-colors">
                      Zenith C++ - Your Complete Web IDE
                    </h2>
                    <p className="text-on-dark-soft mt-3 max-w-xl leading-relaxed">
                      Ready for more advanced projects? Zenith C++ offers a full-featured browser IDE with multi-file support, advanced debugging, and a professional development environment - no installation required.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Magnetic strength={0.5}>
                      <span className="bg-primary text-on-primary px-5 py-3 rounded-md font-medium text-[14px] whitespace-nowrap inline-block flex items-center gap-1">
                        <span>Open Zenith C++</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </Magnetic>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-[1180px] mx-auto px-6">
            <Reveal variant="scale">
              <div className="bg-primary text-on-primary rounded-xl p-12 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 card-lift">
                <div>
                  <h2 className="font-serif text-3xl md:text-[44px] leading-tight max-w-lg">Start your C++ journey today</h2>
                  <p className="mt-3 text-[15px] opacity-90 max-w-lg">
                    No account, no installation, no barriers. Jump straight into interactive learning and write your first C++ program within minutes. Or, <Link to="/verify" className="underline hover:text-white/80 transition-colors">verify a completion certificate</Link>.
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link to="/lectures" className="bg-canvas text-ink px-6 py-3 rounded-md font-medium text-[14px] hover:bg-surface-card whitespace-nowrap transition-transform hover:-translate-y-0.5 cursor-pointer">
                    Browse lectures
                  </Link>
                  <Link to="/playground" className="bg-surface-dark text-on-dark px-6 py-3 rounded-md font-medium text-[14px] hover:bg-surface-dark-elevated whitespace-nowrap transition-transform hover:-translate-y-0.5 cursor-pointer">
                    Try the playground
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
