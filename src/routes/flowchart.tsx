import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { flowcharts } from "@/data/flowcharts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowchartBuilder } from "@/components/FlowchartBuilder";
import { HelpCircle, CheckCircle2 } from "lucide-react";
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
      <section className="max-w-[1200px] mx-auto px-6 py-14 w-full flex-1">
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
