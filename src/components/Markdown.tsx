// Tiny inline markdown renderer for slide bodies (bold, code, links, lists, headings).
import React from "react";

function renderInline(text: string, keyPrefix = ""): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0; let m: RegExpExecArray | null; let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) nodes.push(<strong key={keyPrefix + i++} className="text-ink font-medium">{t.slice(2, -2)}</strong>);
    else nodes.push(<code key={keyPrefix + i++} className="font-mono text-[0.9em] bg-surface-card text-ink px-1.5 py-0.5 rounded">{t.slice(1, -1)}</code>);
    last = m.index + t.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ children }: { children: string }) {
  const lines = children.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] | null = null;
  let inCode = false;
  let codeBuf: string[] = [];

  const flushList = () => {
    if (list) {
      out.push(
        <ul key={"ul" + out.length} className="space-y-2 my-3 list-none">
          {list.map((l, i) => (
            <li key={i} className="pl-5 relative text-body leading-relaxed">
              <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-primary" />
              {renderInline(l)}
            </li>
          ))}
        </ul>
      );
      list = null;
    }
  };

  lines.forEach((raw, idx) => {
    if (raw.startsWith("```")) {
      if (!inCode) { inCode = true; codeBuf = []; }
      else {
        flushList();
        out.push(
          <pre key={"c" + idx} className="bg-surface-dark text-on-dark p-5 rounded-lg overflow-x-auto my-4 text-[13.5px] leading-relaxed font-mono">
            <code>{codeBuf.join("\n")}</code>
          </pre>
        );
        inCode = false;
      }
      return;
    }
    if (inCode) { codeBuf.push(raw); return; }

    const line = raw.trimEnd();
    if (!line) { flushList(); return; }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!list) list = [];
      list.push(line.slice(2));
      return;
    }
    if (/^\d+\.\s/.test(line)) {
      if (!list) list = [];
      list.push(line.replace(/^\d+\.\s/, ""));
      return;
    }
    flushList();
    out.push(
      <p key={"p" + idx} className="text-body leading-relaxed my-3">
        {renderInline(line)}
      </p>
    );
  });
  flushList();
  return <div>{out}</div>;
}
