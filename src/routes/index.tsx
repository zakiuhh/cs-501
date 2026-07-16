import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingIllustrations } from "@/components/FloatingIllustrations";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ResumePill } from "@/components/ResumePill";
import { CertificateProgress } from "@/components/CertificateProgress";
import { Testimonials } from "@/components/Testimonials";
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
    d: "Run C++17 directly in your browser. Write, compile, and execute instantly—no setup required.", 
    k: "01", 
    icon: Cpu 
  },
  { 
    t: "Visual Flowcharts", 
    d: "Drag and drop code blocks to build algorithms. Master loops and decisions visually.", 
    k: "02", 
    icon: Network 
  },
  { 
    t: "Interactive Slides & Quizzes", 
    d: "Bite-sized slides break down complex topics, paired with quizzes that save your scores locally.", 
    k: "03", 
    icon: BookOpen 
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
                An interactive browser course for C++ fundamentals. Learn concepts step-by-step, build visual flowcharts, and run live code blocks instantly with zero setup.
              </p>
              <div className="flex flex-wrap gap-3 mt-7 sm:mt-9 animate-blur-in-soft delay-700">
                <Link to="/lectures" className="btn-primary hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                  <span>Start learning</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/flowchart" className="btn-secondary hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                  <span>Try flowcharts</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
              <p className="mt-8 sm:mt-10 text-[12px] sm:text-[13px] text-muted animate-blur-in-soft delay-700">
                {lectures.length} lectures · interactive code editor · visual puzzles · free
              </p>
            </div>

            <div className="md:col-span-5 animate-blur-in delay-300">
              <div className="bg-surface-dark rounded-xl p-4 sm:p-6 border border-[#2a2825] card-lift">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-on-dark-soft text-[11px] font-mono">main.cpp</span>
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

        {/* CORE FEATURES */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
            <Reveal variant="left">
              <p className="text-muted text-[11px] sm:text-[12px] tracking-[0.15em] uppercase mb-3 font-mono">Why C++ Crashed</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl max-w-2xl text-ink">
                Built to help concepts stick.
              </h2>
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

            {/* Certificate showcase */}
            <Reveal variant="scale" className="mt-12 sm:mt-16">
              <div className="bg-surface-card rounded-xl p-5 sm:p-6 md:p-10 border border-hairline">
                <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  <div className="md:col-span-5 order-2 md:order-1">
                    <span className="font-mono text-[12px] text-muted">04</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ink mt-2">Earn recognition.</h3>
                    <p className="text-body mt-3 text-[14px] sm:text-base leading-relaxed">
                      Complete all curriculum lectures to unlock your database-verified completion certificate. Signed by the full team and exportable as PNG or PDF.
                    </p>
                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 text-[12px]">
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">PNG & PDF</span>
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">Database Verified</span>
                      <span className="bg-canvas border border-hairline text-muted px-2.5 py-1 rounded-pill">Team Signed</span>
                    </div>
                  </div>
                  <div className="md:col-span-7 order-1 md:order-2">
                    <div className="rounded-lg overflow-hidden border border-hairline shadow-xl shadow-ink/10 w-full">
                      <CertificatePreview />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PREVIEW LECTURES */}
        <section className="py-14 sm:py-20 bg-surface-soft border-y border-hairline">
          <div className="max-w-[1180px] mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
                <div>
                  <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2 font-mono">Curriculum</p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-ink">Get a head start.</h2>
                </div>
                <Link to="/lectures" className="text-link hover:translate-x-1 transition-transform inline-block">
                  All {lectures.length} lectures →
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
                    <p className="text-body text-[14px] mt-2 leading-relaxed line-clamp-2">{l.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="py-16 bg-surface-soft border-t border-b border-hairline overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <Reveal variant="left" className="md:col-span-5">
                <div>
                  <span className="text-primary text-[11px] tracking-[0.15em] uppercase font-mono mb-2 block">
                    AI Study Partner
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-ink leading-tight">
                    Stuck? Chat with <em className="italic text-primary">our AI Assistant</em>.
                  </h2>
                  <p className="text-body text-[14px] sm:text-base leading-relaxed mt-4">
                    Need help understanding a recursive call stack, debugging your loops, or designing a flowchart? Our AI chatbot is trained on the CS501 curriculum to guide you step-by-step.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-muted">
                    <span className="bg-canvas border border-hairline px-3 py-1 rounded-pill">CS501 Syllabus Expert</span>
                    <span className="bg-canvas border border-hairline px-3 py-1 rounded-pill">24/7 Coding Help</span>
                  </div>
                </div>
              </Reveal>
              <Reveal variant="right" delay={150} className="md:col-span-7 flex justify-center w-full">
                <div className="w-full max-w-[480px] bg-canvas border border-hairline rounded-xl p-2 shadow-lg">
                  <iframe 
                    src='https://interfaces.zapier.com/embed/chatbot/cmrm9rfd3007fzqj9wlkplw6e' 
                    height='550' 
                    width='100%' 
                    allow='clipboard-write *' 
                    style={{ border: "none" }}
                    className="w-full rounded-lg"
                    title="Zapier AI Chatbot"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Testimonials />

        <Footer />
      </div>
    </div>
  );
}
