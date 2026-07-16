import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - C++ Crashed" },
      { name: "description", content: "About C++ Crashed - an interactive C++ learning platform built by Team DevZee." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />
      <section className="py-20">
        <div className="max-w-[820px] mx-auto px-6">
          <Reveal variant="up" delay={0}>
            <p className="text-muted text-[12px] tracking-[0.15em] uppercase">About</p>
            <h1 className="font-serif text-5xl text-ink mt-3 leading-tight">A warmer way to learn programming.</h1>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <p className="text-body text-lg mt-6 leading-relaxed">
              <strong className="text-ink font-medium">C++ Crashed</strong> is an interactive companion to the <em>Programming Fundamentals</em> course. Each lecture is rebuilt as three connected experiences - slides you can step through, a code playground showing real output, and a short quiz that saves your score locally.
            </p>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <p className="text-body mt-4 leading-relaxed">
              The design takes its visual cues from <a className="text-link" href="https://claude.com">claude.com</a> - a tinted cream canvas, slab-serif headlines, and the signature coral accent. The hope is that learning to program should feel less like a SaaS landing page and more like reading a good book.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-hairline pt-10">
            <Reveal variant="up" delay={200}>
              <div>
                <p className="text-muted text-[12px] tracking-[0.15em] uppercase">Developers</p>
                <h2 className="font-serif text-4xl text-ink mt-3">Team DevZee</h2>
                <p className="text-body mt-4 leading-relaxed max-w-xl">
                  We are the development team behind this platform - turning lecture decks into an interactive, readable course.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <Reveal variant="up" delay={250} className="bg-surface-card border border-hairline rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all duration-300">
                <div>
                  <h3 className="font-serif text-xl text-ink font-medium">Zaki Ul Hassan</h3>
                  <p className="text-primary text-[12px] font-mono uppercase tracking-wider mt-1.5">Team Leader</p>
                  <div className="mt-4 flex gap-3 text-[13px]">
                    <a href="https://www.linkedin.com/in/zakiuh/" target="_blank" rel="noreferrer" className="text-link hover:text-primary transition-colors">LinkedIn ↗</a>
                    <span className="text-muted/40">|</span>
                    <a href="https://www.github.com/zakiuhh/" target="_blank" rel="noreferrer" className="text-link hover:text-primary transition-colors">GitHub ↗</a>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={300} className="bg-surface-card border border-hairline rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-ink font-medium">Saad Qureshi</h3>
                  <p className="text-primary text-[12px] font-mono uppercase tracking-wider mt-1.5">Vibe Coder</p>
                </div>
              </Reveal>

              <Reveal variant="up" delay={350} className="bg-surface-card border border-hairline rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-ink font-medium">Aliba Shakeel</h3>
                  <p className="text-primary text-[12px] font-mono uppercase tracking-wider mt-1.5">Vibe Coder</p>
                </div>
              </Reveal>

              <Reveal variant="up" delay={400} className="bg-surface-card border border-hairline rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-ink font-medium">Anosha Shakeel</h3>
                  <p className="text-primary text-[12px] font-mono uppercase tracking-wider mt-1.5">Vibe Coder</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal variant="up" delay={450} className="mt-12">
            <div>
              <Link to="/" className="btn-primary">Browse the lectures →</Link>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}
