import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { modules } from "@/data/modules";
import { practiceProblems, type Difficulty } from "@/data/practice";
import { getSolvedProblems, toggleSolved } from "@/lib/practiceProgress";
import { CheckCircle2, Circle, ChevronDown, Lightbulb, Code2 } from "lucide-react";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Problems - CS501 C++ Crashed" },
      { name: "description", content: "Coding practice problems for every CS501 module, with hints and worked solutions." },
    ],
  }),
  component: PracticePage,
});

const diffStyles: Record<Difficulty, string> = {
  easy: "bg-success/15 text-success",
  medium: "bg-accent-gold/15 text-accent-gold",
  hard: "bg-accent-rust/15 text-accent-rust",
};

function ProblemCard({ id, title, difficulty, prompt, hint, starter, solution, solved, onToggleSolved }: {
  id: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  hint: string;
  starter: string;
  solution: string;
  solved: boolean;
  onToggleSolved: () => void;
}) {
  const [open, setOpen] = useState<"none" | "hint" | "solution">("none");

  return (
    <div className="bg-surface-card border border-hairline rounded-lg p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={onToggleSolved}
            className="mt-0.5 cursor-pointer text-muted hover:text-success transition-colors"
            title={solved ? "Mark as unsolved" : "Mark as solved"}
          >
            {solved ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Circle className="w-5 h-5" />}
          </button>
          <div>
            <h3 className="font-serif text-xl text-ink">{title}</h3>
            <span className={`inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded-pill font-medium capitalize ${diffStyles[difficulty]}`}>
              {difficulty}
            </span>
          </div>
        </div>
      </div>

      <p className="text-body text-[14px] leading-relaxed mt-4 whitespace-pre-line">{prompt}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setOpen(open === "hint" ? "none" : "hint")}
          className="inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-lg bg-canvas border border-hairline hover:bg-surface-soft transition-colors cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" /> Hint
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === "hint" ? "rotate-180" : ""}`} />
        </button>
        <button
          onClick={() => setOpen(open === "solution" ? "none" : "solution")}
          className="inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-lg bg-canvas border border-hairline hover:bg-surface-soft transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5" /> Solution
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === "solution" ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open === "hint" && (
        <div className="mt-3 text-[13px] text-body bg-canvas border border-hairline rounded-md p-4 leading-relaxed">
          {hint}
        </div>
      )}

      {open === "solution" && (
        <pre className="mt-3 text-[12px] font-mono bg-surface-dark text-on-dark rounded-md p-4 overflow-x-auto leading-relaxed">
          {solution}
        </pre>
      )}
    </div>
  );
}

function PracticePage() {
  const [solved, setSolved] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  useEffect(() => {
    const refresh = () => setSolved(getSolvedProblems());
    refresh();
    window.addEventListener("pf-practice-changed", refresh);
    return () => window.removeEventListener("pf-practice-changed", refresh);
  }, []);

  const total = practiceProblems.length;
  const solvedCount = solved.length;
  const pct = total ? Math.round((solvedCount / total) * 100) : 0;

  const filtered = practiceProblems.filter((p) => difficultyFilter === "all" || p.difficulty === difficultyFilter);

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />

      <section className="border-b border-hairline">
        <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
          <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-3">CS501 · Practice</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ink">
            Practice <em className="italic text-primary">problems</em>.
          </h1>
          <p className="text-body text-lg mt-5 max-w-2xl leading-relaxed">
            {total} hands-on coding problems, one or two per module. Try to solve each one yourself before checking the hint or solution.
          </p>
        </div>
      </section>

      <section className="bg-surface-soft border-b border-hairline">
        <div className="max-w-[900px] mx-auto px-6 py-8 flex items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-muted text-[13px] mb-1">Your progress</p>
            <p className="text-ink font-serif text-2xl">{solvedCount} of {total} problems solved</p>
            <div className="mt-3 h-1.5 bg-hairline rounded-full overflow-hidden max-w-md">
              <div className="h-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="font-serif text-5xl text-primary">{pct}%</span>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["all", "easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all cursor-pointer capitalize ${
                  difficultyFilter === d ? "bg-primary text-on-primary shadow-sm" : "bg-surface-card text-body hover:bg-surface-cream-strong"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {modules.map((m) => {
            const problems = filtered.filter((p) => p.moduleId === m.id);
            if (problems.length === 0) return null;
            return (
              <div key={m.id} className="mb-10">
                <h2 className="font-serif text-2xl text-ink mb-1">{m.title}</h2>
                <p className="text-muted text-[13px] mb-4">{m.description}</p>
                <div className="space-y-4">
                  {problems.map((p, i) => (
                    <Reveal key={p.id} variant="up" delay={i * 50}>
                      <ProblemCard
                        {...p}
                        solved={solved.includes(p.id)}
                        onToggleSolved={() => toggleSolved(p.id)}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
