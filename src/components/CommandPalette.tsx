import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { lectures } from "@/data/lectures";
import { modules } from "@/data/modules";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen for outside clicks since backdrop has pointer-events-none to allow scrolling
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const el = document.getElementById("command-palette-modal");
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const go = (fn: () => void) => {
    setOpen(false);
    // small delay so the dialog can fade
    setTimeout(fn, 60);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/30 backdrop-blur-[2px] animate-blur-in-soft pointer-events-none"
    >
      <Command
        id="command-palette-modal"
        label="Command Palette"
        className="w-full max-w-xl bg-canvas border border-hairline rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-4 border-b border-hairline">
          <span className="text-muted font-mono text-[12px]">⌘K</span>
          <Command.Input
            autoFocus
            placeholder="Search lectures, modules, pages…"
            className="flex-1 bg-transparent py-4 text-ink placeholder:text-muted-soft outline-none text-[15px]"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-muted text-[13px]">
            Nothing matches.
          </Command.Empty>

          <Command.Group heading="Pages" className="text-muted text-[11px] uppercase tracking-[0.12em] px-2 py-1">
            {[
              { label: "Home", to: "/" as const },
              { label: "Lectures", to: "/lectures" as const },
              { label: "Syllabus", to: "/syllabus" as const },
              { label: "Playground", to: "/playground" as const },
              { label: "Flowcharts", to: "/flowchart" as const },
              { label: "Cheat Sheet", to: "/cheatsheet" as const },
              { label: "About", to: "/about" as const },
            ].map((p) => (
              <Command.Item
                key={p.to}
                value={`page ${p.label}`}
                onSelect={() => go(() => navigate({ to: p.to }))}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md cursor-pointer text-ink data-[selected=true]:bg-surface-card text-[14px] normal-case tracking-normal"
              >
                <span>{p.label}</span>
                <span className="text-muted text-[11px] font-mono">page</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Modules" className="text-muted text-[11px] uppercase tracking-[0.12em] px-2 py-1 mt-2">
            {modules.map((m) => {
              const first = m.lectureIds[0];
              return (
                <Command.Item
                  key={m.id}
                  value={`module ${m.title} ${m.description}`}
                  onSelect={() => go(() => navigate({ to: "/lecture/$id", params: { id: first } }))}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md cursor-pointer text-ink data-[selected=true]:bg-surface-card text-[14px] normal-case tracking-normal"
                >
                  <span>{m.title}</span>
                  <span className="text-muted text-[11px] font-mono">module</span>
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Group heading="Lectures" className="text-muted text-[11px] uppercase tracking-[0.12em] px-2 py-1 mt-2">
            {lectures.map((l) => (
              <Command.Item
                key={l.id}
                value={`lecture ${l.number} ${l.title} ${l.topics.join(" ")}`}
                onSelect={() => go(() => navigate({ to: "/lecture/$id", params: { id: l.id } }))}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md cursor-pointer text-ink data-[selected=true]:bg-surface-card text-[14px] normal-case tracking-normal"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="text-muted font-mono text-[11px] shrink-0">L{l.number}</span>
                  <span className="truncate">{l.title}</span>
                </span>
                <span className="text-muted text-[11px] font-mono shrink-0">quiz · slides</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="px-4 py-2 border-t border-hairline text-[11px] text-muted flex items-center justify-between font-mono">
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>{lectures.length} lectures</span>
        </div>
      </Command>
    </div>
  );
}
