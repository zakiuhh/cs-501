import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { getStreak, pingStreak } from "@/lib/streak";

export function StreakBadge() {
  const [streak, setStreak] = useState({ current: 0, best: 0, lastDay: null as string | null });

  useEffect(() => {
    const data = pingStreak();
    setStreak(data);
    const refresh = () => setStreak(getStreak());
    window.addEventListener("pf-streak-changed", refresh);
    return () => window.removeEventListener("pf-streak-changed", refresh);
  }, []);

  if (streak.current <= 0) return null;

  return (
    <div
      className="inline-flex items-center gap-2 bg-surface-card border border-hairline rounded-pill px-3.5 py-1.5"
      title={`Best streak: ${streak.best} day${streak.best === 1 ? "" : "s"}`}
    >
      <Flame className="w-4 h-4 text-accent-amber fill-current" />
      <span className="text-[13px] font-medium text-ink">
        {streak.current} day{streak.current === 1 ? "" : "s"} streak
      </span>
    </div>
  );
}
