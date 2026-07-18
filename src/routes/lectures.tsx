import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lectures } from "@/data/lectures";
import { modules, getModuleProgress } from "@/data/modules";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProgress, toggleBookmark } from "@/lib/progress";
import { ProgressActions } from "@/components/ProgressActions";
import { StreakBadge } from "@/components/StreakBadge";
import { Star, ChevronDown, CheckCircle2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/lectures")({
  head: () => ({
    meta: [
      { title: "Lectures - C++ Crashed (CS501)" },
      { name: "description", content: "Browse all CS501 C++ lectures - interactive slides, quizzes, and code playgrounds." },
    ],
  }),
  component: LecturesPage,
});

function CodingDoodle() {
  return (
    <div className="relative mt-8 bg-surface-soft/40 border border-hairline rounded-xl p-6 overflow-visible min-h-[160px] flex items-center justify-between gap-6 group/doodle select-none animate-blur-in-soft">
      {/* Text Content */}
      <div className="flex-1 max-w-[60%] z-10">
        <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider block mb-1">
          Coding Session
        </span>
        <h4 className="font-serif text-lg text-ink leading-snug">
          "Talk is cheap. Show me the code."
        </h4>
        <p className="text-[12px] text-muted mt-2 leading-relaxed font-sans">
          Practice is the only way to master C++. Expand a module card below to browse the curriculum timeline.
        </p>
      </div>

      {/* Doodle SVGs container popping out of the card */}
      <div className="absolute right-4 -bottom-6 -top-6 w-36 sm:w-44 flex items-center justify-center overflow-visible pointer-events-none">
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          className="w-full h-full text-ink/20 dark:text-ink/10 transition-transform duration-500 group-hover/doodle:scale-105 group-hover/doodle:rotate-2 overflow-visible"
        >
          {/* Sparkles / Stars (colored in primary) */}
          <path 
            d="M20,40 Q30,40 30,30 Q30,40 40,40 Q30,40 30,50 Q30,40 20,40 Z" 
            fill="var(--primary)" 
            className="opacity-70 animate-pulse"
          />
          <path 
            d="M165,30 Q170,30 170,25 Q170,30 175,30 Q170,30 170,35 Q170,30 165,30 Z" 
            fill="var(--primary)" 
            className="opacity-60"
          />
          
          {/* Laptop Doodle */}
          <g className="text-ink" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Screen */}
            <rect x="50" y="80" width="90" height="60" rx="4" fill="var(--canvas)" />
            {/* Screen Inner Line */}
            <rect x="55" y="85" width="80" height="45" rx="1" fill="none" />
            {/* Keyboard base */}
            <path d="M40,140 L150,140 L160,152 L30,152 Z" fill="var(--surface-cream)" />
            {/* Trackpad */}
            <rect x="85" y="145" width="20" height="5" rx="1" fill="none" />
            {/* Binary elements in the screen */}
            <path d="M65,95 L75,95 M65,103 L85,103 M65,111 L70,111" strokeWidth="1.5" />
            <path d="M110,95 L125,95 M105,103 L125,103" strokeWidth="1.5" stroke="var(--primary)" />
          </g>

          {/* Coffee Mug Doodle */}
          <g className="text-ink" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Cup Body */}
            <path d="M150,130 L170,130 L168,148 Q167,154 159,154 L157,154 Q149,154 148,148 Z" fill="var(--canvas)" />
            {/* Handle */}
            <path d="M170,135 Q178,135 178,142 Q178,147 169,148" fill="none" />
            {/* Steam lines */}
            <path d="M154,124 Q156,120 154,116" fill="none" strokeWidth="1.5" className="animate-pulse" />
            <path d="M160,124 Q162,120 160,116" fill="none" strokeWidth="1.5" className="animate-pulse" />
            <path d="M166,124 Q168,120 166,116" fill="none" strokeWidth="1.5" className="animate-pulse" />
          </g>

          {/* Code tags & brackets floating around */}
          {/* Braces { } */}
          <text 
            x="20" 
            y="110" 
            fill="currentColor" 
            className="font-serif text-3xl font-light opacity-30 select-none"
            transform="rotate(-15, 20, 110)"
          >
            &#123;
          </text>
          <text 
            x="165" 
            y="95" 
            fill="currentColor" 
            className="font-serif text-3xl font-light opacity-30 select-none"
            transform="rotate(15, 165, 95)"
          >
            &#125;
          </text>

          {/* Tag </ > */}
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-25">
            <path d="M15,145 L5,150 L15,155" />
            <path d="M22,142 L12,158" />
            <path d="M25,145 L35,150 L25,155" />
          </g>

          {/* Gears */}
          <g stroke="currentColor" strokeWidth="1.5" fill="none" className="opacity-20 animate-spin" style={{ transformOrigin: '110px 45px', animationDuration: '20s' }}>
            <circle cx="110" cy="45" r="10" />
            <path d="M110,31 L110,35 M110,55 L110,59 M96,45 L100,45 M120,45 L124,45" />
            <path d="M100,35 L103,38 M120,55 L117,52 M100,55 L103,52 M120,35 L117,38" />
          </g>
          
          {/* Hash tag */}
          <text 
            x="135" 
            y="65" 
            fill="var(--primary)" 
            className="font-sans text-xl font-bold opacity-30 select-none"
            transform="rotate(10, 135, 65)"
          >
            #
          </text>

          {/* Division symbol or operators */}
          <text 
            x="70" 
            y="45" 
            fill="currentColor" 
            className="font-mono text-lg font-bold opacity-20 select-none"
          >
            + +
          </text>
        </svg>
      </div>
    </div>
  );
}

function LecturesPage() {
  const [progress, setProgress] = useState({ 
    completed: [] as string[], 
    quizScores: {} as Record<string, { score: number; total: number }>,
    bookmarks: [] as string[]
  });
  const [filter, setFilter] = useState<"all" | "starred">("all");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "foundations": true
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
                <CodingDoodle />
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
            <div className="flex items-center gap-2 flex-wrap">
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

            if (groups.length === 0) {
              return (
                <div className="text-center py-16 bg-surface-card border border-hairline rounded-xl max-w-md mx-auto p-6">
                  <Star className="w-10 h-10 text-muted mx-auto mb-3 opacity-40" />
                  <p className="font-serif text-xl text-ink">No lectures found</p>
                  <p className="text-body text-[13px] mt-2 leading-relaxed">
                    {filter === "starred" 
                      ? "Star lectures from the catalog to keep them pinned here for quick revision."
                      : "No lectures match your criteria."}
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-6">
                {groups.map((group, index) => {
                  const isExpanded = !!expandedModules[group.id];
                  const completedLecturesCount = group.items.filter(l => progress.completed.includes(l.id)).length;
                  const totalLecturesCount = group.items.length;
                  const isModuleDone = completedLecturesCount === totalLecturesCount;

                  return (
                    <div 
                      key={group.id} 
                      className="bg-surface-card border border-hairline rounded-xl overflow-hidden shadow-sm transition-all duration-300 animate-blur-in-soft"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Header (Accordion Trigger) */}
                      <button
                        onClick={() => toggleModule(group.id)}
                        className="w-full text-left p-6 flex items-center justify-between gap-6 hover:bg-surface-cream-strong transition-colors cursor-pointer select-none border-none outline-none bg-transparent"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-serif text-2xl text-ink">{group.title}</h3>
                            <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
                              isModuleDone 
                                ? "bg-success/10 text-success font-medium" 
                                : "bg-surface-cream text-muted"
                            }`}>
                              {isModuleDone ? "✓ Module complete" : `${completedLecturesCount}/${totalLecturesCount} Completed`}
                            </span>
                          </div>
                          <p className="text-body text-[13px] sm:text-sm text-muted mt-2 max-w-2xl leading-relaxed">
                            {group.description}
                          </p>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-canvas border border-hairline flex items-center justify-center text-muted transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-primary border-primary/30" : ""
                        }`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>

                      {/* Expandable Body */}
                      {isExpanded && (
                        <div className="border-t border-hairline bg-surface-soft/20 px-6 sm:px-10 py-8">
                          <div className="relative pl-8 sm:pl-10 border-l-2 border-hairline/60 ml-2 py-2 space-y-8">
                            {group.items.map((l, lIdx) => {
                              const done = progress.completed.includes(l.id);
                              const isStarred = progress.bookmarks?.includes(l.id);

                              return (
                                <div key={l.id} className="relative group/lecture animate-blur-in-soft" style={{ animationDelay: `${lIdx * 30}ms` }}>
                                  
                                  {/* Timeline Node Icon */}
                                  <div className="absolute -left-[15px] sm:-left-[17px] top-[11px] flex items-center justify-center select-none">
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border bg-canvas flex items-center justify-center shadow-sm transition-all duration-300 group-hover/lecture:scale-110 z-10 ${
                                      done 
                                        ? "border-success bg-success/10 text-success" 
                                        : "border-hairline text-muted hover:border-primary/50"
                                    }`}>
                                      {done ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                                      ) : (
                                        <span className="font-mono text-[10px] sm:text-[11px]">{l.number}</span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Timeline Card */}
                                  <Link
                                    to="/lecture/$id"
                                    params={{ id: l.id }}
                                    className="block bg-surface-card border border-hairline rounded-xl p-4 sm:p-5 shadow-sm hover:border-primary/30 hover:bg-surface-cream-strong transition-all duration-300 card-lift"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                                      <h4 className="font-serif text-lg sm:text-xl text-ink group-hover/lecture:text-primary transition-colors font-medium">
                                        {l.title}
                                      </h4>

                                      <div className="flex items-center gap-2 self-start shrink-0">
                                        {done && (
                                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                                            Completed
                                          </span>
                                        )}
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleBookmark(l.id);
                                          }}
                                          className="p-1 rounded-md hover:bg-surface-soft text-muted hover:text-ink transition-colors cursor-pointer"
                                          title={isStarred ? "Remove Bookmark" : "Bookmark Lecture"}
                                        >
                                          <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-current text-accent-amber" : ""}`} />
                                        </button>
                                        <span className="text-[11px] text-muted font-mono">{l.duration}</span>
                                      </div>
                                    </div>

                                    <p className="text-body text-[13px] leading-relaxed max-w-3xl">
                                      {l.summary}
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-hairline/40">
                                      <div className="flex flex-wrap gap-1">
                                        {l.topics.map((topic) => (
                                          <span key={topic} className="text-[10px] px-2 py-0.5 rounded-pill bg-canvas text-muted border border-hairline">
                                            {topic}
                                          </span>
                                        ))}
                                      </div>
                                      <span className="text-[12px] font-medium text-primary group-hover/lecture:translate-x-1 transition-transform inline-flex items-center gap-1">
                                        Start Lecture →
                                      </span>
                                    </div>
                                  </Link>

                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
