import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getProgress } from "@/lib/progress";
import { lectures } from "@/data/lectures";

export function ResumePill() {
    const [state, setState] = useState<{ id: string | null; isResume: boolean }>({
        id: null,
        isResume: false,
    });

    useEffect(() => {
        const refresh = () => {
            const p = getProgress();
            const last = p.lastVisited?.id;
            if (last && lectures.some((l) => l.id === last)) {
                setState({ id: last, isResume: true });
            } else {
                // first-time visitor: nudge to lecture 01
                setState({ id: lectures[0]?.id ?? null, isResume: false });
            }
        };
        refresh();
        window.addEventListener("pf-progress-changed", refresh);
        return () => window.removeEventListener("pf-progress-changed", refresh);
    }, []);

    if (!state.id) return null;
    const lecture = lectures.find((l) => l.id === state.id);
    if (!lecture) return null;

    return (
        <Link
            to="/lecture/$id"
            params={{ id: lecture.id }}
            className="group inline-flex items-center gap-2 sm:gap-3 max-w-full bg-surface-card border border-hairline rounded-pill pl-1.5 pr-3 sm:pr-4 py-1.5 text-[12px] sm:text-[13px] text-body hover:border-primary/40 hover:-translate-y-0.5 transition-all animate-blur-in-soft"
        >
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-pill font-mono text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {state.isResume ? "Resume" : "Start"}
            </span>
            <span className="truncate text-ink">
                <span className="text-muted font-mono mr-2">L{lecture.number}</span>
                {lecture.title}
            </span>
            <span className="text-primary shrink-0 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
    );
}
