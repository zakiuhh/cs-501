import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The slide-then-code-then-quiz flow made loops finally click for me. I actually looked forward to the next lecture.",
    name: "Hira A.",
    role: "CS501 Student",
  },
  {
    quote: "Being able to run the code examples right next to the explanation saved me from constantly switching between a compiler and my notes.",
    name: "Bilal K.",
    role: "CS501 Student",
  },
  {
    quote: "The certificate export and verification link is a nice touch - I put mine straight onto LinkedIn after finishing the course.",
    name: "Mehak S.",
    role: "CS501 Student",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 border-b border-hairline bg-surface-soft">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-muted text-[12px] tracking-[0.15em] uppercase mb-3">What students say</p>
        <h2 className="font-serif text-3xl md:text-5xl text-ink mb-12 max-w-xl">
          Built for the way <em className="italic text-primary">students actually learn</em>.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-surface-card rounded-lg p-7 card-lift">
              <div className="flex gap-0.5 mb-4 text-accent-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-body text-[15px] leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 pt-4 border-t border-hairline">
                <p className="text-ink font-medium text-[14px]">{t.name}</p>
                <p className="text-muted text-[12px]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
