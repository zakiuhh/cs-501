import type { Quiz } from "./lectures";

/**
 * A pool of conceptual reinforcement questions, grouped by module id.
 * The lecture quiz block samples a few of these per session so every
 * attempt feels a little different and the quizzes are longer.
 */
export const extraQuizByModule: Record<string, Quiz[]> = {
    foundations: [
        {
            question: "Which of the following is NOT a typical stage in compiling a C++ program?",
            options: ["Preprocessing", "Linking", "Indexing", "Assembling"],
            correct: 2,
            explanation: "C++ goes through preprocess → compile → assemble → link. 'Indexing' is not a compilation stage.",
        },
        {
            question: "What does an interpreter do differently from a compiler?",
            options: [
                "Translates the whole program once into machine code",
                "Translates and runs one statement at a time without an object file",
                "Optimises code for a specific CPU",
                "Links libraries into the final binary",
            ],
            correct: 1,
            explanation: "Interpreters process statements one at a time at runtime; compilers translate the whole program into an object file ahead of time.",
        },
        {
            question: "Which data type is most appropriate to store a single character like 'A'?",
            options: ["int", "char", "string", "bool"],
            correct: 1,
            explanation: "`char` stores a single character. `string` stores text of any length.",
        },
        {
            question: "A flowchart diamond shape typically represents…",
            options: ["A process step", "Start / End", "A decision", "Input / Output"],
            correct: 2,
            explanation: "Diamonds in flowcharts denote decisions (branching on a condition).",
        },
    ],
    "operators-control": [
        {
            question: "Which operator has the highest precedence in C++?",
            options: ["&&", "==", "*", "()"],
            correct: 3,
            explanation: "Parentheses `()` always bind tightest and are evaluated first.",
        },
        {
            question: "`switch` in C++ requires its case labels to be…",
            options: [
                "Any expression",
                "Compile-time constant integral values",
                "String literals",
                "Boolean expressions only",
            ],
            correct: 1,
            explanation: "Case labels must be compile-time constants of integral (or enum) type.",
        },
        {
            question: "What is the result of `7 % 3` in C++?",
            options: ["1", "2", "0", "2.33"],
            correct: 1,
            explanation: "`%` is integer remainder. 7 divided by 3 leaves remainder 2.",
        },
    ],
    loops: [
        {
            question: "Which loop guarantees the body runs at least once?",
            options: ["for", "while", "do…while", "range-for"],
            correct: 2,
            explanation: "`do…while` checks the condition AFTER the body, so the body always runs at least once.",
        },
        {
            question: "Inside a loop, `continue` does what?",
            options: [
                "Exits the loop entirely",
                "Skips the rest of the current iteration and continues with the next",
                "Restarts the loop from the beginning",
                "Pauses the loop",
            ],
            correct: 1,
            explanation: "`continue` jumps to the loop's next iteration; `break` exits.",
        },
        {
            question: "How many total iterations does this run?\n`for(int i=0;i<3;i++) for(int j=0;j<2;j++) {}`",
            options: ["5", "6", "9", "3"],
            correct: 1,
            explanation: "Nested loops multiply: 3 × 2 = 6 iterations of the inner body.",
        },
    ],
    arrays: [
        {
            question: "What is the index of the first element of a C++ array?",
            options: ["1", "0", "-1", "Depends on the type"],
            correct: 1,
            explanation: "Array indexing in C++ starts at 0.",
        },
        {
            question: "`int a[3][4];` declares an array with how many total elements?",
            options: ["7", "12", "16", "3"],
            correct: 1,
            explanation: "3 rows × 4 columns = 12 elements.",
        },
        {
            question: "Accessing `a[10]` on an `int a[5];` array is…",
            options: ["A compile error", "Undefined behaviour", "Always zero", "A runtime exception"],
            correct: 1,
            explanation: "Out-of-bounds access in plain C++ arrays is undefined behaviour — anything can happen.",
        },
    ],
    functions: [
        {
            question: "Pass-by-reference is most useful when you want to…",
            options: [
                "Avoid copying large data and/or modify the caller's variable",
                "Make the function faster to compile",
                "Hide implementation details",
                "Return multiple types at once",
            ],
            correct: 0,
            explanation: "References avoid copies and let the function mutate the caller's variable.",
        },
        {
            question: "A function with return type `void` can…",
            options: [
                "Not contain `return` at all",
                "Use `return;` to exit early, but not return a value",
                "Return any type",
                "Only return integers",
            ],
            correct: 1,
            explanation: "`void` functions may use a bare `return;` to exit early but cannot return a value.",
        },
        {
            question: "What is a function prototype?",
            options: [
                "The first call to a function",
                "A declaration that tells the compiler the function's signature before its definition",
                "A debugging tool",
                "An inline version of the function",
            ],
            correct: 1,
            explanation: "Prototypes declare the signature so callers can use the function before it is defined.",
        },
    ],
    "recursion-strings": [
        {
            question: "Every correct recursive function must have…",
            options: [
                "At least one base case",
                "A loop inside it",
                "A return type of int",
                "Exactly one parameter",
            ],
            correct: 0,
            explanation: "Without a base case, recursion never terminates → stack overflow.",
        },
        {
            question: "In C-style strings, what marks the end of the string in memory?",
            options: ["A newline `\\n`", "A null terminator `\\0`", "A space", "The array's size"],
            correct: 1,
            explanation: "C-strings are terminated by the null character `\\0`.",
        },
    ],
    "structures-files": [
        {
            question: "A `struct` in C++ groups together…",
            options: [
                "Variables of the same type only",
                "Variables of possibly different types under one name",
                "Only functions",
                "Only pointers",
            ],
            correct: 1,
            explanation: "Structs bundle named members that can be of different types.",
        },
        {
            question: "Which file mode opens a file for writing and erases existing contents?",
            options: ["ios::app", "ios::in", "ios::out", "ios::binary"],
            correct: 2,
            explanation: "`ios::out` truncates by default. `ios::app` appends without erasing.",
        },
    ],
    refactoring: [
        {
            question: "Which is the clearest sign that a function needs refactoring?",
            options: [
                "It has comments",
                "It is hundreds of lines long and does several unrelated things",
                "It returns a value",
                "It uses local variables",
            ],
            correct: 1,
            explanation: "Long, multi-purpose functions are prime refactor candidates — split by responsibility.",
        },
        {
            question: "DRY stands for…",
            options: [
                "Don't Repeat Yourself",
                "Do Repeat Yourself",
                "Define, Run, Yield",
                "Debug, Run, Yield",
            ],
            correct: 0,
            explanation: "DRY = Don't Repeat Yourself — extract repeated logic into one place.",
        },
    ],
};
