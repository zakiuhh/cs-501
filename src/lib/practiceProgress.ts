const KEY = "pf-practice-v1";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function write(solved: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(solved));
  window.dispatchEvent(new Event("pf-practice-changed"));
}

export function getSolvedProblems(): string[] {
  return read();
}

export function toggleSolved(id: string) {
  const solved = read();
  const idx = solved.indexOf(id);
  if (idx > -1) solved.splice(idx, 1);
  else solved.push(id);
  write(solved);
}
