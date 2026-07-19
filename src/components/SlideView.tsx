import type { Slide } from "@/data/lectures";
import { Markdown } from "./Markdown";
import { useState, useEffect } from "react";
import { Play, Loader2, Terminal } from "lucide-react";

export function SlideView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  const [running, setRunning] = useState(false);
  const [out, setOut] = useState<string | null>(null);

  // Reset console states when slide changes
  useEffect(() => {
    setOut(null);
    setRunning(false);
  }, [slide]);

  const runCode = async () => {
    if (!slide.code) return;
    setRunning(true);
    setOut(null);

    try {
      const response = await fetch("https://ce.judge0.com/submissions?wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: slide.code,
          language_id: 54, // C++ (GCC 9.2.0)
        }),
      });

      if (!response.ok) {
        throw new Error("Compilation server error");
      }

      const result = await response.json();
      let finalOutput = "";
      
      if (result.compile_output) {
        finalOutput += `[Compiler Output]\n${result.compile_output}\n`;
      }
      if (result.stderr) {
        finalOutput += `[Standard Error]\n${result.stderr}\n`;
      }
      if (result.stdout) {
        finalOutput += result.stdout;
      }

      if (!finalOutput && result.status?.description) {
        finalOutput = `[Status] ${result.status.description}`;
      }

      setOut(finalOutput || "[No Output]");
    } catch (err) {
      setOut("[Connection Error] Could not connect to compilation server. Please try running locally.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <article key={index} className="bg-canvas border border-hairline rounded-xl p-8 md:p-12 animate-slide-in-right">

      <div className="flex items-center gap-3 text-muted text-[12px] font-mono mb-4">
        <span>Slide {index + 1} / {total}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="font-serif text-3xl md:text-[40px] leading-tight text-ink mb-6">{slide.title}</h2>
      {slide.content && <Markdown>{slide.content}</Markdown>}
      
      {slide.code && (
        <div className="my-5 rounded-lg overflow-hidden border border-[#2a2825] bg-surface-dark">
          {/* Code block header with Run button */}
          <div className="bg-[#1f1e1b] px-4 py-2 flex items-center justify-between border-b border-[#2a2825]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-on-dark-soft text-[11px] font-mono">code_example.cpp</span>
            </div>
            
            <button
              onClick={runCode}
              disabled={running}
              className="bg-primary hover:bg-primary-active text-on-primary text-[11.5px] px-3.5 py-1.5 rounded font-medium flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {running ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Running…</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run Code</span>
                </>
              )}
            </button>
          </div>
          
          {/* Source Code */}
          <pre className="p-5 text-on-dark overflow-x-auto text-[13px] leading-relaxed font-mono">
            <code>{slide.code}</code>
          </pre>

          {/* Console Output Box */}
          { (running || out !== null) && (
            <div className="border-t border-[#2a2825] bg-[#141312]">
              <div className="px-5 py-2 border-b border-[#2a2825] flex items-center gap-2 text-on-dark-soft text-[10px] uppercase tracking-wider font-mono">
                <Terminal className="w-3 h-3" />
                <span>Console Output</span>
              </div>
              <pre className="p-5 text-success font-mono text-[12.5px] whitespace-pre-wrap overflow-x-auto min-h-[60px]">
                {running ? (
                  <span className="text-on-dark-soft animate-pulse">Compiling and executing code snippet...</span>
                ) : (
                  out
                )}
              </pre>
            </div>
          )}
        </div>
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
