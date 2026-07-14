import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { faqs } from "@/data/faq";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - CS501 C++ Crashed" },
      { name: "description", content: "Frequently asked questions about the CS501 C++ Crashed interactive course platform." },
    ],
  }),
  component: FaqPage,
});

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="font-serif text-lg text-ink group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-body text-[14px] leading-relaxed pb-5 pr-8 max-w-2xl">{answer}</p>
      )}
    </div>
  );
}

function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Nav />
      <section className="border-b border-hairline">
        <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
          <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-3">Support</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ink">
            Frequently asked <em className="italic text-primary">questions</em>.
          </h1>
          <p className="text-body text-lg mt-5 max-w-2xl leading-relaxed">
            Everything about progress, certificates, and using the platform. Can't find your answer? Reach out via the About page.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-[900px] mx-auto px-6">
          {faqs.map((cat) => (
            <div key={cat.category} className="mb-12">
              <h2 className="font-serif text-2xl text-ink mb-2">{cat.category}</h2>
              <div>
                {cat.items.map((item) => (
                  <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
