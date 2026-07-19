import type { Slide } from "@/data/lectures";
import { Markdown } from "./Markdown";

export function SlideView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <article key={index} className="bg-canvas border border-hairline rounded-xl p-8 md:p-12 animate-slide-in-right">

      <div className="flex items-center gap-3 text-muted text-[12px] font-mono mb-4">
        <span>Slide {index + 1} / {total}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="font-serif text-3xl md:text-[40px] leading-tight text-ink mb-6">{slide.title}</h2>
      {slide.content && <Markdown>{slide.content}</Markdown>}
      {slide.code && (
        <pre className="bg-surface-dark text-on-dark p-5 rounded-lg overflow-x-auto my-5 text-[13.5px] leading-relaxed font-mono">
          <code>{slide.code}</code>
        </pre>
      )}
      {slide.table && (
        <div className="my-5 overflow-x-auto rounded-lg border border-hairline">
          <table className="w-full text-[14px]">
            <thead className="bg-surface-card">
              <tr>{slide.table.headers.map((h, i) => (
                <th key={i} className="text-left px-4 py-3 text-ink font-medium">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {slide.table.rows.map((r, i) => (
                <tr key={i} className="border-t border-hairline-soft">
                  {r.map((c, j) => <td key={j} className="px-4 py-3 text-body">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
