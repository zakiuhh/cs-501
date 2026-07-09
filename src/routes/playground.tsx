import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { lectures } from "@/data/lectures";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CodePlayground } from "@/components/CodePlayground";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground - C++ Crashed" },
      { name: "description", content: "Run and explore every C++ playground from the CS501 course." },
    ],
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const withPg = lectures.filter((l) => l.playground);
  const [activeId, setActiveId] = useState(withPg[0]?.id);
  const active = withPg.find((l) => l.id === activeId);

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />
      <section className="max-w-[1200px] mx-auto px-6 py-14 w-full flex-1">
        <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">CS501 · Playground</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Run every example from the course.</h1>
        <p className="text-body mt-3 max-w-2xl">Pick a lecture - its code example loads into the simulated runtime. Click <em>Run</em> to see the output.</p>

        <div className="grid md:grid-cols-12 gap-6 mt-10">
          <aside className="md:col-span-4">
            <ul className="space-y-1.5">
              {withPg.map((l) => {
                const isActive = l.id === activeId;
                return (
                  <li key={l.id}>
                    <button
                      onClick={() => setActiveId(l.id)}
                      className={`w-full text-left px-4 py-3 rounded-md text-[14px] transition-all hover:translate-x-1 ${
                        isActive ? "bg-surface-dark text-on-dark" : "bg-surface-card text-ink hover:bg-surface-cream-strong"
                      }`}
                    >
                      <span className={`font-mono text-[11px] ${isActive ? "text-on-dark-soft" : "text-muted"} block`}>Lecture {l.number}</span>
                      <span className="font-serif text-[17px]">{l.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="md:col-span-8 md:sticky md:top-[80px] self-start">
            {active?.playground ? (
              <div>
                <h2 className="font-serif text-2xl text-ink mb-2">{active.title}</h2>
                <p className="text-body text-[14px] mb-4">{active.playground.description}</p>
                <CodePlayground
                  key={active.id}
                  code={active.playground.code}
                  output={active.playground.output}
                  description={active.playground.description}
                />
                <Link to="/lecture/$id" params={{ id: active.id }} className="text-link mt-5 inline-block">
                  Open full lecture →
                </Link>
              </div>
            ) : (
              <p className="text-muted">No playground selected.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
