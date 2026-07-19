// Decorative, code-themed Lucide icons floating in the background.
// Pointer-events disabled; low opacity so they sit behind real content.

import { 
  Code2, 
  Binary, 
  Terminal, 
  Database, 
  Cpu, 
  Network, 
  GitBranch, 
  Laptop, 
  SquareCode 
} from "lucide-react";

type Item = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  rotate: number;
  icon: React.ComponentType<{ size: number; strokeWidth?: number }>;
  anim: "animate-float-orbit" | "animate-float-orbit-2" | "animate-float";
};

const items: Item[] = [
  { top: "5%",   left: "5%",   size: 40, delay: "0s",   duration: "18s", rotate: -12, icon: Code2,      anim: "animate-float-orbit" },
  { top: "15%",  left: "85%",  size: 36, delay: "1.5s", duration: "20s", rotate: 15,  icon: Binary,     anim: "animate-float-orbit-2" },
  { top: "30%",  left: "8%",   size: 32, delay: "3s",   duration: "16s", rotate: 22,  icon: Terminal,   anim: "animate-float-orbit-2" },
  { top: "45%",  left: "82%",  size: 48, delay: "0.8s", duration: "22s", rotate: -18, icon: Database,   anim: "animate-float-orbit" },
  { top: "60%",  left: "5%",   size: 44, delay: "2.2s", duration: "19s", rotate: 10,  icon: Cpu,        anim: "animate-float-orbit-2" },
  { top: "72%",  left: "75%",  size: 38, delay: "1s",   duration: "17s", rotate: -25, icon: Network,    anim: "animate-float-orbit" },
  { top: "82%",  left: "14%",  size: 34, delay: "2.8s", duration: "21s", rotate: 20,  icon: GitBranch,  anim: "animate-float-orbit-2" },
  { top: "10%",  left: "48%",  size: 30, delay: "3.5s", duration: "15s", rotate: 5,   icon: Laptop,     anim: "animate-float" },
  { top: "90%",  left: "50%",  size: 42, delay: "0.5s", duration: "18s", rotate: -8,  icon: SquareCode, anim: "animate-float-orbit" }
];

export function FloatingIllustrations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => {
        const IconComponent = it.icon;
        const tone = i % 3 === 0 ? "tone-teal" : i % 3 === 1 ? "" : "tone-amber";
        return (
          <div
            key={i}
            className={`float-glyph absolute ${tone} ${it.anim}`}
            style={{
              top: it.top,
              left: it.left,
              transform: `rotate(${it.rotate}deg)`,
              animationDelay: it.delay,
              animationDuration: it.duration,
            }}
          >
            <IconComponent size={it.size} strokeWidth={1.8} />
          </div>
        );
      })}
    </div>
  );
}

