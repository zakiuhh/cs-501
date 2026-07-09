import { createFileRoute, Link } from "@tanstack/react-router";
import { lectures } from "@/data/lectures";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/syllabus")({
  head: () => ({
    meta: [
      { title: "Syllabus - CS501 C++ Crashed" },
      { name: "description", content: "Full syllabus for CS501 Programming Fundamentals in C++." },
    ],
  }),
  component: SyllabusPage,
});

function SyllabusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />
      <section className="max-w-[900px] mx-auto px-6 py-16 w-full flex-1">
        <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-2">Course Outline</p>
        <h1 className="font-serif text-5xl text-ink">CS501 - Programming Fundamentals</h1>
        <p className="text-body mt-4 max-w-2xl leading-relaxed">
          A first course in programming using C++. Covers fundamentals from the
          machine model and basic syntax through control flow, functions,
          recursion, arrays, strings, structures and file handling.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-10 mb-12">
          {[
            ["Course", "CS501"],
            ["Lectures", `${lectures.length}`],
            ["Language", "C++"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface-card rounded-lg p-5 transition-transform hover:-translate-y-1">
              <p className="text-muted text-[12px] uppercase tracking-wider">{k}</p>
              <p className="font-serif text-3xl text-ink mt-1">{v}</p>
            </div>
          ))}
        </div>

        <ol className="divide-y divide-hairline border-t border-b border-hairline">
          {lectures.map((l) => (
            <li key={l.id}>
              <Link
                to="/lecture/$id"
                params={{ id: l.id }}
                className="flex items-center gap-6 py-5 group transition-all hover:bg-surface-soft hover:px-4 rounded"
              >
                <span className="font-mono text-[13px] text-muted w-10">{l.number}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-ink group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-[13px] text-body mt-1">{l.summary}</p>
                </div>
                <span className="text-[12px] text-muted hidden md:inline">{l.duration}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <Footer />
    </div>
  );
}
