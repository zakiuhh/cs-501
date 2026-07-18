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
    <div className="divide-y divide-hairline border-y border-hairline bg-canvas">
      {modules.map((m) => {
        const { done, total, pct } = getModuleProgress(m.id, completed);
        const firstLecture = lectures.find((l) => m.lectureIds.includes(l.id));
        return (
          <div
            key={m.id}
            className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-0 last:pb-0"
          >
            {/* Title / Description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-serif text-lg text-ink font-medium">{m.title}</h3>
                {pct === 100 && (
                  <span className="text-[10px] font-mono uppercase bg-success/10 text-success px-2 py-0.5 rounded-full font-semibold">
                    ✓ Complete
                  </span>
                )}
              </div>
              {!compact && (
                <p className="text-muted text-[13px] mt-1 leading-relaxed max-w-xl">{m.description}</p>
              )}
            </div>

            {/* Progress Bar & Actions */}
            <div className="flex items-center gap-6 shrink-0 w-full md:w-auto md:min-w-[300px] justify-between md:justify-end">
              <div className="flex-1 md:max-w-[200px]">
                <div className="flex justify-between text-[11px] font-mono text-muted mb-1.5">
                  <span>{pct}% Done</span>
                  <span>{done}/{total} Lectures</span>
                </div>
                <div className="h-1 bg-hairline rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              {firstLecture && (
                <Link
                  to="/lecture/$id"
                  params={{ id: firstLecture.id }}
                  className="btn-secondary whitespace-nowrap px-4 py-2 text-[12px] h-auto flex items-center gap-1 hover:translate-x-0.5 transition-all cursor-pointer border-none bg-surface-soft hover:bg-surface-cream-strong"
                >
                  <span>{pct === 100 ? "Review" : pct > 0 ? "Resume" : "Start"}</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
