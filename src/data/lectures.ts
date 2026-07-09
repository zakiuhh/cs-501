export type Slide = {
  title: string;
  content: string; // markdown-ish
  code?: string;
  table?: { headers: string[]; rows: string[][] };
};

export type Quiz = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Lecture = {
  id: string;
  number: string;
  title: string;
  summary: string;
  duration: string;
  topics: string[];
  slides: Slide[];
  playground?: { code: string; output: string; description: string };
  quiz: Quiz[];
};

export const lectures: Lecture[] = [
  // ─────────────────────────────────────────────────────────────
  // LECTURE 01 — What is Programming?
  // ─────────────────────────────────────────────────────────────
  {
    id: "what-is-programming",
    number: "01",
    title: "What is Programming?",
    summary: "An introduction to programming — instructions, execution, language processors, and the basic structure of a C++ program.",
    duration: "25 min",
    topics: ["Program execution", "Compiler vs interpreter", "Linker & loader", "C++ structure", "Errors & debugging"],
    slides: [
      {
        title: "What is programming?",
        content: "Imagine you want to tell a robot exactly how to make a sandwich. You can't just say \"make me a sandwich\" — you have to give it step-by-step instructions: pick up the bread, spread the butter, add the filling, close it.\n\nA **program** is exactly that — a list of precise, step-by-step instructions given to a computer to accomplish a task. Instructions must be written in a **programming language** the computer can understand. Once written, the instructions are **executed** (run) by the computer.",
      },
      {
        title: "Why can't we just talk to computers in English?",
        content: "Computers are incredibly fast but not very smart. They only understand **machine language** — a sequence of 1s and 0s. English is too ambiguous (the word \"bank\" means a river bank or a money bank depending on context), so we use **programming languages** which are precise and unambiguous.\n\nC++ is one such language. It reads almost like English, but it follows very strict rules so the computer knows exactly what to do.",
      },
      {
        title: "Program execution — the CPU cycle",
        content: "The CPU (the brain of the computer) runs a program by repeating five steps for every instruction:\n\n1. **Fetch** — get the next instruction from memory\n2. **Decode** — figure out what the instruction means\n3. **Retrieve** — load any data needed\n4. **Execute** — actually do the work (add, compare, etc.)\n5. **Store** — save the result\n\nThis happens millions of times per second — which is why computers feel instant.",
      },
      {
        title: "Language processors",
        content: "A computer only understands **machine language** (1s and 0s). A **language processor** is software that translates our human-friendly code into machine code. There are three kinds:\n\n- **Compiler** — reads the **whole program** at once and produces an object file (like translating an entire book before publishing it)\n- **Interpreter** — translates **one statement at a time** and runs it immediately (like a live translator at a meeting)\n- **Assembler** — translates assembly language (almost-machine-code) into machine code",
      },
      {
        title: "Compiler vs Interpreter — side by side",
        content: "",
        table: {
          headers: ["Feature", "Compiler", "Interpreter"],
          rows: [
            ["How much translated at once?", "Whole program at once", "One line at a time"],
            ["Output file?", "Yes — an object file", "No object file"],
            ["Run again without re-translating?", "Yes ✅", "No — retranslates every run ❌"],
            ["Speed", "Faster execution", "Slower execution"],
            ["Error reporting", "Shows all errors after compile", "Stops at the very first error"],
            ["Example languages", "C, C++, Java", "Python (default), JavaScript"],
          ],
        },
      },
      {
        title: "Linker & Loader",
        content: "After the compiler turns your `.cpp` file into an object file (`.o`), two more steps happen:\n\n- **Linker** — combines your object file(s) with library files (pre-written code for things like `cout`) into one final **executable** program (`.exe`)\n- **Loader** — when you run the program, the Operating System uses the loader to place the executable into **RAM** and start running it\n\nThink of it like this: the compiler writes chapters, the linker binds them into a book, and the loader opens the book and starts reading it.",
      },
      {
        title: "From source to execution — the full pipeline",
        content: "Every `.cpp` file you write goes through all of these stages:",
        table: {
          headers: ["Stage", "File", "What happens"],
          rows: [
            ["Source", "hello.cpp", "Human-written C++ code"],
            ["Preprocessor", "hello.i", "Expands #include, #define, macros"],
            ["Compiler", "hello.s", "Produces assembly source code"],
            ["Assembler", "hello.o", "Produces binary object code"],
            ["Linker", "hello.exe", "Combines object files into one executable"],
            ["Loader", "—", "OS loads exe into memory and runs it"],
          ],
        },
      },
      {
        title: "Basic structure of a C++ program",
        content: "Every C++ program has three parts:\n\n1. **Preprocessor directives** — lines starting with `#`. They run before compilation. `#include <iostream>` brings in the code for `cout` and `cin`.\n2. **`using namespace std;`** — saves you from typing `std::cout` every time.\n3. **`main()` function** — the entry point. Execution always starts here. The `return 0;` tells the OS the program finished successfully.",
        code: `// This is a comment — the compiler ignores it
#include <iostream>      // 1. Preprocessor directive
using namespace std;     // 2. Use standard library names

int main() {             // 3. main() — execution starts here
    cout << "Hello, World!";  // print to screen
    return 0;            // tell OS: all good!
}`,
      },
      {
        title: "💡 Tips & Tricks — Writing Your First Program",
        content: "**Tip 1 — Always include `<iostream>`**\nWithout it, `cout` and `cin` won't work. It's like trying to use a TV without plugging it in.\n\n**Tip 2 — Don't forget the semicolon `;`**\nEvery C++ statement ends with a semicolon. Forgetting it is the #1 beginner mistake. The compiler will complain with a cryptic error.\n\n**Tip 3 — `return 0;` means success**\nBy convention, returning 0 from `main` tells the OS the program ran without problems. Any other number signals an error.\n\n**Tip 4 — Use comments generously**\nAnything after `//` is a comment and is ignored by the compiler. Write comments to explain *why* you wrote something, not just *what* it does.",
      },
      {
        title: "Debugging — types of errors",
        content: "A **bug** is an error in a program. **Debugging** is the process of finding and removing bugs. There are three types:\n\n- **Syntax error** — you broke the grammar rules of C++ (e.g., wrote `coutt` instead of `cout`). The compiler catches this and refuses to compile.\n- **Logical error** — the code compiles and runs, but gives the wrong answer (e.g., you wrote `a < 5` when you meant `a > 5`). The hardest to find.\n- **Run-time error** — the code starts running but crashes during execution (e.g., dividing by zero, accessing memory you don't own).\n\n💡 **Tip:** Start by fixing syntax errors. Then run the program with test cases you already know the answer to, so you can spot logical errors.",
      },
    ],
    playground: {
      description: "Your first C++ program. Hit Run to see what it prints.",
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`,
      output: "Hello, World!",
    },
    quiz: [
      {
        question: "Which language does the CPU directly understand?",
        options: ["C++", "Assembly", "Machine language", "Python"],
        correct: 2,
        explanation: "The CPU only understands machine language (binary 1s and 0s). Everything else must be translated.",
      },
      {
        question: "What does a compiler produce that an interpreter does not?",
        options: ["Syntax errors", "An object/executable file", "Output to the screen", "A source file"],
        correct: 1,
        explanation: "A compiler translates the whole program at once and produces an object file; an interpreter runs statement-by-statement without producing one.",
      },
      {
        question: "Writing `a < 5` when you meant `a > 5` is which kind of error?",
        options: ["Syntax", "Logical", "Run-time", "Linker"],
        correct: 1,
        explanation: "It compiles fine but produces the wrong result — that is the definition of a logical error.",
      },
      {
        question: "Which step comes AFTER the compiler in the C++ build pipeline?",
        options: ["Preprocessor", "Loader", "Assembler", "Editor"],
        correct: 2,
        explanation: "The assembler converts the assembly output of the compiler into binary object code.",
      },
      {
        question: "What is the job of the Linker?",
        options: ["Translate C++ to assembly", "Run the program", "Combine object files into one executable", "Check for syntax errors"],
        correct: 2,
        explanation: "The linker combines object files and library files into a single executable.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 02 — Algorithms & Flowcharts
  // ─────────────────────────────────────────────────────────────
  {
    id: "algorithm-flowchart",
    number: "02",
    title: "Algorithms & Flowcharts",
    summary: "History of C++, the problem-solving phase, pseudocode, and how flowcharts visualize algorithms.",
    duration: "30 min",
    topics: ["History of C++", "C vs C++", "Algorithm", "Pseudocode", "Flowchart symbols", "Decision structures"],
    slides: [
      {
        title: "A short history of C++",
        content: "C++ was created by **Bjarne Stroustrup** at Bell Labs in **1979**. He wanted to add object-oriented features to the C language, so he originally called it **\"C with Classes\"**. The name was changed to **C++** in 1983 (the `++` is the C increment operator — meaning \"one step better than C\").\n\nC++ added:\n- **Classes** and **objects** (object-oriented programming)\n- **Inheritance** (child classes that get features from parent classes)\n- **Virtual functions** (dynamic binding — deciding at runtime which function to call)",
      },
      {
        title: "C vs C++ — what changed?",
        content: "",
        table: {
          headers: ["C", "C++"],
          rows: [
            ["Procedural language only", "Procedural + Object-Oriented"],
            ["Top-down design (start from the big picture)", "Bottom-up design (build small pieces first)"],
            ["All variables must be declared at the start of a block", "Variables can be declared anywhere in the code"],
            ["malloc() / free() for dynamic memory", "new / delete operators"],
            ["No function overloading", "Function overloading allowed"],
            ["No references", "Has reference parameters"],
          ],
        },
      },
      {
        title: "What is an algorithm?",
        content: "An **algorithm** is a precise, ordered set of steps that solves a specific problem. Think of it like a recipe:\n\n- A recipe tells you exactly what to do, in what order, with no room for confusion.\n- An algorithm tells the computer exactly the same thing.\n\nEvery program you write is based on an algorithm. Before you write code, you should always design the algorithm first.",
      },
      {
        title: "Two phases of solving a programming problem",
        content: "**Phase 1 — Problem-solving phase**\nThink through the problem and produce an ordered sequence of steps (the algorithm). Do NOT write code yet.\n\n**Phase 2 — Implementation phase**\nTranslate the algorithm into a programming language (C++).\n\n💡 **Tip:** Most beginners rush to Phase 2. Don't! Spending an extra 5 minutes thinking through the algorithm saves hours of debugging later.",
      },
      {
        title: "Pseudocode",
        content: "**Pseudocode** is an informal, English-like way of describing an algorithm. It is not actual code — it won't compile. It's a planning tool.\n\n**Example** — Compute a student's pass/fail grade from 4 marks:\n\n- Input marks M1, M2, M3, M4\n- Calculate average = (M1 + M2 + M3 + M4) / 4\n- If average < 50 → print \"FAIL\"\n- Else → print \"PASS\"\n\nPseudocode ignores exact syntax so you can focus on the *logic* without worrying about semicolons.",
      },
      {
        title: "Pseudocode → Algorithm → Code",
        content: "The same problem expressed at three levels of detail:",
        code: `// PSEUDOCODE (informal)
Input 4 marks, compute average, print PASS or FAIL

// ALGORITHM (step-by-step)
Step 1: Input M1, M2, M3, M4
Step 2: GRADE = (M1 + M2 + M3 + M4) / 4
Step 3: if (GRADE < 50) then
            Print "FAIL"
        else
            Print "PASS"
        endif

// C++ CODE
double m1, m2, m3, m4;
cin >> m1 >> m2 >> m3 >> m4;
double grade = (m1 + m2 + m3 + m4) / 4;
if (grade < 50) cout << "FAIL";
else            cout << "PASS";`,
      },
      {
        title: "Flowcharts — visualizing the logic",
        content: "A **flowchart** is a diagram that represents an algorithm using standardized shapes connected by arrows.\n\n- Each shape has a specific meaning\n- Arrows show the **direction** of logic flow (which step comes next)\n- Flowcharts make it easy to spot mistakes in logic *before* writing code\n\nThe process of drawing a flowchart is called **flowcharting**.",
      },
      {
        title: "Flowchart symbols",
        content: "",
        table: {
          headers: ["Shape", "Symbol Name", "When to use it"],
          rows: [
            ["Oval / Rounded rectangle", "Terminal", "Start or End of the program"],
            ["Parallelogram", "Input / Output", "Read input or display output"],
            ["Rectangle", "Process", "Any calculation or assignment (e.g., sum = a + b)"],
            ["Diamond", "Decision", "A yes/no question — creates a branch (if / else)"],
            ["Arrow", "Flow line", "Shows the direction of execution"],
            ["Circle", "Connector", "Connects parts of the flowchart across pages"],
          ],
        },
      },
      {
        title: "Decision structures (if-then-else) in flowcharts",
        content: "A **decision** tests a condition. If it's true, take one path; if false, take the other.\n\nIn flowchart form: the diamond has two exits — one labeled **YES** (true path) and one labeled **NO** (false path).\n\nIn pseudocode:\n```\nif condition then\n    true alternative\nelse\n    false alternative\nendif\n```\n\nExample: if A > B then print \"A is bigger\" else print \"B is bigger\"",
      },
      {
        title: "💡 Tips & Tricks — Planning with Algorithms",
        content: "**Tip 1 — Draw the flowchart on paper first**\nBefore you open your IDE, sketch the flowchart on paper. It takes 2 minutes and saves 20 minutes of debugging.\n\n**Tip 2 — Trace through your algorithm by hand**\nPick sample values and manually follow the steps of your algorithm. This is called a **desk check** and it catches logical errors before you write a single line of code.\n\n**Tip 3 — Pseudocode doesn't need perfect syntax**\nDon't stress about formatting in pseudocode. \"if age is less than 18\" is just as valid as `if (age < 18)`. Use whatever is clearest to you.\n\n**Tip 4 — Every algorithm needs a STOP**\nMake sure your flowchart always has a terminal \"End\" oval. Algorithms that never stop are bugs.",
      },
    ],
    quiz: [
      {
        question: "Who created C++?",
        options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Linus Torvalds"],
        correct: 1,
        explanation: "Bjarne Stroustrup created C++ at Bell Labs in 1979. Dennis Ritchie created C.",
      },
      {
        question: "Which flowchart symbol represents a decision?",
        options: ["Oval", "Rectangle", "Diamond", "Parallelogram"],
        correct: 2,
        explanation: "Diamonds represent decisions / branches (if/else). Rectangles are for processes.",
      },
      {
        question: "What is pseudocode?",
        options: [
          "A bug in the compiler",
          "Machine code written by hand",
          "An informal English-like description of an algorithm",
          "A second name for assembly language",
        ],
        correct: 2,
        explanation: "Pseudocode is informal, language-agnostic, and helps you plan the algorithm before coding.",
      },
      {
        question: "What is the FIRST phase of solving a programming problem?",
        options: ["Writing C++ code", "Testing the program", "Designing the algorithm (problem-solving phase)", "Compiling"],
        correct: 2,
        explanation: "Always design the algorithm first (Phase 1 — problem solving), then implement it in code (Phase 2).",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 03 — Language Processor
  // ─────────────────────────────────────────────────────────────
  {
    id: "language-processor",
    number: "03",
    title: "Language Processor",
    summary: "Classifications of programming languages — machine, low-level, high-level — and how compilers, interpreters and assemblers differ.",
    duration: "25 min",
    topics: ["Machine language", "Assembly", "High-level languages", "Source vs object code", "Compiler vs interpreter"],
    slides: [
      {
        title: "The three levels of programming languages",
        content: "Programming languages exist on a spectrum from \"closest to hardware\" to \"closest to human\":\n\n1. **Machine language** — pure binary (1s and 0s). The CPU understands this directly.\n2. **Low-level languages** — e.g. Assembly. Uses short words (mnemonics) instead of binary, but still very close to hardware.\n3. **High-level languages** — e.g. C++, Python, Java. Use English-like words and are far from the hardware. Require translation.",
      },
      {
        title: "Machine language — the CPU's native tongue",
        content: "Machine language is the only thing the CPU can execute directly. It's a sequence of binary numbers:\n\n```\n10110000 01100001\n```\n\n- ✅ Fastest possible execution (no translation needed)\n- ❌ Incredibly hard to write and understand for humans\n- ❌ Machine-specific — code written for an Intel CPU won't run on an ARM CPU\n\nNobody writes machine language by hand today.",
      },
      {
        title: "Low-level / Assembly language",
        content: "Assembly language replaces binary codes with short, memorable words called **mnemonics**:\n\n```\nMOV AX, 5     ; move value 5 into register AX\nADD AX, 3     ; add 3 to AX\n```\n\n- ✅ More readable than binary\n- ✅ Very fast execution\n- ❌ Still hardware-specific\n- ❌ Still very tedious and error-prone\n\nAn **assembler** translates assembly into machine code.",
      },
      {
        title: "High-level languages",
        content: "High-level languages are designed to be readable by humans:\n\n- Mostly **machine-independent** (write once, run on many CPUs)\n- Keywords are close to natural English (`if`, `while`, `return`)\n- Easy to write, read, debug, and maintain\n- Must be compiled or interpreted before running\n\nCategories:\n- **Procedural** — C, Pascal (follow steps in order)\n- **Object-Oriented** — C++, Java, Python (model real-world objects)\n- **Non-procedural/Declarative** — SQL (say *what* you want, not *how*)",
      },
      {
        title: "Source code vs Object code",
        content: "",
        table: {
          headers: ["Property", "Source Code", "Object Code"],
          rows: [
            ["Written by", "Humans (programmer)", "Machine (compiler)"],
            ["Readable by", "Humans", "Computer (CPU)"],
            ["Format", "Plain text (.cpp file)", "Binary (.o or .obj file)"],
            ["Can it run directly?", "No — needs compilation", "Almost — needs linking"],
          ],
        },
      },
      {
        title: "Procedural vs Non-procedural languages",
        content: "",
        table: {
          headers: ["Procedural (3GL)", "Non-procedural (4GL)"],
          rows: [
            ["Tells the computer WHAT to do AND HOW", "Tells the computer WHAT, not HOW"],
            ["Harder to learn and debug", "Easier to learn and debug"],
            ["Many detailed instructions needed", "Very few instructions needed"],
            ["Used for general-purpose programming", "Often database-oriented (e.g., SQL)"],
            ["Examples: C, C++, Java", "Examples: SQL, MATLAB, Prolog"],
          ],
        },
      },
      {
        title: "Compiler vs Interpreter — Deep Comparison",
        content: "",
        table: {
          headers: ["Feature", "Compiler", "Interpreter"],
          rows: [
            ["Translation unit", "Whole program at once", "Statement by statement"],
            ["Output", "Object file (.o, .exe)", "No output file"],
            ["Execution speed", "Fast (pre-translated)", "Slower (translates during run)"],
            ["Error reporting", "Lists ALL errors after compile", "Stops at the FIRST error"],
            ["Development speed", "Slower (compile-run cycle)", "Faster feedback"],
            ["Examples", "C++, C, Go, Rust", "Python, JavaScript, Ruby"],
          ],
        },
      },
      {
        title: "💡 Tips & Tricks — Language Levels",
        content: "**Tip 1 — High-level ≠ slow**\nModern compilers are incredibly smart. C++ compiled code can be nearly as fast as hand-written assembly.\n\n**Tip 2 — All code eventually becomes machine code**\nNo matter which language you use — Python, Java, C++ — it *all* eventually turns into machine language before the CPU runs it. The difference is just *when* and *how* the translation happens.\n\n**Tip 3 — The assembler is different from the compiler**\nPeople often confuse these. The compiler takes C++ → assembly (or machine code). The assembler takes assembly → machine code. In a modern toolchain, the compiler handles both steps for you.",
      },
    ],
    quiz: [
      {
        question: "Which translator converts assembly into machine code?",
        options: ["Compiler", "Interpreter", "Assembler", "Linker"],
        correct: 2,
        explanation: "An assembler translates assembly language (mnemonics) to machine code (binary).",
      },
      {
        question: "Which is generally faster at execution time?",
        options: ["Interpreted program", "Compiled program", "Both are equal", "Depends on the OS"],
        correct: 1,
        explanation: "Compiled programs run as pre-translated machine code. Interpreted programs re-translate on every run.",
      },
      {
        question: "Source code is best described as:",
        options: ["Binary output", "Human-readable program text", "The operating system", "Hardware instructions"],
        correct: 1,
        explanation: "Source code is human-readable text written by a programmer, stored in a plain text file.",
      },
      {
        question: "SQL is an example of which category of language?",
        options: ["Machine language", "Assembly language", "Non-procedural (4GL)", "Procedural (3GL)"],
        correct: 2,
        explanation: "SQL is non-procedural — you say what data you want, not how to retrieve it.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 04 — Algorithms & Flowcharts Deep Dive
  // ─────────────────────────────────────────────────────────────
  {
    id: "algorithm-flowchart-deep",
    number: "04",
    title: "Algorithms & Flowcharts — Deep Dive",
    summary: "Program development process, IDE compilation steps, C++ reserved words, and the full primitive data type hierarchy.",
    duration: "35 min",
    topics: ["Program development", "IDE & compilation", "Reserved words", "Data types", "Variables & identifiers", "Escape sequences"],
    slides: [
      {
        title: "The 5-step program development process",
        content: "Every good program starts with a plan. Here are the five steps a professional programmer follows:\n\n1. **Define and analyze the problem** — understand what you need to build\n2. **Design the algorithm** — plan the solution step by step (flowchart / pseudocode)\n3. **Write the code** — translate your algorithm into C++\n4. **Test the program** — run it with known inputs and verify the output\n5. **Document** — add comments so others (and future you) understand the code",
      },
      {
        title: "What is an IDE?",
        content: "An **IDE** (Integrated Development Environment) is a software application that bundles all the tools you need to write, compile, and debug programs in one place:\n\n- **Editor** — where you type your code (with syntax highlighting and autocomplete)\n- **Compiler** — translates your code to machine language\n- **Debugger** — helps you step through code line by line to find bugs\n- **Linker** — combines compiled files into one program\n- **Loader** — runs the compiled program\n\nPopular C++ IDEs: **Visual Studio**, **Code::Blocks**, **CLion**, **VS Code**",
      },
      {
        title: "IDE compilation pipeline",
        content: "When you press \"Build & Run\" in your IDE, here is what happens behind the scenes:\n\n```\nyourProgram.cpp\n      ↓\n  Preprocessor   ← expands #include, #define\n      ↓\n  C++ Compiler   → produces assembly\n      ↓\n   Assembler     → produces object file (.o)\n      ↓\n    Linker        ← adds library object files\n      ↓\n yourProgram.exe  ← the final runnable program\n```",
      },
      {
        title: "C++ reserved words — words you CANNOT use as names",
        content: "C++ has a set of keywords that are part of the language itself. You cannot use them as variable names, function names, or any other identifier.",
        code: `auto    break   case    catch   char    class   const
continue default delete  do      double  else    enum
extern  false   float   for     goto    if      inline
int     long    new     nullptr operator private protected
public  return  short   signed  sizeof  static  struct
switch  template this    throw   true    try     typedef
union   unsigned virtual void    volatile while`,
      },
      {
        title: "C++ data types — the big picture",
        content: "Every value in C++ has a **type** that tells the compiler how much memory to use and how to interpret the bits.\n\n**Simple (primitive) types:**\n- **Integral** — `char`, `short`, `int`, `long`, `long long`, `bool`\n- **Floating-point** — `float`, `double`, `long double`\n- **Enumeration** — `enum`\n\n**Address types:**\n- `pointer` (holds a memory address)\n- `reference` (an alias for another variable)\n\n**Structured types:**\n- `array`, `struct`, `union`, `class`",
      },
      {
        title: "Numeric data types & their ranges",
        content: "",
        table: {
          headers: ["Type", "Size", "Range", "Use for"],
          rows: [
            ["bool", "1 bit (1 byte)", "true or false", "Yes/No flags"],
            ["char", "8 bits (1 byte)", "-128 to 127", "Single characters"],
            ["short", "16 bits (2 bytes)", "-32,768 to 32,767", "Small integers"],
            ["int", "32 bits (4 bytes)", "~-2.1 billion to ~2.1 billion", "Most integer uses"],
            ["long long", "64 bits (8 bytes)", "~-9.2 × 10¹⁸ to ~9.2 × 10¹⁸", "Very large integers"],
            ["float", "32 bits (4 bytes)", "~±3.4 × 10³⁸", "Decimal numbers (less precise)"],
            ["double", "64 bits (8 bytes)", "~±1.7 × 10³⁰⁸", "Decimal numbers (default choice)"],
          ],
        },
      },
      {
        title: "Variables — named storage boxes",
        content: "A **variable** is a named location in memory where you store a value. Think of it like a labelled box.\n\nC++ is **case-sensitive** — `area`, `Area`, `AREA`, and `ArEa` are four *completely different* variables.\n\nRules for naming variables (identifiers):\n- ✅ Must start with a **letter** or **underscore** `_`\n- ✅ Can contain letters, digits, and underscores\n- ❌ Cannot start with a digit\n- ❌ Cannot be a reserved word\n- ❌ No spaces, hyphens, or special characters",
        code: `// Valid identifiers
int age;
float taxRate;
double _startingBalance;
char middleInitial;

// Invalid identifiers
int 2start;      // starts with digit ❌
float tax-rate;  // hyphen not allowed ❌
char class;      // reserved word ❌`,
      },
      {
        title: "Declaring and initializing variables",
        content: "Always **initialize** your variables (give them a starting value). An uninitialized variable holds garbage data — whatever happened to be in that memory location before.",
        code: `int marks = 5;          // integer, initialized to 5
float weight = 5.99f;   // float (note the 'f' suffix)
double pi = 3.14159;    // double — best for decimals
char grade = 'A';       // character — use single quotes
bool isStudent = true;  // boolean

// Declaring multiple variables at once
int x = 0, y = 0, z = 0;`,
      },
      {
        title: "Escape sequences — special characters in strings",
        content: "Some characters can't be typed directly into a string. Use **escape sequences** (a backslash followed by a letter):",
        table: {
          headers: ["Escape Sequence", "Meaning", "Example output"],
          rows: [
            ["\\n", "New line (Enter key)", "Moves to the next line"],
            ["\\t", "Horizontal tab", "Adds a tab space"],
            ["\\r", "Carriage return", "Moves cursor to start of line"],
            ["\\'", "Single quote", "Prints '"],
            ["\\\"", "Double quote", "Prints \""],
            ["\\\\", "Backslash", "Prints \\"],
            ["\\0", "Null character", "Marks end of a C-string"],
          ],
        },
      },
      {
        title: "💡 Tips & Tricks — Variables & Types",
        content: "**Tip 1 — Use `double` for decimals, not `float`**\n`float` only has about 7 significant digits of precision. `double` has 15. For most programs, always use `double`.\n\n**Tip 2 — Use meaningful names**\nInstead of `int x = 25;`, write `int studentAge = 25;`. Your future self will thank you.\n\n**Tip 3 — Always initialize variables**\n```cpp\nint count; // BAD — contains garbage!\nint count = 0; // GOOD\n```\n\n**Tip 4 — `char` uses single quotes, `string` uses double quotes**\n```cpp\nchar c = 'A';    // single quotes for ONE character\nstring s = \"Hello\"; // double quotes for text\n```",
      },
    ],
    playground: {
      description: "Case-sensitivity demo — four 'different' variables with the same letters.",
      code: `#include <iostream>
using namespace std;

int main() {
    int area = 50, AREA = 10, AreA = 5, areA = 2;
    cout << "area = " << area << "\\n";
    cout << "AREA = " << AREA << "\\n";
    cout << "AreA = " << AreA << "\\n";
    cout << "areA = " << areA << "\\n";
    return 0;
}`,
      output: "area = 50\nAREA = 10\nAreA = 5\nareA = 2",
    },
    quiz: [
      {
        question: "Which of these identifiers is INVALID in C++?",
        options: ["_taxRate", "ageOfDog", "2000TaxRate", "PrintHeading"],
        correct: 2,
        explanation: "Identifiers cannot start with a digit. '2000TaxRate' starts with '2', so it's invalid.",
      },
      {
        question: "What escape sequence prints a tab?",
        options: ["\\n", "\\t", "\\b", "\\\\"],
        correct: 1,
        explanation: "\\t produces a horizontal tab character.",
      },
      {
        question: "How many bits is a standard `int` in C++?",
        options: ["8", "16", "32", "64"],
        correct: 2,
        explanation: "A typical int is 32-bit (4 bytes) signed on most modern platforms.",
      },
      {
        question: "Which type should you prefer for decimal numbers?",
        options: ["float", "double", "int", "char"],
        correct: 1,
        explanation: "double has 15 significant digits of precision vs float's 7. Always prefer double unless memory is critical.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 4.1 — Data Types & Operators
  // ─────────────────────────────────────────────────────────────
  {
    id: "datatypes-operators",
    number: "4.1",
    title: "Data Types & Operators",
    summary: "Identifiers, primitive types, assignment, I/O via cin/cout, type compatibility, and boolean expressions.",
    duration: "40 min",
    topics: ["Identifiers", "Variables", "Assignment", "cin / cout", "Type conversion", "Relational & logical operators"],
    slides: [
      {
        title: "What is an identifier?",
        content: "An **identifier** is any name you give to something in your program — a variable, a function, a constant, etc.\n\nRules:\n- Must start with a **letter** or underscore (`_`)\n- Can contain letters, digits, underscores\n- **Case-sensitive** — `Work` and `work` are different\n- Cannot be a reserved keyword\n\nBest practice: use descriptive names. `studentAge` tells you far more than just `x`.",
      },
      {
        title: "Variables — declare before you use",
        content: "A **variable** is a named memory location. Declaring it tells the compiler:\n1. How much memory to allocate (based on the data type)\n2. What name maps to that memory location\n\nYou can declare many variables at once, and optionally set an initial value.",
        code: `int ageOfDog;           // declares, not yet initialized
char middleInitial;
float taxRate;

int count = 0;          // declared AND initialized
int x = 5, y = 10;     // multiple at once

// Always initialize! Uninitialized = garbage value
int danger;             // what is inside? nobody knows`,
      },
      {
        title: "Expressions in C++",
        content: "An **expression** is a combination of variables, constants, and operators that evaluates to a single value.\n\nEvery expression has a **type** (int, double, bool, etc.).\n\nExamples:\n- `100` — a constant expression (type: int)\n- `count` — just a variable (type: whatever count is)\n- `a + b` — arithmetic expression\n- `a * 2 + 1` — more complex expression\n- `getArea(5, 3)` — a function call (returns a value)",
      },
      {
        title: "The assignment operator `=`",
        content: "The `=` sign in C++ means **\"store this value into that variable\"** — it is NOT the same as the mathematical equals sign.\n\nSyntax: `Variable = Expression;`\n\nTwo things happen:\n1. The expression on the **right** is fully evaluated first\n2. The result is **stored** into the variable on the **left**\n\n💡 **Common mistake:** `a == b` checks if they're equal (comparison). `a = b` copies b into a (assignment).",
        code: `int count = 0;
int starting;

starting = count + 5;   // right side evaluated first: 0 + 5 = 5
                        // then 5 is stored in 'starting'

count = count + 1;      // take count's value (0), add 1, store back (1)

// This is WRONG: you cannot assign to a literal
5 = count;              // ERROR: 5 is not a variable`,
      },
      {
        title: "Input & Output streams — cin and cout",
        content: "C++ treats input/output as a **stream** of characters flowing in or out.\n\n- **`cout`** (Console OUTput) — sends data to the screen. Use the **insertion operator** `<<` (think of it as \"pushing\" data into the output stream).\n- **`cin`** (Console INput) — reads data from the keyboard. Use the **extraction operator** `>>` (think of it as \"pulling\" data out of the input stream).\n\nBoth are declared in the `<iostream>` header.",
        code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Enter your age: ";   // output a prompt
    cin >> age;                   // read the value typed
    cout << "You are " << age << " years old." << endl;
    return 0;
}`,
      },
      {
        title: "Chaining output with `<<`",
        content: "You can chain multiple items together with `<<` in one `cout` statement.",
        code: `string name = "Ali";
int age = 20;
double gpa = 3.75;

cout << "Name: " << name << endl;
cout << "Age: " << age << ", GPA: " << gpa << endl;
// endl flushes the buffer and moves to a new line
// \\n is faster than endl (doesn't flush)`,
      },
      {
        title: "Type compatibility & integer division",
        content: "When you do arithmetic in C++, the **type of the result** depends on the types of the operands:\n\n- **int / int → int** — the decimal part is simply thrown away!\n- If **either** operand is `double`, the result is `double`\n- Use `static_cast<double>` to force floating-point division",
        code: `int x = 7, y = 2;

cout << x / y;        // prints 3 (NOT 3.5!) — integer division!
cout << 7.0 / 2;      // prints 3.5 — one operand is double
cout << (double)x / y;// prints 3.5 — old-style cast
cout << static_cast<double>(x) / y; // prints 3.5 — modern cast`,
      },
      {
        title: "Arithmetic operators",
        content: "",
        table: {
          headers: ["Operator", "Name", "Example", "Result"],
          rows: [
            ["+", "Addition", "5 + 3", "8"],
            ["-", "Subtraction", "5 - 3", "2"],
            ["*", "Multiplication", "5 * 3", "15"],
            ["/", "Division", "7 / 2 (int)", "3 (truncated)"],
            ["%", "Modulo (remainder)", "7 % 2", "1"],
          ],
        },
      },
      {
        title: "Boolean expressions — true or false",
        content: "A **boolean expression** evaluates to either `true` or `false`. Used in `if` statements and loops.\n\n**Relational operators** (compare two values):\n`<`, `<=`, `>`, `>=`, `==` (equal), `!=` (not equal)\n\n**Logical operators** (combine booleans):\n- `!` — NOT (flips true/false)\n- `&&` — AND (both must be true)\n- `||` — OR (either must be true)",
        code: `int age = 25, income = 15000;
double taxRate = 0.30;

bool example1 = (taxRate > 0.25) && (income < 20000); // true
bool example2 = (age >= 18) || (age <= 60);           // true
bool example3 = !(age == 21);                          // true (25 != 21)`,
      },
      {
        title: "Constants — values that never change",
        content: "Use `const` to declare a value that cannot be modified after initialization. Convention: use UPPERCASE names for constants.",
        code: `const double TAX_RATE = 0.08;
const double PI = 3.14159265;
const int MAX_STUDENTS = 50;

// This will cause a compile error:
TAX_RATE = 0.10;  // ERROR: cannot assign to const variable

double area = PI * radius * radius; // PI is safe to use`,
      },
      {
        title: "💡 Tips & Tricks — Data Types & I/O",
        content: "**Tip 1 — `7 / 2 = 3`, not 3.5!**\nThis is one of the most common C++ beginner bugs. When both operands are integers, C++ uses **integer division** (truncates). Always use `7.0 / 2` or `static_cast<double>(7) / 2` when you need a decimal result.\n\n**Tip 2 — Use `endl` vs `\\n` wisely**\n`endl` flushes the output buffer (slower but safe). `\\n` is just a newline character (faster). For most programs, `\\n` is fine.\n\n**Tip 3 — `cin >>` skips whitespace**\n`cin >>` automatically skips spaces and newlines before reading. This is usually what you want.\n\n**Tip 4 — Don't mix `cin >>` and `cin.getline` without care**\nAfter `cin >> x`, there's a newline left in the buffer. If you then call `cin.getline()`, it will read that empty line. Fix: call `cin.ignore()` between them.",
      },
    ],
    playground: {
      description: "Integer vs floating-point division — watch the difference.",
      code: `#include <iostream>
using namespace std;

int main() {
    int x = 5, y = 2;
    cout << "int / int            = " << (x / y) << endl;
    cout << "double / int         = " << (5.0 / y) << endl;
    cout << "static_cast<double>  = " << static_cast<double>(x) / y << endl;
    cout << "5 % 2 (remainder)    = " << (x % y) << endl;
    return 0;
}`,
      output: "int / int            = 2\ndouble / int         = 2.5\nstatic_cast<double>  = 2.5\n5 % 2 (remainder)    = 1",
    },
    quiz: [
      {
        question: "What is the value of `7 / 2` in C++ when both are int?",
        options: ["3.5", "3", "4", "Error"],
        correct: 1,
        explanation: "Integer division truncates the decimal part. 7 / 2 = 3 (not 3.5).",
      },
      {
        question: "Which operator gives the remainder of a division?",
        options: ["/", "%", "*", "&"],
        correct: 1,
        explanation: "The modulo operator % returns the remainder. 7 % 2 = 1.",
      },
      {
        question: "Evaluate: `(age >= 21) && (age <= 60)` when age is 18.",
        options: ["true", "false", "error", "undefined"],
        correct: 1,
        explanation: "18 is not >= 21, so the first condition is false. With &&, both must be true, so the result is false.",
      },
      {
        question: "What is the purpose of `static_cast<double>(x)` when x is int?",
        options: ["It deletes x", "It forces floating-point division", "It rounds x up", "It does nothing"],
        correct: 1,
        explanation: "static_cast<double>(x) converts the integer x to a double, forcing the division to be floating-point.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 05 — Expressions & Operators
  // ─────────────────────────────────────────────────────────────
  {
    id: "expressions-operators",
    number: "05",
    title: "Expressions & Operators",
    summary: "Operator precedence, named constants, increment / decrement, augmented assignment, and the compilation lifecycle.",
    duration: "35 min",
    topics: ["Precedence", "Constants", "++ / --", "+=, -=, *=", "Errors revisited"],
    slides: [
      {
        title: "Expressions — a quick recap",
        content: "An **expression** is any combination of variables, constants, function calls, and operators that produces a value.\n\nAll expressions have a **type** — `int`, `double`, `bool`, etc. That type determines what operations are valid.\n\nExamples:\n- `42` → int\n- `3.14` → double\n- `'A'` → char\n- `x + y * 2` → depends on types of x and y\n- `x > 0` → bool",
      },
      {
        title: "Arithmetic operators — detailed",
        content: "- `+` addition, `-` subtraction, `*` multiplication\n- `/` division — **integer division** if both operands are int!\n- `%` modulo — gives the **remainder** after division (only works on integers)\n\nRemember:\n- `7 / 2` = `3` (int)\n- `7.0 / 2` = `3.5` (double)\n- `7 % 2` = `1` (remainder)\n- `8 % 2` = `0` (8 is exactly divisible by 2)",
      },
      {
        title: "Operator precedence — order of operations",
        content: "When an expression has multiple operators, C++ follows a specific order (just like math: multiplication before addition). Higher in the table = evaluated first.",
        table: {
          headers: ["Precedence", "Operator", "Associativity", "Example"],
          rows: [
            ["1 (highest)", "()", "Left to right", "(3 + 4) * 2 → 14"],
            ["2", "++ -- ! + - (unary)", "Right to left", "-x, !flag, ++i"],
            ["3", "* / %", "Left to right", "3 * 4 / 2 → 6"],
            ["4", "+ -", "Left to right", "3 + 4 - 1 → 6"],
            ["5", "< <= > >=", "Left to right", "a < b"],
            ["6", "== !=", "Left to right", "a == b"],
            ["7", "&&", "Left to right", "a && b"],
            ["8", "||", "Left to right", "a || b"],
            ["9 (lowest)", "= += -= *=", "Right to left", "a = b + c"],
          ],
        },
      },
      {
        title: "Tracing an expression step by step",
        content: "Let's evaluate `3 + 4 * 4 + 5 * (4 + 3) - 1` carefully:\n\n1. **Parentheses first:** `(4 + 3)` = 7 → expression becomes `3 + 4 * 4 + 5 * 7 - 1`\n2. **Multiplications (left to right):** `4 * 4` = 16, `5 * 7` = 35 → `3 + 16 + 35 - 1`\n3. **Addition & subtraction (left to right):** `3 + 16` = 19, `19 + 35` = 54, `54 - 1` = **53**\n\n💡 **Tip:** When in doubt, add extra parentheses. They cost nothing and prevent bugs.",
      },
      {
        title: "Practical example — Fahrenheit to Celsius",
        content: "Formula: celsius = (5/9) × (fahrenheit − 32)\n\n⚠️ Watch out! `5/9` is integer division = 0! You must write `5.0/9` or `5.0/9.0` to get a decimal.",
        code: `#include <iostream>
using namespace std;

int main() {
    double fahrenheit;
    cout << "Enter temperature in Fahrenheit: ";
    cin >> fahrenheit;

    // 5/9 would be 0 — use 5.0/9 for floating-point division
    double celsius = (5.0 / 9) * (fahrenheit - 32);

    cout << fahrenheit << "°F = " << celsius << "°C" << endl;
    return 0;
}`,
      },
      {
        title: "Named constants with `const`",
        content: "A **constant** is a value that never changes. Using `const` instead of hardcoding numbers makes your code:\n- Easier to read (`PI` is clearer than `3.14159`)\n- Easier to update (change one place, not many)\n- Safer (compiler prevents accidental modification)",
        code: `const double PI = 3.14159265358979;
const double TAX_RATE = 0.08;
const int MAX_SIZE = 100;

double radius = 5.0;
double area = PI * radius * radius;  // clear and safe`,
      },
      {
        title: "Increment & Decrement operators",
        content: "C++ has shortcuts to add 1 or subtract 1 from a variable:\n\n- `++i` **pre-increment** — increment first, then use the value\n- `i++` **post-increment** — use the value first, then increment\n- `--i` **pre-decrement** — decrement first, then use\n- `i--` **post-decrement** — use first, then decrement",
        table: {
          headers: ["Expression", "Name", "What happens (starting from i=5)"],
          rows: [
            ["j = ++i", "Pre-increment", "i becomes 6 FIRST, then j = 6. Result: i=6, j=6"],
            ["j = i++", "Post-increment", "j = 5 first (old value), THEN i becomes 6. Result: i=6, j=5"],
            ["j = --i", "Pre-decrement", "i becomes 4 FIRST, then j = 4. Result: i=4, j=4"],
            ["j = i--", "Post-decrement", "j = 5 first (old value), THEN i becomes 4. Result: i=4, j=5"],
          ],
        },
      },
      {
        title: "Pre vs Post — visualized",
        content: "The difference between `++i` and `i++` only matters when the expression's value is used.",
        code: `int i = 10;

// Post-increment: use THEN increment
int a = 10 * i++;    // a = 10 * 10 = 100, then i becomes 11
cout << "a = " << a << ", i = " << i; // a=100, i=11

int j = 10;

// Pre-increment: increment THEN use
int b = 10 * (++j);  // j becomes 11 first, then b = 10 * 11 = 110
cout << "b = " << b << ", j = " << j; // b=110, j=11`,
      },
      {
        title: "Augmented (compound) assignment operators",
        content: "These are shortcuts that combine an operation with assignment. They make code shorter and slightly more readable.",
        table: {
          headers: ["Shortcut", "Example", "Equivalent to", "Description"],
          rows: [
            ["+=", "x += 5", "x = x + 5", "Add and assign"],
            ["-=", "x -= 3", "x = x - 3", "Subtract and assign"],
            ["*=", "x *= 2", "x = x * 2", "Multiply and assign"],
            ["/=", "x /= 4", "x = x / 4", "Divide and assign"],
            ["%=", "x %= 7", "x = x % 7", "Modulo and assign"],
          ],
        },
      },
      {
        title: "💡 Tips & Tricks — Operators",
        content: "**Tip 1 — Use `i++` in loops (doesn't usually matter, but it's the convention)**\n```cpp\nfor (int i = 0; i < 10; i++) { ... } // i++ is idiomatic here\n```\n\n**Tip 2 — Never write `i = i++` or similar expressions**\nCombining `i` and `i++` in the same expression is **undefined behavior** in C++. The compiler can do anything.\n\n**Tip 3 — Use parentheses when unsure about precedence**\nInstead of guessing, just write `(a + b) * c` instead of trying to remember if `+` or `*` runs first (you know `*` does — but extra parens never hurt).\n\n**Tip 4 — The modulo trick: check if a number is even**\n```cpp\nif (n % 2 == 0) cout << \"even\";\nif (n % 2 != 0) cout << \"odd\";\n```",
      },
    ],
    playground: {
      description: "Compute Celsius from Fahrenheit. Try changing the value of fahrenheit.",
      code: `#include <iostream>
using namespace std;

int main() {
    double fahrenheit = 100;
    double celsius = (5.0 / 9) * (fahrenheit - 32);
    cout << fahrenheit << " F = " << celsius << " C";
    return 0;
}`,
      output: "100 F = 37.7778 C",
    },
    quiz: [
      {
        question: "What is the value of `3 + 4 * 4 + 5 * (4 + 3) - 1`?",
        options: ["52", "53", "54", "60"],
        correct: 1,
        explanation: "Parentheses first: (4+3)=7. Then multiplication: 4*4=16, 5*7=35. Then addition: 3+16+35-1 = 53.",
      },
      {
        question: "If `i = 5`, what does `int j = i++;` set j to?",
        options: ["6", "5", "4", "Error"],
        correct: 1,
        explanation: "Post-increment: j gets the OLD value of i (5), then i is incremented to 6.",
      },
      {
        question: "Which is equivalent to `i = i * 8;`?",
        options: ["i ** 8", "i *= 8", "i =* 8", "i + *8"],
        correct: 1,
        explanation: "*= is the multiplication-and-assign (compound assignment) operator.",
      },
      {
        question: "Why does `5/9` give 0 in C++?",
        options: ["It's a compiler bug", "Both 5 and 9 are integers, causing integer division", "The operator / means something else", "You need to import math"],
        correct: 1,
        explanation: "When both operands are integers, C++ performs integer division and truncates. 5/9 = 0 remainder 5. Use 5.0/9 instead.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 07 — if, else if & Decision Statements
  // ─────────────────────────────────────────────────────────────
  {
    id: "if-else",
    number: "07",
    title: "if, else if & Decision Statements",
    summary: "Simple if, if-else, blocks, multi-way else-if ladders, and the bool data type in conditions.",
    duration: "35 min",
    topics: ["Simple if", "Blocks {}", "if-else", "Multi-way if", "Relational & logical ops"],
    slides: [
      {
        title: "Why do we need decisions?",
        content: "Real programs don't do the same thing every time. They need to **react** to different situations:\n\n- If the user enters a negative number, show an error\n- If the score is above 90, print \"A\"\n- If the username and password match, allow login\n\nDecision statements let your program take different paths depending on conditions.",
      },
      {
        title: "The simple `if` statement",
        content: "The `if` statement runs a block of code **only if** a condition is true. If the condition is false, it does nothing.\n\nSyntax:\n```cpp\nif (condition) {\n    // this code only runs if condition is TRUE\n}\n```\n\nThe condition must be a **boolean expression** — something that evaluates to true or false.",
        code: `int score = 75;

if (score >= 60) {
    cout << "You passed!" << endl;  // runs only if score >= 60
}

// Without braces (only valid for ONE statement)
if (score < 0)
    cout << "Score cannot be negative!";`,
      },
      {
        title: "Why braces `{}` always matter",
        content: "Without braces, only the **very next single statement** belongs to the `if`. This causes a classic bug:",
        code: `int number = 0;

// CORRECT — both statements are inside the if
if (number == 0) {
    cout << "Hmm... ";
    cout << "Invalid number!";
}

// BUG — only the first cout is inside the if!
// The second cout ALWAYS runs, even when number != 0
if (number == 0)
    cout << "Hmm... ";
    cout << "Invalid number!";  // This ALWAYS prints — bug!`,
      },
      {
        title: "Relational operators",
        content: "",
        table: {
          headers: ["Operator", "Meaning", "Example", "Result when x=5, y=3"],
          rows: [
            ["<", "Less than", "x < y", "false (5 is not < 3)"],
            [">", "Greater than", "x > y", "true (5 is > 3)"],
            ["<=", "Less than or equal", "x <= 5", "true (5 is <= 5)"],
            [">=", "Greater than or equal", "x >= 6", "false (5 is not >= 6)"],
            ["==", "Equal to", "x == 5", "true"],
            ["!=", "Not equal to", "x != y", "true (5 != 3)"],
          ],
        },
      },
      {
        title: "⚠️ Common Mistake: `=` vs `==`",
        content: "This is **the most common C++ bug**. The assignment `=` and the comparison `==` look similar but do completely different things:\n\n- `x = 5` — **assigns** 5 to x (x is now 5)\n- `x == 5` — **checks** if x equals 5 (returns true or false)\n\n```cpp\n// BUG: This assigns 0 to x inside the if condition!\n// The compiler might not even warn you.\nif (x = 0) { ... }   // WRONG — always false (0 = false)\n\n// Correct:\nif (x == 0) { ... }  // checks if x equals 0\n```\n\n💡 **Tip:** Some programmers write `0 == x` (Yoda condition) to avoid this — if you accidentally write `0 = x`, the compiler will error.",
      },
      {
        title: "Logical operators — combining conditions",
        content: "Use logical operators to combine multiple boolean expressions:\n\n- `&&` **(AND)** — Both conditions must be TRUE\n- `||` **(OR)** — At least ONE condition must be TRUE\n- `!` **(NOT)** — Flips true to false and vice versa",
        code: `int age = 25;
double income = 45000;

// AND: both must be true
if (age >= 18 && income > 30000)
    cout << "Eligible for loan";

// OR: either can be true
if (age < 18 || age > 65)
    cout << "Not in working age range";

// NOT: flip the condition
bool isStudent = true;
if (!isStudent)
    cout << "Not a student";`,
      },
      {
        title: "The `bool` data type",
        content: "`bool` stores exactly one of two values: `true` or `false`.\n\nInteresting C++ rule: any non-zero numeric value is treated as `true`. Only `0` is `false`.",
        code: `bool flag1 = true;   // explicitly true
bool flag2 = false;  // explicitly false
bool b1 = -1.5;      // true (non-zero)
bool b2 = 0;         // false
bool b3 = 1.5;       // true (non-zero)

bool isLoggedIn = false;
isLoggedIn = true;   // update later`,
      },
      {
        title: "if-else — two-way selection",
        content: "When you want to do one thing if the condition is true, and something ELSE if it's false, use `if-else`:",
        code: `double radius = -5;
const double PI = 3.14159;

if (radius < 0) {
    cout << "Error: radius cannot be negative!" << endl;
} else {
    double area = PI * radius * radius;
    cout << "Area = " << area << endl;
}`,
      },
      {
        title: "Multi-way `else if` — grade ladder",
        content: "When you have more than two possible cases, chain `else if` blocks. Only the FIRST matching condition runs — the rest are skipped.",
        code: `double score;
cin >> score;

if (score >= 90.0)
    cout << "Grade: A";
else if (score >= 80.0)
    cout << "Grade: B";
else if (score >= 70.0)
    cout << "Grade: C";
else if (score >= 60.0)
    cout << "Grade: D";
else
    cout << "Grade: F";`,
      },
      {
        title: "Combined conditions example — divisibility",
        content: "Real-world programs often combine multiple conditions:",
        code: `int number;
cin >> number;

// Divisible by BOTH 2 and 3 (i.e., by 6)
if (number % 2 == 0 && number % 3 == 0)
    cout << number << " is divisible by 2 AND 3";

// Divisible by 2 OR 3 (or both)
if (number % 2 == 0 || number % 3 == 0)
    cout << number << " is divisible by 2 OR 3";

// Divisible by one but not the other (XOR logic)
if ((number % 2 == 0 || number % 3 == 0) &&
    !(number % 2 == 0 && number % 3 == 0))
    cout << number << " is divisible by 2 or 3, but not both";`,
      },
      {
        title: "💡 Tips & Tricks — Decision Statements",
        content: "**Tip 1 — Always use braces, even for one-line ifs**\nEven if C++ doesn't require it, braces prevent bugs when you add a second line later.\n\n**Tip 2 — Order matters in else-if chains**\nPut the most restrictive condition first:\n```cpp\n// Wrong order — everyone gets \"F\" because score >= 0 is true first!\nif (score >= 0) cout << \"F\";\nelse if (score >= 60) cout << \"D\";  // Never reached!\n\n// Correct — most restrictive first\nif (score >= 90) cout << \"A\";\nelse if (score >= 60) cout << \"D\";\n```\n\n**Tip 3 — `&&` is lazily evaluated (short-circuit)**\nIn `a && b`, if `a` is false, `b` is never checked. Use this to avoid errors:\n```cpp\nif (n != 0 && result / n > 5)  // safe: won't divide by 0\n```",
      },
    ],
    playground: {
      description: "Grade ladder — change the score value and re-run to see different grades.",
      code: `#include <iostream>
using namespace std;

int main() {
    double score = 75.0;  // Try 95, 85, 75, 65, 55

    if      (score >= 90.0) cout << "Grade: A";
    else if (score >= 80.0) cout << "Grade: B";
    else if (score >= 70.0) cout << "Grade: C";
    else if (score >= 60.0) cout << "Grade: D";
    else                    cout << "Grade: F";

    return 0;
}`,
      output: "Grade: C",
    },
    quiz: [
      {
        question: "What is the value of `(5 != 2)`?",
        options: ["true", "false", "5", "Compile error"],
        correct: 0,
        explanation: "5 is not equal to 2, so `!=` returns true.",
      },
      {
        question: "How many statements belong to `if (x > 0)` without braces?",
        options: ["All until a semicolon", "Only the single next statement", "The entire file", "None — braces are required"],
        correct: 1,
        explanation: "Without braces, only the immediately following statement is part of the if block.",
      },
      {
        question: "Given `int score = 85;`, which grade prints in the grade-ladder example?",
        options: ["A", "B", "C", "D"],
        correct: 1,
        explanation: "85 fails >= 90 but passes >= 80, so 'B' prints.",
      },
      {
        question: "What is wrong with `if (x = 0)` as a condition?",
        options: ["Nothing, it works fine", "It assigns 0 to x and then checks if x is 0 (which is false)", "= is not allowed in conditions", "It causes a runtime crash"],
        correct: 1,
        explanation: "= is the assignment operator. It assigns 0 to x, and then 0 is treated as false, so the if body never runs. You need == to compare.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 08 — Nested if & Switch
  // ─────────────────────────────────────────────────────────────
  {
    id: "nested-if-switch",
    number: "08",
    title: "Nested if & Switch",
    summary: "Nested if statements, the ternary operator, and the switch statement for clean multi-branch selection.",
    duration: "30 min",
    topics: ["Nested if", "Else matching", "Ternary ?:", "switch / case", "break & default"],
    slides: [
      {
        title: "Nested if — decisions inside decisions",
        content: "A **nested if** is simply an `if` statement placed inside another `if` statement. It allows you to make a decision, and then based on that result, make another decision.\n\nThink of it like: \"If it's raining, and if I have an umbrella, I'll go out.\"",
        code: `int num1, num2, num3;
cin >> num1 >> num2 >> num3;

// Find the largest of three numbers
if (num1 > num2) {
    // num1 is bigger than num2, now compare with num3
    if (num1 > num3)
        cout << num1 << " is the largest";
    else
        cout << num3 << " is the largest";
} else {
    // num2 is bigger than num1, now compare with num3
    if (num2 > num3)
        cout << num2 << " is the largest";
    else
        cout << num3 << " is the largest";
}`,
      },
      {
        title: "Matching the `else` — the dangling else problem",
        content: "In C++, each `else` belongs to the **nearest unmatched `if`** above it. This can cause bugs if you don't use braces.\n\nAlways use braces `{}` to make your intent clear!",
        code: `// Which if does the else belong to?
// The else matches the NEAREST if (if b == c), not the outer one!
if (a == b)
    if (b == c)
        cout << "a, b, c are all equal";
else
    cout << "a and b are different";  // This is misleading!

// Use braces to make intent clear:
if (a == b) {
    if (b == c)
        cout << "a, b, c are all equal";
} else {
    cout << "a and b are different";  // Now this matches the outer if
}`,
      },
      {
        title: "The conditional (ternary) operator `?:`",
        content: "The ternary operator is a compact way to write a simple `if-else` that returns a value.\n\nSyntax: `condition ? value_if_true : value_if_false`\n\nIt's called \"ternary\" because it takes THREE parts.",
        code: `int x = 10;

// Long form (4 lines)
int y;
if (x > 0)
    y = 1;
else
    y = -1;

// Equivalent ternary (1 line)
int y = (x > 0) ? 1 : -1;

// More examples
cout << ((5 % 2 == 0) ? "even" : "odd");  // prints "odd"
int min = (a < b) ? a : b;                // minimum of two numbers`,
      },
      {
        title: "When to use ternary vs if-else",
        content: "The ternary operator is great for:\n- Simple, short conditions\n- Initializing a variable based on a condition\n- Inside a `cout` statement\n\nStick to `if-else` when:\n- The body has multiple statements\n- The logic is complex\n- Readability matters more than brevity",
        code: `// Great use of ternary
int maxVal = (a > b) ? a : b;
cout << "Result: " << (score >= 60 ? "Pass" : "Fail");

// BAD use of ternary — too complex, use if-else instead
int z = (a > b) ? (a > c ? (a > d ? a : d) : (c > d ? c : d)) : (b > c ? b : c);
// ^ Nobody can read this! Write it as if-else instead.`,
      },
      {
        title: "The `switch` statement",
        content: "When you need to compare **one variable** against **many fixed values**, `switch` is cleaner and more readable than a long chain of `else if`.\n\n```cpp\nswitch (variable) {\n    case value1:\n        // code for value1\n        break;\n    case value2:\n        // code for value2\n        break;\n    default:\n        // runs if no case matched\n}\n```\n\nNote: `switch` only works with **integer types** (int, char, enum). NOT with strings or doubles.",
      },
      {
        title: "switch example — grade discount",
        content: "",
        code: `char grade;
double tuition_fees = 10000;
cin >> grade;

switch (grade) {
    case 'A':
        tuition_fees *= 0.20;  // 80% discount for A students
        cout << "Tuition: " << tuition_fees;
        break;
    case 'B':
        tuition_fees *= 0.40;
        cout << "Tuition: " << tuition_fees;
        break;
    case 'C':
        tuition_fees *= 0.60;
        cout << "Tuition: " << tuition_fees;
        break;
    default:
        cout << "No discount";
}`,
      },
      {
        title: "Fall-through — what happens without `break`",
        content: "If you forget `break`, execution **falls through** to the next case and keeps running until it hits a `break` or the end of the switch.\n\nThis is usually a bug — but can be intentionally used to group cases:",
        code: `int day = 1;

switch (day) {
    case 1:   // Fall-through intentionally — both 1 and 7 are weekends
    case 7:
        cout << "Weekend!";
        break;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        cout << "Weekday";
        break;
    default:
        cout << "Invalid day";
}`,
      },
      {
        title: "Fall-through bug example",
        content: "What does this print?",
        code: `int marks = 60;
switch (marks) {
    case 50: cout << "Passed";    // no break!
    case 60: cout << "Got C";     // no break!
    case 70: cout << "Got B";     // no break!
    case 80: cout << "Got A";
}
// Execution matches case 60, then FALLS THROUGH to 70 and 80
// Output: Got CGot BGot A   ← This is a bug!

// Fix: add break after each case
switch (marks) {
    case 50: cout << "Passed"; break;
    case 60: cout << "Got C";  break;
    case 70: cout << "Got B";  break;
    case 80: cout << "Got A";  break;
}`,
      },
      {
        title: "💡 Tips & Tricks — switch & ternary",
        content: "**Tip 1 — Always add `default` to a switch**\nIt's like the `else` at the end — it handles any value you didn't explicitly list.\n\n**Tip 2 — Don't forget `break`**\nForgetting `break` is the #1 switch bug. Every case should end with `break` unless you intentionally want fall-through.\n\n**Tip 3 — `switch` is often faster than `else if`**\nFor many cases, the compiler can optimize a switch into a jump table (very fast).\n\n**Tip 4 — Ternary operator for cout**\n```cpp\n// Clean and readable:\ncout << \"Number is \" << (n % 2 == 0 ? \"even\" : \"odd\");\n```",
      },
    ],
    playground: {
      description: "Mini calculator using switch. Change the value of 'op' to try different operations.",
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 4;
    char op = '*';  // Try '+', '-', '*', '/'

    switch (op) {
        case '+': cout << a << " + " << b << " = " << (a+b); break;
        case '-': cout << a << " - " << b << " = " << (a-b); break;
        case '*': cout << a << " * " << b << " = " << (a*b); break;
        case '/': cout << a << " / " << b << " = " << (a/b); break;
        default:  cout << "Unknown operator: " << op;
    }
    return 0;
}`,
      output: "12 * 4 = 48",
    },
    quiz: [
      {
        question: "What does `(x > 0) ? 1 : -1` return when x = -5?",
        options: ["1", "-1", "0", "Error"],
        correct: 1,
        explanation: "The condition x > 0 is false when x = -5, so the expression returns -1 (the second value).",
      },
      {
        question: "What happens if you forget `break` inside a switch case?",
        options: [
          "Compile error",
          "Only the matched case runs",
          "Execution falls through to the next case(s)",
          "The program crashes at runtime",
        ],
        correct: 2,
        explanation: "Without break, execution continues into the following case bodies — called fall-through.",
      },
      {
        question: "An `else` matches which `if`?",
        options: [
          "The first if in the file",
          "The outermost if",
          "The nearest unmatched if above it",
          "Whichever is in the same function",
        ],
        correct: 2,
        explanation: "C++ pairs each else with the nearest unmatched if. Use braces to make this clear.",
      },
      {
        question: "Can a switch statement use a `double` as its expression?",
        options: ["Yes, always", "Yes, with casting", "No — switch only works with integer types", "Only in C++17"],
        correct: 2,
        explanation: "switch only works with integer types (int, char, enum). Not with float, double, or string.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 09 — for Loop
  // ─────────────────────────────────────────────────────────────
  {
    id: "for-loop-break-continue",
    number: "09",
    title: "for Loop, break & continue",
    summary: "Counter-controlled repetition with the for loop, plus break and continue for altering control flow inside loops.",
    duration: "30 min",
    topics: ["for loop", "Counter vs sentinel", "break", "continue"],
    slides: [
      {
        title: "Why do we need loops?",
        content: "Imagine printing \"Hello World\" 100 times. Without loops, you'd write `cout << \"Hello World\";` 100 times.\n\n**Loops** let a block of code repeat automatically as many times as needed — saving you from repetition and making programs far more powerful.\n\nTwo main families:\n- **Counter-controlled** — repeats a fixed number of times (use `for`)\n- **Condition-controlled** — repeats until something changes (use `while` / `do-while`)",
      },
      {
        title: "The `for` loop — syntax & parts",
        content: "The `for` loop is perfect when you know in advance how many times you want to repeat.\n\n```cpp\nfor (initialization; condition; update) {\n    // body — runs each iteration\n}\n```\n\n- **Initialization** — runs ONCE at the very beginning\n- **Condition** — checked BEFORE each iteration. If false, loop ends.\n- **Update** — runs at the END of each iteration\n- **Body** — the code that repeats",
      },
      {
        title: "A simple for loop — Hello World 5 times",
        content: "",
        code: `for (int i = 1; i <= 5; i++) {
    cout << "Hello World #" << i << endl;
}
// Output:
// Hello World #1
// Hello World #2
// Hello World #3
// Hello World #4
// Hello World #5

// How it works:
// i=1: 1<=5? YES → print, i becomes 2
// i=2: 2<=5? YES → print, i becomes 3
// ...
// i=6: 6<=5? NO  → loop ends`,
      },
      {
        title: "Counting and using the counter",
        content: "The loop variable `i` doesn't just count — you can use it inside the body to do useful calculations:",
        code: `// Print squares from 1 to 5
for (int i = 1; i <= 5; i++) {
    cout << i << " squared = " << i * i << endl;
}
// 1 squared = 1
// 2 squared = 4
// 3 squared = 9
// 4 squared = 16
// 5 squared = 25

// Sum of numbers 1 to 100
int total = 0;
for (int i = 1; i <= 100; i++) {
    total += i;
}
cout << "Sum = " << total;  // Sum = 5050`,
      },
      {
        title: "Counting down — decrement in for",
        content: "The update step doesn't have to increment. You can count down too:",
        code: `// Countdown from 5 to 1
for (int i = 5; i >= 1; i--) {
    cout << i << "... ";
}
cout << "Go!" << endl;
// Output: 5... 4... 3... 2... 1... Go!

// Count by 2s
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";
}
// Output: 0 2 4 6 8 10`,
      },
      {
        title: "Infinite for loop — an accident to avoid",
        content: "If the condition is **always true**, the loop runs forever (until the program is killed):",
        code: `// INFINITE LOOP — condition never becomes false!
for (int i = 1; i >= 1; i++) {
    cout << i;   // runs forever
}

// Another common accident:
for (int i = 0; i < 10; i--) {  // i goes 0,-1,-2,... never reaches 10
    cout << i;
}

// Intentional infinite loop (needs a break inside):
for (;;) {  // empty condition = always true
    // use break to exit
}`,
      },
      {
        title: "Multiple expressions in the header",
        content: "A `for` can manage multiple variables, separated by commas:",
        code: `// j starts at 9, decrements while i increments
for (int i = 0, j = 9; i < 10; i++, j--) {
    cout << "i=" << i << " j=" << j << endl;
}
// i=0 j=9
// i=1 j=8
// ...
// i=9 j=0`,
      },
      {
        title: "`break` — exit the loop immediately",
        content: "`break` immediately stops the loop and jumps to the code **after** the closing `}`. It's used when you find what you're looking for, or when an exit condition is met.",
        code: `// Search for the number 7 in a list
int nums[] = {3, 1, 4, 7, 9, 2};
bool found = false;

for (int i = 0; i < 6; i++) {
    if (nums[i] == 7) {
        cout << "Found 7 at index " << i;
        found = true;
        break;  // no need to keep looking
    }
}

if (!found)
    cout << "7 not in list";`,
      },
      {
        title: "`continue` — skip to the next iteration",
        content: "`continue` skips the **rest of the current iteration** and immediately goes to the update step. It's used to skip over cases you don't want to process.",
        code: `// Print only even numbers from 1 to 10
for (int i = 1; i <= 10; i++) {
    if (i % 2 != 0)
        continue;       // skip odd numbers
    cout << i << " ";
}
// Output: 2 4 6 8 10

// Sum only positive values
int total = 0;
for (int i = 0; i < 5; i++) {
    int v;
    cin >> v;
    if (v < 0) continue;  // skip negatives
    total += v;
}`,
      },
      {
        title: "💡 Tips & Tricks — for Loop",
        content: "**Tip 1 — Declare the loop variable inside the for header**\n```cpp\nfor (int i = 0; i < 10; i++) {...}  // i only exists inside the loop\n```\nThis prevents i from accidentally being used after the loop ends.\n\n**Tip 2 — Use `n` iterations with `i < n`, not `i <= n-1`**\nBoth work, but `i < n` is the standard convention and less confusing.\n\n**Tip 3 — break exits the NEAREST loop only**\nIf you have nested loops, `break` only exits the inner one.\n\n**Tip 4 — Don't modify the loop variable inside the body**\nChanging `i` inside the body of a `for` loop leads to very confusing bugs. Only let the update part of the `for` header change `i`.",
      },
    ],
    playground: {
      description: "Sum even numbers from 1 to 10 using a for loop with continue.",
      code: `#include <iostream>
using namespace std;

int main() {
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) continue;  // skip odd numbers
        total += i;
        cout << "Adding " << i << ", total = " << total << endl;
    }
    cout << "Sum of evens 1..10 = " << total;
    return 0;
}`,
      output: "Adding 2, total = 2\nAdding 4, total = 6\nAdding 6, total = 12\nAdding 8, total = 20\nAdding 10, total = 30\nSum of evens 1..10 = 30",
    },
    quiz: [
      {
        question: "How many times does `for (int i = 0; i < 5; i++)` run?",
        options: ["4", "5", "6", "Infinite"],
        correct: 1,
        explanation: "i takes values 0, 1, 2, 3, 4 — that's five iterations.",
      },
      {
        question: "What does `break` do inside a loop?",
        options: ["Skips this iteration", "Exits the loop immediately", "Restarts the loop", "Throws an error"],
        correct: 1,
        explanation: "break terminates the nearest enclosing loop or switch immediately.",
      },
      {
        question: "What does `continue` do?",
        options: ["Exits the loop", "Pauses execution", "Skips to the next iteration", "Does nothing"],
        correct: 2,
        explanation: "continue skips the rest of the body and jumps to the update step (in for) or condition check (in while).",
      },
      {
        question: "In `for (int i = 0; i < 10; i += 2)`, what values does i take?",
        options: ["0,1,2,...,9", "0,2,4,6,8", "2,4,6,8,10", "0,2,4,6,8,10"],
        correct: 1,
        explanation: "i starts at 0 and increments by 2 each time. It takes values 0, 2, 4, 6, 8 — stopping before 10.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 10 — while Loop
  // ─────────────────────────────────────────────────────────────
  {
    id: "while-loop",
    number: "10",
    title: "while Loop",
    summary: "The while loop — a pretest, condition-controlled loop that runs zero or more times based on a test expression.",
    duration: "25 min",
    topics: ["while syntax", "Pretest loop", "Counter & sentinel", "Increment operators"],
    slides: [
      {
        title: "Why use `while` instead of `for`?",
        content: "The `for` loop is great when you **know in advance** how many times to repeat.\n\nBut what about: \"Keep asking the user for a number until they enter 0\"? You don't know how many times they'll enter numbers!\n\nThe **`while`** loop is designed for exactly this situation — it repeats as long as a condition is true, without knowing in advance how many iterations are needed.",
      },
      {
        title: "while — syntax",
        content: "```cpp\nwhile (condition) {\n    // body\n}\n```\n\n1. Check the **condition**\n2. If true → run the body, then go back to step 1\n3. If false → skip the body, continue after the `}`\n\nBecause the condition is checked **before** the body runs, the body might execute **zero times** if the condition is false from the start.",
        code: `int n = 1;
while (n <= 10) {    // check: is n <= 10?
    cout << n << " "; // body
    n++;              // update n (CRITICAL — or infinite loop!)
}
// Output: 1 2 3 4 5 6 7 8 9 10`,
      },
      {
        title: "The pretest nature — zero iterations is possible",
        content: "",
        code: `int n = 15;

// This loop body NEVER runs because 15 <= 10 is false immediately
while (n <= 10) {
    cout << n;
    n++;
}
cout << "Done!";  // This prints immediately

// Compare with a for loop — same behavior
for (int i = 15; i <= 10; i++) {
    cout << i;  // never runs
}`,
      },
      {
        title: "Factorial with while",
        content: "A common use — compute n! (factorial):",
        code: `int n;
cout << "Enter a positive integer: ";
cin >> n;

int i = 1, factorial = 1;
while (i <= n) {
    factorial *= i;  // factorial = factorial * i
    i++;             // IMPORTANT: update i or infinite loop!
}

cout << n << "! = " << factorial;
// For n=5: 1*2*3*4*5 = 120`,
      },
      {
        title: "Sentinel-controlled loop",
        content: "A **sentinel** is a special value that signals \"stop\". The loop reads values until the sentinel is entered:",
        code: `int mark;
int total = 0, count = 0;

cout << "Enter marks (-1 to quit): ";
cin >> mark;

while (mark != -1) {  // -1 is the sentinel value
    total += mark;
    count++;
    cout << "Enter next mark (-1 to quit): ";
    cin >> mark;
}

if (count > 0)
    cout << "Average = " << (total * 1.0) / count;`,
      },
      {
        title: "while loop — common mistake (infinite loop)",
        content: "The most common `while` bug: forgetting to update the variable in the condition.",
        code: `int n = 1;

// INFINITE LOOP — n never changes!
while (n <= 10) {
    cout << n;
    // n++ is MISSING — the condition never becomes false!
}

// FIXED:
int n = 1;
while (n <= 10) {
    cout << n;
    n++;  // update n each time
}`,
      },
      {
        title: "Pre-increment vs Post-increment recap",
        content: "Inside a while loop, `++n` and `n++` usually produce the **same effect** (when used as a standalone statement), but differ when used in expressions:",
        code: `int c = 5;

// These three are equivalent as standalone statements:
c = c + 1;  // classic
c += 1;     // augmented assignment
c++;        // post-increment
++c;        // pre-increment

// Difference only matters in expressions:
int a = c++;  // a = 5 (old value), c = 6
int b = ++c;  // c = 7 first, b = 7`,
      },
      {
        title: "💡 Tips & Tricks — while Loop",
        content: "**Tip 1 — Every `while` loop needs THREE things:**\n1. Initialize the variable before the loop\n2. Use the variable in the condition\n3. Update the variable inside the body\n\nMissing step 3 = infinite loop.\n\n**Tip 2 — Use `while` for user input validation**\n```cpp\nwhile (age < 0 || age > 120) {\n    cout << \"Invalid age. Try again: \";\n    cin >> age;\n}\n```\n\n**Tip 3 — Test your loop with boundary values**\nIf your loop is `while (n < 10)`, test with n=9 (last iteration), n=10 (first non-iteration), and n=0 (first iteration).",
      },
    ],
    playground: {
      description: "Compute 5! (factorial of 5) using a while loop.",
      code: `#include <iostream>
using namespace std;

int main() {
    int n = 5, i = 1, fact = 1;

    while (i <= n) {
        cout << "i = " << i << ", fact so far = " << fact << " * " << i << " = " << fact * i << endl;
        fact *= i;
        i++;
    }

    cout << n << "! = " << fact;
    return 0;
}`,
      output: "i = 1, fact so far = 1 * 1 = 1\ni = 2, fact so far = 1 * 2 = 2\ni = 3, fact so far = 2 * 3 = 6\ni = 4, fact so far = 6 * 4 = 24\ni = 5, fact so far = 24 * 5 = 120\n5! = 120",
    },
    quiz: [
      {
        question: "A `while` loop is best described as:",
        options: ["Posttest (runs at least once)", "Pretest (may run zero times)", "Fixed-count loop", "Always infinite"],
        correct: 1,
        explanation: "while is a pretest loop — the condition is checked BEFORE the body. If false from the start, the body never runs.",
      },
      {
        question: "What is the output of `int n = 5; while (n < 5) cout << n;`?",
        options: ["5", "0", "Nothing", "Infinite 5s"],
        correct: 2,
        explanation: "The condition 5 < 5 is false from the start, so the body never runs and nothing is printed.",
      },
      {
        question: "What happens if you forget to update the loop variable?",
        options: ["Compile error", "Runtime error", "Infinite loop", "Loop never starts"],
        correct: 2,
        explanation: "If the condition never becomes false, the loop runs forever — an infinite loop.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 11 — Random Numbers
  // ─────────────────────────────────────────────────────────────
  {
    id: "random-numbers",
    number: "11",
    title: "Generating Random Numbers",
    summary: "Using rand(), RAND_MAX, and srand() to generate random integers — plus formulas for bounded ranges.",
    duration: "20 min",
    topics: ["rand()", "RAND_MAX", "srand(time(0))", "Bounded ranges"],
    slides: [
      {
        title: "Why random numbers?",
        content: "Random numbers are used everywhere in programming:\n- **Games** — dice rolls, card shuffles, enemy behavior\n- **Simulations** — modelling weather, traffic, physics\n- **Security** — generating passwords, encryption keys\n- **Testing** — creating random test data\n\nC++ provides a simple way to generate pseudo-random numbers with the `rand()` function.",
      },
      {
        title: "The `rand()` function",
        content: "`rand()` is defined in `<cstdlib>`. It returns a random integer between **0** and **RAND_MAX** (which is at least 32,767 on most systems).\n\nImportant: `rand()` is **pseudo-random** — it uses a mathematical formula starting from a **seed**. By default the seed is 1, so you get the **same sequence every run**.",
        code: `#include <iostream>
#include <cstdlib>
using namespace std;

int main() {
    cout << rand() << endl;  // e.g., 41
    cout << rand() << endl;  // e.g., 18467
    cout << rand() << endl;  // e.g., 6334
    // Same numbers every run!
    return 0;
}`,
      },
      {
        title: "Seeding with `srand()` — different sequence each run",
        content: "Use `srand(seed)` **once** at the start of your program to change the starting point of the random sequence.\n\nThe trick: use `time(0)` (current time in seconds) as the seed — it changes every second, so you get different numbers each run!",
        code: `#include <iostream>
#include <cstdlib>
#include <ctime>     // for time()
using namespace std;

int main() {
    srand(time(0));  // seed with current time — do this ONCE

    cout << rand() << endl;  // different every run!
    cout << rand() << endl;  // different every run!
    return 0;
}`,
      },
      {
        title: "Bounding the range — the key formula",
        content: "Raw `rand()` gives 0 to RAND_MAX. Use the modulo operator to limit the range:\n\n`rand() % N` gives a number from `0` to `N-1`\n\nTo get a range from `min` to `max` (inclusive):\n\n```\nrand() % (max - min + 1) + min\n```",
        table: {
          headers: ["Goal", "Formula", "Range produced"],
          rows: [
            ["0 to 9", "rand() % 10", "0, 1, 2, ..., 9"],
            ["1 to 6 (dice)", "rand() % 6 + 1", "1, 2, 3, 4, 5, 6"],
            ["10 to 20", "rand() % 11 + 10", "10, 11, ..., 20"],
            ["50 to 100", "rand() % 51 + 50", "50, 51, ..., 100"],
            ["-5 to 5", "rand() % 11 - 5", "-5, -4, ..., 4, 5"],
          ],
        },
      },
      {
        title: "Mini game — addition quiz",
        content: "",
        code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    int n1 = rand() % 10;  // 0 to 9
    int n2 = rand() % 10;  // 0 to 9

    cout << "What is " << n1 << " + " << n2 << "? ";

    int answer;
    cin >> answer;

    if (answer == n1 + n2)
        cout << "Correct! Well done!" << endl;
    else
        cout << "Wrong! The answer was " << (n1 + n2) << endl;

    return 0;
}`,
      },
      {
        title: "💡 Tips & Tricks — Random Numbers",
        content: "**Tip 1 — Call `srand` only ONCE**\nIf you call `srand(time(0))` inside a loop, you might get the same number repeated (because time() only changes once per second).\n\n**Tip 2 — `rand() % 6` gives 0-5, not 1-6**\nFor a dice: `rand() % 6 + 1` (add 1 to shift from 0-5 to 1-6).\n\n**Tip 3 — For better randomness, use `<random>` (modern C++)**\n```cpp\n#include <random>\nmt19937 rng(time(0));  // Mersenne Twister — much better quality\nuniform_int_distribution<int> dist(1, 6);\ncout << dist(rng);  // random int from 1 to 6\n```\n\n**Tip 4 — `rand()` is good enough for simple programs and games**\nFor cryptography or scientific simulations, use proper random number libraries.",
      },
    ],
    playground: {
      description: "Roll a six-sided die using the bounded-range formula.",
      code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int roll = rand() % 6 + 1;  // 1 to 6
    cout << "You rolled: " << roll << endl;

    // Roll 5 times
    cout << "Five rolls: ";
    for (int i = 0; i < 5; i++)
        cout << (rand() % 6 + 1) << " ";

    return 0;
}`,
      output: "You rolled: 4\nFive rolls: 2 6 1 3 5",
    },
    quiz: [
      {
        question: "How do you get a random integer in [1, 6] (like a dice)?",
        options: ["rand() % 6", "rand() % 7 + 1", "rand() % 6 + 1", "rand() / 6"],
        correct: 2,
        explanation: "rand() % 6 gives 0..5; add 1 to shift to 1..6.",
      },
      {
        question: "Why call `srand(time(0))` at the start of the program?",
        options: ["To make rand() faster", "To get a different sequence each run", "To reset RAND_MAX", "It is required to use rand()"],
        correct: 1,
        explanation: "Without seeding with time, rand() repeats the same sequence every program execution.",
      },
      {
        question: "Which header declares `rand()` and `srand()`?",
        options: ["<random>", "<cstdlib>", "<cmath>", "<iostream>"],
        correct: 1,
        explanation: "rand(), srand(), and RAND_MAX live in <cstdlib>.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 12 — do…while Loop
  // ─────────────────────────────────────────────────────────────
  {
    id: "do-while-loop",
    number: "12",
    title: "do…while Loop",
    summary: "A posttest loop that always executes at least once — ideal for input validation and menu-driven programs.",
    duration: "25 min",
    topics: ["do…while syntax", "Posttest loop", "Input validation", "Menu-driven programs", "Choosing the right loop"],
    slides: [
      {
        title: "The do…while loop — runs at least once",
        content: "The `do…while` loop is different from `while` and `for` in one key way: the **condition is checked AFTER the body runs**.\n\nThis means the body is **guaranteed to execute at least once**, no matter what.\n\nThis is perfect for:\n- Asking the user for input (you must ask at least once)\n- Menu-driven programs (the menu must appear at least once)\n- Input validation (you must attempt to read before checking if it's valid)",
      },
      {
        title: "do…while syntax",
        content: "Note the semicolon after `while(condition)` — it is REQUIRED!",
        code: `do {
    // body — always runs at least once
} while (condition);  // <-- note the semicolon!

// Simple example: count from 1 to 5
int i = 1;
do {
    cout << i << " ";
    i++;
} while (i <= 5);
// Output: 1 2 3 4 5`,
      },
      {
        title: "while vs do…while — key difference",
        content: "",
        code: `int count = 10;

// WHILE loop: condition checked FIRST — body might not run
while (count < 5) {
    cout << count;  // NEVER prints (10 < 5 is false)
    count++;
}

// DO-WHILE loop: body runs FIRST, then condition checked
do {
    cout << count;  // Prints 10 ONCE, then checks
    count++;
} while (count < 5);  // 11 < 5 is false, so loop ends
// Output: 10`,
      },
      {
        title: "Input validation with do…while",
        content: "A very common and practical use: force the user to enter a valid value.",
        code: `int age;

do {
    cout << "Enter your age (must be >= 0): ";
    cin >> age;
    if (age < 0)
        cout << "Error! Age cannot be negative. Try again." << endl;
} while (age < 0);  // keep asking until age is valid

cout << "Your age is: " << age;`,
      },
      {
        title: "Sentinel-controlled loop with do…while",
        content: "Read marks until the user enters -1, then compute the average:",
        code: `int mark, total = 0, count = 0;

cout << "Enter marks (-1 to stop):" << endl;

do {
    cin >> mark;
    if (mark != -1) {
        total += mark;
        count++;
    }
} while (mark != -1);

if (count > 0)
    cout << "Average = " << (double)total / count;
else
    cout << "No marks entered";`,
      },
      {
        title: "Menu-driven program — the do…while pattern",
        content: "Menu programs are the perfect use case for `do…while`: the menu must appear at least once, and keep appearing until the user chooses Exit.",
        code: `int choice;

do {
    // Show the menu
    cout << "\\n=== CALCULATOR ===\\n";
    cout << "1. Addition\\n";
    cout << "2. Subtraction\\n";
    cout << "3. Exit\\n";
    cout << "Your choice: ";
    cin >> choice;

    // Handle the choice
    double a, b;
    switch (choice) {
        case 1:
            cout << "Enter two numbers: "; cin >> a >> b;
            cout << "Result = " << a + b; break;
        case 2:
            cout << "Enter two numbers: "; cin >> a >> b;
            cout << "Result = " << a - b; break;
        case 3:
            cout << "Goodbye!"; break;
        default:
            cout << "Invalid choice!";
    }
} while (choice != 3);`,
      },
      {
        title: "Choosing the right loop",
        content: "",
        table: {
          headers: ["Situation", "Best loop", "Reason"],
          rows: [
            ["Know the exact number of iterations", "for", "Counter built into the header"],
            ["Don't know how many, but might be zero", "while", "Pretest — can skip entirely"],
            ["Must run at least once (menu, input validation)", "do-while", "Posttest — guarantees one execution"],
          ],
        },
      },
      {
        title: "💡 Tips & Tricks — do…while",
        content: "**Tip 1 — Don't forget the semicolon after `while()`**\nThis is the most common do-while syntax error:\n```cpp\ndo {\n    ...\n} while (x > 0)   // MISSING semicolon — compile error!\n\ndo {\n    ...\n} while (x > 0);  // CORRECT\n```\n\n**Tip 2 — Use do-while for menus**\nMenus must show at least once before the user can choose to exit. do-while is the natural fit.\n\n**Tip 3 — Use do-while for input validation**\nYou have to ask for input at least once before you can check if it's valid.",
      },
    ],
    playground: {
      description: "Sum numbers entered by the user until they enter 0.",
      code: `#include <iostream>
using namespace std;

int main() {
    float number, sum = 0.0;

    cout << "Enter numbers to add (0 to stop):" << endl;

    do {
        cout << "Number: ";
        cin >> number;
        sum += number;
    } while (number != 0.0);

    cout << "Total sum = " << sum;
    return 0;
}`,
      output: "Total = 42",
    },
    quiz: [
      {
        question: "How many times does a do…while body run at minimum?",
        options: ["0", "1", "Depends on condition", "Infinite"],
        correct: 1,
        explanation: "Because the condition is checked AFTER the body, the body always runs at least once.",
      },
      {
        question: "Which character is REQUIRED after `while(cond)` in a do…while?",
        options: ["A semicolon ;", "A colon :", "Nothing", "A comma ,"],
        correct: 0,
        explanation: "The do-while statement ends with `while(cond);` — the semicolon is mandatory.",
      },
      {
        question: "Best loop for a menu-driven program?",
        options: ["for", "while", "do…while", "switch"],
        correct: 2,
        explanation: "do-while runs the menu once before checking whether to exit — perfect for menus.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 13 — Nested Loops
  // ─────────────────────────────────────────────────────────────
  {
    id: "nested-loops",
    number: "13",
    title: "Nested Loops",
    summary: "Placing one loop inside another — used for tables, patterns, and multi-dimensional iteration.",
    duration: "30 min",
    topics: ["Nested while", "Nested for", "Number & star patterns", "Continue in nested loops"],
    slides: [
      {
        title: "What is a nested loop?",
        content: "A **nested loop** is simply a loop inside another loop.\n\n- The **outer loop** controls how many rows (or passes) happen\n- The **inner loop** runs completely from start to finish for **every single iteration** of the outer loop\n\nThink of it like a clock: the seconds hand (inner) makes one full revolution for every tick of the minutes hand (outer).",
      },
      {
        title: "Nested while — basic structure",
        content: "",
        code: `int outer = 1;
while (outer <= 3) {      // outer runs 3 times
    int inner = 1;
    while (inner <= 4) {  // inner runs 4 times PER outer iteration
        cout << "(" << outer << "," << inner << ") ";
        inner++;
    }
    cout << endl;         // new line after each outer iteration
    outer++;
}
// (1,1) (1,2) (1,3) (1,4)
// (2,1) (2,2) (2,3) (2,4)
// (3,1) (3,2) (3,3) (3,4)
// Total inner iterations: 3 x 4 = 12`,
      },
      {
        title: "Counting total iterations",
        content: "For nested loops, the total number of inner iterations = outer iterations × inner iterations:\n\n- Outer runs 3 times\n- Inner runs 4 times each\n- Total inner-body executions: 3 × 4 = **12**\n\nFor triple nesting: multiply all three counts.",
      },
      {
        title: "Number triangle pattern",
        content: "Print:\n```\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n```",
        code: `for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {  // inner runs i times
        cout << j << " ";
    }
    cout << endl;
}
// The inner loop runs 1, 2, 3, 4, 5 times respectively`,
      },
      {
        title: "Star rectangle — nested for",
        content: "Print a 5×5 block of stars:",
        code: `for (int row = 0; row < 5; row++) {       // 5 rows
    for (int col = 0; col < 5; col++) {   // 5 columns per row
        cout << "* ";
    }
    cout << endl;  // new line after each row
}
// * * * * *
// * * * * *
// * * * * *
// * * * * *
// * * * * *`,
      },
      {
        title: "Star triangle — growing pattern",
        content: "The inner loop's limit grows with each outer iteration:",
        code: `for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        cout << "* ";
    }
    cout << endl;
}
// *
// * *
// * * *
// * * * *
// * * * * *`,
      },
      {
        title: "Inverted triangle",
        content: "The inner loop's limit shrinks with each outer iteration:",
        code: `for (int i = 5; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        cout << "* ";
    }
    cout << endl;
}
// * * * * *
// * * * *
// * * *
// * *
// *`,
      },
      {
        title: "`continue` in nested loops — skip specific values",
        content: "Print numbers 1 to 10, skipping 6 and 9:",
        code: `for (int i = 1; i <= 10; i++) {
    if (i == 6 || i == 9)
        continue;   // skip to next iteration
    cout << i << " ";
}
// Output: 1 2 3 4 5 7 8 10`,
      },
      {
        title: "Multiplication table — a classic nested loop",
        content: "",
        code: `// Print a 5x5 multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        cout << i * j << "\\t";  // \\t for tab alignment
    }
    cout << endl;
}
// 1  2  3  4  5
// 2  4  6  8  10
// 3  6  9  12 15
// 4  8  12 16 20
// 5  10 15 20 25`,
      },
      {
        title: "💡 Tips & Tricks — Nested Loops",
        content: "**Tip 1 — Use different variable names for each loop**\nUsually `i` for outer, `j` for inner, `k` for the innermost. Don't reuse the same name — it'll shadow the outer variable.\n\n**Tip 2 — `break` only exits the inner loop**\nIf you `break` inside a nested loop, you exit to the outer loop, not the program. To break out of both, use a flag variable:\n```cpp\nbool done = false;\nfor (int i = 0; i < 10 && !done; i++)\n    for (int j = 0; j < 10 && !done; j++)\n        if (found) done = true;\n```\n\n**Tip 3 — Trace your nested loop with small numbers first**\nIf you're not sure what a nested loop does, trace it on paper with n=2 or n=3 instead of n=100.",
      },
    ],
    playground: {
      description: "Print the right-angled triangle of digits.",
      code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++)
            cout << j;
        cout << "\\n";
    }
    return 0;
}`,
      output: "1\n12\n123\n1234\n12345",
    },
    quiz: [
      {
        question: "For every outer loop iteration, the inner loop:",
        options: ["Runs once", "Runs to completion", "Skips one step", "Is ignored"],
        correct: 1,
        explanation: "The inner loop fully executes (from start to end) for each single pass of the outer loop.",
      },
      {
        question: "How many total inner iterations: outer i=1..3, inner j=1..4?",
        options: ["7", "12", "9", "16"],
        correct: 1,
        explanation: "3 outer iterations × 4 inner iterations = 12 total inner-body executions.",
      },
      {
        question: "`break` inside a nested loop exits:",
        options: ["Both loops", "Only the inner loop", "Only the outer loop", "The program"],
        correct: 1,
        explanation: "break exits only the NEAREST enclosing loop — just the inner one in a nested loop.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 14 — Arrays Introduction
  // ─────────────────────────────────────────────────────────────
  {
    id: "arrays-intro",
    number: "14",
    title: "Arrays — Lists of Values",
    summary: "A single name for many values of the same type, stored in contiguous memory and accessed by an integer index.",
    duration: "30 min",
    topics: ["Declaration", "Indexing", "Initialization", "Input/output", "Linear search", "Character arrays"],
    slides: [
      {
        title: "The problem arrays solve",
        content: "Imagine storing the marks of 100 students. Without arrays:\n```cpp\nint mark1, mark2, mark3, ..., mark100;  // 100 variables!\n```\nWith an array:\n```cpp\nint marks[100];  // ONE name, 100 storage boxes\n```\n\nAn **array** is a collection of items of the **same data type**, stored in **consecutive memory locations**, all accessed using **one name** and an **index**.",
      },
      {
        title: "Declaring an array",
        content: "```cpp\ndatatype name[size];\n```\n\nThe **size** must be a **constant** (not a regular variable in standard C++).",
        code: `int marks[100];      // 100 integers
double prices[50];   // 50 doubles
char grade[30];      // 30 characters

const int N = 10;
int scores[N];       // OK — N is a constant

int n = 10;
int bad[n];          // AVOID — this is a VLA (variable-length array), not standard in all compilers`,
      },
      {
        title: "Zero-based indexing — the first element is [0]",
        content: "Arrays in C++ are **0-indexed**: the first element has index 0, the second has index 1, and so on.\n\nFor `int arr[5]`, the valid indices are 0, 1, 2, 3, 4.",
        code: `int arr[5];    // 5 elements: arr[0], arr[1], arr[2], arr[3], arr[4]

arr[0] = 10;   // store 10 at index 0
arr[1] = 20;
arr[2] = 30;
arr[4] = 99;   // last valid index is 4

cout << arr[0];  // prints 10
cout << arr[4];  // prints 99`,
      },
      {
        title: "Reading array values with a loop",
        content: "Use a `for` loop to read or process all elements efficiently:",
        code: `int marks[5];

// Read 5 values from user
for (int i = 0; i < 5; i++) {
    cout << "Enter mark[" << i << "]: ";
    cin >> marks[i];
}

// Print all values
cout << "You entered: ";
for (int i = 0; i < 5; i++) {
    cout << marks[i] << " ";
}`,
      },
      {
        title: "Initializing arrays at declaration",
        content: "You can provide initial values in curly braces `{}`:",
        code: `int a[5] = {10, 20, 30, 40, 50};  // all 5 values
int b[] = {1, 2, 3, 4, 6};        // size inferred = 5
int c[5] = {};                     // all zeros!
int d[5] = {1, 2};                 // {1, 2, 0, 0, 0} — rest are 0`,
      },
      {
        title: "⚠️ Out-of-bounds access — a dangerous bug",
        content: "C++ does **NOT** check if your index is valid. Accessing an index outside the array size is **undefined behavior** — it may crash, corrupt data, or appear to work (even more dangerous!).",
        code: `int arr[5] = {1, 2, 3, 4, 5};

cout << arr[0];   // OK: 1
cout << arr[4];   // OK: 5 (last element)
cout << arr[5];   // DANGER: out of bounds! (undefined behavior)
cout << arr[-1];  // DANGER: out of bounds!

// Tip: always loop with i < size, NOT i <= size
for (int i = 0; i < 5; i++)   // correct
for (int i = 0; i <= 5; i++)  // BUG: accesses arr[5]!`,
      },
      {
        title: "Finding the size of an array",
        content: "C++ doesn't have a built-in `.length` for arrays (unlike other languages). Use `sizeof`:",
        code: `int arr[] = {10, 20, 30, 40, 50};

int totalBytes = sizeof(arr);       // total bytes: 5 * 4 = 20
int elementBytes = sizeof(arr[0]);  // bytes of ONE element: 4

int n = sizeof(arr) / sizeof(arr[0]);  // number of elements = 20/4 = 5

for (int i = 0; i < n; i++)
    cout << arr[i] << " ";`,
      },
      {
        title: "Linear search — finding a value",
        content: "Walk through the array from start to end until you find the target (or reach the end):",
        code: `int A[] = {4, 66, 7, 3, 22, 77, 98};
int n = sizeof(A) / sizeof(A[0]);  // n = 7
int target = 22;
bool found = false;

for (int i = 0; i < n; i++) {
    if (A[i] == target) {
        cout << "Found " << target << " at index " << i;
        found = true;
        break;
    }
}

if (!found)
    cout << target << " not in array";`,
      },
      {
        title: "Character arrays — storing text",
        content: "Before C++ had `string`, text was stored as arrays of `char`. The array is terminated by a special **null character** `\\0`.",
        code: `char name[] = "Ahmed";
// Stored as: 'A' 'h' 'm' 'e' 'd' '\\0'
//             0   1   2   3   4    5

char city[20] = "Lahore";
cout << city;  // prints "Lahore" (stops at \\0)`,
      },
      {
        title: "💡 Tips & Tricks — Arrays",
        content: "**Tip 1 — Array indices start at 0, not 1**\nFor `int arr[10]`, valid indices are 0 to 9. `arr[10]` is out of bounds!\n\n**Tip 2 — Use `const` for the size**\n```cpp\nconst int SIZE = 100;\nint marks[SIZE];\n```\nNow if you need to change the size, you only change one line.\n\n**Tip 3 — Initialize arrays to 0 with `= {}`**\n```cpp\nint counts[100] = {};  // all 100 elements set to 0\n```\n\n**Tip 4 — Pass size to functions separately**\nWhen you pass an array to a function, C++ doesn't pass the size automatically. Always pass the size as a separate parameter:\n```cpp\nvoid printArray(int arr[], int size) { ... }\n```",
      },
    ],
    playground: {
      description: "Sum all elements in an array.",
      code: `#include <iostream>
using namespace std;

int main() {
    int A[] = {5, 3, 8, 1, 2, 6, 4, 7};
    int n = sizeof(A) / sizeof(A[0]);

    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += A[i];
        cout << "A[" << i << "] = " << A[i] << "  (running sum = " << sum << ")" << endl;
    }

    cout << "Total sum = " << sum;
    return 0;
}`,
      output: "A[0] = 5  (running sum = 5)\nA[1] = 3  (running sum = 8)\nA[2] = 8  (running sum = 16)\nA[3] = 1  (running sum = 17)\nA[4] = 2  (running sum = 19)\nA[5] = 6  (running sum = 25)\nA[6] = 4  (running sum = 29)\nA[7] = 7  (running sum = 36)\nTotal sum = 36",
    },
    quiz: [
      {
        question: "What is the index of the FIRST element of an array?",
        options: ["1", "0", "-1", "Depends on the type"],
        correct: 1,
        explanation: "C++ arrays are 0-based. The first element is always at index 0.",
      },
      {
        question: "Which declaration is legal and initializes the rest to 0?",
        options: ["int n = 4; int a[n];", "int a[];", "int a[4] = {1,2};", "int a[2] = {1,2,3,4};"],
        correct: 2,
        explanation: "int a[4] = {1,2} is legal — the remaining 2 elements are initialized to 0.",
      },
      {
        question: "Accessing `arr[20]` on `int arr[8]` causes:",
        options: ["A compile error", "Always a runtime crash", "Undefined behavior", "Returns 0"],
        correct: 2,
        explanation: "C++ does no bounds checking. Out-of-range access is undefined behavior — might crash, might not.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 15 — Arrays II: 2D & Common Tasks
  // ─────────────────────────────────────────────────────────────
  {
    id: "arrays-2d-sorting",
    number: "15",
    title: "Arrays II — 2D & Common Tasks",
    summary: "Copying, two-dimensional arrays of rows and columns, and the classic search / max / count patterns.",
    duration: "30 min",
    topics: ["Copy with loop", "2D arrays", "Finding largest", "Counting", "Column sums"],
    slides: [
      {
        title: "Copying arrays — you can't use `=`",
        content: "Unlike simple variables, you **cannot** copy one array to another with `=`. You must copy element by element with a loop.",
        code: `int src[5] = {1, 2, 3, 4, 5};
int dst[5];

// WRONG — does NOT copy the array!
// dst = src;  // compile error

// CORRECT — copy element by element
for (int i = 0; i < 5; i++)
    dst[i] = src[i];`,
      },
      {
        title: "Finding the maximum (and minimum)",
        content: "Classic pattern: start by assuming the first element is the max, then update whenever you find something bigger.",
        code: `int A[] = {4, 9, 2, 11, 7, 6, 3};
int n = sizeof(A) / sizeof(A[0]);

int maxVal = A[0];  // assume first is max
int maxPos = 0;

for (int i = 1; i < n; i++) {
    if (A[i] > maxVal) {
        maxVal = A[i];  // new max found!
        maxPos = i;
    }
}

cout << "Max = " << maxVal << " at index " << maxPos;
// Max = 11 at index 3`,
      },
      {
        title: "Counting occurrences",
        content: "Count how many times a specific value appears in the array:",
        code: `int votes[] = {1, 2, 1, 3, 1, 2, 1, 3, 1};
int n = sizeof(votes) / sizeof(votes[0]);

int countOnes = 0;
for (int i = 0; i < n; i++) {
    if (votes[i] == 1)
        countOnes++;
}

cout << "Candidate 1 received " << countOnes << " votes";
// Candidate 1 received 5 votes`,
      },
      {
        title: "2D arrays — rows and columns",
        content: "A **2D array** stores values in a grid (table) format, like a spreadsheet with rows and columns.\n\n```cpp\ndatatype name[rows][cols];\n```\n\nBoth sizes must be constants. Elements are accessed with TWO indices: `arr[row][col]`.",
        code: `int M[3][4];  // 3 rows, 4 columns, 12 total elements

// Access individual elements
M[0][0] = 10;  // row 0, col 0
M[1][2] = 25;  // row 1, col 2
M[2][3] = 99;  // last element

// Initialize at declaration
int T[2][3] = {{1, 2, 3},
               {4, 5, 6}};`,
      },
      {
        title: "Looping over a 2D array",
        content: "Use nested loops: outer for rows, inner for columns:",
        code: `int M[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

// Print all elements
for (int row = 0; row < 3; row++) {
    for (int col = 0; col < 4; col++) {
        cout << M[row][col] << "\\t";
    }
    cout << endl;
}`,
      },
      {
        title: "Sum of a specific column",
        content: "Add up all values in a single column:",
        code: `int M[3][3] = {{1, 2, 3},
               {4, 5, 6},
               {7, 8, 9}};

int colToSum = 1;  // sum column index 1 (values: 2, 5, 8)
int total = 0;

for (int row = 0; row < 3; row++)
    total += M[row][colToSum];

cout << "Column " << colToSum << " sum = " << total;  // 15`,
      },
      {
        title: "Bubble sort — arranging in order",
        content: "A simple (though not the fastest) sorting algorithm. It repeatedly swaps adjacent elements that are out of order.",
        code: `int A[] = {64, 34, 25, 12, 22, 11, 90};
int n = sizeof(A) / sizeof(A[0]);

for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (A[j] > A[j + 1]) {
            // swap A[j] and A[j+1]
            int temp = A[j];
            A[j] = A[j + 1];
            A[j + 1] = temp;
        }
    }
}

for (int i = 0; i < n; i++)
    cout << A[i] << " ";
// 11 12 22 25 34 64 90`,
      },
      {
        title: "💡 Tips & Tricks — 2D Arrays",
        content: "**Tip 1 — Think of `[row][col]` as `[y][x]`**\nThe first index is the ROW (vertical), the second is the COLUMN (horizontal). `M[2][1]` is row 2, column 1.\n\n**Tip 2 — For `int M[3][4]`, total elements = 3 × 4 = 12**\nMultiply the two dimensions.\n\n**Tip 3 — Initialize 2D arrays with nested braces for clarity**\n```cpp\nint M[3][3] = {\n    {1, 2, 3},  // row 0\n    {4, 5, 6},  // row 1\n    {7, 8, 9}   // row 2\n};\n```\n\n**Tip 4 — The swap pattern**\n```cpp\n// Always use a temporary variable to swap:\nint temp = a;\na = b;\nb = temp;\n// If you write a = b; b = a; — you lose a's original value!\n```",
      },
    ],
    playground: {
      description: "Find the largest element and its position in an array.",
      code: `#include <iostream>
using namespace std;

int main() {
    int A[] = {4, 9, 2, 11, 7, 6};
    int n = sizeof(A) / sizeof(A[0]);

    int maxVal = A[0], maxPos = 0;
    for (int i = 1; i < n; i++) {
        if (A[i] > maxVal) {
            maxVal = A[i];
            maxPos = i;
        }
    }

    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << "\\nLargest = " << maxVal << " at index " << maxPos;
    return 0;
}`,
      output: "Array: 4 9 2 11 7 6 \nLargest = 11 at index 3",
    },
    quiz: [
      {
        question: "To copy one array into another in C++ you must:",
        options: ["Use `=`", "Use `memcpy` only", "Copy element by element in a loop", "It's automatic"],
        correct: 2,
        explanation: "Arrays don't support assignment with `=`. You must copy element by element.",
      },
      {
        question: "For `int M[3][4]` total elements are:",
        options: ["7", "12", "3", "4"],
        correct: 1,
        explanation: "3 rows × 4 columns = 12 total elements.",
      },
      {
        question: "Which loop pattern prints a 2D array row by row?",
        options: ["Single loop", "Outer cols, inner rows", "Outer rows, inner cols", "Recursion only"],
        correct: 2,
        explanation: "Outer loop selects the row, inner loop walks through the columns of that row.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 16 — Functions Introduction
  // ─────────────────────────────────────────────────────────────
  {
    id: "functions-intro",
    number: "16",
    title: "Functions — Introduction",
    summary: "Breaking programs into reusable building blocks: defining functions, calling them, parameters, return values, and prototypes.",
    duration: "35 min",
    topics: ["Why functions", "Definition & call", "Parameters & return", "Prototypes", "Call stack"],
    slides: [
      {
        title: "Why use functions?",
        content: "A **function** is a named block of statements that does one specific job. Instead of writing the same code multiple times, you write it once as a function and **call** (use) it wherever you need it.\n\nBenefits:\n- **Reusability** — write once, use many times\n- **Readability** — `calculateArea(5)` is clearer than 10 lines of math\n- **Easier debugging** — fix a bug in one place, fixed everywhere\n- **Teamwork** — different people can write different functions",
      },
      {
        title: "You already use functions!",
        content: "You've been using functions all along without realizing it:\n- `cout <<` is a function\n- `cin >>` is a function\n- `sqrt()`, `pow()`, `rand()` are all functions\n- Even `main()` is a function!\n\nAll of these follow the same pattern: they have a name, they do a job, and they may return a result.",
      },
      {
        title: "Defining a function",
        content: "```cpp\nreturnType functionName(parameter list) {\n    // body — the work to do\n    return value;  // (if returnType is not void)\n}\n```",
        code: `// A function that takes two ints and returns their max
int max(int num1, int num2) {
    if (num1 > num2)
        return num1;
    else
        return num2;
}

// A void function — does something, returns nothing
void printLine() {
    cout << "------------------------" << endl;
}`,
      },
      {
        title: "Calling (using) a function",
        content: "To use a function, write its name followed by arguments in parentheses. The function runs, and if it returns a value, you can use that value.",
        code: `int a = 5, b = 9;
int largest = max(a, b);       // call max, store result
cout << "Max is " << largest;  // prints "Max is 9"

// Or use the result directly:
cout << "Max is " << max(3, 7);  // prints "Max is 7"

// void function — just call it, no return value
printLine();  // prints "------------------------"`,
      },
      {
        title: "The call stack — how functions work in memory",
        content: "Each time a function is called, the system creates an **activation record** (also called a stack frame) in memory that stores:\n- The function's local variables\n- The return address (where to go back after returning)\n- The parameter values\n\nThese records are stacked on top of each other (like a stack of trays in a cafeteria). When a function returns, its record is removed (popped off).",
        code: `// When you write:
int z = max(a, b);

// Internally:
// 1. main()'s record is on the stack
// 2. max()'s record is pushed on top
// 3. max() runs, computes result
// 4. max() returns → its record is POPPED
// 5. main() continues with the returned value`,
      },
      {
        title: "Parameters vs Arguments — the distinction",
        content: "These two words are often confused:\n\n- **Parameter** — the variable in the function's **definition** (the placeholder)\n- **Argument** — the actual value you **pass** when calling the function",
        code: `// num1 and num2 are PARAMETERS (in the definition)
int add(int num1, int num2) {
    return num1 + num2;
}

// 5 and 3 are ARGUMENTS (in the call)
int result = add(5, 3);
// When called: num1 = 5, num2 = 3`,
      },
      {
        title: "Four function shapes",
        content: "Every function fits one of these four patterns:",
        table: {
          headers: ["Shape", "Syntax", "Example use"],
          rows: [
            ["No return, no parameters", "void greet()", "Print a greeting message"],
            ["Return value, no parameters", "int readAge()", "Read and return user's age"],
            ["No return, with parameters", "void print(int x)", "Print a value to screen"],
            ["Return value, with parameters", "int sum(int a, int b)", "Compute and return a sum"],
          ],
        },
      },
      {
        title: "Function prototypes — declare before use",
        content: "C++ reads code top to bottom. If you call a function before it's defined, the compiler complains.\n\nSolution: write a **prototype** (declaration) at the top of the file:",
        code: `// Prototype at the top
int max(int a, int b);  // just the signature, no body

int main() {
    cout << max(5, 3);   // OK — compiler saw the prototype
    return 0;
}

// Actual definition can come later
int max(int a, int b) {
    return a > b ? a : b;
}`,
      },
      {
        title: "💡 Tips & Tricks — Functions",
        content: "**Tip 1 — One function, one job**\nA good function does ONE thing well. If your function is 100 lines long, it probably does too much. Split it.\n\n**Tip 2 — Use descriptive function names**\n`calculateCircleArea(radius)` is much better than `calc(r)`.\n\n**Tip 3 — Function prototypes go at the top of the file**\nPut all your prototypes before `main()`, then put the full definitions after `main()`. This keeps `main()` easy to read.\n\n**Tip 4 — `return` immediately exits the function**\nOnce a `return` statement runs, the function is done — even if there's more code after it.",
      },
    ],
    playground: {
      description: "Define and call a max(int, int) function.",
      code: `#include <iostream>
using namespace std;

// Function definition
int maxOf(int a, int b) {
    return a > b ? a : b;
}

int main() {
    cout << "max(5, 2) = " << maxOf(5, 2) << endl;
    cout << "max(9, 15) = " << maxOf(9, 15) << endl;
    cout << "max(7, 7) = " << maxOf(7, 7) << endl;
    return 0;
}`,
      output: "max(5, 2) = 5\nmax(9, 15) = 15\nmax(7, 7) = 7",
    },
    quiz: [
      {
        question: "A function prototype is required when:",
        options: ["Called before it's defined", "Returns void", "Has no parameters", "Always"],
        correct: 0,
        explanation: "Prototypes tell the compiler about a function before its full definition appears.",
      },
      {
        question: "What holds a function's local variables and return address?",
        options: ["Heap memory", "Activation record on the call stack", "Global variables", "CPU registers only"],
        correct: 1,
        explanation: "Each function call pushes an activation record (stack frame) onto the call stack.",
      },
      {
        question: "What is the difference between a parameter and an argument?",
        options: [
          "They are the same thing",
          "Parameter is in the call, argument is in the definition",
          "Parameter is in the definition, argument is in the call",
          "Parameters have types, arguments don't",
        ],
        correct: 2,
        explanation: "Parameters are placeholders in the function definition. Arguments are the actual values passed when calling.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 17 — Functions in Depth
  // ─────────────────────────────────────────────────────────────
  {
    id: "functions-in-depth",
    number: "17",
    title: "Functions in Depth",
    summary: "Advantages of functions, library vs user-defined, the three components, parameter lists, and return statements.",
    duration: "30 min",
    topics: ["Library vs user-defined", "Declaration / definition / call", "Parameters", "Return"],
    slides: [
      {
        title: "All the advantages of functions",
        content: "1. **Separation of concerns** — separate *what* the program does from *how*\n2. **Readability** — `printReport()` is clearer than 50 lines of printing code\n3. **Reusability** — write once, call anywhere\n4. **Easier debugging** — isolate and test one function at a time\n5. **Team collaboration** — different team members write different functions\n6. **Modularity** — break complex problems into smaller, manageable pieces",
      },
      {
        title: "Library functions vs User-defined functions",
        content: "",
        table: {
          headers: ["Feature", "Library Functions", "User-defined Functions"],
          rows: [
            ["Written by", "Language/library developers", "You (the programmer)"],
            ["Examples", "sqrt(), rand(), cout, strlen()", "max(), calculateArea(), printMenu()"],
            ["Need to code?", "No — just include the header", "Yes — you write the definition"],
            ["Header needed?", "Yes (#include <cmath> etc.)", "No (or your own header file)"],
            ["Can modify?", "No", "Yes"],
          ],
        },
      },
      {
        title: "Using library functions",
        content: "",
        code: `#include <cmath>    // for sqrt, pow, sin, cos, abs
#include <cstring>  // for strlen, strcpy, strcmp

double root = sqrt(25.0);    // 5.0
double power = pow(2, 10);   // 1024.0
double absolute = abs(-7);   // 7

char word[] = "Hello";
int len = strlen(word);      // 5 (not counting \\0)`,
      },
      {
        title: "The three components of every function",
        content: "1. **Declaration (Prototype)** — tells the compiler the function's name, return type, and parameter types (no body)\n2. **Definition** — the actual code that runs when the function is called (has a body)\n3. **Call** — the line in your code that invokes (runs) the function",
        code: `// 1. DECLARATION (prototype) — can go at top of file
int add(int num1, int num2);

// 3. CALL — in main (or anywhere)
int main() {
    int result = add(7, 5);   // call
    cout << result;            // 12
    return 0;
}

// 2. DEFINITION — the actual code
int add(int num1, int num2) {
    return num1 + num2;
}`,
      },
      {
        title: "Parameter passing — what gets copied",
        content: "By default, C++ passes arguments **by value** — the function receives a **copy** of the argument. Changes inside the function don't affect the original.",
        code: `void doubleIt(int x) {
    x = x * 2;  // only the copy is doubled
    cout << "Inside: x = " << x;
}

int main() {
    int num = 5;
    doubleIt(num);           // passes a COPY of num
    cout << "Outside: num = " << num;  // still 5!
}`,
      },
      {
        title: "The `return` statement",
        content: "- The `return` statement **ends** the function immediately and sends a value back to the caller\n- The type of the returned value must match the function's declared return type\n- `void` functions can use `return;` (without a value) to exit early\n- A function can have multiple `return` statements — the first one executed ends the function",
        code: `int sign(int n) {
    if (n > 0) return  1;   // exit immediately
    if (n < 0) return -1;   // exit immediately
    return 0;               // only reached if n == 0
}

// void function — early return
void printPositive(int n) {
    if (n <= 0) return;     // exit early for non-positive
    cout << n << " is positive";
}`,
      },
      {
        title: "Function with multiple uses",
        content: "A good function can be called with different values to solve many instances of the same problem:",
        code: `int sum(int from, int to) {
    int total = 0;
    for (int i = from; i <= to; i++)
        total += i;
    return total;
}

// Now reuse it:
cout << sum(1, 10);    // sum 1+2+...+10 = 55
cout << sum(1, 100);   // sum 1+2+...+100 = 5050
cout << sum(5, 15);    // sum 5+6+...+15 = 110`,
      },
      {
        title: "💡 Tips & Tricks — Functions in Depth",
        content: "**Tip 1 — Keep the return type and the returned value consistent**\nIf your function says `int`, return an `int`. Returning the wrong type can cause implicit conversion bugs.\n\n**Tip 2 — Functions should be short**\nIf a function is more than ~20-30 lines, consider splitting it into sub-functions.\n\n**Tip 3 — Avoid global variables when possible**\nInstead of relying on global state, pass values as parameters and return results. This makes functions easier to test and reuse.\n\n**Tip 4 — Test each function independently**\nBefore integrating into a large program, test each function with known inputs and verify the output.",
      },
    ],
    playground: {
      description: "User-defined Add function returning an int.",
      code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    cout << "add(7, 5)      = " << add(7, 5) << endl;
    cout << "add(100, 200)  = " << add(100, 200) << endl;
    cout << "multiply(3, 4) = " << multiply(3, 4) << endl;
    return 0;
}`,
      output: "add(7, 5)      = 12\nadd(100, 200)  = 300\nmultiply(3, 4) = 12",
    },
    quiz: [
      {
        question: "Which is NOT an advantage of functions?",
        options: ["Code reuse", "Easier debugging", "Slower execution", "Modular design"],
        correct: 2,
        explanation: "Functions have no meaningful speed cost. They improve maintainability, reuse, and modularity.",
      },
      {
        question: "Where do library functions like `sqrt()` come from?",
        options: ["You write them", "Pre-compiled library files", "Inside main()", "Inside iostream"],
        correct: 1,
        explanation: "Library functions are pre-written and compiled into library files. You just include the header to use them.",
      },
      {
        question: "The three components of a function are:",
        options: ["Header, body, comment", "Declaration, definition, call", "Loop, condition, return", "Type, name, value"],
        correct: 1,
        explanation: "Declaration (prototype), Definition (body), Call (invocation).",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 18 — Types of Functions
  // ─────────────────────────────────────────────────────────────
  {
    id: "types-of-functions",
    number: "18",
    title: "Types of Functions",
    summary: "Four function shapes by return type and arguments, pass-by-value, and the scope/lifetime of local, global, and static variables.",
    duration: "30 min",
    topics: ["4 function shapes", "Pass by value", "Local vs global vs static"],
    slides: [
      {
        title: "The four function shapes",
        content: "Every function you write falls into one of four categories based on:\n1. Does it **return** a value? (yes/no)\n2. Does it take **parameters**? (yes/no)\n\nAll four are useful in different situations.",
        table: {
          headers: ["Shape", "Return Type", "Parameters", "Example"],
          rows: [
            ["1", "void", "None", "void printMenu()"],
            ["2", "void", "Has parameters", "void print(int x)"],
            ["3", "Non-void", "None", "int readScore()"],
            ["4", "Non-void", "Has parameters", "float sum(float a, float b)"],
          ],
        },
      },
      {
        title: "Shape 1 — void, no parameters",
        content: "Does a job without needing input and doesn't return anything. Useful for printing menus, drawing lines, etc.",
        code: `void printStarLine() {
    for (int i = 0; i < 20; i++)
        cout << "*";
    cout << endl;
}

// Call:
printStarLine();  // just call it — no arguments, no result`,
      },
      {
        title: "Shape 2 — void, with parameters",
        content: "Takes input, does work with it, returns nothing. Useful for printing with formatting.",
        code: `void printSquare(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            cout << "* ";
        cout << endl;
    }
}

// Call:
printSquare(4);  // prints a 4x4 star grid`,
      },
      {
        title: "Shape 3 — return value, no parameters",
        content: "Gathers or computes something on its own and returns it. Useful for reading input.",
        code: `int readPositiveInt() {
    int value;
    do {
        cout << "Enter a positive integer: ";
        cin >> value;
        if (value <= 0) cout << "Invalid! Try again.\\n";
    } while (value <= 0);
    return value;
}

// Call:
int n = readPositiveInt();`,
      },
      {
        title: "Shape 4 — return value, with parameters",
        content: "The most common shape. Takes inputs, computes, and returns the result.",
        code: `double circleArea(double radius) {
    const double PI = 3.14159265;
    return PI * radius * radius;
}

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

// Calls:
double a = circleArea(5.0);  // 78.54
cout << isPrime(13);          // 1 (true)`,
      },
      {
        title: "Pass by value — the function gets a copy",
        content: "When you call a function and pass a variable, C++ **copies** the value into the parameter. The function works with the copy — the original is untouched.",
        code: `void tryToSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "Inside: a=" << a << " b=" << b;  // swapped inside
}

int x = 4, y = 5;
tryToSwap(x, y);
cout << "Outside: x=" << x << " y=" << y;  // x=4, y=5 — NOT swapped!
// Only the COPIES were swapped, not the originals`,
      },
      {
        title: "Variable scope — where can a variable be seen?",
        content: "**Scope** defines where in the code a variable can be accessed.",
        table: {
          headers: ["Type", "Where declared", "Accessible", "Lifetime"],
          rows: [
            ["Local", "Inside a function or block {}", "Only inside that block", "Until the block ends"],
            ["Global", "Outside all functions", "Anywhere in the file", "Entire program run"],
            ["Static local", "Inside function with `static` keyword", "Only inside that function", "Entire program run, but value persists between calls"],
          ],
        },
      },
      {
        title: "Static local variables — value persists between calls",
        content: "A `static` local variable is initialized only ONCE, and keeps its value between function calls.",
        code: `void callCounter() {
    static int count = 0;  // initialized ONCE at program start
    count++;
    cout << "This function has been called " << count << " times" << endl;
}

callCounter();  // prints: called 1 times
callCounter();  // prints: called 2 times
callCounter();  // prints: called 3 times`,
      },
      {
        title: "💡 Tips & Tricks — Function Types & Scope",
        content: "**Tip 1 — Avoid global variables**\nGlobal variables can be changed from anywhere in the program, making bugs very hard to track. Prefer passing values as parameters.\n\n**Tip 2 — Local variables have no default value**\n```cpp\nint x;  // garbage value — never use it uninitialized!\nint x = 0;  // safe\n```\n\n**Tip 3 — Use `static` locals for counters or caches**\nStatic locals are great when you need a variable to remember its value between calls but don't want a global variable.\n\n**Tip 4 — Pass-by-value is safe but copies data**\nFor large data (like arrays or big structs), pass-by-value makes an expensive copy. We'll learn pass-by-reference/pointer next.",
      },
    ],
    playground: {
      description: "Calling a return-with-parameters function.",
      code: `#include <iostream>
using namespace std;

float sumRange(float start, float end) {
    float total = 0;
    for (float i = start; i <= end; i++)
        total += i;
    return total;
}

int main() {
    cout << "Sum 1 to 5:  " << sumRange(1, 5) << endl;
    cout << "Sum 1 to 10: " << sumRange(1, 10) << endl;
    return 0;
}`,
      output: "Sum 1 to 5:  15\nSum 1 to 10: 55",
    },
    quiz: [
      {
        question: "In pass-by-value, modifying a parameter inside the function:",
        options: ["Changes the caller's variable", "Has no effect on the caller", "Causes a compile error", "Crashes the program"],
        correct: 1,
        explanation: "Only the copy is modified. The caller's original variable is untouched.",
      },
      {
        question: "A `static` local variable:",
        options: ["Is destroyed at end of function call", "Is visible everywhere in the program", "Keeps its value between function calls", "Cannot be modified"],
        correct: 2,
        explanation: "Static locals are initialized once and their values persist across calls.",
      },
      {
        question: "A global variable's lifetime is:",
        options: ["Current block only", "Current function only", "Entire program run", "Until first use"],
        correct: 2,
        explanation: "Global variables exist for the entire lifetime of the program.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 19 — Types of Functions Part II
  // ─────────────────────────────────────────────────────────────
  {
    id: "types-of-functions-ii",
    number: "19",
    title: "Types of Functions — Part II",
    summary: "Default arguments, function overloading, ambiguous invocation, and inline functions.",
    duration: "30 min",
    topics: ["Default arguments", "Overloading", "Ambiguous calls", "inline"],
    slides: [
      {
        title: "Default arguments — parameters with preset values",
        content: "You can give a parameter a **default value**. If the caller doesn't provide that argument, the default is used.",
        code: `void printArea(double radius = 1.0) {
    const double PI = 3.14159;
    cout << "Area = " << radius * radius * PI << endl;
}

printArea();       // uses default: radius = 1.0 → Area = 3.14159
printArea(4.0);    // overrides: radius = 4.0 → Area = 50.2654
printArea(7.5);    // overrides: radius = 7.5 → Area = 176.71`,
      },
      {
        title: "Rules for default arguments",
        content: "Defaults must come at the **END** of the parameter list. Once you start giving defaults, all following parameters must also have defaults.",
        code: `// LEGAL — defaults are at the end
void greet(string name, string greeting = "Hello") { ... }
void box(int w, int h = 5, int d = 10) { ... }

// ILLEGAL — default in the middle!
// void f(int a = 0, int b, int c = 0);  // ERROR!
// void f(int a, int b = 0, int c);       // ERROR!

// Calling a function with some defaults:
box(3);         // w=3, h=5 (default), d=10 (default)
box(3, 7);      // w=3, h=7, d=10 (default)
box(3, 7, 2);   // w=3, h=7, d=2`,
      },
      {
        title: "Function overloading — same name, different signatures",
        content: "**Overloading** means having multiple functions with the **same name** but **different parameter lists**. The compiler figures out which one to call based on the types of arguments you pass.",
        code: `// Three overloaded max functions
int max(int a, int b) {
    return a > b ? a : b;
}

double max(double a, double b) {
    return a > b ? a : b;
}

double max(double a, double b, double c) {
    return max(max(a, b), c);  // calls the 2-argument version
}

// Calls — compiler picks the right one automatically:
max(3, 4);          // calls int version
max(3.0, 5.4);      // calls double version
max(3.0, 5.4, 2.1); // calls 3-argument version`,
      },
      {
        title: "Overloading rules — what CAN'T be overloaded",
        content: "Overloading works based on **parameter types and count**, NOT on return type.",
        code: `// ILLEGAL — only return type differs, parameter lists are the same
// int f(int a);     // ERROR!
// double f(int a);  // ERROR! — ambiguous

// LEGAL — different parameter types
void print(int x)    { cout << "int: " << x; }
void print(double x) { cout << "double: " << x; }
void print(string x) { cout << "string: " << x; }

print(5);       // calls print(int)
print(5.0);     // calls print(double)
print("hi");    // calls print(string)`,
      },
      {
        title: "Ambiguous invocation — when the compiler can't decide",
        content: "If two overloaded functions are equally good matches for a call, the compiler gives an error.",
        code: `int maxN(int a, double b) { return (a > b) ? a : (int)b; }
double maxN(double a, int b) { return (a > b) ? a : b; }

// AMBIGUOUS — which one to call? Both match equally!
maxN(1, 2);  // ERROR: ambiguous — is 1 an int or double? Is 2?

// Fix — be explicit with types:
maxN(1, 2.0);   // clearly calls first version (int, double)
maxN(1.0, 2);   // clearly calls second version (double, int)`,
      },
      {
        title: "Inline functions — optimization hint",
        content: "For very small functions, the overhead of a function call (pushing/popping the call stack) can be significant. The `inline` keyword asks the compiler to **replace each call with the function's code directly** (no call overhead).",
        code: `inline int square(int x) {
    return x * x;
}

// When you write:
int result = square(5);

// The compiler may replace it with:
int result = 5 * 5;   // no function call overhead!`,
      },
      {
        title: "Inline — when to use and when not to",
        content: "- ✅ Use for very **short** functions (1-3 lines)\n- ✅ Use for functions called in **tight loops** many times\n- ❌ Don't use for **large** functions — each call site gets a copy of the code, bloating the executable\n- ❌ `inline` is just a **hint** to the compiler — it may ignore it",
      },
      {
        title: "💡 Tips & Tricks — Overloading & Defaults",
        content: "**Tip 1 — Use defaults for optional parameters**\nDefaults are great for functions with optional configuration:\n```cpp\nvoid drawCircle(double radius, string color = \"red\", bool filled = true);\n```\n\n**Tip 2 — Overloading makes APIs cleaner**\nInstead of `addInt()`, `addDouble()`, `addFloat()`, just use `add()` overloaded for each type.\n\n**Tip 3 — Don't overuse overloading**\nIf two functions with the same name do completely different things (not just different types), use different names instead.\n\n**Tip 4 — Test ambiguous calls carefully**\nIf you mix int literals and double literals in overloaded calls, be explicit: write `5.0` instead of `5` when you want double.",
      },
    ],
    playground: {
      description: "Overloaded max functions for int and double.",
      code: `#include <iostream>
using namespace std;

int max(int a, int b) { return a > b ? a : b; }
double max(double a, double b) { return a > b ? a : b; }

int main() {
    cout << "max(3, 4)       = " << max(3, 4) << endl;
    cout << "max(3.0, 5.4)   = " << max(3.0, 5.4) << endl;
    cout << "max(-1, -5)     = " << max(-1, -5) << endl;
    return 0;
}`,
      output: "max(3, 4)       = 4\nmax(3.0, 5.4)   = 5.4\nmax(-1, -5)     = -1",
    },
    quiz: [
      {
        question: "Which default argument declaration is legal?",
        options: [
          "void f(int a, int b = 0, int c)",
          "void f(int a = 0, int b, int c = 0)",
          "void f(int a, int b = 0, int c = 0)",
          "void f(int = 0, int, int)",
        ],
        correct: 2,
        explanation: "Defaults must be at the trailing end. Once you start defaults, all subsequent parameters must also have defaults.",
      },
      {
        question: "Functions differing ONLY in return type (same parameter list):",
        options: ["Valid overloads", "Only works with inline", "Compile error", "Only for void"],
        correct: 2,
        explanation: "Overloading requires different parameter lists. Different return types alone is a compile error.",
      },
      {
        question: "The `inline` keyword:",
        options: ["Forces the compiler to inline", "Is just a hint to the compiler", "Makes the function private", "Is required for short functions"],
        correct: 1,
        explanation: "inline is a request/hint. Modern compilers decide on their own whether to inline based on optimization level.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 20 — Pass by Reference
  // ─────────────────────────────────────────────────────────────
  {
    id: "functions-pass-by-reference",
    number: "20",
    title: "Functions — Pass by Reference",
    summary: "Passing arguments by address using pointers so a function can modify the caller's variables; plus passing 1D and 2D arrays.",
    duration: "30 min",
    topics: ["Pass by value vs reference", "Pointer parameters", "Swapping", "Passing arrays"],
    slides: [
      {
        title: "The limitation of pass-by-value",
        content: "We saw that pass-by-value gives the function a **copy**. The original is safe — but what if you *want* the function to modify the original?\n\nFor example: a `swap` function needs to actually exchange the values of two variables in the caller. Pass-by-value won't work because it only swaps the copies.",
      },
      {
        title: "Three ways to pass arguments",
        content: "",
        table: {
          headers: ["Method", "What's passed", "Can modify caller's data?", "When to use"],
          rows: [
            ["By value", "A copy of the data", "No — only the copy changes", "Most function calls"],
            ["By pointer", "The memory address of the data", "Yes — modify through the address", "When function must change caller's variable"],
            ["By reference (using &)", "An alias to the original variable", "Yes — alias IS the original", "Modern C++ alternative to pointers"],
          ],
        },
      },
      {
        title: "Pass-by-value swap — FAILS",
        content: "",
        code: `void swapFail(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    // a and b are COPIES — swapping them does nothing to originals
}

int x = 4, y = 5;
swapFail(x, y);
cout << "x=" << x << " y=" << y;  // x=4, y=5 — unchanged!`,
      },
      {
        title: "Pass by pointer — swaps successfully",
        content: "A **pointer** stores a memory address. By passing the address with `&`, and dereferencing with `*`, the function can reach the original variable.",
        code: `void swapOK(int* a, int* b) {
    int temp = *a;   // *a means "value at address a"
    *a = *b;
    *b = temp;
}

int x = 4, y = 5;
swapOK(&x, &y);      // pass ADDRESSES of x and y
cout << "x=" << x << " y=" << y;  // x=5, y=4 — swapped!

// Key operators:
// &x  = "address of x"
// *p  = "value at address p" (dereference)`,
      },
      {
        title: "Pass by reference (C++ style — simpler)",
        content: "C++ has a cleaner way: use `&` in the parameter list to create a **reference** (alias). No `*` or `&` needed in the function body or the call.",
        code: `// Reference parameters — note the & in the parameter list
void swapRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
    // a and b ARE x and y — modifying them modifies the originals!
}

int x = 4, y = 5;
swapRef(x, y);        // no & needed in the call
cout << "x=" << x << " y=" << y;  // x=5, y=4 — swapped!`,
      },
      {
        title: "Passing 1D arrays to functions",
        content: "Arrays are **automatically passed by pointer** in C++. The function receives a pointer to the first element — it works directly on the original array (no copy!).\n\nAll three of these declarations are equivalent:",
        code: `// Three equivalent ways to declare the parameter:
void printArray(int arr[], int size)  { ... }  // most common
void printArray(int arr[10], int size){ ... }  // size is IGNORED
void printArray(int* arr, int size)   { ... }  // pointer form

// Modifying inside the function DOES affect the original:
void addTen(int arr[], int size) {
    for (int i = 0; i < size; i++)
        arr[i] += 10;   // modifies ORIGINAL array!
}

int A[5] = {1, 2, 3, 4, 5};
addTen(A, 5);
// A is now {11, 12, 13, 14, 15}`,
      },
      {
        title: "Passing 2D arrays to functions",
        content: "For 2D arrays, the **column count** must be specified (the row count can be omitted):",
        code: `// Column size MUST be specified:
void printMatrix(int arr[][4], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++)
            cout << arr[i][j] << "\\t";
        cout << endl;
    }
}

int M[3][4] = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};
printMatrix(M, 3, 4);`,
      },
      {
        title: "When to use pointers/references?",
        content: "- To **modify** a caller's variable (like swap)\n- To **avoid copying** large data (arrays, structs)\n- To **return multiple values** (pass output parameters by reference)\n\nExample: a function that returns both min and max:",
        code: `void findMinMax(int arr[], int size, int& minOut, int& maxOut) {
    minOut = maxOut = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] < minOut) minOut = arr[i];
        if (arr[i] > maxOut) maxOut = arr[i];
    }
}

int A[] = {3, 1, 4, 1, 5, 9, 2, 6};
int mn, mx;
findMinMax(A, 8, mn, mx);
cout << "Min=" << mn << " Max=" << mx;  // Min=1 Max=9`,
      },
      {
        title: "💡 Tips & Tricks — Pass by Reference",
        content: "**Tip 1 — Use references instead of pointers when possible**\nIn modern C++, prefer reference parameters (`int& x`) over pointer parameters (`int* x`). References are safer (can't be null) and cleaner to use.\n\n**Tip 2 — Arrays are always passed by reference (effectively)**\nYou never need `&` for arrays — they're already passed as pointers. Be careful: any modification inside the function WILL change the original.\n\n**Tip 3 — Use `const` to prevent unwanted modification**\n```cpp\nvoid print(const int arr[], int size) {  // can read, not modify\n    for (int i = 0; i < size; i++) cout << arr[i];\n}\n```\n\n**Tip 4 — The & operator has two meanings**\n- `int& x` in a parameter list = **reference** (alias)\n- `&x` in an expression = **address of x**",
      },
    ],
    playground: {
      description: "Swap two integers using pointer parameters.",
      code: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int u = 4, v = 5;
    cout << "Before: u=" << u << " v=" << v << endl;
    swap(&u, &v);
    cout << "After:  u=" << u << " v=" << v << endl;
    return 0;
}`,
      output: "Before: u=4 v=5\nAfter:  u=5 v=4",
    },
    quiz: [
      {
        question: "Why does a pass-by-value swap fail?",
        options: ["Wrong return type", "Parameters are copies of the originals", "Operator precedence issue", "It actually works"],
        correct: 1,
        explanation: "Only the copies inside the function are exchanged. The caller's original variables are unchanged.",
      },
      {
        question: "An array passed to a function is received as:",
        options: ["A full copy of the array", "A pointer to the original array", "Only the first element", "The array's size"],
        correct: 1,
        explanation: "Arrays decay to pointers when passed to functions. The function operates on the original data.",
      },
      {
        question: "For `void f(int arr[][4], int rows)`, which dimension can be omitted?",
        options: ["First (rows)", "Second (cols = 4)", "Both", "Neither"],
        correct: 0,
        explanation: "Only the leftmost (first) dimension can be omitted. The column count must always be specified.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 21 — Recursion
  // ─────────────────────────────────────────────────────────────
  {
    id: "recursion",
    number: "21",
    title: "Recursion",
    summary: "Functions that call themselves — elegant solutions for problems naturally defined in terms of smaller subproblems.",
    duration: "35 min",
    topics: ["Recursive functions", "Base case", "Factorial", "Fibonacci", "Infinite recursion"],
    slides: [
      {
        title: "What is recursion?",
        content: "**Recursion** is when a function calls **itself** to solve a smaller version of the same problem.\n\nReal-world analogy: Imagine you're looking for a document in a folder. You open the folder, but inside is another folder. You apply the same process to the inner folder. This continues until you find a folder with no subfolders (the base case).\n\nRecursion is powerful for problems that are naturally self-referential: factorials, tree traversal, searching, sorting.",
      },
      {
        title: "The two essential ingredients of recursion",
        content: "Every correct recursive function **must** have both:\n\n1. **Base case** — a stopping condition that returns a value WITHOUT calling itself again. Without this, you get infinite recursion (stack overflow).\n\n2. **Recursive case** — calls itself on a **smaller version** of the problem, making progress toward the base case.",
      },
      {
        title: "Factorial — the classic example",
        content: "By definition:\n- `factorial(0)` = 1 (base case — stop here)\n- `factorial(n)` = n × factorial(n-1) (recursive case)\n\nSo: 5! = 5 × 4! = 5 × 4 × 3! = 5 × 4 × 3 × 2! = 5 × 4 × 3 × 2 × 1! = 5 × 4 × 3 × 2 × 1 = **120**",
        code: `int factorial(int n) {
    // Base case — STOP here
    if (n == 0)
        return 1;

    // Recursive case — call with smaller n
    return n * factorial(n - 1);
}

// factorial(5)
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1 * factorial(0)
// = 5 * 4 * 3 * 2 * 1 * 1 = 120`,
      },
      {
        title: "How the call stack unfolds",
        content: "Each recursive call adds a new activation record to the stack. When the base case is reached, they all unwind in reverse order:",
        code: `// Tracing factorial(3):

factorial(3) calls factorial(2)
    factorial(2) calls factorial(1)
        factorial(1) calls factorial(0)
            factorial(0) returns 1          // BASE CASE
        factorial(1) returns 1 * 1 = 1     // UNWIND
    factorial(2) returns 2 * 1 = 2         // UNWIND
factorial(3) returns 3 * 2 = 6             // UNWIND

// Final answer: 6`,
      },
      {
        title: "Infinite recursion — the danger of missing base case",
        content: "If you forget the base case (or it's unreachable), the function calls itself forever until memory runs out — **stack overflow**!",
        code: `// DANGEROUS — no base case!
int badFactorial(int n) {
    return n * badFactorial(n - 1);  // keeps going forever!
    // eventually: stack overflow crash
}

// FIXED — has base case:
int goodFactorial(int n) {
    if (n <= 0) return 1;  // base case: handles 0 and negatives
    return n * goodFactorial(n - 1);
}`,
      },
      {
        title: "Sum 1 to n — recursive",
        content: "",
        code: `int sumTo(int n) {
    if (n == 1) return 1;         // base case
    return n + sumTo(n - 1);      // recursive case
}

// sumTo(5):
// 5 + sumTo(4)
// 5 + 4 + sumTo(3)
// 5 + 4 + 3 + sumTo(2)
// 5 + 4 + 3 + 2 + sumTo(1)
// 5 + 4 + 3 + 2 + 1 = 15`,
      },
      {
        title: "Fibonacci — two recursive calls",
        content: "The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...\n- fib(0) = 0\n- fib(1) = 1\n- fib(n) = fib(n-1) + fib(n-2)",
        code: `int fib(int n) {
    if (n == 0) return 0;       // base case 1
    if (n == 1) return 1;       // base case 2
    return fib(n-1) + fib(n-2); // recursive case (TWO calls!)
}

// fib(5) = fib(4) + fib(3)
//        = (fib(3)+fib(2)) + (fib(2)+fib(1))
//        = ... = 5`,
      },
      {
        title: "Order matters — where you put the recursive call",
        content: "Moving the `cout` before or after the recursive call completely changes the output:",
        code: `// Prints FORWARD: 1 2 3 4 5
void countUp(int n, int max) {
    if (n > max) return;
    cout << n << " ";    // print BEFORE recursive call
    countUp(n + 1, max);
}

// Prints BACKWARD: 5 4 3 2 1
void countDown(int n, int max) {
    if (n > max) return;
    countDown(n + 1, max);
    cout << n << " ";    // print AFTER recursive call (on the way back up!)
}`,
      },
      {
        title: "💡 Tips & Tricks — Recursion",
        content: "**Tip 1 — Always write the base case FIRST**\nBefore writing the recursive case, write and test the base case. This prevents infinite recursion.\n\n**Tip 2 — Trace small examples by hand**\nFor `factorial(3)`, trace through it manually to verify correctness before running.\n\n**Tip 3 — Every recursive call must move toward the base case**\nIf you call `factorial(n)` and inside you call `factorial(n+1)`, you're moving AWAY from the base case — infinite recursion!\n\n**Tip 4 — Recursion vs loops**\nAnything you can do with recursion, you can also do with a loop (and vice versa). Recursion is more elegant for tree/graph problems. Loops are usually faster and use less memory.",
      },
    ],
    playground: {
      description: "Compute 6! recursively.",
      code: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;           // base case
    return n * factorial(n - 1);   // recursive case
}

int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    cout << "6! = " << factorial(6) << endl;
    cout << "fib(10) = " << fib(10) << endl;
    return 0;
}`,
      output: "6! = 720\nfib(10) = 55",
    },
    quiz: [
      {
        question: "Every recursive function must have:",
        options: ["A loop", "A base case", "A global variable", "A void return type"],
        correct: 1,
        explanation: "Without a base case, recursion never stops and the stack overflows.",
      },
      {
        question: "fib(5) given fib(0)=0, fib(1)=1?",
        options: ["3", "5", "8", "13"],
        correct: 1,
        explanation: "Fibonacci sequence: 0,1,1,2,3,5. fib(5) = 5.",
      },
      {
        question: "What causes a stack overflow in recursion?",
        options: ["Too many arguments", "Missing or unreachable base case", "Returning too early", "Using cout inside"],
        correct: 1,
        explanation: "Without a reachable base case, recursion continues indefinitely, filling the call stack.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 22 — Strings
  // ─────────────────────────────────────────────────────────────
  {
    id: "strings",
    number: "22",
    title: "Strings — Character Arrays",
    summary: "Storing text as null-terminated character arrays — declaration, initialization, input with cin / getline, and 2D arrays of strings.",
    duration: "35 min",
    topics: ["char arrays", "Null terminator \\0", "cin vs getline", "2D string arrays", "String operations"],
    slides: [
      {
        title: "What is a string?",
        content: "A **string** is a sequence of characters. In daily life: words, sentences, names, messages.\n\nIn C++, a string literal (text between double quotes) is a sequence of characters automatically terminated with a null character `\\0`.\n\nExamples of string literals:\n- `\"Hello\"` — 5 characters + \\0\n- `\"CS501\"` — 5 characters + \\0\n- `\"\"` — empty string, just \\0",
      },
      {
        title: "How C++ stores strings — char arrays",
        content: "Unlike languages like Python or Java, C++ has no built-in string **primitive**. Text is stored as an **array of `char`** terminated by the **null character** `\\0` (ASCII code 0).\n\nThe null character is the signal \"the string ends here\". An array of size `n` can hold at most **n-1** visible characters (the last slot is for `\\0`).",
      },
      {
        title: "Declaring char arrays",
        content: "",
        code: `char name[20];         // up to 19 characters + '\\0'
char city[40];         // up to 39 characters
char grade[2];         // 1 character + '\\0' (e.g., "A")

// Memory layout for name[20]:
// [0][1][2]...[18][19]
// (can store: 19 chars + '\\0' at position 19)`,
      },
      {
        title: "Initializing char arrays — three ways",
        content: "",
        code: `// Method 1: assign a string literal
char name1[20] = "Ahmed";     // 'A','h','m','e','d','\\0', ...

// Method 2: infer size from literal
char name2[] = "Ahmed";       // size = 6 (5 chars + '\\0')

// Method 3: character by character (must add '\\0' yourself!)
char name3[] = {'A','h','m','e','d','\\0'};

// Memory layout of "Ahmed":
// A  h  m  e  d  \\0
// 0  1  2  3  4   5`,
      },
      {
        title: "Memory layout — visualized",
        content: "`char msg[] = \"Hello\";` stores:\n```\n H | e | l | l | o | \\0\n 0   1   2   3   4   5\n```\n\nThe `\\0` marks the end. Functions like `cout`, `strlen`, `strcpy` all rely on this terminator to know where the string ends.",
      },
      {
        title: "Input with `cin >>` — stops at whitespace",
        content: "",
        code: `char city[20];
cout << "Enter city: ";
cin >> city;

// If user types: Kuala Lumpur
// city receives: "Kuala"  (stops at the space!)
// "Lumpur" is left in the input buffer

cout << city;  // prints "Kuala"`,
      },
      {
        title: "Input with `cin.getline()` — reads full line",
        content: "`cin.getline(buffer, maxSize)` reads up to `maxSize-1` characters, including spaces, stopping at Enter.",
        code: `char sentence[80];
cout << "Enter a sentence: ";
cin.getline(sentence, 80);  // reads full line including spaces

// If user types: Hello, how are you?
// sentence = "Hello, how are you?"

cout << sentence;`,
      },
      {
        title: "Printing strings — just use cout",
        content: "Unlike numeric arrays, `cout` knows how to print `char` arrays (it reads until `\\0`):",
        code: `char city[] = "Lahore";
cout << city;  // prints "Lahore" — automatically stops at '\\0'

// Compare with an int array — does NOT print elements!
int marks[] = {20, 65};
cout << marks;  // prints a memory ADDRESS, not the values!

// For a char array, you can also print individual characters:
cout << city[0];  // prints 'L'
cout << city[1];  // prints 'a'`,
      },
      {
        title: "String operations — do them manually",
        content: "You can't use `=` or `==` on char arrays. Do it element by element.",
        code: `// Copying a string manually
char src[] = "Hello";
char dst[10];
int i = 0;
while (src[i] != '\\0') {
    dst[i] = src[i];
    i++;
}
dst[i] = '\\0';  // IMPORTANT: add null terminator!

// String length manually
int len = 0;
while (src[len] != '\\0') len++;
cout << "Length = " << len;  // 5`,
      },
      {
        title: "2D char arrays — storing multiple strings",
        content: "To store multiple strings (like a list of names), use a 2D char array:",
        code: `char names[5][20];    // 5 names, each up to 19 chars

// Store some names
strcpy(names[0], "Alice");
strcpy(names[1], "Bob");

// Or initialize directly:
char words[4][6] = {"Cat", "Boat", "Mat", "Rate"};

cout << words[0];     // Cat
cout << words[3][0];  // R (first char of "Rate")

// Loop through all names:
for (int i = 0; i < 4; i++)
    cout << words[i] << endl;`,
      },
      {
        title: "💡 Tips & Tricks — Strings",
        content: "**Tip 1 — Always leave room for `\\0`**\nFor a 5-character word like \"Hello\", declare `char word[6]` (not 5!).\n\n**Tip 2 — Use `cin.ignore()` between `cin >>` and `cin.getline()`**\n```cpp\nint age;\ncin >> age;\ncin.ignore();       // clear the newline left in buffer\ncin.getline(name, 50);  // now reads full line correctly\n```\n\n**Tip 3 — In modern C++, prefer `std::string` for simplicity**\n```cpp\n#include <string>\nstring name = \"Ahmed\";  // supports =, ==, +, .length() etc.\n```\nChar arrays are important for understanding fundamentals, but `std::string` is safer and easier.\n\n**Tip 4 — Don't compare strings with `==`**\n`str1 == str2` compares ADDRESSES, not content! Use `strcmp()` from `<cstring>`, or use `std::string`.",
      },
    ],
    playground: {
      description: "Count the length of a string by walking until the null terminator.",
      code: `#include <iostream>
using namespace std;

int main() {
    char word[] = "Programming";

    // Count length manually
    int len = 0;
    while (word[len] != '\\0') len++;

    cout << "String: " << word << endl;
    cout << "Length: " << len << endl;

    // Print character by character
    cout << "Characters: ";
    for (int i = 0; i < len; i++)
        cout << word[i] << " ";

    return 0;
}`,
      output: "String: Programming\nLength: 11\nCharacters: P r o g r a m m i n g",
    },
    quiz: [
      {
        question: "What special character ends every C-string?",
        options: ["' ' (space)", "'\\n' (newline)", "'\\0' (null)", "'$' (dollar sign)"],
        correct: 2,
        explanation: "The null character '\\0' marks the end of a C-string. All string functions rely on it.",
      },
      {
        question: "`cin >> city` when user types `Kuala Lumpur`. What ends up in city?",
        options: ["Kuala Lumpur", "Kuala", "Lumpur", "Empty"],
        correct: 1,
        explanation: "`cin >>` stops at the first whitespace (space). Only 'Kuala' is stored.",
      },
      {
        question: "Correct way to copy char array str1 into str2:",
        options: ["str2 = str1;", "str2 == str1;", "Loop and copy each char until '\\0'", "memmove(str1, str2);"],
        correct: 2,
        explanation: "Arrays can't be assigned with =. Copy element by element and add '\\0' at the end.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 23 — Structures
  // ─────────────────────────────────────────────────────────────
  {
    id: "structures",
    number: "23",
    title: "Structures in C++",
    summary: "User-defined types that bundle several related values of different types into one record.",
    duration: "40 min",
    topics: ["struct", "Member access", "Initialization", "Functions with structs", "typedef"],
    slides: [
      {
        title: "The limitation of arrays — and how structs fix it",
        content: "Arrays store many values of the **same type**. But real-world data is mixed:\n\nA student record has: name (char[]), ID (int), GPA (float), and grade (char).\n\nYou can't store all of these in one array! A **structure** groups values of **different types** into a single user-defined type.",
      },
      {
        title: "Defining a struct",
        content: "",
        code: `struct Student {
    char   name[30];    // a string
    int    rollNo;      // integer
    float  gpa;         // decimal
    char   grade;       // single character
};  // <-- note the semicolon!

// Now 'Student' is a new type, just like int or double`,
      },
      {
        title: "Creating struct variables",
        content: "",
        code: `// Declare a struct variable
Student s1;
Student s2, s3;  // multiple at once

// Initialize at declaration (values in order of declaration)
Student ali = {"Ali Ahmed", 101, 3.75f, 'A'};

// In C++, the 'struct' keyword is optional:
struct Books b1;   // C style
Books b2;          // C++ style (preferred)`,
      },
      {
        title: "Accessing members — the dot operator",
        content: "Use `variableName.memberName` to read or write any field of a struct.",
        code: `Student s1;

// WRITE (store values)
s1.rollNo = 101;
s1.gpa = 3.75f;
s1.grade = 'A';
// For char arrays, don't use = directly — use strcpy:
strcpy(s1.name, "Ali Ahmed");

// READ (retrieve values)
cout << "Name: " << s1.name << endl;
cout << "Roll: " << s1.rollNo << endl;
cout << "GPA:  " << s1.gpa << endl;`,
      },
      {
        title: "Reading struct values from the user",
        content: "",
        code: `struct Person {
    char   name[50];
    int    age;
    double salary;
};

Person p;
cout << "Enter name: ";
cin.getline(p.name, 50);   // read full name including spaces
cout << "Enter age: ";
cin >> p.age;
cout << "Enter salary: ";
cin >> p.salary;

cout << p.name << " is " << p.age << " years old.";`,
      },
      {
        title: "Struct assignment — copying all fields at once",
        content: "You CAN assign one struct to another with `=` — it copies all member values at once (member-by-member copy).",
        code: `Student s1 = {"Ahmed", 101, 3.8f, 'A'};
Student s2;

s2 = s1;  // LEGAL! Copies all fields from s1 to s2

cout << s2.name;  // "Ahmed"
cout << s2.gpa;   // 3.8

// But you CANNOT:
// cout << s1;    // ERROR — can't print whole struct
// cin >> s1;     // ERROR — can't read whole struct`,
      },
      {
        title: "Passing a struct to a function",
        content: "Structs are passed **by value** by default (a copy is made). Use a pointer or reference to avoid copying and/or to modify the original.",
        code: `// By value — function gets a COPY
void printStudent(Student s) {
    cout << s.name << " | " << s.rollNo << " | " << s.gpa;
}

// By pointer — function can MODIFY original
void updateGPA(Student* s, float newGPA) {
    s->gpa = newGPA;    // use -> instead of . when using pointer
}

Student ali = {"Ali", 101, 3.5f, 'B'};
printStudent(ali);         // print by value (copy)
updateGPA(&ali, 3.9f);    // modify original via pointer`,
      },
      {
        title: "The arrow operator `->` for struct pointers",
        content: "`(*ptr).member` can be written more cleanly as `ptr->member`:",
        code: `Student* ptr = &ali;

// Long form:
cout << (*ptr).name;
(*ptr).gpa = 4.0f;

// Short form (preferred):
cout << ptr->name;
ptr->gpa = 4.0f;

// Both do exactly the same thing!`,
      },
      {
        title: "`typedef` — giving types shorter names",
        content: "`typedef` creates an alias for a type name. Useful to avoid writing `struct` repeatedly.",
        code: `// Without typedef:
struct Point { int x, y; };
struct Point p1;   // must write 'struct' in C

// With typedef:
typedef struct {
    int x, y;
} Point;

Point p1;   // cleaner — no 'struct' keyword needed
Point p2, p3;`,
      },
      {
        title: "💡 Tips & Tricks — Structures",
        content: "**Tip 1 — Use `->` with pointers, `.` with objects**\n```cpp\nStudent s;    s.gpa = 3.5;    // . for objects\nStudent* p;   p->gpa = 3.5;   // -> for pointers\n```\n\n**Tip 2 — Struct = user-defined type**\nOnce you define `struct Student`, you can use `Student` everywhere just like `int` or `double`.\n\n**Tip 3 — `sizeof(struct)` is at least the sum of all members**\n(It may be larger due to alignment/padding.)\n\n**Tip 4 — Group related data together**\nIf name, age, and GPA always appear together, make a struct. This makes your code more organized and readable.",
      },
    ],
    playground: {
      description: "Define a Student struct, fill it, and print the record.",
      code: `#include <iostream>
using namespace std;

struct Student {
    const char* name;
    int   rollNo;
    float gpa;
    char  grade;
};

void printStudent(Student s) {
    cout << "Name:  " << s.name   << endl;
    cout << "Roll:  " << s.rollNo << endl;
    cout << "GPA:   " << s.gpa    << endl;
    cout << "Grade: " << s.grade  << endl;
}

int main() {
    Student ali = {"Ali Ahmed", 101, 3.8f, 'A'};
    Student bob = {"Bob Khan",  102, 2.9f, 'C'};

    cout << "--- Student 1 ---" << endl;
    printStudent(ali);
    cout << "--- Student 2 ---" << endl;
    printStudent(bob);

    return 0;
}`,
      output: "--- Student 1 ---\nName:  Ali Ahmed\nRoll:  101\nGPA:   3.8\nGrade: A\n--- Student 2 ---\nName:  Bob Khan\nRoll:  102\nGPA:   2.9\nGrade: C",
    },
    quiz: [
      {
        question: "How do arrays and structures differ?",
        options: [
          "Arrays hold mixed types; structs hold same type",
          "Arrays hold same type; structs hold mixed types",
          "They are identical",
          "Structs can't hold arrays",
        ],
        correct: 1,
        explanation: "Arrays are homogeneous (same type). Structs are heterogeneous (mixed types).",
      },
      {
        question: "Which operator accesses a struct member through a POINTER?",
        options: [".", "::", "->", "&"],
        correct: 2,
        explanation: "`pointer->member` is shorthand for `(*pointer).member`.",
      },
      {
        question: "Can you use `cin >> myStruct;` to read all members at once?",
        options: ["Yes", "Yes with #include <struct>", "No — read each member separately", "Only for typedef structs"],
        correct: 2,
        explanation: "Aggregate I/O is not supported. Read each member individually.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 24 — Array of Structures & Nested Structures
  // ─────────────────────────────────────────────────────────────
  {
    id: "array-of-structures",
    number: "24",
    title: "Array of Structures & Nested Structures",
    summary: "Arrays whose elements are structs — for storing many records — and structures that contain other structures as members.",
    duration: "35 min",
    topics: ["Array of struct", "Element access", "Nested structures", "Dot chaining"],
    slides: [
      {
        title: "Why array of structs?",
        content: "A single struct holds ONE record (one student, one book, one point). But real programs deal with MANY records.\n\nAn **array of structs** gives you a collection of records, all of the same type:\n- 100 students\n- 50 books\n- 1000 sales records",
      },
      {
        title: "Declaring an array of structs",
        content: "```cpp\nStructType arrayName[size];\n```\n\nAccess an element: `arrayName[index].memberName`",
        code: `struct Student {
    char  name[30];
    int   rollNo;
    float gpa;
};

Student s[50];     // array of 50 Student records

// Access element 0's name:
s[0].rollNo = 101;
strcpy(s[0].name, "Ahmed");
s[0].gpa = 3.75f;`,
      },
      {
        title: "Reading an array of structs from user",
        content: "",
        code: `Student classroom[5];

for (int i = 0; i < 5; i++) {
    cout << "Enter student " << (i+1) << " name: ";
    cin.getline(classroom[i].name, 30);

    cout << "Enter roll number: ";
    cin >> classroom[i].rollNo;

    cout << "Enter GPA: ";
    cin >> classroom[i].gpa;

    cin.ignore();  // clear newline before next getline
}`,
      },
      {
        title: "Processing an array of structs — find highest GPA",
        content: "",
        code: `Student s[5] = {
    {"Ali",   101, 3.8f},
    {"Sara",  102, 3.9f},
    {"Ahmed", 103, 3.5f},
    {"Zara",  104, 4.0f},
    {"Omar",  105, 3.7f}
};

int topIndex = 0;
for (int i = 1; i < 5; i++) {
    if (s[i].gpa > s[topIndex].gpa)
        topIndex = i;
}

cout << "Top student: " << s[topIndex].name
     << " with GPA " << s[topIndex].gpa;
// Top student: Zara with GPA 4`,
      },
      {
        title: "Nested structures — structs inside structs",
        content: "A struct can have another struct as a member. This allows you to model complex, hierarchical data.",
        code: `struct Address {
    char houseNo[10];
    char street[30];
    char city[25];
    char zipCode[10];
};

struct Employee {
    int    id;
    char   name[25];
    double salary;
    Address homeAddr;   // nested struct!
};

Employee e;
e.id = 1001;
strcpy(e.name, "Bilal");
e.salary = 75000;
strcpy(e.homeAddr.city, "Lahore");   // chain dot operators`,
      },
      {
        title: "Accessing nested struct members — chaining dots",
        content: "",
        code: `Employee emp;

// Reading nested member:
cout << emp.homeAddr.city;      // chain: emp → homeAddr → city

// Writing nested member:
emp.homeAddr.zipCode[0] = '5';  // can even access char array chars!

// Array of employees:
Employee dept[10];
dept[2].homeAddr.city;          // employee[2]'s city`,
      },
      {
        title: "Student with grade record — nested struct",
        content: "",
        code: `struct GradeRecord {
    float percent;
    char  letterGrade;
};

struct StudentRecord {
    char        firstName[20];
    char        lastName[20];
    int         age;
    GradeRecord grade;   // nested struct
};

StudentRecord student;
student.grade.percent = 87.5f;

if (student.grade.percent >= 90)
    student.grade.letterGrade = 'A';
else if (student.grade.percent >= 80)
    student.grade.letterGrade = 'B';
else
    student.grade.letterGrade = 'C';`,
      },
      {
        title: "Points to remember",
        content: "- ✅ You CAN assign one struct to another: `s1 = s2;` (copies all members)\n- ❌ You CANNOT print or read a whole struct: `cout << s1;` is an error\n- ✅ You CAN have arrays of structs\n- ✅ You CAN have structs inside structs\n- Chain the dot operator for nested access: `emp.address.city`",
      },
      {
        title: "💡 Tips & Tricks — Array of Structures",
        content: "**Tip 1 — The pattern `arr[i].member` is very common**\nGet comfortable with it — you'll use it constantly:\n```cpp\nfor (int i = 0; i < n; i++)\n    cout << students[i].name << \": \" << students[i].gpa;\n```\n\n**Tip 2 — Keep nesting shallow**\nNesting structs 3-4 levels deep makes code hard to read. Consider flattening if possible.\n\n**Tip 3 — Use `const` when printing**\n```cpp\nvoid print(const Student& s) { ... }\n```\nPassing by `const` reference avoids copying AND prevents accidental modification.",
      },
    ],
    playground: {
      description: "Fill and print an array of 3 Point structs.",
      code: `#include <iostream>
using namespace std;

struct Point { int x, y; };

void printPoint(Point p, int idx) {
    cout << "P[" << idx << "] = (" << p.x << ", " << p.y << ")" << endl;
}

int main() {
    Point arr[3] = {{1,2}, {3,4}, {5,6}};

    for (int i = 0; i < 3; i++)
        printPoint(arr[i], i);

    return 0;
}`,
      output: "P[0] = (1, 2)\nP[1] = (3, 4)\nP[2] = (5, 6)",
    },
    quiz: [
      {
        question: "Given `Student s[10];` how do you set the GPA of the 3rd student to 3.8?",
        options: ["s.gpa[2] = 3.8;", "s[2].gpa = 3.8;", "s[2]->gpa = 3.8;", "s.gpa[3] = 3.8;"],
        correct: 1,
        explanation: "Index the array first with [2] (0-based, so 3rd is index 2), then use . to access the member.",
      },
      {
        question: "Nested structures are:",
        options: ["Illegal in C++", "Structs that contain other structs as members", "Structs declared inside main()", "Structs with only array members"],
        correct: 1,
        explanation: "A struct member can itself be a struct type — this is called nesting.",
      },
      {
        question: "To read `Employee e`'s city (stored in nested Address) you write:",
        options: ["cin >> e.city;", "cin >> e.add.city;", "cin >> add.city;", "cin >> e->add->city;"],
        correct: 1,
        explanation: "Chain the dot operator: e.add.city — where 'add' is the Address member of Employee.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 25 — File I/O
  // ─────────────────────────────────────────────────────────────
  {
    id: "file-io",
    number: "25",
    title: "File Input & Output",
    summary: "Reading from and writing to files on disk using fstream, ifstream and ofstream — the persistent twin of cin and cout.",
    duration: "35 min",
    topics: ["fstream", "ifstream / ofstream", "open / close", "Reading & writing", "File modes"],
    slides: [
      {
        title: "Why files?",
        content: "When your program ends, all variables are lost from memory. **Files** let you:\n- **Persist** data beyond program execution\n- **Share** data between different programs\n- **Process** large datasets that won't fit in variables\n- **Log** program activity for debugging\n\nExamples: student grade files, game save files, configuration files, logs.",
      },
      {
        title: "The six-step recipe for file I/O",
        content: "1. **Include** `<fstream>` header\n2. **Declare** a file stream variable\n3. **Open** the file (associate it with a filename)\n4. **Check** if the file opened successfully\n5. **Read or write** using `>>` and `<<` (just like cin/cout)\n6. **Close** the file when done",
      },
      {
        title: "The three stream classes",
        content: "",
        table: {
          headers: ["Class", "Direction", "Use for"],
          rows: [
            ["ifstream", "Input (file → program)", "Reading FROM a file"],
            ["ofstream", "Output (program → file)", "Writing TO a file"],
            ["fstream", "Both directions", "Reading AND writing the same file"],
          ],
        },
      },
      {
        title: "Writing to a file",
        content: "",
        code: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream outFile("mydata.txt");  // open for writing

    if (!outFile) {
        cout << "Error: could not open file!";
        return 1;
    }

    outFile << "Hello, File!" << endl;
    outFile << 42 << endl;
    outFile << 3.14 << endl;

    outFile.close();  // ALWAYS close!
    cout << "Written successfully.";
    return 0;
}`,
      },
      {
        title: "Reading from a file",
        content: "",
        code: `ifstream inFile("mydata.txt");  // open for reading

if (!inFile.is_open()) {
    cout << "Error: file not found!";
    return 1;
}

string line;
while (getline(inFile, line)) {  // read line by line
    cout << line << endl;
}

inFile.close();`,
      },
      {
        title: "Reading token by token with `>>`",
        content: "",
        code: `// If the file contains: 10 20 30 40 50

ifstream in("numbers.txt");
int n;
int total = 0;

while (in >> n) {    // reads until end of file
    total += n;
    cout << "Read: " << n << endl;
}

cout << "Sum = " << total;
in.close();`,
      },
      {
        title: "Reading character by character",
        content: "",
        code: `ifstream file("story.txt");
char ch;

while (file.get(ch)) {   // reads one character at a time
    cout << ch;           // echo to screen
}

file.close();`,
      },
      {
        title: "File open modes",
        content: "Control how the file is opened with mode flags:",
        table: {
          headers: ["Mode flag", "Meaning"],
          rows: [
            ["ios::in", "Open for reading (default for ifstream)"],
            ["ios::out", "Open for writing (default for ofstream) — TRUNCATES file!"],
            ["ios::app", "Append — writes at the end, keeps existing content"],
            ["ios::ate", "Open and move to end of file"],
            ["ios::trunc", "Discard existing file contents"],
            ["ios::binary", "Binary mode (raw bytes, not text)"],
          ],
        },
      },
      {
        title: "Combining modes",
        content: "Use `|` to combine multiple modes:",
        code: `// Append to an existing file (doesn't erase content)
ofstream log("log.txt", ios::out | ios::app);
log << "New entry" << endl;

// Open for both reading and writing
fstream rw("data.txt", ios::in | ios::out);

// Binary mode
ofstream bin("data.bin", ios::out | ios::binary);`,
      },
      {
        title: "Validating file open — always check!",
        content: "",
        code: `ofstream outFile("output.txt");

// Method 1: check with !
if (!outFile) {
    cout << "Failed to open file!";
    return 1;
}

// Method 2: check with is_open()
if (!outFile.is_open()) {
    cout << "Failed to open file!";
    return 1;
}

// Now safe to use outFile`,
      },
      {
        title: "💡 Tips & Tricks — File I/O",
        content: "**Tip 1 — Always close files**\nForgetting `close()` can cause the last few lines not to be written (they sit in a buffer). Always close, or use scope to auto-close.\n\n**Tip 2 — Use `ios::app` to ADD to a file**\nBy default, opening a file for writing (`ios::out`) ERASES all existing content. Use `ios::app` if you want to add new lines without deleting old ones.\n\n**Tip 3 — Files open in the same directory as the executable**\nUnless you give a full path, the file is created/read from the same folder as your .exe.\n\n**Tip 4 — Check for end of file with `while(in >> n)`**\nThis idiom is cleaner than checking `eof()` manually and avoids reading the last value twice.",
      },
    ],
    playground: {
      description: "Write a number to a file, then read it back.",
      code: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // WRITE
    ofstream out("number.txt");
    out << 200 << endl;
    out << 300 << endl;
    out.close();

    // READ
    ifstream in("number.txt");
    int n;
    while (in >> n) {
        cout << "Read: " << n << ", doubled: " << n * 2 << endl;
    }
    in.close();

    return 0;
}`,
      output: "Read: 200, doubled: 400\nRead: 300, doubled: 600",
    },
    quiz: [
      {
        question: "Which header is required for file I/O?",
        options: ["<iostream>", "<file>", "<fstream>", "<stdio.h>"],
        correct: 2,
        explanation: "<fstream> defines ifstream, ofstream, and fstream.",
      },
      {
        question: "Which class lets you WRITE to a file?",
        options: ["ifstream", "ofstream", "iostream", "cin"],
        correct: 1,
        explanation: "ofstream = output file stream. Used for writing to files.",
      },
      {
        question: "To open a file for APPENDING (adding to end without erasing):",
        options: ["ios::out", "ios::app", "ios::trunc", "ios::ate"],
        correct: 1,
        explanation: "ios::app keeps existing contents and writes at the end.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 26 — File Handling Advanced
  // ─────────────────────────────────────────────────────────────
  {
    id: "file-handling-advanced",
    number: "26",
    title: "File Handling — Pointers, Modes & Binary",
    summary: "Get / put pointers, seekg / seekp, binary file I/O with read() and write(), and the difference between text and binary modes.",
    duration: "35 min",
    topics: ["File pointers", "seekg / seekp", "Binary files", "read / write"],
    slides: [
      {
        title: "Streams — a quick recap",
        content: "A **stream** is like a pipe: data flows through it between your program and a device (keyboard, screen, file, network).\n\nC++ ships with:\n- `cin` — input from keyboard\n- `cout` — output to screen\n- `cerr` — error messages to screen\n- File streams from `<fstream>` — read from / write to disk files",
      },
      {
        title: "The stream class hierarchy",
        content: "```\n          ios\n         /   \\\n    istream   ostream\n       |         |\n  ifstream   ofstream\n        \\     /\n        fstream\n```\n\n`fstream` inherits from both `istream` and `ostream`, so it can read AND write.",
      },
      {
        title: "File pointers — where reading/writing happens",
        content: "Every open file has two internal **pointers** (position markers):\n\n- **get pointer** — tracks where the next **read** will happen\n- **put pointer** — tracks where the next **write** will happen\n\nAs you read or write, these pointers advance automatically.",
      },
      {
        title: "Moving the file pointer — seekg and seekp",
        content: "",
        table: {
          headers: ["Function", "What it does"],
          rows: [
            ["seekg(pos)", "Move GET pointer to absolute position"],
            ["seekg(offset, origin)", "Move GET pointer relative to an origin"],
            ["seekp(pos)", "Move PUT pointer to absolute position"],
            ["seekp(offset, origin)", "Move PUT pointer relative to an origin"],
            ["tellg()", "Return current GET pointer position"],
            ["tellp()", "Return current PUT pointer position"],
          ],
        },
      },
      {
        title: "Origins for two-argument seek",
        content: "",
        code: `ifstream in("data.txt");

in.seekg(0, ios::beg);     // jump to start of file
in.seekg(0, ios::end);     // jump to end of file
in.seekg(-5, ios::end);    // 5 bytes before end
in.seekg(10, ios::cur);    // 10 bytes forward from current position

// Find file size trick:
in.seekg(0, ios::end);
long fileSize = in.tellg();  // position at end = file size in bytes
in.seekg(0, ios::beg);       // rewind`,
      },
      {
        title: "Text mode vs Binary mode",
        content: "",
        table: {
          headers: ["Feature", "Text Mode (default)", "Binary Mode (ios::binary)"],
          rows: [
            ["Character interpretation", "Special chars like \\n may be translated", "Bytes written/read exactly as-is"],
            ["Use for", "Text files, readable data", "Images, executables, raw int/float data"],
            ["Integers stored as", "Their text representation ('42' = 2 bytes)", "Raw bytes ('42' = 4 bytes for int)"],
            ["Portable?", "Line endings may differ by OS", "Same on all platforms"],
          ],
        },
      },
      {
        title: "Binary write — `write()`",
        content: "Write raw bytes directly to the file. The array must be cast to `char*`:",
        code: `int arr[] = {10, 23, 3, 7, 9, 11, 253};
int n = sizeof(arr) / sizeof(arr[0]);  // 7

ofstream out("numbers.bin", ios::out | ios::binary);
out.write((char*) arr, sizeof(arr));   // write 7 * 4 = 28 bytes
out.close();`,
      },
      {
        title: "Binary read — `read()`",
        content: "Read raw bytes back into an array:",
        code: `int arr[7];

ifstream in("numbers.bin", ios::in | ios::binary);
in.read((char*) arr, sizeof(arr));  // read 28 bytes
in.close();

for (int i = 0; i < 7; i++)
    cout << arr[i] << " ";
// 10 23 3 7 9 11 253`,
      },
      {
        title: "Reading/writing one byte — get() and put()",
        content: "",
        code: `fstream f("test.bin", ios::out | ios::in | ios::binary);

f.put('H');    // write one byte
f.put('i');    // write one byte

f.seekg(0, ios::beg);  // rewind to start

char ch;
f.get(ch);     // read 'H'
cout << ch;    // H
f.get(ch);     // read 'i'
cout << ch;    // i

f.close();`,
      },
      {
        title: "Why binary files?",
        content: "- Store numbers as raw bytes — much more **compact** (4 bytes for an int vs potentially 10+ bytes as text)\n- **Faster** to read/write\n- Required for non-text data (images, audio, compiled programs)\n- Allows **random access** — jump to any record with seekg\n\nFor example: a database of 1 million student records is much smaller in binary format.",
      },
      {
        title: "💡 Tips & Tricks — Advanced File I/O",
        content: "**Tip 1 — Always close files**\nWhen a file is closed, the OS flushes any buffered data to disk. Forgetting close() may lose the last few writes.\n\n**Tip 2 — Use `ios::trunc` when overwriting**\nWhen opening with `ios::out | ios::in`, existing content stays. Add `ios::trunc` to clear it.\n\n**Tip 3 — The cast `(char*)` is required for binary I/O**\n`write()` and `read()` work with raw byte buffers. Cast your data pointer to `char*`.\n\n**Tip 4 — Binary files are not human-readable**\nDon't try to open a binary file in Notepad — you'll see garbage characters. Use hex editors or your own program to view them.",
      },
    ],
    playground: {
      description: "Write ints to a binary file, seek back, and read the first one.",
      code: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int arr[] = {10, 23, 3, 7, 9};
    int n = 5;

    // Write binary
    fstream f("nums.bin", ios::out | ios::in | ios::binary | ios::trunc);
    f.write((char*) arr, sizeof(arr));

    // Rewind and read first element
    f.seekg(0, ios::beg);
    int first;
    f.read((char*) &first, sizeof(int));
    cout << "First int = " << first << endl;

    // Seek to 3rd element (index 2) = offset 2*sizeof(int)
    f.seekg(2 * sizeof(int), ios::beg);
    int third;
    f.read((char*) &third, sizeof(int));
    cout << "Third int = " << third << endl;

    f.close();
    return 0;
}`,
      output: "First int = 10\nThird int = 3",
    },
    quiz: [
      {
        question: "`seekg` moves the:",
        options: ["Put pointer (write position)", "Get pointer (read position)", "Both pointers", "File mode"],
        correct: 1,
        explanation: "seekg = seek GET pointer. seekp = seek PUT pointer.",
      },
      {
        question: "Which mode is required for writing raw integers or structs?",
        options: ["ios::in", "ios::out", "ios::binary", "ios::ate"],
        correct: 2,
        explanation: "Binary mode writes bytes verbatim without any text interpretation.",
      },
      {
        question: "Which function writes N raw bytes from a buffer to a file?",
        options: ["put()", "write()", "<<", "save()"],
        correct: 1,
        explanation: "ofstream::write(const char* buffer, streamsize n) writes n raw bytes.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE 27 — Code Refactoring
  // ─────────────────────────────────────────────────────────────
  {
    id: "code-refactoring",
    number: "27",
    title: "Code Refactoring Techniques",
    summary: "Improving the structure of existing code without changing its behavior — seven practical techniques every engineer should know.",
    duration: "35 min",
    topics: ["Refactoring tips", "Red-Green / TDD", "Abstraction", "Composing methods", "Simplifying methods", "Moving features", "UI refactoring"],
    slides: [
      {
        title: "What is refactoring?",
        content: "**Refactoring** means improving the internal structure of code **without changing what it does** — the external behavior stays identical.\n\nThink of it like reorganizing your room: the same furniture is there, but now everything is in a better place — easier to find, easier to move around.\n\nWhy it matters:\n- Code rots over time — bugs, patches, new features make it messy\n- Messy code is hard to read, hard to debug, hard to extend\n- Refactoring keeps code healthy",
      },
      {
        title: "Code rot — what happens without refactoring",
        content: "After months of adding features and fixing bugs, code often suffers from:\n\n- **Duplication** — same logic copy-pasted in 10 places\n- **God functions** — one 500-line function that does everything\n- **Magic numbers** — `if (x > 37)` — what is 37?\n- **Confusing names** — `void f(int a, int b)`\n- **Deep nesting** — if inside if inside if inside for...\n\nAll of these make code painful to work with.",
      },
      {
        title: "Golden rules before refactoring",
        content: "1. **Work in small steps** — each tiny change should leave the program working\n2. **Run tests after every change** — catch regressions early\n3. **Don't add features simultaneously** — refactoring and new features are separate tasks\n4. **Have test coverage** — you need tests to know nothing broke\n5. **Accept that you'll refactor again** — refactoring is a continuous process, not a one-time event",
      },
      {
        title: "1. Red-Green Refactoring (TDD approach)",
        content: "The most popular refactoring technique in professional software development. Three steps:\n\n- 🔴 **Red** — write a failing test that describes the desired behavior\n- 🟢 **Green** — write the simplest code that makes the test pass\n- ♻️ **Refactor** — clean up the code while keeping tests green\n\nKey rule: **never** add new functionality and refactor at the same time. Do them in separate passes.",
      },
      {
        title: "2. Refactoring by Abstraction",
        content: "Used for large-scale refactoring — mainly to remove **duplication**.\n\n- **Pull-Up** — move common code from subclasses into the parent class (reduces duplication)\n- **Push-Down** — move code from parent into subclasses (when it's only relevant to some)\n- **Encapsulate Field** — make a data member private, provide getters/setters\n- **Replace Conditional with Polymorphism** — use OOP instead of complex if-else chains",
      },
      {
        title: "3. Composing Methods — break up long functions",
        content: "Long functions are the #1 readability killer. The fix: **extract** smaller functions from them.",
        code: `// BEFORE — one long function doing too much
void processOrder() {
    // 20 lines of validation
    // 30 lines of price calculation
    // 15 lines of printing the receipt
    // 10 lines of sending email
}

// AFTER — each sub-task is its own function
void processOrder() {
    validateOrder();
    double total = calculateTotal();
    printReceipt(total);
    sendConfirmationEmail();
}
// Each sub-function is short, focused, and testable`,
      },
      {
        title: "4. Simplifying Conditional Expressions",
        content: "Complex conditions are hard to understand. Simplify them:",
        code: `// BEFORE — confusing nested conditions
if (age >= 18) {
    if (hasLicense) {
        if (!isBanned) {
            allowDriving = true;
        }
    }
}

// AFTER — guard clauses: fail fast
if (age < 18)    return false;  // guard
if (!hasLicense) return false;  // guard
if (isBanned)    return false;  // guard
return true;                    // only if all pass`,
      },
      {
        title: "5. Moving Features Between Objects",
        content: "If a method or field belongs more logically in another class/struct, move it there.\n\n**Signs a function is in the wrong place:**\n- It uses data from another class more than its own\n- Moving it would make the code more readable\n\n**Types of moves:**\n- Move Method — move a function to another class\n- Extract Class — split one class into two (when a class does too much)\n- Inline Class — merge two classes (when one barely does anything)",
      },
      {
        title: "6. Preparatory Refactoring",
        content: "Refactor JUST BEFORE adding a new feature. When you notice the existing code isn't shaped for the change you're about to make, fix the shape first.\n\n> \"I want to drive 100 miles east. Instead of trudging through the woods, I first drive 20 miles north to reach the highway, then 100 miles east at 3× the speed.\"\n> — Jessica Kerr\n\nThis is the most impactful form of refactoring: small upfront cleanup that makes the new feature drop in cleanly.",
      },
      {
        title: "7. User Interface Refactoring",
        content: "Even UI improvements that don't change behavior count as refactoring:\n\n- ✅ Align input fields consistently\n- ✅ Use consistent fonts and button sizes\n- ✅ Improve color contrast for accessibility\n- ✅ Reword error messages in plain language\n- ✅ Indicate expected input format in labels\n- ✅ Remove clutter (buttons that aren't needed)\n\nThese improve usability without adding new features.",
      },
      {
        title: "💡 Tips & Tricks — Refactoring",
        content: "**Tip 1 — Rename first, ask questions later**\nOften the simplest and most impactful refactoring is just renaming: `void f(int a)` → `void calculateTax(int income)`. Clear names make code self-documenting.\n\n**Tip 2 — Replace magic numbers with named constants**\n```cpp\n// Before:\nif (temp > 37.5) alert();\n\n// After:\nconst double FEVER_THRESHOLD = 37.5;\nif (temp > FEVER_THRESHOLD) alert();\n```\n\n**Tip 3 — Follow the Boy Scout Rule**\n\"Always leave the code cleaner than you found it.\" Even fixing one bad variable name every session adds up.\n\n**Tip 4 — Don't refactor and fix bugs at the same time**\nDo them in separate commits. This makes it easy to trace which change introduced a new bug.",
      },
      {
        title: "Final thoughts",
        content: "Think of your codebase like a living space:\n- A messy room is stressful and unproductive\n- A tidy, organized room is peaceful and efficient\n\nSame with code. Clean code:\n- Is easier to read (by you and your team)\n- Is easier to change\n- Has fewer bugs\n- Is a joy to work with\n\nMake refactoring a habit — not a one-time emergency cleanup.",
      },
    ],
    quiz: [
      {
        question: "What does refactoring change?",
        options: ["External behavior", "Internal structure only", "The feature set", "The test results"],
        correct: 1,
        explanation: "Refactoring improves internal structure without changing what the software does externally.",
      },
      {
        question: "The three steps of Red-Green Refactoring are:",
        options: [
          "Plan, Build, Ship",
          "Red (write failing test), Green (make it pass), Refactor (clean up)",
          "Design, Code, Deploy",
          "Write, Review, Merge",
        ],
        correct: 1,
        explanation: "Write a failing test (Red), make it pass (Green), then clean up (Refactor).",
      },
      {
        question: "Which technique moves duplicated code from subclasses into a parent class?",
        options: ["Push-Down", "Pull-Up", "Inline", "Extract Variable"],
        correct: 1,
        explanation: "Pull-Up eliminates duplication by moving shared code into the parent/super class.",
      },
      {
        question: "When should you add new features DURING a refactor?",
        options: ["Anytime", "Only small ones", "Never — refactor and feature work are separate", "Only if tests are green"],
        correct: 2,
        explanation: "Never mix the two activities. Refactor in one step, then add features in the next.",
      },
      {
        question: "Preparatory refactoring happens:",
        options: ["After shipping a feature", "Just before adding a new feature", "Only during code review", "Once a year"],
        correct: 1,
        explanation: "You refactor first to shape the code for the upcoming feature, then add the feature.",
      },
    ],
  },
];


export const getLecture = (id: string) => lectures.find((l) => l.id === id);
