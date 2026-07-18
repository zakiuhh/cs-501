import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lectures } from "@/data/lectures";
import { modules, getModuleProgress } from "@/data/modules";
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

      <section className="py-12 border-b border-hairline bg-surface-soft/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">Dashboard</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">Progress & Certification</h2>

          <div className="bg-surface-card border border-hairline rounded-xl p-6 md:p-8 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Stacked Progress-bar List (Modules) */}
              <div className="lg:col-span-6 flex flex-col gap-6 w-full">
                <div>
                  <h3 className="font-serif text-xl text-ink font-medium">Progress by Module</h3>
                  <p className="text-body text-[13px] text-muted mt-1">Completion tracking for each of the 8 curriculum modules.</p>
                </div>
                
                <div className="space-y-4">
                  {modules.map((m) => {
                    const { done, total, pct } = getModuleProgress(m.id, progress.completed);
                    return (
                      <div key={m.id} className="group">
                        <div className="flex items-center justify-between text-[13px] mb-1.5">
                          <span className="font-serif text-[15px] text-ink group-hover:text-primary transition-colors">{m.title}</span>
                          <span className="font-mono text-[12px] text-muted">{done}/{total} ({pct}%)</span>
                        </div>
                        <div className="h-1.5 bg-hairline rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-700" 
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider for larger screens */}
              <div className="hidden lg:block w-[1px] bg-hairline self-stretch" />

              {/* Right Column: Certification Progress */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                <div>
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <h3 className="font-serif text-xl text-ink font-medium">Course Certificate</h3>
                    <span className="font-serif text-4xl text-primary">{pct}%</span>
                  </div>
                  <p className="text-body text-[13px] text-muted mt-1 leading-relaxed">
                    {pct === 100 
                      ? "Congratulations! You have completed the CS501 course. Generate your verified certificate below." 
                      : `Complete all 27 lectures to unlock your credential. Current progress: ${completed}/${total} lectures.`
                    }
                  </p>
                </div>

                <div className="h-2 bg-hairline rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-700" 
                    style={{ width: `${pct}%` }} 
                  />
                </div>

                {/* Import/Export & Certificate Actions */}
                <ProgressActions minimal />
              </div>

            </div>
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

          {(() => {
            const categorizedIds = new Set(modules.flatMap((m) => m.lectureIds));
            const uncategorizedLectures = lectures.filter((l) => !categorizedIds.has(l.id)).filter((l) => {
              if (filter === "starred") {
                return progress.bookmarks?.includes(l.id);
              }
              return true;
            });

            // Group structure
            const groups = modules.map((m) => {
              const items = m.lectureIds
                .map((id) => lectures.find((l) => l.id === id))
                .filter((l): l is NonNullable<typeof l> => !!l)
                .filter((l) => {
                  if (filter === "starred") {
                    return progress.bookmarks?.includes(l.id);
                  }
                  return true;
                });
              return { ...m, items };
            }).filter(g => g.items.length > 0);

            if (uncategorizedLectures.length > 0) {
              groups.push({
                id: "other",
                title: "Other Topics",
                description: "Additional concepts and supplemental guides.",
                lectureIds: uncategorizedLectures.map((l) => l.id),
                items: uncategorizedLectures
              });
            }

            const totalFilteredCount = groups.reduce((acc, g) => acc + g.items.length, 0);

            if (totalFilteredCount === 0) {
              return (
                <div className="text-center py-16 bg-surface-card border border-hairline rounded-xl max-w-md mx-auto p-6">
                  <Star className="w-10 h-10 text-muted mx-auto mb-3 opacity-40" />
                  <p className="font-serif text-xl text-ink">No bookmarked lectures</p>
                  <p className="text-body text-[13px] mt-2 leading-relaxed">
                    {filter === "starred" 
                      ? "Star lectures from the catalog to keep them pinned here for quick revision."
                      : "No lectures matched."}
                  </p>
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-12 sm:gap-16">
                {groups.map((group, groupIdx) => {
                  const completedCount = group.items.filter(l => progress.completed.includes(l.id)).length;
                  const totalCount = group.items.length;
                  const isDone = completedCount === totalCount;

                  return (
                    <div key={group.id} className="animate-blur-in-soft" style={{ animationDelay: `${groupIdx * 100}ms` }}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-3 border-b border-hairline/60">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-2xl sm:text-3xl text-ink">{group.title}</h3>
                          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
                            isDone 
                              ? "bg-success/10 text-success font-medium" 
                              : "bg-surface-cream-strong text-muted"
                          }`}>
                            {isDone ? "Completed" : `${completedCount}/${totalCount} Completed`}
                          </span>
                        </div>
                        <p className="text-body text-[13px] sm:text-sm text-muted max-w-xl">{group.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        {group.items.map((l, i) => {
                          const done = progress.completed.includes(l.id);
                          const isStarred = progress.bookmarks?.includes(l.id);
                          const dark = i % 3 === 1;
                          return (
                            <Link
                              key={l.id}
                              to="/lecture/$id"
                              params={{ id: l.id }}
                              className={`group block rounded-lg p-7 card-lift ${
                                dark
                                  ? "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated"
                                  : "bg-surface-card text-ink hover:bg-surface-cream-strong"
                              }`}
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
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      <Footer />
    </div>
  );
}
