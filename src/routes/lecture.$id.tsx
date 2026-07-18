import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { lectures } from "@/data/lectures";
import { getEnrichedLecture } from "@/data/enriched";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SlideView } from "@/components/SlideView";
import { CodePlayground } from "@/components/CodePlayground";
import { QuizBlock } from "@/components/QuizBlock";
import { markComplete, markVisited, getProgress } from "@/lib/progress";

export const Route = createFileRoute("/lecture/$id")({
  loader: ({ params }) => {
    const l = getEnrichedLecture(params.id);
    if (!l) throw notFound();
    return { lecture: l };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.lecture.title} - Claude++` },
      { name: "description", content: loaderData?.lecture.summary },
    ],
  }),
  component: LecturePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="text-center"><h1 className="font-serif text-3xl">Lecture not found</h1>
        <Link to="/" className="text-link mt-4 inline-block">← Back to syllabus</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-3xl text-ink">Something went wrong</h1>
        <p className="text-body mt-2 text-sm">{String(error.message ?? error)}</p>
        <Link to="/" className="btn-primary mt-6">Back to syllabus</Link>
      </div>
    </div>
  ),
});

type Tab = "slides" | "playground" | "quiz";

function LecturePage() {
  const { lecture } = Route.useLoaderData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("slides");
  const [slideIdx, setSlideIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => { setSlideIdx(0); setTab("slides"); setCompleted(getProgress().completed.includes(lecture.id)); markVisited(lecture.id); }, [lecture.id]);

  const idx = useMemo(() => lectures.findIndex((l) => l.id === lecture.id), [lecture.id]);
  const prev = idx > 0 ? lectures[idx - 1] : null;
  const next = idx < lectures.length - 1 ? lectures[idx + 1] : null;

  const goPrev = () => slideIdx > 0 && setSlideIdx((i) => i - 1);
  const goNext = () => slideIdx < lecture.slides.length - 1 && setSlideIdx((i) => i + 1);

  const finishLecture = () => { markComplete(lecture.id); setCompleted(true); };

  // Slide keyboard shortcuts: ← / → navigate, F fullscreen, Esc exits fullscreen
  useEffect(() => {
    if (tab !== "slides") return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") return; // let palette through
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        const el = slideRef.current;
        if (!el) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else el.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [tab, slideIdx, lecture.slides.length]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />

      {/* Lecture header */}
      <section className="border-b border-hairline">
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <Link to="/" className="text-muted text-[13px] hover:text-ink">← All lectures</Link>
          <div className="mt-4 flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-primary text-[12px] tracking-[0.15em] uppercase font-mono">Lecture {lecture.number} · {lecture.duration}</p>
              <h1 className="font-serif text-4xl md:text-[52px] leading-tight text-ink mt-3">{lecture.title}</h1>
              <p className="text-body text-lg mt-4 max-w-3xl leading-relaxed">{lecture.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {lecture.topics.map((t: string) => (
                  <span key={t} className="text-[12px] px-3 py-1 rounded-pill bg-surface-card text-ink">{t}</span>
                ))}
              </div>
            </div>
            {completed && (
              <span className="inline-flex items-center gap-2 text-success text-[13px] bg-success/10 px-3 py-1.5 rounded-pill border border-success/30">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Completed
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-canvas/95 backdrop-blur border-b border-hairline">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex gap-1 py-2">
            {([
              ["slides", `Slides · ${lecture.slides.length}`],
              ["playground", lecture.playground ? "Playground" : ""],
              ["quiz", `Quiz · ${lecture.quiz.length}`],
            ] as [Tab, string][]).filter((t: [Tab, string]) => t[1]).map(([k, label]: [Tab, string]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${tab === k ? "bg-surface-card text-ink" : "text-muted hover:text-ink"
                  }`}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-10">
        <div className="max-w-[1100px] mx-auto px-6">
          {tab === "slides" && (
            <>
              <div ref={slideRef} className={isFullscreen ? "bg-canvas p-12 h-full flex flex-col justify-center" : ""}>
                <SlideView slide={lecture.slides[slideIdx]} index={slideIdx} total={lecture.slides.length} />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button onClick={goPrev} disabled={slideIdx === 0} className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 text-sm sm:text-base">
                  ← Previous
                </button>
                <div className="flex-1 min-w-[120px] mx-2 sm:mx-4 flex flex-wrap items-center gap-1.5 justify-center">
                  {lecture.slides.map((_s: unknown, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${i === slideIdx ? "w-6 sm:w-8 bg-primary" : "w-1.5 bg-hairline hover:bg-muted-soft"}`}
                    />
                  ))}
                </div>
                {slideIdx < lecture.slides.length - 1 ? (
                  <button onClick={goNext} className="btn-primary px-3 py-2 text-sm sm:text-base">
                    Next →
                  </button>
                ) : (
                  <button onClick={() => setTab(lecture.playground ? "playground" : "quiz")} className="btn-primary px-3 py-2 text-sm sm:text-base">
                    {lecture.playground ? "To playground →" : "Take the quiz →"}
                  </button>
                )}
              </div>
              <div className="mt-6 text-center text-muted text-[11px] sm:text-[12px] font-mono flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 px-4">
                <span>← / → navigate</span>
                <span className="text-hairline hidden sm:inline">•</span>
                <span>F fullscreen</span>
                <span className="text-hairline hidden sm:inline">•</span>
                <span>Esc exit</span>
                <span className="text-hairline hidden sm:inline">•</span>
                <span>⌘K search</span>
              </div>
            </>
          )}

          {tab === "playground" && lecture.playground && (
            <div>
              <h2 className="font-serif text-3xl text-ink mb-4">Try it yourself</h2>
              <p className="text-body mb-6 max-w-2xl">The playground below shows the expected output of the lecture's example. Press <strong className="text-ink font-medium">Run</strong> to see what it prints.</p>
              <CodePlayground {...lecture.playground} />
              <div className="mt-8 text-right">
                <button onClick={() => setTab("quiz")} className="btn-primary">Take the quiz →</button>
              </div>
            </div>
          )}

          {tab === "quiz" && (
            <div>
              <h2 className="font-serif text-3xl text-ink mb-2">Test what you learned</h2>
              <p className="text-body mb-8">A few questions on the key ideas from this lecture.</p>
              <QuizBlock quiz={lecture.quiz} lectureId={lecture.id} />
              <div className="mt-10 pt-8 border-t border-hairline flex items-center justify-between gap-4">
                <button onClick={finishLecture} className="btn-secondary">
                  {completed ? "✓ Marked complete" : "Mark lecture complete"}
                </button>
                {next ? (
                  <button onClick={() => navigate({ to: "/lecture/$id", params: { id: next.id } })} className="btn-primary">
                    Next: {next.title} →
                  </button>
                ) : (
                  <Link to="/" className="btn-primary">Back to syllabus →</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Prev / next nav band */}
      <section className="border-t border-hairline mt-12">
        <div className="max-w-[1100px] mx-auto px-6 py-10 grid md:grid-cols-2 gap-4">
          {prev ? (
            <Link to="/lecture/$id" params={{ id: prev.id }} className="bg-surface-card rounded-lg p-6 hover:bg-surface-cream-strong">
              <p className="text-muted text-[12px] font-mono">← Previous · Lecture {prev.number}</p>
              <p className="font-serif text-xl text-ink mt-2">{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/lecture/$id" params={{ id: next.id }} className="bg-surface-card rounded-lg p-6 hover:bg-surface-cream-strong md:text-right">
              <p className="text-muted text-[12px] font-mono">Next · Lecture {next.number} →</p>
              <p className="font-serif text-xl text-ink mt-2">{next.title}</p>
            </Link>
          ) : <div />}
        </div>
      </section>

      <Footer />
    </div>
  );
}
