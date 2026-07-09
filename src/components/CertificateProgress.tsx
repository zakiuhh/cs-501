import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { modules, getModuleProgress } from "@/data/modules";
import { getProgress } from "@/lib/progress";
import { lectures } from "@/data/lectures";

export function CertificateProgress() {
    const [completed, setCompleted] = useState<string[]>([]);

    useEffect(() => {
        const refresh = () => setCompleted(getProgress().completed);
        refresh();
        window.addEventListener("pf-progress-changed", refresh);
        return () => window.removeEventListener("pf-progress-changed", refresh);
    }, []);

    const moduleStats = modules.map((m) => ({
        m,
        ...getModuleProgress(m.id, completed),
    }));
    const doneModules = moduleStats.filter((s) => s.pct === 100).length;
    const totalModules = modules.length;
    const overallPct = totalModules
        ? Math.round((doneModules / totalModules) * 100)
        : 0;
    const unlocked = doneModules === totalModules && totalModules > 0;
    const lecturesDone = completed.length;
    const lecturesTotal = lectures.length;

    return (
        <div className="bg-surface-card border border-hairline rounded-xl p-5 sm:p-7 md:p-9">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="min-w-0">
                    <p className="text-muted text-[11px] sm:text-[12px] tracking-[0.15em] uppercase font-mono mb-2">
                        Certificate progress
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-tight">
                        {unlocked
                            ? "Your certificate is unlocked."
                            : `Finish all ${totalModules} modules to unlock your certificate.`}
                    </h3>
                    <p className="text-body text-[13px] sm:text-[14px] mt-2 leading-relaxed">
                        {unlocked
                            ? "Head to the Lectures page to download your personalised certificate."
                            : `${doneModules} of ${totalModules} modules complete · ${lecturesDone}/${lecturesTotal} lectures.`}
                    </p>
                </div>
                <div className="shrink-0 flex items-baseline gap-2 sm:gap-3">
                    <span className="font-serif text-5xl sm:text-6xl text-primary leading-none">
                        {overallPct}%
                    </span>
                    <span className="text-muted text-[11px] font-mono uppercase tracking-wider">
                        modules
                    </span>
                </div>
            </div>

            {/* overall bar */}
            <div className="mt-5 h-1.5 bg-hairline rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-700"
                    style={{ width: `${overallPct}%` }}
                />
            </div>

            {/* per-module grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {moduleStats.map(({ m, done, total, pct }) => {
                    const isDone = pct === 100;
                    return (
                        <div
                            key={m.id}
                            className={`rounded-lg p-3 sm:p-4 border transition-colors ${isDone
                                    ? "border-success/40 bg-success/5"
                                    : pct > 0
                                        ? "border-primary/30 bg-canvas"
                                        : "border-hairline bg-canvas"
                                }`}
                        >
                            <div className="flex items-baseline justify-between gap-2">
                                <p className="font-serif text-[14px] sm:text-[15px] text-ink truncate">
                                    {m.title}
                                </p>
                                <span className="font-mono text-[10px] sm:text-[11px] text-muted shrink-0">
                                    {done}/{total}
                                </span>
                            </div>
                            <div className="mt-2 h-1 bg-hairline rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-700 ${isDone ? "bg-success" : "bg-primary"
                                        }`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <p
                                className={`mt-1.5 text-[11px] font-mono ${isDone ? "text-success" : "text-muted"
                                    }`}
                            >
                                {isDone ? "✓ Done" : `${pct}%`}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link
                    to="/lectures"
                    className={unlocked ? "btn-primary" : "btn-secondary"}
                >
                    {unlocked ? "Download certificate →" : "Continue lectures →"}
                </Link>
                {!unlocked && (
                    <span className="inline-flex items-center text-[12px] text-muted font-mono">
                        🔒 Certificate unlocks at 100%
                    </span>
                )}
            </div>
        </div>
    );
}
