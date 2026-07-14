export type Difficulty = "easy" | "medium" | "hard";

export type PracticeProblem = {
  id: string;
  moduleId: string; // matches Module.id in modules.ts
  title: string;
  difficulty: Difficulty;
  prompt: string;
  hint: string;
  starter: string;
  solution: string;
};

export const practiceProblems: PracticeProblem[] = [
  // ── Foundations ──────────────────────────────────────
  {
    id: "hello-name",
    moduleId: "foundations",
    title: "Print your name",
    difficulty: "easy",
    prompt: "Write a program that declares a string variable with your name and prints \"Hello, <name>!\" to the console.",
    hint: "Use #include <string> and cout << with the string variable.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = \"Asmara\";\n    cout << \"Hello, \" << name << \"!\" << endl;\n    return 0;\n}",
  },
  {
    id: "flowchart-largest-of-two",
    moduleId: "foundations",
    title: "Largest of two numbers (algorithm)",
    difficulty: "easy",
    prompt: "Write pseudocode (step-by-step algorithm) to find the largest of two numbers entered by the user, then implement it in C++.",
    hint: "Compare a and b with an if/else and print whichever is bigger.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    if (a > b) cout << a << \" is largest\";\n    else cout << b << \" is largest\";\n    return 0;\n}",
  },

  // ── Operators & Control Flow ─────────────────────────
  {
    id: "even-odd",
    moduleId: "operators-control",
    title: "Even or odd",
    difficulty: "easy",
    prompt: "Take an integer input and print whether it is even or odd using the modulus operator.",
    hint: "n % 2 == 0 means even.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) cout << \"Even\";\n    else cout << \"Odd\";\n    return 0;\n}",
  },
  {
    id: "grade-calculator",
    moduleId: "operators-control",
    title: "Grade calculator (switch-case)",
    difficulty: "medium",
    prompt: "Given marks (0-100), print a letter grade: A (>=90), B (>=80), C (>=70), D (>=60), F (below 60). Use if/else if.",
    hint: "Chain else-if from highest to lowest threshold.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int marks;\n    cin >> marks;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int marks;\n    cin >> marks;\n    char grade;\n    if (marks >= 90) grade = 'A';\n    else if (marks >= 80) grade = 'B';\n    else if (marks >= 70) grade = 'C';\n    else if (marks >= 60) grade = 'D';\n    else grade = 'F';\n    cout << \"Grade: \" << grade;\n    return 0;\n}",
  },

  // ── Loops ─────────────────────────────────────────────
  {
    id: "sum-1-to-n",
    moduleId: "loops",
    title: "Sum of 1 to N",
    difficulty: "easy",
    prompt: "Take an integer N and print the sum of all numbers from 1 to N using a for loop.",
    hint: "Initialize sum = 0, loop i from 1 to N, add i each time.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0;\n    for (int i = 1; i <= n; i++) sum += i;\n    cout << \"Sum = \" << sum;\n    return 0;\n}",
  },
  {
    id: "multiplication-table",
    moduleId: "loops",
    title: "Multiplication table",
    difficulty: "easy",
    prompt: "Print the multiplication table (1 to 10) for a number entered by the user using a while loop.",
    hint: "i starts at 1, loop while i <= 10, print n * i, increment i.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int i = 1;\n    while (i <= 10) {\n        cout << n << \" x \" << i << \" = \" << n * i << endl;\n        i++;\n    }\n    return 0;\n}",
  },
  {
    id: "prime-checker",
    moduleId: "loops",
    title: "Prime number checker",
    difficulty: "medium",
    prompt: "Write a program that checks whether a given number is prime, using a for loop and break.",
    hint: "A number is prime if nothing from 2 to n-1 divides it evenly.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    bool isPrime = n > 1;\n    for (int i = 2; i < n; i++) {\n        if (n % i == 0) { isPrime = false; break; }\n    }\n    cout << (isPrime ? \"Prime\" : \"Not Prime\");\n    return 0;\n}",
  },

  // ── Arrays ────────────────────────────────────────────
  {
    id: "array-max",
    moduleId: "arrays",
    title: "Find the largest element",
    difficulty: "easy",
    prompt: "Given an array of 5 integers, find and print the largest element.",
    hint: "Assume arr[0] is the max, then loop and update if you find something bigger.",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {12, 45, 3, 89, 27};\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {12, 45, 3, 89, 27};\n    int maxVal = arr[0];\n    for (int i = 1; i < 5; i++) {\n        if (arr[i] > maxVal) maxVal = arr[i];\n    }\n    cout << \"Largest: \" << maxVal;\n    return 0;\n}",
  },
  {
    id: "bubble-sort",
    moduleId: "arrays",
    title: "Bubble sort implementation",
    difficulty: "medium",
    prompt: "Implement bubble sort to sort an array of integers in ascending order, then print the sorted array.",
    hint: "Two nested loops; swap adjacent elements if arr[j] > arr[j+1].",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[6] = {5, 2, 9, 1, 5, 6};\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[6] = {5, 2, 9, 1, 5, 6};\n    int n = 6;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n    return 0;\n}",
  },

  // ── Functions ─────────────────────────────────────────
  {
    id: "function-factorial",
    moduleId: "functions",
    title: "Factorial function",
    difficulty: "easy",
    prompt: "Write a function `int factorial(int n)` that returns n! and call it from main for a user-entered number.",
    hint: "Use a loop inside the function, multiply result from 1 to n.",
    starter: "#include <iostream>\nusing namespace std;\n\n// declare your function here\n\nint main() {\n    int n;\n    cin >> n;\n    // call your function and print result\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) result *= i;\n    return result;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n << \"! = \" << factorial(n);\n    return 0;\n}",
  },
  {
    id: "swap-by-reference",
    moduleId: "functions",
    title: "Swap two numbers (pass by reference)",
    difficulty: "medium",
    prompt: "Write a function `void swapNums(int &a, int &b)` that swaps two numbers using pass by reference, and demonstrate it in main.",
    hint: "Reference parameters let the function modify the caller's original variables.",
    starter: "#include <iostream>\nusing namespace std;\n\n// declare your function here\n\nint main() {\n    int x = 5, y = 10;\n    // call your function here\n    cout << x << \" \" << y;\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nvoid swapNums(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swapNums(x, y);\n    cout << x << \" \" << y;\n    return 0;\n}",
  },

  // ── Recursion & Strings ──────────────────────────────
  {
    id: "recursive-fibonacci",
    moduleId: "recursion-strings",
    title: "Fibonacci with recursion",
    difficulty: "medium",
    prompt: "Write a recursive function `int fib(int n)` that returns the nth Fibonacci number.",
    hint: "Base cases: fib(0) = 0, fib(1) = 1. Otherwise fib(n) = fib(n-1) + fib(n-2).",
    starter: "#include <iostream>\nusing namespace std;\n\n// declare your function here\n\nint main() {\n    int n;\n    cin >> n;\n    // call your function and print result\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n);\n    return 0;\n}",
  },
  {
    id: "palindrome-string",
    moduleId: "recursion-strings",
    title: "Check if a string is a palindrome",
    difficulty: "medium",
    prompt: "Write a program that checks whether a given string reads the same forwards and backwards.",
    hint: "Compare characters from both ends moving toward the middle.",
    starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    bool isPalin = true;\n    int n = s.length();\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) { isPalin = false; break; }\n    }\n    cout << (isPalin ? \"Palindrome\" : \"Not a Palindrome\");\n    return 0;\n}",
  },

  // ── Structures & Files ───────────────────────────────
  {
    id: "student-struct",
    moduleId: "structures-files",
    title: "Student record with struct",
    difficulty: "medium",
    prompt: "Define a `struct Student` with name, roll number, and marks. Create one student, fill in the values, and print them.",
    hint: "Access members using the dot operator: student.name, student.marks, etc.",
    starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// define your struct here\n\nint main() {\n    // create and print a student\n    return 0;\n}",
    solution: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int roll;\n    float marks;\n};\n\nint main() {\n    Student s1 = {\"Ali\", 12, 87.5};\n    cout << s1.name << \" \" << s1.roll << \" \" << s1.marks;\n    return 0;\n}",
  },
  {
    id: "write-read-file",
    moduleId: "structures-files",
    title: "Write and read a text file",
    difficulty: "hard",
    prompt: "Write a program that writes \"Hello File\" into a file called data.txt, then reads and prints it back.",
    hint: "Use ofstream to write, ifstream to read, both from <fstream>.",
    starter: "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}",
    solution: "#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    ofstream outFile(\"data.txt\");\n    outFile << \"Hello File\";\n    outFile.close();\n\n    ifstream inFile(\"data.txt\");\n    string line;\n    getline(inFile, line);\n    cout << line;\n    inFile.close();\n    return 0;\n}",
  },

  // ── Code Quality ──────────────────────────────────────
  {
    id: "refactor-messy-loop",
    moduleId: "refactoring",
    title: "Refactor a messy sum function",
    difficulty: "easy",
    prompt: "Refactor this poorly-named, hard-to-read function to use clear variable names and consistent formatting, while keeping the same behavior (sums even numbers from 1 to n):\n\nint f(int x){int s=0;for(int i=1;i<=x;i++){if(i%2==0){s=s+i;}}return s;}",
    hint: "Rename variables to something meaningful (n, sum, i is fine), add spacing and line breaks.",
    starter: "#include <iostream>\nusing namespace std;\n\nint f(int x){int s=0;for(int i=1;i<=x;i++){if(i%2==0){s=s+i;}}return s;}\n\nint main() {\n    cout << f(10);\n    return 0;\n}",
    solution: "#include <iostream>\nusing namespace std;\n\nint sumOfEvens(int n) {\n    int sum = 0;\n    for (int i = 1; i <= n; i++) {\n        if (i % 2 == 0) {\n            sum += i;\n        }\n    }\n    return sum;\n}\n\nint main() {\n    cout << sumOfEvens(10);\n    return 0;\n}",
  },
];

export function getProblemsByModule(moduleId: string) {
  return practiceProblems.filter((p) => p.moduleId === moduleId);
}
