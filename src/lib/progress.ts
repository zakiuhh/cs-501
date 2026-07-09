const KEY = "pf-progress-v1";

type Progress = {
  completed: string[]; // lecture ids
  quizScores: Record<string, { score: number; total: number }>;
  bookmarks: string[]; // starred lectures
  lastVisited?: { id: string; at: number } | null;
};

function read(): Progress {
  if (typeof window === "undefined") return { completed: [], quizScores: {}, bookmarks: [], lastVisited: null };
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || "") || {};
    return { completed: [], quizScores: {}, bookmarks: [], lastVisited: null, ...p };
  } catch {
    return { completed: [], quizScores: {}, bookmarks: [], lastVisited: null };
  }
}

function write(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("pf-progress-changed"));
}

export function getProgress() {
  return read();
}

export function markComplete(id: string) {
  const p = read();
  if (!p.completed.includes(id)) p.completed.push(id);
  write(p);
}

export function saveQuiz(id: string, score: number, total: number) {
  const p = read();
  p.quizScores[id] = { score, total };
  write(p);
}

export function markVisited(id: string) {
  const p = read();
  p.lastVisited = { id, at: Date.now() };
  write(p);
}

export function resetProgress() {
  write({ completed: [], quizScores: {}, bookmarks: [], lastVisited: null });
}

export function toggleBookmark(id: string) {
  const p = read();
  if (!p.bookmarks) p.bookmarks = [];
  const idx = p.bookmarks.indexOf(id);
  if (idx > -1) {
    p.bookmarks.splice(idx, 1);
  } else {
    p.bookmarks.push(id);
  }
  write(p);
}

export function isBookmarked(id: string) {
  const p = read();
  return p.bookmarks?.includes(id) ?? false;
}

export function importProgress(jsonString: string): boolean {
  try {
    const imported = JSON.parse(jsonString);
    if (!imported || typeof imported !== "object") return false;
    const current = read();
    
    // Support either direct progress format or export payload format
    const completed = Array.isArray(imported.completed) ? imported.completed : current.completed;
    const quizScores = (imported.quizScores && typeof imported.quizScores === "object") ? imported.quizScores : current.quizScores;
    const bookmarks = Array.isArray(imported.bookmarks) ? imported.bookmarks : (current.bookmarks || []);
    
    write({
      completed,
      quizScores,
      bookmarks,
      lastVisited: imported.lastVisited || current.lastVisited
    });
    return true;
  } catch {
    return false;
  }
}
