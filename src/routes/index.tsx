import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealFooter } from "@/components/RevealFooter";
import { FloatingIllustrations } from "@/components/FloatingIllustrations";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ResumePill } from "@/components/ResumePill";
import { CertificateProgress } from "@/components/CertificateProgress";
import { Testimonials } from "@/components/Testimonials";
import { useRef, useEffect } from "react";
import { lectures } from "@/data/lectures";
import { drawCertificateCanvas } from "@/lib/export";
import certCream from "@/assets/cert-cream.png";
import certDark from "@/assets/cert-dark.png";
import certSlate from "@/assets/cert-slate.png";
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

function MiniCertificate({ image, rotation, translate, zIndex, alt }: { image: string; rotation: string; translate: string; zIndex: string; alt: string }) {
  return (
    <div
      className="absolute w-[240px] sm:w-[300px] md:w-[380px] shadow-2xl rounded-lg border border-hairline bg-canvas transition-all duration-500 ease-out hover:rotate-0 hover:translate-y-[-12px] hover:z-50 hover:scale-105 select-none"
      style={{ transform: `rotate(${rotation}) ${translate}`, zIndex: zIndex, aspectRatio: "1600/1131" }}
    >
      <img src={image} alt={alt} className="w-full h-auto block rounded-lg pointer-events-none" />
    </div>
  );
}

function StackedCertificates() {
  return (
    <div className="relative w-full h-[200px] sm:h-[280px] md:h-[340px] flex items-center justify-center max-w-[500px] mx-auto select-none mt-8 md:mt-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent-teal/15 blur-3xl rounded-full scale-110 pointer-events-none" />
      <MiniCertificate image={certSlate} alt="CS501 Certificate (Slate Theme)" rotation="-6deg" translate="translate(-25px, 20px)" zIndex="10" />
      <MiniCertificate image={certDark} alt="CS501 Certificate (Midnight Theme)" rotation="4deg" translate="translate(25px, -10px)" zIndex="20" />
      <MiniCertificate image={certCream} alt="CS501 Certificate (Warm Editorial Theme)" rotation="-2deg" translate="translate(0px, 0px)" zIndex="30" />
    </div>
  );
}

function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas overflow-hidden">
      <FloatingIllustrations />
      <RevealFooter footer={<Footer />}>
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

        {/* CERTIFICATE SHOWCASE */}
        <section className="py-20 md:py-28 border-b border-hairline">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 space-y-6">
              <Reveal variant="scale">
                <span className="inline-flex items-center text-[11.5px] tracking-[0.15em] uppercase text-muted bg-surface-soft px-3.5 py-1.5 rounded-pill font-mono">
                  Verified Accreditation
                </span>
              </Reveal>
              <Reveal variant="scale" delay={100}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
                  Earn a verified C++ completion credential.
                </h2>
              </Reveal>
              <Reveal variant="scale" delay={200}>
                <p className="text-body text-sm sm:text-base leading-relaxed">
                  Complete all learning slides, write and run C++ code, and pass assessments to unlock your certificate. Select from multiple premium designer themes and print as PDF or export PNG.
                </p>
              </Reveal>
              <Reveal variant="scale" delay={300}>
                <ul className="space-y-4 text-[13.5px] sm:text-[14px] text-body">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5 font-bold">1</span>
                    <div>
                      <strong className="text-ink">Multiple Premium Themes</strong>
                      <p className="text-muted text-[12.5px] mt-0.5">Select from Warm Editorial, Midnight Developer, Minimalist Slate, Ocean Breeze, and 60+ brand themes.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5 font-bold">2</span>
                    <div>
                      <strong className="text-ink">Online Verification Lookup</strong>
                      <p className="text-muted text-[12.5px] mt-0.5">Every credential has a unique ID registered in our Supabase backend for employers to verify.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5 font-bold">3</span>
                    <div>
                      <strong className="text-ink">Dual-Page PDF Export</strong>
                      <p className="text-muted text-[12.5px] mt-0.5">Export a full dossier containing your certificate and a complete curriculum transcript.</p>
                    </div>
                  </li>
                </ul>
              </Reveal>
              <Reveal variant="scale" delay={400} className="pt-2">
                <Link to="/lectures" className="btn-primary inline-flex items-center gap-1.5 cursor-pointer">
                  <span>Start earning your certificate</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>
            <div className="md:col-span-6 flex items-center justify-center py-8">
              <Reveal variant="scale" delay={300} className="w-full">
                <StackedCertificates />
              </Reveal>
            </div>
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
                    Stuck? Chat with <em className="italic text-primary">csHelper, our AI Assistant</em>.
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
      </div>
    </RevealFooter>
    </div>
  );
}
