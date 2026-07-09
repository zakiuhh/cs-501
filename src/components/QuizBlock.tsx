import { useMemo, useState } from "react";
import type { Quiz } from "@/data/lectures";
import { saveQuiz } from "@/lib/progress";

/** Shuffle helper (Fisher–Yates). Returns a new array. */
function shuffled<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Take the lecture's base quiz, append the module-wide pool (already merged
 * upstream), shuffle the question order, shuffle each question's options and
 * remap the correct index. Cap to a maximum of `cap` questions.
 */
function prepareQuiz(quiz: Quiz[], cap = 8): Quiz[] {
  const sampled = shuffled(quiz).slice(0, Math.min(cap, quiz.length));
  return sampled.map((q) => {
    const order = shuffled(q.options.map((_, i) => i));
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct: order.indexOf(q.correct),
    };
  });
}

export function QuizBlock({ quiz, lectureId }: { quiz: Quiz[]; lectureId: string }) {
  // re-roll whenever the user resets, by bumping a seed
  const [seed, setSeed] = useState(0);
  const prepared = useMemo(() => prepareQuiz(quiz), [quiz, seed]);

  const [answers, setAnswers] = useState<(number | null)[]>(prepared.map(() => null));
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const score = prepared.reduce(
    (s, q, i) => s + (answers[i] === q.correct ? 1 : 0),
    0,
  );
  const isLast = current === prepared.length - 1;
  const pickedHere = answers[current] !== null;

  const submit = () => {
    setSubmitted(true);
    saveQuiz(lectureId, score, prepared.length);
  };

  const reset = () => {
    setSeed((s) => s + 1);
    setAnswers(prepared.map(() => null));
    setSubmitted(false);
    setCurrent(0);
  };

  if (submitted) {
    return (
      <div className="space-y-5 sm:space-y-6 animate-blur-in-soft">
        {prepared.map((q, i) => (
          <div key={i} className="bg-surface-card rounded-lg p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="text-muted text-[12px] font-mono mt-1">Q{i + 1}</span>
              <h4 className="text-ink text-[15px] sm:text-[17px] font-serif leading-snug flex-1">{q.question}</h4>
            </div>
            <div className="mt-4 space-y-2 sm:ml-9">
              {q.options.map((opt, j) => {
                const picked = answers[i] === j;
                const isCorrect = j === q.correct;
                const isWrong = picked && j !== q.correct;
                return (
                  <div
                    key={j}
                    className={[
                      "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border text-[13px] sm:text-[14px]",
                      isCorrect ? "border-success bg-success/10 text-ink" :
                        isWrong ? "border-error bg-error/10 text-ink" :
                          "border-hairline bg-canvas text-body",
                    ].join(" ")}
                  >
                    <span className="font-mono text-muted text-[12px] mr-3">{String.fromCharCode(65 + j)}</span>
                    {opt}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 sm:ml-9 text-[13px] text-body bg-canvas border border-hairline rounded-md p-3">
              <span className="font-medium text-ink">Explanation. </span>{q.explanation}
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <p className="text-ink font-serif text-xl sm:text-2xl">
            You scored <span className="text-primary">{score}</span> / {prepared.length}
          </p>
          <button onClick={reset} className="btn-secondary self-start sm:self-auto">Try again (re-shuffles)</button>
        </div>
      </div>
    );
  }

  const q = prepared[current];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {prepared.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 sm:w-10 bg-primary" : i < current ? "w-5 sm:w-6 bg-primary/40" : "w-1.5 bg-hairline"
              }`}
          />
        ))}
        <span className="ml-auto text-muted text-[11px] sm:text-[12px] font-mono">
          {current + 1} / {prepared.length}
        </span>
      </div>

      <div key={current} className="bg-surface-card rounded-lg p-5 sm:p-7 animate-slide-in-right">
        <div className="flex items-start gap-3">
          <span className="text-muted text-[12px] font-mono mt-1">Q{current + 1}</span>
          <h4 className="text-ink text-[15px] sm:text-[17px] font-serif leading-snug flex-1 whitespace-pre-line">{q.question}</h4>
        </div>
        <div className="mt-4 space-y-2 sm:ml-9">
          {q.options.map((opt, j) => {
            const picked = answers[current] === j;
            return (
              <button
                key={j}
                onClick={() => setAnswers((a) => a.map((v, k) => (k === current ? j : v)))}
                className={[
                  "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border text-[13px] sm:text-[14px] transition-all",
                  picked
                    ? "border-primary bg-canvas text-ink"
                    : "border-hairline bg-canvas text-body hover:border-muted-soft hover:-translate-y-0.5",
                ].join(" ")}
              >
                <span className="font-mono text-muted text-[12px] mr-3">{String.fromCharCode(65 + j)}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        {isLast ? (
          <button
            onClick={submit}
            disabled={!answers.every((a) => a !== null)}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => Math.min(prepared.length - 1, c + 1))}
            disabled={!pickedHere}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
