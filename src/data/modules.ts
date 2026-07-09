import { lectures } from "./lectures";

export type Module = {
  id: string;
  title: string;
  description: string;
  lectureIds: string[];
};

export const modules: Module[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Programming basics, algorithms, language processors, data types.",
    lectureIds: [
      "what-is-programming",
      "algorithm-flowchart",
      "language-processor",
      "algorithm-flowchart-deep",
      "datatypes-operators",
    ],
  },
  {
    id: "operators-control",
    title: "Operators & Control Flow",
    description: "Expressions, operators, if/else and switch decisions.",
    lectureIds: ["expressions-operators", "if-else", "nested-if-switch"],
  },
  {
    id: "loops",
    title: "Loops",
    description: "for, while, do…while, random numbers and nested loops.",
    lectureIds: [
      "for-loop-break-continue",
      "while-loop",
      "random-numbers",
      "do-while-loop",
      "nested-loops",
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "1D and 2D arrays plus common array tasks.",
    lectureIds: ["arrays-intro", "arrays-2d-sorting"],
  },
  {
    id: "functions",
    title: "Functions",
    description: "Defining, calling and passing values to functions.",
    lectureIds: [
      "functions-intro",
      "functions-in-depth",
      "types-of-functions",
      "types-of-functions-ii",
      "functions-pass-by-reference",
    ],
  },
  {
    id: "recursion-strings",
    title: "Recursion & Strings",
    description: "Recursive thinking and working with character arrays.",
    lectureIds: ["recursion", "strings"],
  },
  {
    id: "structures-files",
    title: "Structures & Files",
    description: "User-defined types and persistent file I/O.",
    lectureIds: [
      "structures",
      "array-of-structures",
      "file-io",
      "file-handling-advanced",
    ],
  },
  {
    id: "refactoring",
    title: "Code Quality",
    description: "Refactoring techniques to keep code clean.",
    lectureIds: ["code-refactoring"],
  },
];

export function getModuleProgress(moduleId: string, completed: string[]) {
  const m = modules.find((x) => x.id === moduleId);
  if (!m) return { done: 0, total: 0, pct: 0 };
  const done = m.lectureIds.filter((id) => completed.includes(id)).length;
  const total = m.lectureIds.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// Sanity: warn in dev if any lecture id is missing from modules
export const _allModuleIds = new Set(modules.flatMap((m) => m.lectureIds));
export const _missingLectures = lectures
  .map((l) => l.id)
  .filter((id) => !_allModuleIds.has(id));