import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lectures } from "@/data/lectures";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProgress, toggleBookmark } from "@/lib/progress";
import { ModuleProgress } from "@/components/ModuleProgress";
import { ProgressActions } from "@/components/ProgressActions";
import { StreakBadge } from "@/components/StreakBadge";
import { Star } from "lucide-react";

export const Route = createFileRoute("/lectures")({
  head: () => ({
    meta: [
      { title: "Lectures - C++ Crashed (CS501)" },
      { name: "description", content: "Browse all CS501 C++ lectures - interactive slides, quizzes, and code playgrounds." },
    ],
  }),
  component: LecturesPage,
});

function LecturesPage() {
  const [progress, setProgress] = useState({ 
    completed: [] as string[], 
    quizScores: {} as Record<string, { score: number; total: number }>,
    bookmarks: [] as string[]
  });
  const [filter, setFilter] = useState<"all" | "starred">("all");

  useEffect(() => {
    const refresh = () => setProgress(getProgress());
    refresh();
    window.addEventListener("pf-progress-changed", refresh);
    return () => window.removeEventListener("pf-progress-changed", refresh);
  }, []);

  const completed = progress.completed.length;
  const total = lectures.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const filteredLectures = lectures.filter((l) => {
    if (filter === "starred") {
      return progress.bookmarks?.includes(l.id);
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />

      <section className="border-b border-hairline">
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <p className="text-muted text-[12px] tracking-[0.15em] uppercase animate-blur-in-soft">CS501 · Lectures</p>
            <StreakBadge />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-ink animate-blur-in">
            All <em className="italic text-primary">lectures</em>, end to end.
          </h1>
          <p className="text-body text-lg mt-5 max-w-2xl leading-relaxed animate-blur-in-soft delay-200">
            {total} lectures rebuilt as interactive sessions. Open any to read slides, run code, and take the quiz.
          </p>
        </div>
      </section>

      {completed > 0 && (
        <section className="bg-surface-soft border-b border-hairline animate-blur-in-soft">
          <div className="max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-muted text-[13px] mb-1">Your progress</p>
              <p className="text-ink font-serif text-2xl">{completed} of {total} lectures completed</p>
              <div className="mt-3 h-1.5 bg-hairline rounded-full overflow-hidden max-w-md">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <span className="font-serif text-5xl text-primary">{pct}%</span>
          </div>
        </section>
      )}

      <section className="py-12 border-b border-hairline">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">Modules</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">Progress by module</h2>
          <ModuleProgress />
          <div className="mt-10">
            <ProgressActions />
          </div>
        </div>
      </section>

      <section id="lectures" className="py-16 md:py-20 flex-1">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-hairline pb-4">
            <h2 className="font-serif text-3xl text-ink">Course Curriculum</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all cursor-pointer ${
                  filter === "all" ? "bg-primary text-on-primary shadow-sm" : "bg-surface-card text-body hover:bg-surface-cream-strong"
                }`}
              >
                All Lectures
              </button>
              <button
                onClick={() => setFilter("starred")}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === "starred" ? "bg-primary text-on-primary shadow-sm" : "bg-surface-card text-body hover:bg-surface-cream-strong"
                }`}
              >
                <Star className={`w-4 h-4 ${filter === "starred" ? "fill-current" : ""}`} />
                <span>Bookmarked ({progress.bookmarks?.length || 0})</span>
              </button>
            </div>
          </div>

          {filteredLectures.length === 0 ? (
            <div className="text-center py-16 bg-surface-card border border-hairline rounded-xl max-w-md mx-auto p-6">
              <Star className="w-10 h-10 text-muted mx-auto mb-3 opacity-40" />
              <p className="font-serif text-xl text-ink">No bookmarked lectures</p>
              <p className="text-body text-[13px] mt-2 leading-relaxed">
                {filter === "starred" 
                  ? "Star lectures from the catalog to keep them pinned here for quick revision."
                  : "No lectures matched."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredLectures.map((l, i) => {
                const done = progress.completed.includes(l.id);
                const isStarred = progress.bookmarks?.includes(l.id);
                const dark = i % 3 === 1;
                return (
                  <Link
                    key={l.id}
                    to="/lecture/$id"
                    params={{ id: l.id }}
                    style={{ animationDelay: `${Math.min(i, 10) * 60}ms` }}
                    className={`group block rounded-lg p-7 card-lift animate-blur-in-soft ${dark
                      ? "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated"
                      : "bg-surface-card text-ink hover:bg-surface-cream-strong"}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`font-mono text-[12px] ${dark ? "text-on-dark-soft" : "text-muted"}`}>
                        Lecture {l.number}
                      </span>
                      <div className="flex items-center gap-2.5">
                        {done && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-success">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" /> Completed
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(l.id);
                          }}
                          className={`p-1.5 rounded-md transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center ${
                            dark 
                              ? "hover:bg-surface-dark-soft text-on-dark-soft hover:text-on-dark" 
                              : "hover:bg-surface-soft text-muted hover:text-ink"
                          }`}
                          title={isStarred ? "Remove Bookmark" : "Bookmark Lecture"}
                        >
                          <Star className={`w-4 h-4 ${isStarred ? "fill-current text-accent-amber" : ""}`} />
                        </button>
                        <span className={`text-[12px] ${dark ? "text-on-dark-soft" : "text-muted"}`}>{l.duration}</span>
                      </div>
                    </div>
                    <h3 className={`font-serif text-2xl mb-2 transition-colors ${dark ? "text-on-dark group-hover:text-primary" : "text-ink group-hover:text-primary"}`}>{l.title}</h3>
                    <p className={`text-[14px] leading-relaxed ${dark ? "text-on-dark-soft" : "text-body"}`}>{l.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {l.topics.slice(0, 3).map((t) => (
                        <span key={t} className={`text-[11px] px-2.5 py-1 rounded-pill ${dark ? "bg-surface-dark-elevated text-on-dark-soft" : "bg-canvas text-muted border border-hairline"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 text-[13px] font-medium text-primary group-hover:translate-x-1 transition-transform inline-block">
                      Open lecture →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
