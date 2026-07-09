import { lectures, type Lecture, type Quiz, type Slide } from "./lectures";
import { modules } from "./modules";
import { extraQuizByModule } from "./extraquiz";

function moduleForLecture(lectureId: string): string | undefined {
    return modules.find((m) => m.lectureIds.includes(lectureId))?.id;
}

/* ---------------------------------------------------------------------------
 * Per-module deep-dive packs.
 * Each pack returns a list of *additional* slides that get appended to every
 * lecture in that module so the course material is much more comprehensive.
 * The packs are written so they read naturally regardless of which specific
 * lecture in the module the reader is on.
 * ------------------------------------------------------------------------- */

type Pack = (l: Lecture) => Slide[];

const foundationsPack: Pack = (l) => [
    {
        title: "Mental model — how the machine actually runs your code",
        content:
            "Think of your CPU as an extremely fast clerk with a tiny desk (**registers**), a filing cabinet next to the desk (**RAM**), and a warehouse far away (**disk**).\n\n" +
            "- Every C++ statement you write eventually becomes a small pile of machine instructions: *move this from RAM to a register, add, compare, store the result back*.\n" +
            "- Variables are **names for addresses** in RAM. `int x = 5;` reserves 4 bytes somewhere and remembers the address under the label `x`.\n" +
            "- `cout` and `cin` are not magic — they are objects that wrap **system calls** which ask the operating system to talk to the terminal.\n\n" +
            "If you keep this picture in your head, almost every later topic (pointers, references, arrays, file I/O) becomes obvious instead of mysterious.",
    },
    {
        title: "Build pipeline in slow motion",
        content:
            "When you press *Run* in your IDE, four tools quietly run in sequence. Knowing them by name turns confusing error messages into solvable puzzles.",
        table: {
            headers: ["Tool", "Input → Output", "Typical error it produces"],
            rows: [
                ["Preprocessor", ".cpp → .i", "`fatal error: iostream: No such file or directory`"],
                ["Compiler", ".i → .s / .o", "`expected ';' before 'return'` — pure syntax"],
                ["Assembler", ".s → .o", "Almost never user-facing"],
                ["Linker", ".o + libs → .exe", "`undefined reference to 'foo()'` — declared but not defined"],
            ],
        },
    },
    {
        title: "Worked example — reading your first error",
        content:
            "Suppose you wrote this and the compiler complains:",
        code:
            "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello\"\n    return 0;\n}\n\n// error: expected ';' before 'return'",
    },
    {
        title: "How to debug like a professional",
        content:
            "Beginners *guess and re-run*. Professionals follow a tiny loop:\n\n" +
            "1. **Read the first error only.** Later errors are usually echoes of the first.\n" +
            "2. **Find the line number** the compiler gave you, then look one line *above* it — many syntax errors are caused by the previous line missing a `;` or `}`.\n" +
            "3. **Form a hypothesis** in one sentence (\"I think `x` is uninitialised\").\n" +
            "4. **Test it cheaply** — add a `cout << x;` or a breakpoint, do not rewrite the whole function.\n" +
            "5. **One change at a time.** If you change three things and the bug disappears, you have learned nothing.",
    },
    {
        title: "Common pitfalls in this module",
        content:
            "- Forgetting `#include <iostream>` → `cout was not declared in this scope`.\n" +
            "- Forgetting `;` at the end of a statement → cascading errors.\n" +
            "- Writing `Cout` or `coutt` → C++ is case-sensitive and unforgiving.\n" +
            "- Confusing **compile-time** (before the program runs) with **run-time** (while it runs). Division-by-zero is run-time; missing semicolons are compile-time.\n" +
            "- Saving the file but forgetting to **rebuild** before running — you keep running the old executable.",
    },
    {
        title: "Practice set",
        content:
            "Do these in order. Each one should take 2–5 minutes:\n\n" +
            "1. Print your name on one line and your roll number on the next using a single `cout`.\n" +
            "2. Re-type the lecture's example *without copy-pasting*, then deliberately break it in three different ways and read each error.\n" +
            "3. Explain to a friend (or a rubber duck) what the linker does, in under 30 seconds.",
    },
    recapSlide(l),
];

const operatorsPack: Pack = (l) => [
    {
        title: "Operator precedence — the rules behind the magic",
        content:
            "C++ evaluates operators in a fixed order. Memorising the full table is unnecessary; remembering this short ladder covers 95% of code:",
        table: {
            headers: ["Tier", "Operators", "Example"],
            rows: [
                ["1 (highest)", "`()`  `[]`  `++` `--` (postfix)", "`a[i]`, `f(x)`"],
                ["2", "`!`  `++` `--` (prefix)  unary `-`", "`!done`, `-x`"],
                ["3", "`*`  `/`  `%`", "`a * b + c` → multiply first"],
                ["4", "`+`  `-`", "`a + b`"],
                ["5", "`<`  `<=`  `>`  `>=`", "`x < y`"],
                ["6", "`==`  `!=`", "`x == 0`"],
                ["7", "`&&`", "`a && b`"],
                ["8", "`||`", "`a || b`"],
                ["9 (lowest)", "`=`  `+=`  `-=`  `*=`  `/=`", "`x += 1`"],
            ],
        },
    },
    {
        title: "Short-circuit evaluation — the trick every interview asks",
        content:
            "`&&` and `||` are **lazy**. They stop the moment the answer is known.\n\n" +
            "- `false && anything` → does not even look at `anything`.\n" +
            "- `true  || anything` → does not even look at `anything`.\n\n" +
            "This is not a curiosity — it is how you write *safe* conditions:",
        code:
            "if (count != 0 && total / count > 5) { ... }   // safe: division is skipped when count == 0\n\n" +
            "if (ptr != nullptr && ptr->ready) { ... }       // safe: we only dereference if ptr is valid",
    },
    {
        title: "if vs else-if vs switch — when to pick which",
        content:
            "Use the smallest tool that does the job.",
        table: {
            headers: ["Situation", "Best choice", "Why"],
            rows: [
                ["One condition, one action", "single `if`", "Cleanest, no branching to read"],
                ["Two mutually exclusive paths", "`if / else`", "Reader instantly sees the alternative"],
                ["Many ranges (`x < 10`, `x < 100`…)", "`else if` ladder", "Only `if` supports ranges & complex tests"],
                ["Many *exact* integer/char values", "`switch`", "Compiler optimises it into a jump table"],
            ],
        },
    },
    {
        title: "switch — the four things beginners forget",
        content:
            "1. **`break;`** — without it, execution falls through to the next case. This is occasionally useful, almost always a bug.\n" +
            "2. **`default:`** — always include it, even if just to print \"unexpected value\". It saves hours of debugging.\n" +
            "3. **Only integral types** — `int`, `char`, `enum`. You cannot `switch` on a `string` or a `double`.\n" +
            "4. **Case labels must be constants** — `case x:` where `x` is a variable will not compile.",
        code:
            "switch (grade) {\n" +
            "    case 'A': cout << \"Excellent\"; break;\n" +
            "    case 'B':\n" +
            "    case 'C': cout << \"Good\";      break;   // intentional fall-through\n" +
            "    default : cout << \"Invalid\";   break;\n" +
            "}",
    },
    {
        title: "Common pitfalls in this module",
        content:
            "- Writing `if (x = 5)` instead of `if (x == 5)` → assigns 5 to x and is always true.\n" +
            "- Forgetting that `5 / 2` is `2`, not `2.5` (integer division).\n" +
            "- Forgetting `break;` inside a `switch`.\n" +
            "- Chaining comparisons like a maths textbook: `if (0 < x < 10)` compiles but does **not** do what you think — write `if (0 < x && x < 10)`.",
    },
    recapSlide(l),
];

const loopsPack: Pack = (l) => [
    {
        title: "Anatomy of every loop",
        content:
            "Every loop, no matter the syntax, has the same four moving parts. If you can name them, you can write the loop.",
        table: {
            headers: ["Part", "Purpose", "Example in `for(int i=0; i<n; ++i)`"],
            rows: [
                ["Initialisation", "Set the starting state", "`int i = 0`"],
                ["Condition", "When do we keep going?", "`i < n`"],
                ["Body", "What work do we do each pass?", "the `{ ... }` block"],
                ["Update", "How does state change each pass?", "`++i`"],
            ],
        },
    },
    {
        title: "Choosing the right loop",
        content:
            "- **`for`** — you know up-front how many times (\"do this 10 times\", \"walk the array\").\n" +
            "- **`while`** — you keep going *until* something becomes true and may not enter the loop at all (\"while the user has not typed `quit`\").\n" +
            "- **`do…while`** — the body must run **at least once** (menu prompts, input validation).\n\n" +
            "Pick by *intent*, not by what you typed first. Any loop can be rewritten as any other, but the right shape makes the code self-documenting.",
    },
    {
        title: "break vs continue — a one-line definition each",
        content:
            "- **`break;`** — *I am done with this loop, leave it now.*\n" +
            "- **`continue;`** — *I am done with this iteration, jump to the next one.*\n\n" +
            "Both apply only to the **innermost** loop. To break out of a nested loop you need a flag variable or to refactor into a function and `return`.",
        code:
            "for (int i = 1; i <= 10; ++i) {\n" +
            "    if (i % 2 == 0) continue;   // skip even numbers\n" +
            "    if (i > 7)      break;      // stop entirely after 7\n" +
            "    cout << i << ' ';\n" +
            "}\n// prints: 1 3 5 7",
    },
    {
        title: "Off-by-one errors — the most common bug in software",
        content:
            "Decide on one rule and stick with it:\n\n" +
            "- **0-indexed, half-open** is what C++ uses everywhere: `for (int i = 0; i < n; ++i)` visits `n` items.\n" +
            "- Using `<=` with `n` visits `n+1` items — almost always wrong.\n" +
            "- When in doubt, do a 3-element dry run with paper: write down the value of every variable after every iteration. Tedious, but it catches off-by-one errors instantly.",
    },
    {
        title: "Nested loops & complexity",
        content:
            "Two nested loops over an array of size *n* run roughly *n × n = n²* times. That is fine for `n = 100`, painful at `n = 10 000`, and impossible at `n = 1 000 000`.\n\n" +
            "Quick intuition:\n\n" +
            "- 1 loop over *n* → **O(n)** — \"linear\".\n" +
            "- 2 nested loops → **O(n²)** — \"quadratic\".\n" +
            "- A loop that halves *n* each time → **O(log n)** — \"logarithmic\", very fast.\n\n" +
            "You will not be graded on Big-O yet, but training the instinct now pays off forever.",
    },
    recapSlide(l),
];

const arraysPack: Pack = (l) => [
    {
        title: "What an array really is",
        content:
            "An array is **one contiguous block of memory**, big enough to hold `N` items of the same type, laid out back-to-back.\n\n" +
            "`int a[5];` reserves `5 * sizeof(int)` = 20 bytes. The name `a` is essentially the address of the first byte; `a[i]` means *go to the start, then jump forward `i` ints*.\n\n" +
            "Consequences you will meet over and over:\n\n" +
            "- **Indices start at 0.** `a[0]` is the first, `a[N-1]` is the last.\n" +
            "- **No bounds checking.** `a[100]` on a 5-element array compiles, runs, and quietly corrupts memory.\n" +
            "- **Size is fixed at declaration.** You cannot \"grow\" a raw array. `std::vector` exists for that.",
    },
    {
        title: "2D arrays — rows and columns of memory",
        content:
            "`int m[3][4];` is laid out in **row-major** order: row 0 (4 ints) | row 1 (4 ints) | row 2 (4 ints). That is why nested loops over a 2D array are conventionally written rows-outer, columns-inner — it matches how the data sits in cache and runs noticeably faster.",
        code:
            "int m[3][4];\nfor (int r = 0; r < 3; ++r)        // rows outer\n    for (int c = 0; c < 4; ++c)    // cols inner\n        m[r][c] = r * 4 + c;",
    },
    {
        title: "Classic one-pass array tricks",
        content:
            "Most array problems collapse into walking the array **once** and updating a few variables. Train these patterns until they are reflexes:",
        table: {
            headers: ["Task", "Tracked variables", "Update rule"],
            rows: [
                ["Sum", "`sum`", "`sum += a[i]`"],
                ["Average", "`sum`, `n`", "average = sum / n at the end"],
                ["Max", "`best`", "`if (a[i] > best) best = a[i]`"],
                ["Count of evens", "`count`", "`if (a[i] % 2 == 0) ++count`"],
                ["Index of first match", "`idx = -1`", "`if (a[i] == target) { idx = i; break; }`"],
            ],
        },
    },
    {
        title: "Sorting — bubble sort by hand",
        content:
            "Bubble sort is the slowest sort you will ever write and also the easiest to *understand*. The idea: repeatedly walk the array and swap any adjacent pair that is in the wrong order. The largest element \"bubbles\" to the end on each pass.",
        code:
            "for (int i = 0; i < n - 1; ++i)\n" +
            "    for (int j = 0; j < n - 1 - i; ++j)\n" +
            "        if (a[j] > a[j + 1]) {\n" +
            "            int tmp = a[j];\n" +
            "            a[j]     = a[j + 1];\n" +
            "            a[j + 1] = tmp;\n" +
            "        }",
    },
    {
        title: "Common pitfalls in this module",
        content:
            "- Looping up to `i <= n` instead of `i < n` — reads one element past the end.\n" +
            "- Forgetting to initialise array elements — they hold garbage and produce \"random\" results.\n" +
            "- Trying to `return` a local array from a function — the memory is gone the moment the function ends.\n" +
            "- Comparing arrays with `==` — that compares **addresses**, not contents.",
    },
    recapSlide(l),
];

const functionsPack: Pack = (l) => [
    {
        title: "Why functions exist",
        content:
            "A function is **a named piece of code you can run more than once**. They give you three superpowers:\n\n" +
            "- **Reuse.** Write `area(r)` once, call it 50 times.\n" +
            "- **Naming.** A 30-line block becomes a single, readable line.\n" +
            "- **Isolation.** What happens inside `area` cannot accidentally trample variables outside it.\n\n" +
            "If a function is longer than what fits on one screen, or its name needs the word *and*, it is doing too much. Split it.",
    },
    {
        title: "Declaration, definition, call",
        content:
            "Three separate things that beginners often confuse.",
        code:
            "// 1. Declaration (a.k.a. prototype) — tells the compiler the shape\n" +
            "int square(int x);\n\n" +
            "// 2. Definition — the actual body\n" +
            "int square(int x) {\n" +
            "    return x * x;\n" +
            "}\n\n" +
            "// 3. Call — actually run it\n" +
            "int y = square(5);   // y == 25",
    },
    {
        title: "Pass by value vs pass by reference",
        content:
            "The single most important idea in this module.",
        table: {
            headers: ["Style", "Syntax", "What the function gets", "Can it change the caller's variable?"],
            rows: [
                ["By value", "`void f(int x)`", "A **copy**", "No"],
                ["By reference", "`void f(int& x)`", "An **alias** to the original", "Yes"],
                ["By const reference", "`void f(const string& s)`", "An alias, but read-only", "No (and avoids the copy — great for big objects)"],
            ],
        },
    },
    {
        title: "Worked example — swap two ints",
        content:
            "This is the canonical example because the *by value* version silently does nothing — a fact that has tripped up every C++ programmer at least once.",
        code:
            "// Broken: swaps the local copies, not the caller's variables\n" +
            "void swapBad(int a, int b) {\n" +
            "    int t = a; a = b; b = t;\n" +
            "}\n\n" +
            "// Correct: references mean a and b ARE the caller's variables\n" +
            "void swapGood(int& a, int& b) {\n" +
            "    int t = a; a = b; b = t;\n" +
            "}",
    },
    {
        title: "Scope, lifetime, and the return statement",
        content:
            "- A variable declared inside a function exists only **inside that function** (its *scope*).\n" +
            "- It is born when the function is called and **destroyed** when the function returns (its *lifetime*).\n" +
            "- Therefore: never return a pointer or reference to a local variable. You are handing the caller a key to a room that has already been demolished.\n" +
            "- Returning a *value* (or a `string`, `vector`, etc. by value) is always safe — the value is copied back to the caller.",
    },
    recapSlide(l),
];

const recursionStringsPack: Pack = (l) => [
    {
        title: "Recursion in one breath",
        content:
            "A recursive function is one that **calls itself on a smaller version of the same problem**, until it hits a case so tiny it can answer directly.\n\n" +
            "Every recursive function needs exactly two ingredients:\n\n" +
            "1. **Base case** — the trivial answer that does *not* recurse. Without it, you get infinite recursion → stack overflow.\n" +
            "2. **Recursive case** — reduce the problem, call yourself on the smaller piece, combine the result.",
        code:
            "int factorial(int n) {\n" +
            "    if (n <= 1) return 1;            // base case\n" +
            "    return n * factorial(n - 1);     // recursive case\n" +
            "}",
    },
    {
        title: "Tracing recursion on paper",
        content:
            "Beginners try to \"hold the whole call tree in their head\" and get dizzy. Don't. Trace `factorial(4)` like this:\n\n" +
            "```\n" +
            "factorial(4)\n" +
            "  = 4 * factorial(3)\n" +
            "      = 3 * factorial(2)\n" +
            "          = 2 * factorial(1)\n" +
            "              = 1                 ← base case\n" +
            "          = 2 * 1 = 2\n" +
            "      = 3 * 2 = 6\n" +
            "  = 4 * 6 = 24\n" +
            "```\n\n" +
            "Each indented line is one **stack frame**. Every recursive call pushes a frame; every `return` pops one.",
    },
    {
        title: "Strings — really just arrays of chars",
        content:
            "In classic C/C++, a string is a `char` array with a special last byte: `'\\0'` (the *null terminator*). That byte is how every standard string function knows where the string ends.",
        table: {
            headers: ["Function", "What it does", "Note"],
            rows: [
                ["`strlen(s)`", "Counts chars before `\\0`", "Does **not** include the `\\0`"],
                ["`strcpy(dst, src)`", "Copies `src` into `dst`", "`dst` must be big enough — no bounds check"],
                ["`strcat(dst, src)`", "Appends `src` to `dst`", "Same warning"],
                ["`strcmp(a, b)`", "0 if equal, <0 / >0 otherwise", "Returns an `int`, not a `bool`"],
            ],
        },
    },
    {
        title: "C-string vs std::string",
        content:
            "Modern C++ has `#include <string>` and `std::string`. Use it whenever you can:\n\n" +
            "- Knows its own length, grows automatically.\n" +
            "- Supports `+` for concatenation and `==` for comparison.\n" +
            "- Reads cleanly with `getline(cin, s)`.\n\n" +
            "Stick with `char[]` strings only when an exercise or legacy API demands it.",
    },
    recapSlide(l),
];

const structuresFilesPack: Pack = (l) => [
    {
        title: "Structures — your own data types",
        content:
            "A `struct` glues several related variables together under one name. Once defined, you treat the struct as if it were a built-in type.",
        code:
            "struct Student {\n" +
            "    int    roll;\n" +
            "    string name;\n" +
            "    float  cgpa;\n" +
            "};\n\n" +
            "Student s = {42, \"Ali\", 3.7f};\n" +
            "cout << s.name << \" — \" << s.cgpa;",
    },
    {
        title: "Array of structures — the everyday database",
        content:
            "Need to store 100 students? `Student class[100];`. Access fields with `class[i].name`. Every loop, sort, search idea you learned for plain arrays still works — you just compare a *field* instead of the whole element.",
        code:
            "// Find the top scorer\nint best = 0;\nfor (int i = 1; i < n; ++i)\n    if (class[i].cgpa > class[best].cgpa)\n        best = i;\n\ncout << class[best].name;",
    },
    {
        title: "File I/O — the three steps",
        content:
            "Every file program follows the same recipe:\n\n" +
            "1. **Open** a stream (`ofstream` to write, `ifstream` to read, `fstream` for both).\n" +
            "2. **Read or write** using `<<` / `>>` exactly as you do with `cout` / `cin`.\n" +
            "3. **Close** it (or let the stream's destructor close it when it goes out of scope).\n\n" +
            "Always check that the open succeeded — files vanish, paths are wrong, permissions are denied.",
        code:
            "#include <fstream>\n\n" +
            "ofstream out(\"scores.txt\");\n" +
            "if (!out) { cerr << \"cannot open\\n\"; return 1; }\n" +
            "out << \"Ali 95\\n\";\n" +
            "out.close();\n\n" +
            "ifstream in(\"scores.txt\");\n" +
            "string name; int score;\n" +
            "while (in >> name >> score) {\n" +
            "    cout << name << \" got \" << score << '\\n';\n" +
            "}",
    },
    {
        title: "Text vs binary mode",
        content:
            "- **Text mode** (default) is human-readable; numbers are written as digits. Easy to debug, larger files.\n" +
            "- **Binary mode** (`ios::binary`) writes the raw bytes of an object via `write()` / `read()`. Much smaller and faster, but not portable across machines and unreadable in a text editor.\n\n" +
            "Rule of thumb: text mode unless you have a measured reason to switch.",
    },
    recapSlide(l),
];

const refactoringPack: Pack = (l) => [
    {
        title: "Refactoring — change shape, never behaviour",
        content:
            "Refactoring means **improving the structure of code without changing what it does**. You should be able to run the same tests before and after and get identical output.\n\n" +
            "Why bother? Because code is read 10× more often than it is written. Time spent making it clearer pays itself back the next time you, or a teammate, need to change it.",
    },
    {
        title: "The five smells you can fix today",
        content:
            "- **Long function** — anything past one screen. Extract a helper.\n" +
            "- **Magic number** — `if (age > 17)` is mysterious; `const int VOTING_AGE = 18;` is not.\n" +
            "- **Duplicated code** — the same 4 lines in three places. Promote them to a function.\n" +
            "- **Deep nesting** — three or more nested `if`s. Invert conditions and `return` early.\n" +
            "- **Bad name** — `x`, `tmp`, `doStuff`. Renaming is the cheapest refactor and the highest impact.",
    },
    {
        title: "Before / after — extract function",
        content:
            "Same behaviour, friendlier shape.",
        code:
            "// before\n" +
            "for (int i = 0; i < n; ++i) {\n" +
            "    if (a[i] >= 50 && a[i] <= 100) {\n" +
            "        cout << a[i] << \" passes\\n\";\n" +
            "    }\n" +
            "}\n\n" +
            "// after\n" +
            "bool isPassing(int score) { return score >= 50 && score <= 100; }\n\n" +
            "for (int i = 0; i < n; ++i)\n" +
            "    if (isPassing(a[i]))\n" +
            "        cout << a[i] << \" passes\\n\";",
    },
    {
        title: "Refactor safely — the boy-scout loop",
        content:
            "1. Make sure the program currently works (run it, check the output).\n" +
            "2. Make **one** small change.\n" +
            "3. Run the program again. Same output? Keep the change. Different? Undo it.\n" +
            "4. Repeat.\n\n" +
            "This little loop turns refactoring from a scary rewrite into a series of boring, safe steps — which is exactly what you want.",
    },
    recapSlide(l),
];

function recapSlide(l: Lecture): Slide {
    const bullets = l.topics
        .slice(0, 6)
        .map((t) => `- **${t}** — covered in this lecture.`)
        .join("\n");
    return {
        title: "Key takeaways & next step",
        content:
            `**${l.title}** in one breath: ${l.summary}\n\n` +
            `What you should now be comfortable with:\n\n${bullets}\n\n` +
            `**Practice prompt.** Open the playground (or the Zenith C++ IDE) and rewrite the lecture's example from scratch without looking. Then change one thing and predict the new output before pressing Run. Finish with the quiz — it now includes a few extra randomised checks.`,
    };
}

const packs: Record<string, Pack> = {
    foundations: foundationsPack,
    "operators-control": operatorsPack,
    loops: loopsPack,
    arrays: arraysPack,
    functions: functionsPack,
    "recursion-strings": recursionStringsPack,
    "structures-files": structuresFilesPack,
    refactoring: refactoringPack,
};

/** Cached enriched lecture (deep-dive slides + extra quiz pool merged in). */
const enrichedCache = new Map<string, Lecture>();

export function getEnrichedLecture(id: string): Lecture | undefined {
    if (enrichedCache.has(id)) return enrichedCache.get(id);
    const base = lectures.find((l) => l.id === id);
    if (!base) return undefined;

    const mod = moduleForLecture(id);
    const extras: Quiz[] = mod ? extraQuizByModule[mod] ?? [] : [];
    const pack = mod ? packs[mod] : undefined;
    const deepSlides = pack ? pack(base) : [recapSlide(base)];

    const enriched: Lecture = {
        ...base,
        slides: [...base.slides, ...deepSlides],
        quiz: [...base.quiz, ...extras],
    };
    enrichedCache.set(id, enriched);
    return enriched;
}
