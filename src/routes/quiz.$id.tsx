import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { modules } from "@/data/modules";
import { mcqPool } from "@/data/mcq_pool";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProgress, saveQuiz } from "@/lib/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Play, 
  RefreshCw, 
  Sliders, 
  Award,
  Sparkles,
  ChevronRight
} from "lucide-react";
import type { Quiz } from "@/data/lectures";

export const Route = createFileRoute("/quiz/$id")({
  loader: ({ params }) => {
    const moduleItem = modules.find((m) => m.id === params.id);
    if (!moduleItem) throw notFound();
    return { moduleItem };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Module Quiz: ${loaderData?.moduleItem.title} - CS501` },
      { name: "description", content: `Test your knowledge on ${loaderData?.moduleItem.title} with randomized quizzes.` },
    ],
  }),
  component: ModuleQuizPage,
});

/** Shuffle helper (Fisher–Yates). Returns a new array. */
function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Prepare and format quiz questions: shuffles options and adjusts correct index */
function prepareQuestions(questions: Quiz[]): Quiz[] {
  return questions.map((q) => {
    const order = shuffleArray(q.options.map((_, i) => i));
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct: order.indexOf(q.correct),
    };
  });
}

function ModuleQuizPage() {
  const { moduleItem } = Route.useLoaderData();
  const navigate = useNavigate();

  // Progress state
  const [highScore, setHighScore] = useState<{ score: number; total: number } | null>(null);

  // Quiz configuration state
  const rawQuestions = useMemo(() => mcqPool[moduleItem.id] || [], [moduleItem.id]);
  const availableTopics = useMemo(() => {
    const unique = new Set(rawQuestions.map((q) => q.topic || "Conceptual"));
    return Array.from(unique);
  }, [rawQuestions]);

  const [selectedTopics, setSelectedTopics] = useState<string[]>(availableTopics);
  const [quizLength, setQuizLength] = useState<number>(15);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);

  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizSeed, setQuizSeed] = useState<number>(0);

  // Load high scores and sync topics on mount / ID change
  useEffect(() => {
    const progress = getProgress();
    const scoreKey = `module-quiz-${moduleItem.id}`;
    if (progress.quizScores[scoreKey]) {
      setHighScore(progress.quizScores[scoreKey]);
    } else {
      setHighScore(null);
    }
    setSelectedTopics(availableTopics);
    setIsQuizActive(false);
    setIsSubmitted(false);
  }, [moduleItem.id, availableTopics]);

  // Handle toggling topics
  const handleToggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  // Start the quiz
  const handleStartQuiz = () => {
    // Filter questions by selected topics
    const filtered = rawQuestions.filter((q) =>
      selectedTopics.includes(q.topic || "Conceptual")
    );

    if (filtered.length === 0) return;

    // Shuffle and slice to length
    const shuffled = shuffleArray(filtered);
    const selected = shuffled.slice(0, Math.min(quizLength, shuffled.length));
    
    // Prepare question options (shuffle choices)
    const prepared = prepareQuestions(selected);

    setQuizQuestions(prepared);
    setUserAnswers(prepared.map(() => null));
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setIsQuizActive(true);
  };

  // Select an option
  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) =>
      prev.map((ans, idx) => (idx === currentQuestionIndex ? optionIndex : ans))
    );
  };

  // Navigate between questions
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1));
  };

  // Calculate final score
  const finalScore = useMemo(() => {
    return quizQuestions.reduce(
      (acc, q, idx) => acc + (userAnswers[idx] === q.correct ? 1 : 0),
      0
    );
  }, [quizQuestions, userAnswers]);

  // Submit the quiz
  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    // Save to progress local storage
    const scoreKey = `module-quiz-${moduleItem.id}`;
    
    // Get existing high score
    const currentProgress = getProgress();
    const existing = currentProgress.quizScores[scoreKey];
    
    // Update if score is higher or doesn't exist
    if (!existing || (finalScore / quizQuestions.length) > (existing.score / existing.total)) {
      saveQuiz(scoreKey, finalScore, quizQuestions.length);
      setHighScore({ score: finalScore, total: quizQuestions.length });
    }
  };

  // Restart / Reset quiz config
  const handleRestartQuiz = () => {
    setIsQuizActive(false);
    setIsSubmitted(false);
    setQuizSeed((s) => s + 1);
  };

  const topicDisplayNames = (topic: string) => {
    return topic
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col selection:bg-primary/10">
      <Nav />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-12">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/lectures" className="text-muted text-[13px] hover:text-ink inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to lectures
          </Link>
        </div>

        {!isQuizActive ? (
          /* QUIZ PREPARATION / CONFIGURATION INTERFACE */
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Title card */}
            <div className="bg-surface-card border border-hairline rounded-xl p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-primary text-[12px] tracking-[0.15em] uppercase font-mono">Module Quiz</span>
                <h1 className="font-serif text-4xl md:text-5xl text-ink mt-3">
                  {moduleItem.title}
                </h1>
                <p className="text-body text-base mt-4 max-w-2xl leading-relaxed">
                  {moduleItem.description} This custom quiz draws from a pool of <strong>{rawQuestions.length} multiple choice questions</strong> to test your understanding.
                </p>
                
                {highScore && (
                  <div className="mt-6 inline-flex items-center gap-3 bg-success/5 border border-success/30 rounded-lg px-4 py-2.5">
                    <Award className="w-5 h-5 text-success" />
                    <div>
                      <span className="text-[11px] text-muted font-mono block uppercase">Your High Score</span>
                      <span className="text-[15px] font-semibold text-success">
                        {highScore.score} / {highScore.total} ({Math.round((highScore.score / highScore.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Config Box */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Left/Middle Column: Config Details */}
              <div className="md:col-span-2 bg-surface-card border border-hairline rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-ink flex items-center gap-2 mb-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    Customise Your Practice
                  </h3>
                  <p className="text-[13px] text-muted">Select specific sub-topics and the number of questions to tailor your quiz.</p>
                </div>

                {/* Topics Selection */}
                <div className="space-y-3">
                  <span className="text-[12px] text-muted font-mono uppercase tracking-[0.1em] block">
                    Include Sub-Topics ({selectedTopics.length} selected)
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {availableTopics.map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      const count = rawQuestions.filter((q) => (q.topic || "Conceptual") === topic).length;
                      return (
                        <button
                          key={topic}
                          onClick={() => handleToggleTopic(topic)}
                          className={`w-full text-left p-3 rounded-lg border text-[13.5px] transition-all flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? "border-primary bg-primary/5 text-ink font-medium" 
                              : "border-hairline bg-canvas text-body hover:border-muted-soft"
                          }`}
                        >
                          <span>{topicDisplayNames(topic)}</span>
                          <span className="text-[11px] font-mono text-muted">({count} q)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Length Selector */}
                <div className="space-y-3">
                  <span className="text-[12px] text-muted font-mono uppercase tracking-[0.1em] block">
                    Quiz Length ({quizLength} Questions)
                  </span>
                  <div className="flex gap-2">
                    {[5, 10, 15, 20, 25].map((len) => (
                      <button
                        key={len}
                        onClick={() => setQuizLength(len)}
                        className={`flex-1 py-2 text-[13px] font-mono rounded-md border transition-all cursor-pointer ${
                          quizLength === len
                            ? "bg-primary text-on-primary border-primary shadow-sm"
                            : "bg-canvas text-body border-hairline hover:bg-surface-cream-strong"
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quiz Start Callout */}
              <div className="bg-surface-card border border-hairline rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-ink">Ready to Start?</h3>
                  <div className="space-y-2 text-[13px] text-body leading-relaxed">
                    <p>• Questions are randomly selected from the checked topics.</p>
                    <p>• Option choices are shuffled for each question.</p>
                    <p>• Correct answers and explanations are shown after submission.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleStartQuiz}
                    disabled={selectedTopics.length === 0}
                    className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Module Quiz</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ACTIVE QUIZ INTERFACE */
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header progress bar */}
            <div className="bg-surface-card border border-hairline rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-mono text-primary uppercase tracking-[0.1em] font-semibold">
                  {moduleItem.title} Quiz
                </span>
                <span className="font-mono text-muted">
                  {currentQuestionIndex + 1} / {quizQuestions.length} Questions
                </span>
              </div>
              <div className="h-2 bg-hairline rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + (isSubmitted ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="bg-surface-card border border-hairline rounded-xl p-6 md:p-8 shadow-md">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-[12px] font-mono text-muted bg-canvas border border-hairline px-2.5 py-1 rounded">
                  Q{currentQuestionIndex + 1}
                </span>
                <span className="text-[11px] font-mono uppercase text-primary bg-primary/15 px-2.5 py-1 rounded-pill font-semibold">
                  {topicDisplayNames(quizQuestions[currentQuestionIndex].topic || "Conceptual")}
                </span>
              </div>
              
              <h2 className="font-serif text-xl md:text-2xl text-ink leading-snug whitespace-pre-line mb-6">
                {quizQuestions[currentQuestionIndex].question}
              </h2>

              <div className="space-y-3">
                {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === idx;
                  const isCorrect = idx === quizQuestions[currentQuestionIndex].correct;
                  const isWrong = isSelected && !isCorrect;

                  let buttonStyles = "border-hairline bg-canvas text-body hover:border-muted hover:-translate-y-0.5";
                  if (isSubmitted) {
                    if (isCorrect) {
                      buttonStyles = "border-success bg-success/10 text-ink font-medium";
                    } else if (isWrong) {
                      buttonStyles = "border-error bg-error/10 text-ink";
                    } else {
                      buttonStyles = "border-hairline bg-canvas text-muted opacity-60";
                    }
                  } else if (isSelected) {
                    buttonStyles = "border-primary bg-primary/5 text-ink font-semibold shadow-sm";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left px-4 py-3.5 rounded-lg border text-[14px] md:text-[15px] transition-all flex items-start gap-3 ${buttonStyles} ${
                        !isSubmitted ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className={`font-mono text-[12px] px-2 py-0.5 rounded border mt-0.5 shrink-0 ${
                        isSelected && !isSubmitted ? "bg-primary text-on-primary border-primary" : "bg-surface-soft text-muted border-hairline"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown post-submission) */}
              {isSubmitted && (
                <div className="mt-6 p-4 bg-canvas border border-hairline rounded-lg text-[13.5px] leading-relaxed text-body animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className="font-semibold text-ink flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Explanation
                  </span>
                  {quizQuestions[currentQuestionIndex].explanation}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {!isSubmitted ? (
                currentQuestionIndex === quizQuestions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!userAnswers.every((ans) => ans !== null)}
                    className="btn-primary min-h-[44px] px-6 py-2.5 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={userAnswers[currentQuestionIndex] === null}
                    className="btn-primary min-h-[44px] px-6 py-2.5 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                )
              ) : (
                currentQuestionIndex === quizQuestions.length - 1 ? (
                  <button
                    onClick={handleRestartQuiz}
                    className="btn-primary min-h-[44px] px-6 py-2.5 flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Back to Config</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="btn-primary min-h-[44px] px-6 py-2.5 flex items-center gap-2 cursor-pointer"
                  >
                    Next →
                  </button>
                )
              )}
            </div>

            {/* Post-submission result dialog */}
            {isSubmitted && (
              <div className="bg-surface-card border border-hairline rounded-xl p-6 md:p-8 shadow-lg text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-ink">Quiz Complete!</h3>
                <p className="text-body text-[15px] max-w-md mx-auto">
                  You scored <strong className="text-primary text-lg">{finalScore}</strong> out of {quizQuestions.length} questions correctly. That is a score of <strong>{Math.round((finalScore / quizQuestions.length) * 100)}%</strong>.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="btn-primary py-2.5 px-6 flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Try another set
                  </button>
                  <Link
                    to="/lectures"
                    className="btn-secondary py-2.5 px-6 flex items-center gap-2"
                  >
                    Back to Curriculum
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
