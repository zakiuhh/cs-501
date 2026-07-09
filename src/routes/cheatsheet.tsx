import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { 
  Printer, Copy, Check, FileText, Code, Settings, 
  Layers, RotateCcw, Link2, HardDrive, Cpu, 
  Eye, EyeOff, Sliders, CheckSquare, Square, 
  Info, Layout, Search, Grid, List, 
  SlidersHorizontal, BookOpen, RefreshCw, Download
} from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  head: () => ({
    meta: [
      { title: "C++ Syntax Cheat Sheet - CS501" },
      { name: "description", content: "Printable quick reference guide for C++ syntax, operators, structures, and types." },
    ],
  }),
  component: CheatSheetPage,
});

function CheatSheetPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Customizer state
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "skeleton", "types", "operators", "ifelse", "switch", "loops", 
    "functions", "arrays", "strings", "structs", "pointers", 
    "recursion", "fileio", "vectors", "libraries", "escape"
  ]);
  const [layoutMode, setLayoutMode] = useState<string>("masonry"); // masonry, 1col, 2col, 3col
  const [fontSize, setFontSize] = useState<string>("normal"); // compact, normal, large
  const [spacing, setSpacing] = useState<string>("normal"); // compact, normal, relaxed
  const [printTheme, setPrintTheme] = useState<string>("color"); // color, mono, grayscale
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showFooter, setShowFooter] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [livePreview, setLivePreview] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [singlePagePDF, setSinglePagePDF] = useState<boolean>(false);
  const [pdfHeight, setPdfHeight] = useState<string>("medium"); // short, medium, long, extra-long
  
  const cheatSheetRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const exportToPNG = async () => {
    if (!cheatSheetRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading("Generating high-resolution PNG...");
    
    // Delay slightly to let standard grid layout apply in the DOM (prevents html2canvas columns bugs)
    setTimeout(async () => {
      try {
        const element = cheatSheetRef.current;
        if (!element) {
          toast.dismiss(toastId);
          return;
        }
        
        // Dynamically import html2canvas (essential for client-only hydration in SSR)
        const html2canvasModule = await import("html2canvas");
        const html2canvas = html2canvasModule.default;
        
        const canvas = await html2canvas(element, {
          scale: 2, // retina quality
          backgroundColor: livePreview 
            ? "#ffffff" 
            : (document.documentElement.classList.contains("dark") ? "#181715" : "#faf9f5"),
          logging: false
        });
        
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `cpp-crashed-cheatsheet-${new Date().toISOString().slice(0, 10)}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        toast.success("Cheat Sheet exported as PNG successfully!", { id: toastId });
      } catch (err) {
        console.error("Failed to export PNG:", err);
        toast.error("Failed to generate PNG image. Please try again.", { id: toastId });
      } finally {
        setIsExporting(false);
      }
    }, 200);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const codeSnippets = {
    skeleton: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    ifelse: `if (score >= 90) {
    cout << "A";
} else if (score >= 60) {
    cout << "Pass";
} else {
    cout << "Fail";
}`,
    switch: `switch (op) {
    case '+': cout << a + b; break;
    case '-': cout << a - b; break;
    default:  cout << "Error";
}`,
    loops: `// For loop
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}

// While loop
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}

// Do-while loop
int i = 0;
do {
    cout << i << " ";
    i++;
} while (i < 5);`,
    functions: `// Prototype/Declaration
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}

// Call
int sum = add(5, 3);`,
    arrays: `// 1D Array
int marks[5] = {90, 85, 77, 92, 80};
int first = marks[0];

// 2D Array
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
int val = matrix[0][1]; // 2`,
    strings: `// Char Array (C-string)
char msg[6] = "Hello"; // includes \\0

// std::string (C++)
#include <string>
string name = "Ali";
name += " Ahmed"; // concatenation`,
    structs: `struct Point {
    int x;
    int y;
};

Point p1 = {10, 20};
p1.x = 15; // dot access

Point* ptr = &p1;
ptr->y = 25; // pointer access`,
    pointers: `int num = 10;
int* ptr = &num;   // Pointer (stores address of num)
int& ref = num;    // Reference (alias/nickname for num)

*ptr = 20;         // Dereferencing (changes num to 20)
ref = 30;          // Directly changes num to 30`,
    recursion: `// Recursive function
int factorial(int n) {
    if (n <= 1) {
        return 1; // Base case
    }
    return n * factorial(n - 1); // Recursive call
}`,
    fileio: `#include <fstream>
using namespace std;

// Writing to file
ofstream out("data.txt");
out << "Line 1" << endl;
out.close();

// Reading from file
ifstream in("data.txt");
string line;
if (in.is_open()) {
    while (getline(in, line)) {
        cout << line << endl;
    }
    in.close();
}`,
    vectors: `#include <vector>
using namespace std;

vector<int> vec = {10, 20, 30};
vec.push_back(40); // Adds 40 to the end
int len = vec.size(); // len is 4

// Traversal
for (int x : vec) {
    cout << x << " ";
}`,
    libraries: `#include <cmath>     // pow(x,y), sqrt(x), abs(x), round(x)
#include <iomanip>   // setw(w), setprecision(p), fixed, left
#include <algorithm> // sort(start, end), max(a,b), min(a,b), swap(a,b)

cout << fixed << setprecision(2) << 3.14159; // prints 3.14
sort(arr, arr + 5); // Sorts array of size 5 ascending`
  };

  const allSections = [
    {
      id: "skeleton",
      title: "Program Skeleton",
      category: "General",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.skeleton}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.skeleton, "skeleton")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "skeleton" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "types",
      title: "Data Types",
      category: "General",
      icon: <FileText className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b font-medium ${isMono ? 'border-black text-black' : 'border-hairline text-muted'}`}>
                <th className="py-1.5 pr-2 font-medium">Type</th>
                <th className="py-1.5 px-2 font-medium">Bytes</th>
                <th className="py-1.5 pl-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isMono ? 'divide-black text-black' : 'divide-hairline text-body'}`}>
              <tr>
                <td className="py-2 font-mono font-bold text-ink pr-2">bool</td>
                <td className="py-2 px-2">1</td>
                <td className="py-2 pl-2">true or false (0 or 1)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono font-bold text-ink pr-2">char</td>
                <td className="py-2 px-2">1</td>
                <td className="py-2 pl-2">Single ASCII character ('a')</td>
              </tr>
              <tr>
                <td className="py-2 font-mono font-bold text-ink pr-2">int</td>
                <td className="py-2 px-2">4</td>
                <td className="py-2 pl-2">Integers (-2B to 2B)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono font-bold text-ink pr-2">float</td>
                <td className="py-2 px-2">4</td>
                <td className="py-2 pl-2">Single-precision float (7 decimals)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono font-bold text-ink pr-2">double</td>
                <td className="py-2 px-2">8</td>
                <td className="py-2 pl-2">Double-precision float (15 decimals)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: "operators",
      title: "Operators",
      category: "General",
      icon: <Settings className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="space-y-2.5 w-full">
          {[
            { label: "Arithmetic:", code: "+ - * / %" },
            { label: "Relational:", code: "< <= > >= == !=" },
            { label: "Logical:", code: "&& || !" },
            { label: "Increment:", code: "i++ ++i i-- --i" },
            { label: "Augmented:", code: "+= -= *= /= %=" }
          ].map((op, idx) => (
            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 ${idx !== 4 ? (isMono ? 'border-b border-black' : 'border-b border-hairline/30') : ''}`}>
              <span className={`font-semibold ${isMono ? 'text-black' : 'text-ink'} text-[12px]`}>{op.label}</span>
              <code className={`px-1.5 py-0.5 rounded font-mono text-[11px] self-start sm:self-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-soft text-ink'}`}>{op.code}</code>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "ifelse",
      title: "If / Else If / Else",
      category: "Control Flow",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.ifelse}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.ifelse, "ifelse")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "ifelse" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "switch",
      title: "Switch Statement",
      category: "Control Flow",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.switch}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.switch, "switch")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "switch" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "loops",
      title: "Loops",
      category: "Control Flow",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.loops}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.loops, "loops")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "loops" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "functions",
      title: "Functions",
      category: "Functions & Scope",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.functions}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.functions, "functions")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "functions" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "arrays",
      title: "Arrays",
      category: "Data Structures",
      icon: <Layers className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.arrays}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.arrays, "arrays")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "arrays" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "strings",
      title: "Strings",
      category: "Data Structures",
      icon: <FileText className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.strings}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.strings, "strings")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "strings" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "structs",
      title: "Structures (struct)",
      category: "Data Structures",
      icon: <Code className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.structs}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.structs, "structs")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "structs" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "pointers",
      title: "Pointers & References",
      category: "Memory & Scope",
      icon: <Link2 className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.pointers}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.pointers, "pointers")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "pointers" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "recursion",
      title: "Recursion",
      category: "Algorithms",
      icon: <RotateCcw className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.recursion}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.recursion, "recursion")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "recursion" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "fileio",
      title: "File I/O (<fstream>)",
      category: "Utilities",
      icon: <HardDrive className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.fileio}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.fileio, "fileio")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "fileio" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "vectors",
      title: "Vectors (std::vector)",
      category: "Data Structures",
      icon: <Layers className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.vectors}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.vectors, "vectors")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "vectors" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "libraries",
      title: "Formatting & Libs",
      category: "Utilities",
      icon: <Cpu className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="relative font-mono">
          <pre className={`whitespace-pre rounded-lg overflow-x-auto ${isMono ? 'bg-white border border-black text-black' : 'bg-surface-dark text-on-dark'} ${codeTextClass}`}>
            {codeSnippets.libraries}
          </pre>
          <button
            onClick={() => copyToClipboard(codeSnippets.libraries, "libraries")}
            className="absolute top-2 right-2 p-1.5 bg-surface-dark-elevated/40 hover:bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark rounded transition-colors cursor-pointer print:hidden"
            title="Copy snippet"
          >
            {copiedId === "libraries" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      id: "escape",
      title: "Escape Sequences",
      category: "General",
      icon: <FileText className="w-4 h-4 text-primary" />,
      render: (isMono: boolean) => (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b font-medium ${isMono ? 'border-black text-black' : 'border-hairline text-muted'}`}>
                <th className="py-1.5 pr-2 font-medium">Seq</th>
                <th className="py-1.5 pl-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isMono ? 'divide-black text-black' : 'divide-hairline text-body'}`}>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\n</td>
                <td className="py-1.5 pl-2">Newline (line break)</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\t</td>
                <td className="py-1.5 pl-2">Tab (indentation spacing)</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\\</td>
                <td className="py-1.5 pl-2">Backslash character</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\'</td>
                <td className="py-1.5 pl-2">Single quote character</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\"</td>
                <td className="py-1.5 pl-2">Double quote character</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono font-bold text-ink pr-2">\0</td>
                <td className="py-1.5 pl-2">Null character (ends C-strings)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  ];

  // Formatting Class builders
  const cardPaddingClass = 
    spacing === "compact" ? "p-3.5" : 
    spacing === "relaxed" ? "p-6" : 
    "p-5";

  const bodyTextClass = 
    fontSize === "compact" ? "text-[11px]" : 
    fontSize === "large" ? "text-[15px]" : 
    "text-[13px]";

  const titleTextClass = 
    fontSize === "compact" ? "text-[14px] mb-2 pb-1.5" : 
    fontSize === "large" ? "text-[18px] mb-4 pb-3" : 
    "text-[16px] mb-3 pb-2.5";

  const codeTextClass = 
    fontSize === "compact" ? "text-[10px] p-2.5" : 
    fontSize === "large" ? "text-[14px] p-4.5" : 
    "text-[12px] p-3.5";

  // Dynamic Layout container class
  const getGridClass = () => {
    if (isExporting) {
      // Avoid CSS columns layout bugs in html2canvas by temporarily rendering as a standard CSS grid
      if (layoutMode === "1col") return "grid grid-cols-1 gap-6 w-full";
      if (layoutMode === "3col") return "grid grid-cols-3 gap-6 w-full";
      return "grid grid-cols-2 gap-6 w-full";
    }
    if (layoutMode === "1col") return "grid grid-cols-1 gap-6 w-full";
    if (layoutMode === "2col") return "grid grid-cols-1 md:grid-cols-2 gap-6 w-full print:grid-cols-2";
    if (layoutMode === "3col") return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full print:grid-cols-3";
    // masonry columns layout
    return "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full print:columns-2 print:gap-4 print:space-y-4";
  };

  const isPreviewMode = livePreview || isExporting;

  const getContainerStyles = () => {
    if (isPreviewMode) {
      const themeColors = 
        printTheme === "mono" 
          ? "bg-white text-black border-2 border-black p-8 rounded-xl shadow-xl max-w-[1000px] mx-auto" 
          : printTheme === "grayscale"
            ? "bg-white text-gray-900 border border-gray-300 p-8 rounded-xl shadow-lg max-w-[1000px] mx-auto"
            : "bg-canvas text-ink border border-hairline p-8 rounded-xl shadow-md max-w-[1000px] mx-auto";
      return `${themeColors} transition-all duration-300`;
    }
    return "transition-all duration-300";
  };

  const getCardStyles = () => {
    if (isPreviewMode) {
      if (printTheme === "mono") return "bg-white border-2 border-black text-black";
      if (printTheme === "grayscale") return "bg-white border border-gray-300 text-gray-800";
      return "bg-surface-card border border-hairline text-ink";
    }
    return "bg-surface-card border border-hairline text-ink";
  };

  const isMonoActive = isPreviewMode && printTheme === "mono";
  const isGrayActive = isPreviewMode && printTheme === "grayscale";

  // Filters
  const filteredSections = allSections.filter(section => {
    // 1. Filter by category tab
    if (activeCategoryFilter !== "all" && section.category.toLowerCase().replace(" & ", "-").replace(" ", "-") !== activeCategoryFilter) {
      return false;
    }
    // 2. Filter by checkbox selected
    if (!selectedSections.includes(section.id)) {
      return false;
    }
    // 3. Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const titleMatches = section.title.toLowerCase().includes(query);
      const categoryMatches = section.category.toLowerCase().includes(query);
      return titleMatches || categoryMatches;
    }
    return true;
  });

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "general", label: "General" },
    { id: "control-flow", label: "Control Flow" },
    { id: "functions-scope", label: "Functions" },
    { id: "data-structures", label: "Data Structures" },
    { id: "memory-scope", label: "Memory" },
    { id: "utilities", label: "Utilities & Libs" }
  ];

  // Preset Selection handlers
  const selectPreset = (type: string) => {
    if (type === "all") {
      setSelectedSections(allSections.map(s => s.id));
    } else if (type === "none") {
      setSelectedSections([]);
    } else if (type === "essential") {
      setSelectedSections(["skeleton", "types", "operators", "ifelse", "loops", "functions"]);
    } else if (type === "advanced") {
      setSelectedSections(["pointers", "recursion", "fileio", "vectors", "structs"]);
    } else if (type === "datastruct") {
      setSelectedSections(["arrays", "strings", "structs", "vectors"]);
    }
  };

  const toggleSection = (id: string) => {
    if (selectedSections.includes(id)) {
      setSelectedSections(selectedSections.filter(sid => sid !== id));
    } else {
      setSelectedSections([...selectedSections, id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas print:bg-white print:text-black">
      {/* Dynamic Style Injection for PDF Printing overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          
          ${singlePagePDF ? `
            @page {
              size: 210mm ${
                pdfHeight === "short" ? "850mm" : 
                pdfHeight === "medium" ? "1300mm" : 
                pdfHeight === "long" ? "1750mm" : 
                pdfHeight === "extra-long" ? "2400mm" : 
                "1300mm"
              } !important;
              margin: 12mm 15mm !important;
            }
            
            /* Disable internal breaks to keep cards single-spaced and continuous */
            .break-inside-avoid {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          ` : ''}
          
          .min-h-screen {
            min-height: auto !important;
            background: white !important;
          }

          /* Hide UI wrappers */
          nav, footer, .print\\:hidden, button {
            display: none !important;
          }
          
          /* Custom overrides for printing elements */
          ${!showHeader ? '.print-header { display: none !important; }' : ''}
          ${!showFooter ? '.print-footer { display: none !important; }' : ''}
          ${!showDescription ? '.print-description { display: none !important; }' : ''}
          
          .print-card-padding {
            padding: ${
              spacing === "compact" ? "10px !important" : 
              spacing === "relaxed" ? "24px !important" : 
              "16px !important"
            };
          }
          
          .print-card-font-size {
            font-size: ${
              fontSize === "compact" ? "11px !important" : 
              fontSize === "large" ? "15px !important" : 
              "13px !important"
            };
          }
          
          .print-title-font-size {
            font-size: ${
              fontSize === "compact" ? "13px !important" : 
              fontSize === "large" ? "18px !important" : 
              "15px !important"
            };
            margin-bottom: ${fontSize === "compact" ? "6px !important" : "12px !important"};
            padding-bottom: ${fontSize === "compact" ? "4px !important" : "8px !important"};
          }
          
          pre, code {
            font-size: ${
              fontSize === "compact" ? "10px !important" : 
              fontSize === "large" ? "13px !important" : 
              "11px !important"
            } ;
            line-height: 1.25 !important;
            white-space: pre-wrap !important;
            word-break: break-all !important;
            overflow-x: visible !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          pre::-webkit-scrollbar, code::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          /* Print theme styling rules */
          ${printTheme === "mono" ? `
            * {
              color: #000000 !important;
              border-color: #000000 !important;
              box-shadow: none !important;
              text-shadow: none !important;
            }
            .bg-surface-card {
              background: #ffffff !important;
              border: 1.5px solid #000000 !important;
              border-radius: 6px !important;
            }
            pre, code, .bg-surface-dark, .bg-surface-soft, .bg-surface-dark-elevated {
              background: #ffffff !important;
              color: #000000 !important;
              border: 1px solid #000000 !important;
              border-radius: 4px !important;
            }
            table, th, td {
              border-color: #000000 !important;
              color: #000000 !important;
            }
            h1, h2, h3, h4, th, td, strong, span, p {
              color: #000000 !important;
            }
            svg {
              stroke: #000000 !important;
              fill: none !important;
            }
          ` : ''}

          ${printTheme === "grayscale" ? `
            * {
              border-color: #d1d5db !important;
              box-shadow: none !important;
            }
            body {
              color: #1f2937 !important;
            }
            .bg-surface-card {
              background: #ffffff !important;
              border: 1px solid #9ca3af !important;
              border-radius: 6px !important;
            }
            pre, code, .bg-surface-dark, .bg-surface-soft, .bg-surface-dark-elevated {
              background: #f3f4f6 !important;
              color: #111827 !important;
              border: 1px solid #d1d5db !important;
              border-radius: 4px !important;
            }
            table, th, td {
              border-color: #d1d5db !important;
              color: #1f2937 !important;
            }
            h1, h2, h3, h4, th, td, strong, span, p {
              color: #111827 !important;
            }
            svg {
              stroke: #4b5563 !important;
            }
          ` : ''}

          ${printTheme === "color" ? `
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              background: var(--canvas) !important;
              color: var(--ink) !important;
            }
            .bg-canvas {
              background-color: var(--canvas) !important;
            }
            .bg-surface-card {
              background-color: var(--surface-card) !important;
              border-color: var(--hairline) !important;
            }
            .bg-surface-soft {
              background-color: var(--surface-soft) !important;
            }
            pre, code, .bg-surface-dark {
              background-color: var(--surface-dark) !important;
              color: var(--on-dark) !important;
            }
            .text-primary {
              color: var(--primary) !important;
            }
            .text-ink {
              color: var(--ink) !important;
            }
            .text-body {
              color: var(--body) !important;
            }
            .text-muted {
              color: var(--muted) !important;
            }
          ` : ''}
        }
        
        /* Screen preview and export styles to prevent scrollbars and overflow cutoffs */
        ${isPreviewMode ? `
          pre, code {
            white-space: pre-wrap !important;
            word-break: break-all !important;
            overflow-x: visible !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          pre::-webkit-scrollbar, code::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
        ` : ''}
      ` }} />

      <div className="print:hidden">
        <Nav />
      </div>

      <section className="max-w-[1200px] mx-auto px-6 py-10 w-full flex-1">
        
        {/* Header section */}
        <div className="print-header flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-hairline pb-6 print:border-b-2 print:border-black">
          <div>
            <p className={`text-primary font-medium text-[12px] tracking-[0.15em] uppercase mb-2 print:hidden`}>CS501 · Reference Guide</p>
            <h1 className={`font-serif text-4xl md:text-5xl ${isMonoActive ? 'text-black' : isGrayActive ? 'text-gray-900' : 'text-ink'} print:text-3xl`}>
              C++ Quick Syntax Cheat Sheet
            </h1>
            {showDescription && (
              <p className={`mt-2 max-w-2xl text-[14px] leading-relaxed print-description ${isMonoActive ? 'text-black' : isGrayActive ? 'text-gray-600' : 'text-body'}`}>
                A fully customizable, printer-friendly reference covering types, loops, arrays, structures, pointers, file handling, and vectors.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={() => {
                setLivePreview(!livePreview);
              }}
              className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-[13px] font-medium transition-all cursor-pointer shadow-sm ${
                livePreview 
                  ? "bg-primary text-white border-primary" 
                  : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
              }`}
            >
              {livePreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{livePreview ? "Exit Live Print View" : "Live Print View"}</span>
            </button>
            <button
              onClick={exportToPNG}
              disabled={isExporting}
              className="flex items-center gap-2 border border-hairline bg-surface-card hover:bg-surface-cream-strong text-ink rounded-lg px-4 py-2 text-[13px] font-medium transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Download className="w-4 h-4 text-primary" />
              )}
              <span>{isExporting ? "Generating PNG..." : "Export as PNG"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border border-primary bg-primary hover:bg-primary-active text-white rounded-lg px-5 py-2.5 text-[14px] font-medium transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Customizer Panel Controls (Collapsible & Screen-Only) */}
        <div className="print:hidden mb-8 border border-hairline rounded-xl bg-surface-soft/60 overflow-hidden shadow-sm">
          <button 
            onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-surface-card hover:bg-surface-cream-strong transition-colors border-b border-hairline text-ink font-serif text-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4.5 h-4.5 text-primary" />
              <span>Cheat Sheet & PDF Layout Customizer</span>
              <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-surface-soft border border-hairline text-muted">
                {selectedSections.length} of {allSections.length} sections active
              </span>
            </div>
            <span className="text-xs font-sans text-muted hover:text-ink">
              {isCustomizerOpen ? "[ Collapse ]" : "[ Expand Customizer ]"}
            </span>
          </button>

          {isCustomizerOpen && (
            <div className="p-6 space-y-6 bg-surface-card/30">
              
              {/* Grid configuration options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* 1. Columns layout */}
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5 text-primary" />
                    <span>Print Columns</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "masonry", label: "Masonry", icon: <Sliders className="w-3.5 h-3.5" /> },
                      { id: "1col", label: "1 Col", icon: <List className="w-3.5 h-3.5" /> },
                      { id: "2col", label: "2 Cols", icon: <Grid className="w-3.5 h-3.5" /> },
                      { id: "3col", label: "3 Cols", icon: <Grid className="w-3.5 h-3.5" /> }
                    ].map(lay => (
                      <button
                        key={lay.id}
                        onClick={() => setLayoutMode(lay.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all cursor-pointer ${
                          layoutMode === lay.id 
                            ? "bg-primary text-white border-primary" 
                            : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                        }`}
                      >
                        {lay.icon}
                        <span>{lay.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Text Sizes */}
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>Font Size</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "compact", label: "Compact" },
                      { id: "normal", label: "Normal" },
                      { id: "large", label: "Large" }
                    ].map(size => (
                      <button
                        key={size.id}
                        onClick={() => setFontSize(size.id)}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all cursor-pointer ${
                          fontSize === size.id 
                            ? "bg-primary text-white border-primary" 
                            : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                        }`}
                      >
                        <span>{size.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Spacing / Padding */}
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>Card Padding</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "compact", label: "Compact" },
                      { id: "normal", label: "Normal" },
                      { id: "relaxed", label: "Relaxed" }
                    ].map(sp => (
                      <button
                        key={sp.id}
                        onClick={() => setSpacing(sp.id)}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all cursor-pointer ${
                          spacing === sp.id 
                            ? "bg-primary text-white border-primary" 
                            : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                        }`}
                      >
                        <span>{sp.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Print Color Schemes */}
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Printer className="w-3.5 h-3.5 text-primary" />
                    <span>Print PDF Style</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "color", label: "Color Accent" },
                      { id: "mono", label: "B&W Ink-Saver" },
                      { id: "grayscale", label: "Grayscale" }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setPrintTheme(style.id)}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all cursor-pointer ${
                          printTheme === style.id 
                            ? "bg-primary text-white border-primary" 
                            : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                        }`}
                      >
                        <span>{style.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Continuous PDF Page */}
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>Single Page PDF</span>
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setSinglePagePDF(!singlePagePDF)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all cursor-pointer ${
                        singlePagePDF 
                          ? "bg-primary text-white border-primary" 
                          : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                      }`}
                    >
                      <span>{singlePagePDF ? "ON (Continuous)" : "OFF (Split)"}</span>
                    </button>
                    {singlePagePDF && (
                      <select
                        value={pdfHeight}
                        onChange={(e) => setPdfHeight(e.target.value)}
                        className="px-2 py-1 bg-surface-card border border-hairline text-ink text-[11px] rounded focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        <option value="short">Short (850mm)</option>
                        <option value="medium">Medium (1300mm)</option>
                        <option value="long">Long (1750mm)</option>
                        <option value="extra-long">Extra Long (2400mm)</option>
                      </select>
                    )}
                  </div>
                </div>

              </div>

              {/* Toggles for layout page sections visibility */}
              <div className="pt-4 border-t border-hairline grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowHeader(!showHeader)}
                    className="cursor-pointer"
                  >
                    {showHeader ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4 text-muted" />}
                  </button>
                  <span className="text-[12px] text-ink">Include Title & Header in print</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowFooter(!showFooter)}
                    className="cursor-pointer"
                  >
                    {showFooter ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4 text-muted" />}
                  </button>
                  <span className="text-[12px] text-ink">Include Footer credit in print</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowDescription(!showDescription)}
                    className="cursor-pointer"
                  >
                    {showDescription ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4 text-muted" />}
                  </button>
                  <span className="text-[12px] text-ink">Include descriptions in print</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setLivePreview(!livePreview)}
                    className="cursor-pointer"
                  >
                    {livePreview ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4 text-muted" />}
                  </button>
                  <span className="text-[12px] text-ink font-semibold">Enable Live Print Preview mode</span>
                </div>
              </div>

              {/* Section Selectors */}
              <div className="pt-4 border-t border-hairline space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>Include/Exclude Reference Cards ({selectedSections.length} selected)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => selectPreset("all")} className="px-2 py-1 rounded bg-surface-soft border border-hairline hover:bg-surface-cream-strong text-[11px] text-ink cursor-pointer font-medium">Select All</button>
                    <button onClick={() => selectPreset("essential")} className="px-2 py-1 rounded bg-surface-soft border border-hairline hover:bg-surface-cream-strong text-[11px] text-ink cursor-pointer font-medium">Essentials Only</button>
                    <button onClick={() => selectPreset("datastruct")} className="px-2 py-1 rounded bg-surface-soft border border-hairline hover:bg-surface-cream-strong text-[11px] text-ink cursor-pointer font-medium">Data Structures</button>
                    <button onClick={() => selectPreset("advanced")} className="px-2 py-1 rounded bg-surface-soft border border-hairline hover:bg-surface-cream-strong text-[11px] text-ink cursor-pointer font-medium">Advanced C++</button>
                    <button onClick={() => selectPreset("none")} className="px-2 py-1 rounded bg-surface-soft border border-hairline hover:bg-surface-cream-strong text-[11px] text-ink cursor-pointer font-medium">Clear All</button>
                  </div>
                </div>

                {/* Section selection checkboxes grouped by category */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-2 border border-hairline/55 bg-surface-soft/40 p-4 rounded-lg">
                  {allSections.map(sec => {
                    const isSelected = selectedSections.includes(sec.id);
                    return (
                      <button
                        key={sec.id}
                        onClick={() => toggleSection(sec.id)}
                        className="flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity self-start"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-muted shrink-0" />
                        )}
                        <span className={`text-[12px] truncate ${isSelected ? "text-ink font-semibold" : "text-muted"}`}>{sec.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PDF Print Tips Alert */}
              <div className="flex gap-2.5 p-3.5 bg-accent-amber/10 border border-accent-amber/20 rounded-lg text-ink text-[12px] leading-relaxed">
                <Info className="w-4 h-4 text-accent-amber shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-accent-amber">Tips for exporting clean PDFs:</strong> When the print dialog opens, set the layout (portrait/landscape) to match your column layout. Expand <strong>More Settings</strong>, set <strong>Margins to Minimum or None</strong>, and ensure <strong>Background graphics</strong> is checked so card colors and background tables load properly!
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Section Search and Category Filter bar (Screen-only) */}
        <div className="print:hidden mb-6 flex flex-col sm:flex-row gap-4 items-stretch justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search concepts or syntax (e.g. loops, vectors, pointers)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-hairline rounded-lg bg-surface-card hover:bg-surface-cream-strong/40 focus:bg-white text-[13px] text-ink focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap font-medium border transition-all cursor-pointer ${
                  activeCategoryFilter === cat.id 
                    ? "bg-primary text-white border-primary" 
                    : "bg-surface-card border-hairline text-ink hover:bg-surface-cream-strong"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active layout parameters status pill (Screen-only) */}
        <div className="print:hidden mb-6 flex items-center justify-between text-xs text-muted">
          <div>
            Showing <span className="font-semibold text-ink">{filteredSections.length}</span> of <span className="font-semibold text-ink">{selectedSections.length}</span> active cards 
            {activeCategoryFilter !== "all" && <span> in <span className="text-primary font-semibold">{categories.find(c => c.id === activeCategoryFilter)?.label}</span></span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-surface-card border border-hairline uppercase text-[10px]">Font: {fontSize}</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-card border border-hairline uppercase text-[10px]">Padding: {spacing}</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-card border border-hairline uppercase text-[10px]">Layout: {layoutMode}</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-card border border-hairline uppercase text-[10px]">Print Style: {printTheme}</span>
          </div>
        </div>

        {/* Outer container rendering style for live preview */}
        <div ref={cheatSheetRef} className={getContainerStyles()}>
          
          {/* Main Grid / Columns */}
          {filteredSections.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-hairline rounded-xl">
              <FileText className="w-10 h-10 text-muted mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-xl text-ink">No Cards Selected or Found</h3>
              <p className="text-body text-xs mt-1 max-w-sm mx-auto">
                Try selecting more options in the customizer above or clearing your search term.
              </p>
              <button 
                onClick={() => { selectPreset("all"); setSearchQuery(""); setActiveCategoryFilter("all"); }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters & Show All</span>
              </button>
            </div>
          ) : (
            <div className={`${getGridClass()} print-code-font-size print-card-font-size`}>
              {filteredSections.map(section => (
                <div 
                  key={section.id} 
                  className={`${getCardStyles()} rounded-xl shadow-sm print-card-padding ${cardPaddingClass} break-inside-avoid flex flex-col`}
                >
                  <h3 className={`font-serif ${titleTextClass} print-title-font-size flex items-center gap-2 border-b pb-2 ${
                    isMonoActive 
                      ? 'border-black text-black' 
                      : isGrayActive
                        ? 'border-gray-200 text-gray-900'
                        : 'border-hairline text-ink'
                  }`}>
                    {section.icon}
                    <span>{section.title}</span>
                    <span className="ml-auto text-[10px] uppercase font-sans tracking-wide text-muted font-normal print:hidden">
                      {section.category}
                    </span>
                  </h3>
                  
                  {/* Content body wrapper */}
                  <div className={`flex-1 flex flex-col ${bodyTextClass}`}>
                    {section.render(isMonoActive)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Printable footer credit (shows on screen only if enabled, always hidden if toggle says so) */}
          {showFooter && (
            <div className="print-footer hidden print:flex justify-between items-center mt-12 pt-4 border-t-2 border-black/80 text-[10px] text-gray-500">
              <div>CS501 · C++ Programming Fundamentals Quick Reference Guide</div>
              <div>Generated with C++ Crashed Learning Platform</div>
            </div>
          )}

        </div>

      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
