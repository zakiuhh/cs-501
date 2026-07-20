import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { flowcharts } from "@/data/flowcharts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowchartBuilder } from "@/components/FlowchartBuilder";
import { HelpCircle, CheckCircle2, Monitor } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/flowchart")({
  head: () => ({
    meta: [
      { title: "Flowchart Puzzles - CS501" },
      { name: "description", content: "Interactive algorithm flowchart builder puzzles for C++ Programming Fundamentals." },
    ],
  }),
  component: FlowchartGamePage,
});

function FlowchartGamePage() {
  const [activeId, setActiveId] = useState(flowcharts[0]?.id);
  const activePuzzle = flowcharts.find((f) => f.id === activeId) || flowcharts[0];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />

      {/* ── Mobile gate ─────────────────────────────────────────── */}
      <div className="flex md:hidden flex-1 flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 py-16 relative overflow-hidden">
        {/* Decorative background orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full">
          {/* Icon card */}
          <div className="w-24 h-24 rounded-3xl bg-surface-card border border-hairline flex items-center justify-center shadow-md">
            <Monitor className="w-11 h-11 text-primary" />
          </div>

          {/* Text block */}
          <div className="space-y-4 text-center">
            {/* Eyebrow */}
            <p className="text-muted text-[11px] tracking-[0.18em] uppercase font-medium">CS501 · Flowchart Puzzles</p>

            {/* Headline */}
            <h1 className="font-serif text-4xl text-ink leading-tight">
              Built for <em className="italic text-primary">bigger</em> screens.
            </h1>

            {/* Body */}
            <p className="text-body text-[15px] leading-relaxed">
              The drag-and-drop Flowchart Puzzle builder requires a mouse and a larger workspace to use properly.
            </p>
          </div>

          {/* URL chip */}
          <div className="w-full bg-surface-card border border-hairline rounded-xl px-5 py-4 flex flex-col gap-1 shadow-sm">
            <span className="text-muted text-[11px] uppercase tracking-widest font-medium">Open on desktop</span>
            <span className="font-mono text-primary text-[13px] font-semibold break-all">
              cs501.vercel.app/flowchart
            </span>
          </div>
        </div>
      </div>

      {/* ── Desktop layout ──────────────────────────────────────── */}
      <section className="hidden md:block max-w-[1200px] mx-auto px-6 py-14 w-full flex-1">
        <div className="mb-8">
          <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">CS501 · Practice Puzzles</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink">Flowchart Logic Puzzles</h1>
          <p className="text-body mt-3 max-w-2xl">
            Master algorithmic thinking by assembling program steps in the correct logical sequence.
            From basic conditionals to complex nested loops and validation systems - each puzzle builds your understanding of control flow structures essential for programming.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-8">
          {/* Sidebar Puzzle list */}
          <aside className="lg:col-span-4 space-y-3">
            <div className="bg-surface-card border border-hairline rounded-xl p-4">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-hairline/60">
                <h3 className="font-serif text-[17px] text-ink">Select Puzzle</h3>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted hover:text-primary transition-colors flex items-center gap-1.5 text-[12px] font-medium cursor-pointer py-1 px-2 rounded-md hover:bg-surface-soft border border-hairline">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Shapes Key</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-canvas border border-hairline max-w-md p-6 rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl text-ink flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        <span>Guide to Shapes</span>
                      </DialogTitle>
                      <DialogDescription className="text-body text-[13.5px] mt-1.5">
                        Geometric shapes indicate different actions within the flowchart algorithm logic:
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-3.5 text-[13.5px] text-body leading-relaxed mt-4">
                      <li className="flex items-start gap-3">
                        <span className="w-4 h-4 rounded-full bg-accent-teal/20 border-2 border-accent-teal mt-0.5 shrink-0" />
                        <span><strong>Oval (Terminal):</strong> Start and End of the process.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-4 h-4 bg-indigo-400/20 border-2 border-indigo-400 mt-0.5 shrink-0 skew-x-12" />
                        <span><strong>Parallelogram (I/O):</strong> Input readings or Output prints.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-4 h-4 rounded bg-primary/20 border-2 border-primary mt-0.5 shrink-0" />
                        <span><strong>Rectangle (Process):</strong> Mathematical processes, assignments, or computations.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-4 h-4 bg-accent-amber/20 border-2 border-accent-amber mt-0.5 shrink-0 rotate-45" />
                        <span><strong>Diamond (Decision):</strong> Yes/No branches testing true/false states.</span>
                      </li>
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>

              <ul className="space-y-2">
                {flowcharts.map((puzzle) => {
                  const isActive = puzzle.id === activeId;
                  return (
                    <li key={puzzle.id}>
                      <button
                        onClick={() => setActiveId(puzzle.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-all cursor-pointer ${
                          isActive 
                            ? "bg-primary text-on-primary shadow-md" 
                            : "bg-surface-soft text-ink hover:bg-surface-cream-strong"
                        }`}
                      >
                        <div className="font-serif text-[16px]">{puzzle.title}</div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Active puzzle screen */}
          <main className="lg:col-span-8 lg:sticky lg:top-[80px] self-start">
            <FlowchartBuilder puzzle={activePuzzle} />
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}
