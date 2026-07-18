import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { modules, getModuleProgress } from "@/data/modules";
import { getProgress } from "@/lib/progress";
import { lectures } from "@/data/lectures";

export function ModuleProgress({ compact = false }: { compact?: boolean }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setCompleted(getProgress().completed);
    refresh();
    window.addEventListener("pf-progress-changed", refresh);
    return () => window.removeEventListener("pf-progress-changed", refresh);
  }, []);

  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
      {modules.map((m) => {
        const { done, total, pct } = getModuleProgress(m.id, completed);
        const firstLecture = lectures.find((l) => m.lectureIds.includes(l.id));
        return (
          <div
            key={m.id}
            className="bg-surface-card rounded-lg p-5 border border-hairline card-lift"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg text-ink">{m.title}</h3>
              <span className="font-mono text-[12px] text-muted">{done}/{total}</span>
            </div>
            {!compact && (
              <p className="text-body text-[13px] mt-1 leading-relaxed">{m.description}</p>
            )}
            <div className="mt-3 h-1.5 bg-hairline rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className={pct === 100 ? "text-success" : "text-muted"}>
                {pct === 100 ? "✓ Module complete" : `${pct}% complete`}
              </span>
              {firstLecture && (
                <Link
                  to="/lecture/$id"
                  params={{ id: firstLecture.id }}
                  className="text-primary hover:translate-x-0.5 inline-block transition-transform"
                >
                  Start →
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
