import { useState } from "react";
import { Play, RotateCcw, Loader2 } from "lucide-react";

export function CodePlayground({ code, output, description }: { code: string; output: string; description: string }) {
  const [editedCode, setEditedCode] = useState(code);
  const [out, setOut] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setOut(null);

    if (editedCode.trim() === code.trim()) {
      setTimeout(() => {
        setOut(output);
        setRunning(false);
      }, 300);
      return;
    }

    try {
      const response = await fetch("https://ce.judge0.com/submissions?wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: editedCode,
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
      setOut(
        `[Connection Error] Could not connect to compilation server.\n\nSimulated Output:\n${output}\n\n[note] Please run this code locally with g++ to experiment fully.`
      );
    } finally {
      setRunning(false);
    }
  };

  const reset = () => {
    setEditedCode(code);
    setOut(null);
  };

  return (
    <div className="bg-surface-dark rounded-lg overflow-hidden border border-[#2a2825]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-[#2a2825] gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-on-dark-soft text-[12px] font-mono">main.cpp</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-on-dark-soft text-[13px] hover:text-on-dark transition-colors px-2 py-1 min-h-[36px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={run}
            disabled={running}
            className="btn-primary text-[13px] px-4 py-2 min-h-[36px] flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {running ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running…</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>
      <p className="px-5 pt-3 text-on-dark-soft text-[12px] leading-relaxed">{description}</p>
      <textarea
        value={editedCode}
        onChange={(e) => setEditedCode(e.target.value)}
        spellCheck={false}
        className="w-full bg-surface-dark text-on-dark font-mono text-[14px] leading-relaxed p-5 min-h-[260px] resize-y focus:outline-none"
      />
      {out !== null && (
        <div className="border-t border-[#2a2825] bg-surface-dark-soft">
          <div className="px-5 py-2 text-on-dark-soft text-[11px] uppercase tracking-wider">Output</div>
          <pre className="px-5 pb-5 text-on-dark font-mono text-[13.5px] whitespace-pre-wrap overflow-x-auto">{out}</pre>
        </div>
      )}
    </div>
  );
}
