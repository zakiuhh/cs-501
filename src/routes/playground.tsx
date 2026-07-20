import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { lectures } from "@/data/lectures";
import { modules } from "@/data/modules";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CodePlayground } from "@/components/CodePlayground";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Build grouped structure: only modules that have at least one playground lecture
  const groups = modules
    .map((m) => ({
      ...m,
      items: m.lectureIds
        .map((id) => withPg.find((l) => l.id === id))
        .filter((l): l is NonNullable<typeof l> => !!l),
    }))
    .filter((g) => g.items.length > 0);

  // Pre-expand the group containing the initially-active lecture
  const initialOpen = groups
    .filter((g) => g.items.some((l) => l.id === activeId))
    .map((g) => g.id);
  const [openGroups, setOpenGroups] = useState<string[]>(initialOpen);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleSelect = (lectureId: string) => {
    setActiveId(lectureId);
    // Auto-expand the selected lecture's module group
    const group = groups.find((g) => g.items.some((l) => l.id === lectureId));
    if (group && !openGroups.includes(group.id)) {
      setOpenGroups((prev) => [...prev, group.id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />
      <section className="max-w-[1200px] mx-auto px-6 py-14 w-full flex-1">
        <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">CS501 · Playground</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Run every example from the course.</h1>
        <p className="text-body mt-3 max-w-2xl">Pick a lecture — its code example loads into the simulated runtime. Click <em>Run</em> to see the output.</p>

        <div className="grid md:grid-cols-12 gap-6 mt-10">
          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="md:col-span-4 space-y-4">
            {/* Grouped module accordion */}
            <div className="bg-surface-card border border-hairline rounded-xl overflow-hidden shadow-sm">
              {/* Sidebar header */}
              <div className="px-5 py-3.5 border-b border-hairline/60">
                <p className="text-muted text-[11px] tracking-[0.14em] uppercase font-medium">Select lecture</p>
              </div>

              <div className="divide-y divide-hairline/60">
                {groups.map((group) => {
                  const isOpen = openGroups.includes(group.id);
                  return (
                    <div key={group.id}>
                      {/* Module header (toggle) */}
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-surface-soft transition-colors duration-150 cursor-pointer"
                      >
                        <span className="font-serif text-[15px] text-ink leading-snug">{group.title}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-mono text-muted bg-surface-soft px-2 py-0.5 rounded-full border border-hairline">
                            {group.items.length}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-muted transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {/* Lecture list — animated open/close */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="bg-surface-soft/40 px-3 py-2.5 space-y-1">
                              {group.items.map((l) => {
                                const isActive = l.id === activeId;
                                return (
                                  <li key={l.id}>
                                    <button
                                      onClick={() => handleSelect(l.id)}
                                      className={`w-full text-left px-4 py-3 rounded-lg text-[13px] transition-all duration-150 cursor-pointer ${
                                        isActive
                                          ? "bg-primary text-on-primary shadow-sm"
                                          : "text-ink hover:bg-surface-cream-strong"
                                      }`}
                                    >
                                      <span
                                        className={`font-mono text-[10px] block mb-0.5 ${
                                          isActive ? "text-on-primary/70" : "text-muted"
                                        }`}
                                      >
                                        Lecture {l.number}
                                      </span>
                                      <span className="font-serif text-[15px] leading-snug">{l.title}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Companion tool card */}
            <div className="bg-surface-card border border-hairline rounded-xl p-5">
              <span className="text-primary text-[10px] tracking-[0.15em] uppercase font-mono block mb-1.5">Companion Tool</span>
              <h3 className="font-serif text-[18px] text-ink font-medium">Zenith C++ IDE</h3>
              <p className="text-muted text-[13px] mt-2 leading-relaxed">
                Need a full multi-file development workspace? Zenith C++ offers a full browser IDE with advanced compilation, terminal diagnostics, and debugging.
              </p>
              <a
                href="https://zenith-cpp.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-4 w-full justify-center py-2.5 text-[12.5px] inline-flex items-center gap-1.5 hover:-translate-y-0.5 transition-transform"
              >
                <span>Open Zenith IDE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* ── Main playground area ───────────────────────────────── */}
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
