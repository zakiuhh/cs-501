import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { flowcharts } from "@/data/flowcharts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowchartBuilder } from "@/components/FlowchartBuilder";
import { HelpCircle, CheckCircle2 } from "lucide-react";

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
              <h3 className="font-serif text-[17px] text-ink mb-3">Select Puzzle</h3>
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

            {/* Quick guide card */}
            <div className="bg-surface-card border border-hairline rounded-xl p-5">
              <h4 className="font-serif text-[16px] text-ink flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Guide to Shapes</span>
              </h4>
              <ul className="space-y-2.5 text-[13px] text-body leading-relaxed mt-2">
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-accent-teal/20 border border-accent-teal mt-0.5 shrink-0" />
                  <span><strong>Oval (Terminal):</strong> Start and End of the process.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 bg-indigo-400/20 border border-indigo-400 mt-0.5 shrink-0 skew-x-12" />
                  <span><strong>Parallelogram (I/O):</strong> Input read or Output prints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-primary/20 border border-primary mt-0.5 shrink-0" />
                  <span><strong>Rectangle (Process):</strong> Arithmetic computations or assignment steps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 bg-accent-amber/20 border border-accent-amber mt-0.5 shrink-0 rotate-45" />
                  <span><strong>Diamond (Decision):</strong> True/False branches.</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Active puzzle screen */}
          <main className="lg:col-span-8">
            <FlowchartBuilder puzzle={activePuzzle} />
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}
