const KEY = "pf-streak-v1";

type StreakData = {
  lastDay: string | null; // YYYY-MM-DD
  current: number;
  best: number;
};

function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const da = new Date(a + "T00:00:00Z").getTime();
  const db = new Date(b + "T00:00:00Z").getTime();
  return Math.round((db - da) / 86400000);
}

function read(): StreakData {
  if (typeof window === "undefined") return { lastDay: null, current: 0, best: 0 };
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || "");
    return { lastDay: null, current: 0, best: 0, ...p };
  } catch {
    return { lastDay: null, current: 0, best: 0 };
  }
}

function write(d: StreakData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(d));
  window.dispatchEvent(new Event("pf-streak-changed"));
}

/** Call once per visit (e.g. on lecture completion or lectures page load). */
export function pingStreak(): StreakData {
  const d = read();
  const today = todayStr();

  if (d.lastDay === today) {
    return d; // already counted today
  }

  if (d.lastDay) {
    const gap = daysBetween(d.lastDay, today);
    if (gap === 1) {
      d.current += 1; // consecutive day
    } else if (gap > 1) {
      d.current = 1; // streak broken, restart
    }
  } else {
    d.current = 1; // first ever visit
  }

  d.best = Math.max(d.best, d.current);
  d.lastDay = today;
  write(d);
  return d;
}

export function getStreak(): StreakData {
  const d = read();
  if (d.lastDay) {
    const gap = daysBetween(d.lastDay, todayStr());
    if (gap > 1) return { ...d, current: 0 }; // streak lapsed, display 0 without persisting yet
  }
  return d;
}
