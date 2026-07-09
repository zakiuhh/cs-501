export type FlowchartBlockType = "terminal" | "process" | "decision" | "io";

export type FlowchartBlock = {
  id: string;
  type: FlowchartBlockType;
  label: string;
};

export type FlowchartPuzzle = {
  id: string;
  title: string;
  description: string;
  blocks: FlowchartBlock[];
  correctOrder: string[]; // array of block ids in logical sequence
};

export const flowcharts: FlowchartPuzzle[] = [
  {
    id: "even-odd",
    title: "Check Even or Odd",
    description: "Determine if a user-entered integer is even or odd using modulo operator.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "read", type: "io", label: "Read number n" },
      { id: "decide", type: "decision", label: "Is n % 2 == 0?" },
      { id: "print-even", type: "io", label: "Print \"Even\" (Yes)" },
      { id: "print-odd", type: "io", label: "Print \"Odd\" (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "read", "decide", "print-even", "print-odd", "end"]
  },
  {
    id: "student-grade",
    title: "Calculate Student Grade",
    description: "Read a student's score and assign a letter grade (A, B, C, D, or F) based on standard grading scale.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "input", type: "io", label: "Read score" },
      { id: "validate", type: "decision", label: "Is score >= 0 and <= 100?" },
      { id: "invalid-msg", type: "io", label: "Print \"Invalid Score\" (No)" },
      { id: "check-a", type: "decision", label: "Is score >= 90? (Yes)" },
      { id: "print-a", type: "io", label: "Print Grade: A (Yes)" },
      { id: "check-b", type: "decision", label: "Is score >= 80? (No)" },
      { id: "print-b", type: "io", label: "Print Grade: B (Yes)" },
      { id: "check-c", type: "decision", label: "Is score >= 70? (No)" },
      { id: "print-c", type: "io", label: "Print Grade: C (Yes)" },
      { id: "check-d", type: "decision", label: "Is score >= 60? (No)" },
      { id: "print-d", type: "io", label: "Print Grade: D (Yes)" },
      { id: "print-f", type: "io", label: "Print Grade: F (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "input", "validate", "invalid-msg", "check-a", "print-a", "check-b", "print-b", "check-c", "print-c", "check-d", "print-d", "print-f", "end"]
  },
  {
    id: "sum-to-n",
    title: "Sum Numbers 1 to N",
    description: "Compute the sum of all integers from 1 up to N using an iterative loop structure.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "input", type: "io", label: "Read N" },
      { id: "init", type: "process", label: "Set sum = 0, i = 1" },
      { id: "loop-check", type: "decision", label: "Is i <= N?" },
      { id: "accumulate", type: "process", label: "sum = sum + i, i = i + 1 (Yes)" },
      { id: "output", type: "io", label: "Print sum (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "input", "init", "loop-check", "accumulate", "output", "end"]
  },
  {
    id: "find-largest",
    title: "Find Largest of Three",
    description: "Read three numbers and determine which one is the largest using nested comparisons.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "read-abc", type: "io", label: "Read A, B, C" },
      { id: "compare-ab", type: "decision", label: "Is A > B?" },
      { id: "compare-ac", type: "decision", label: "Is A > C? (Yes)" },
      { id: "print-a", type: "io", label: "Print A is largest (Yes)" },
      { id: "print-c1", type: "io", label: "Print C is largest (No)" },
      { id: "compare-bc", type: "decision", label: "Is B > C? (No)" },
      { id: "print-b", type: "io", label: "Print B is largest (Yes)" },
      { id: "print-c2", type: "io", label: "Print C is largest (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "read-abc", "compare-ab", "compare-ac", "print-a", "print-c1", "compare-bc", "print-b", "print-c2", "end"]
  },
  {
    id: "factorial",
    title: "Calculate Factorial",
    description: "Compute N! (factorial) by multiplying all positive integers from 1 to N iteratively.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "read-n", type: "io", label: "Read N" },
      { id: "init-fact", type: "process", label: "Set factorial = 1, i = 1" },
      { id: "check-i", type: "decision", label: "Is i <= N?" },
      { id: "mult", type: "process", label: "factorial = factorial × i, i = i + 1 (Yes)" },
      { id: "print-fact", type: "io", label: "Print factorial (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "read-n", "init-fact", "check-i", "mult", "print-fact", "end"]
  },
  {
    id: "prime-check",
    title: "Check Prime Number",
    description: "Determine if a given positive integer is a prime number by testing divisibility.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "input-num", type: "io", label: "Read number n" },
      { id: "check-small", type: "decision", label: "Is n <= 1?" },
      { id: "not-prime-small", type: "io", label: "Print \"Not Prime\" (Yes)" },
      { id: "init-divisor", type: "process", label: "Set divisor = 2, isPrime = true (No)" },
      { id: "loop-check", type: "decision", label: "Is divisor < n and isPrime?" },
      { id: "check-divisible", type: "decision", label: "Is n % divisor == 0? (Yes)" },
      { id: "set-not-prime", type: "process", label: "Set isPrime = false (Yes)" },
      { id: "increment", type: "process", label: "divisor = divisor + 1 (No)" },
      { id: "result-check", type: "decision", label: "Is isPrime true? (No)" },
      { id: "print-prime", type: "io", label: "Print \"Prime\" (Yes)" },
      { id: "print-not-prime", type: "io", label: "Print \"Not Prime\" (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "input-num", "check-small", "not-prime-small", "init-divisor", "loop-check", "check-divisible", "set-not-prime", "increment", "result-check", "print-prime", "print-not-prime", "end"]
  },
  {
    id: "array-average",
    title: "Calculate Array Average",
    description: "Read N numbers, store them in an array, and compute their average value.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "read-count", type: "io", label: "Read N (count)" },
      { id: "init-vars", type: "process", label: "Set sum = 0, i = 0" },
      { id: "input-loop", type: "decision", label: "Is i < N?" },
      { id: "read-number", type: "io", label: "Read number (Yes)" },
      { id: "add-to-sum", type: "process", label: "sum = sum + number, i = i + 1" },
      { id: "calc-avg", type: "process", label: "average = sum / N (No)" },
      { id: "print-avg", type: "io", label: "Print average" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "read-count", "init-vars", "input-loop", "read-number", "add-to-sum", "calc-avg", "print-avg", "end"]
  },
  {
    id: "login-system",
    title: "Simple Login Validation",
    description: "Validate username and password with a maximum of 3 login attempts before lockout.",
    blocks: [
      { id: "start", type: "terminal", label: "Start" },
      { id: "init-attempts", type: "process", label: "Set attempts = 0, maxAttempts = 3" },
      { id: "check-attempts", type: "decision", label: "Is attempts < maxAttempts?" },
      { id: "input-creds", type: "io", label: "Read username, password (Yes)" },
      { id: "validate", type: "decision", label: "Are credentials valid?" },
      { id: "success", type: "io", label: "Print \"Login Successful\" (Yes)" },
      { id: "increment-fail", type: "process", label: "attempts = attempts + 1 (No)" },
      { id: "lockout", type: "io", label: "Print \"Account Locked\" (No)" },
      { id: "end", type: "terminal", label: "End" }
    ],
    correctOrder: ["start", "init-attempts", "check-attempts", "input-creds", "validate", "success", "increment-fail", "lockout", "end"]
  }
];
