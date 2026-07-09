# C++ Crashed - CS501 Interactive Course Platform

> The full CS501 Programming Fundamentals syllabus, rebuilt as an interactive experience.
> Read slides, run code, take quizzes - all in one focused, browser-based place.

---

## What is this?

**C++ Crashed** is a self-contained, interactive learning platform built for the CS501 Programming Fundamentals course. Instead of a static PDF or a set of lecture slides you passively scroll through, every lecture is structured as three connected experiences - a slide deck you step through one idea at a time, a live code playground showing real C++ output, and a short quiz that checks if the concept actually landed.

The whole thing runs in the browser. No account needed, progress is stored locally on your device using `localStorage`, and certificates are dynamically registered and verified against a secure Supabase database.

---

## Pages

### `/` - Home
The landing page. Introduces the platform with a hero section, animated headline, and a live code preview snippet. Lays out the core features (slides, playground, quiz, progress tracking) and includes a certificate showcase. Also links to Zenith C++ as a companion IDE.

### `/lectures` - Lecture Index
Lists every lecture in the course as a browsable card grid. Shows the lecture number, title, summary, and completed indicators. Displays total progress and per-module completion trackers.

### `/lecture/:id` - Individual Lecture
The main learning interface containing three tabs:
- **Slides** - step through the lecture using arrow keys or buttons. Supports fullscreen (`F`).
- **Playground** - editable code block with pre-loaded lecture examples and simulated compiler output.
- **Quiz** - multiple-choice quiz with color-coded review screens, explanations, and scores.

### `/playground` - Standalone Playground
A dedicated page compiling all playgrounds in one place with a selection sidebar on the left.

### `/syllabus` - Course Outline
Syllabus summary detailing lecture titles, numbering, module headers, and estimated durations.

### `/verify` - Certificate Lookup
A manual credential verification search engine where employers or peers can type a Verification ID (e.g. `CS501-XXXX-XXXX-XXXX`) to fetch and authenticate student credentials.

### `/verify/:id` - Verified Credential Page
A public, dynamic route that queries the Supabase database. If the ID is valid, it retrieves credential metadata (student name, issue date, curriculum stats) and renders a live, high-resolution certificate canvas mockup. If invalid, displays a clean error status.

### `/about` - About
Design philosophy, technical summaries, and background of the project.

---

## Course Content

The course is divided into **8 modules** covering the full CS501 syllabus:

| # | Module | Topics Covered |
|---|---|---|
| 1 | **Foundations** | Algorithms, flowcharts, language processors, data types & basic operators |
| 2 | **Operators & Control Flow** | Arithmetic/logical/relational operations, if/else decisions, switch-case |
| 3 | **Loops** | for, while, do-while loops, break/continue, random numbers, nested structures |
| 4 | **Arrays** | 1D arrays, 2D arrays, sorting algorithms (bubble/selection) |
| 5 | **Functions** | Pass by value vs. reference, return types, void, overloading |
| 6 | **Recursion & Strings** | Recursive functions, stack tracing, character arrays, string manipulation |
| 7 | **Structures & Files** | user-defined structs, arrays of structures, persistent file I/O streams |
| 8 | **Code Quality** | Refactoring, clean code principles |

---

## Key Features

### Multi-page, Dual-Orientation Export
Once the course is 100% completed, users can click **Download Certificate** to select:
*   **Export as PNG:** A high-res A4 landscape certificate canvas drawing tailored to the active light/dark theme.
*   **Export as PDF:** A high-quality, dual-page PDF consisting of:
    *   *Page 1 (Landscape):* The main completion certificate.
    *   *Page 2 (Portrait):* A formal Document of Acknowledgement containing the complete 8-module syllabus checklist, accreditation credits, and verified seals.
*   **Export Syllabus Manual:** A beautiful, vector-drawn 2-page C++ Syntax Cheatsheet PDF containing references for all modules.

### LinkedIn Sharing & Auto-Drafting
*   **Add to Profile:** Directs users to the LinkedIn Certifications form, pre-filling name, provider, and the public verification URL.
*   **Copy LinkedIn Post:** Copies an engaging, pre-formatted completion announcement detailing all modules completed along with their specific verification link to the clipboard, then opens LinkedIn in a new tab.

### Command Palette & Navigation
*   Press `⌘K` or `Ctrl+K` to search and jump to any lecture, page, or module instantly.
*   Slide decks are keyboard-accessible (use `←` and `→` to navigate, `F` for fullscreen).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR + file-based routing) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL + RLS + Rate Limits) |
| UI & Icons | React 19 + Lucide Icons |
| Styling | Tailwind CSS v4 |
| PDF/Canvas | `jspdf` (PDF generation) + `html2canvas` (Vector parsing) |
| Component Library | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Package Manager | Bun |
| Server / SSR | Nitro (Vercel preset) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── CodePlayground.tsx     # Code editor sandbox + output console
│   ├── CommandPalette.tsx     # Fuzzy search overlay (⌘K)
│   ├── Footer.tsx
│   ├── Magnetic.tsx           # Magnetic physics hover wrapper
│   ├── Nav.tsx                # Dynamic navigation menu & dark mode toggle
│   ├── ProgressActions.tsx    # Completion actions (Dropdown exports + JSON)
│   ├── QuizBlock.tsx          # Multi-choice quiz engine + results panel
│   └── ui/                    # shadcn/ui components
├── data/
│   ├── lectures.ts            # Syllabus databases (slides, playground, quizzes)
│   └── modules.ts             # Module definitions + progress helpers
├── lib/
│   ├── export.ts              # PDF compiling, canvas drawing, and database sync
│   ├── progress.ts            # Local progress handlers
│   ├── supabase.ts            # Client initialization
│   └── utils.ts               # Shared helper functions
├── routes/
│   ├── __root.tsx             # Root layout shell
│   ├── index.tsx              # Landing page
│   ├── lectures.tsx           # Progress dashboard & lecture index
│   ├── lecture.$id.tsx        # Slide / Playground / Quiz classroom
│   ├── playground.tsx         # Standalone playground browser
│   ├── syllabus.tsx           # Core syllabus index
│   ├── verify.tsx             # Manual certificate verification lookup
│   ├── verify.$id.tsx         # Dynamic verified credential display
│   └── about.tsx              # About & Accreditation page
└── styles.css                 # Global CSS design tokens
```

---

## Design System

The visual design takes its cues from editorial interfaces - tinted cream canvas, slab-serif headlines (`Instrument Serif`), a coral/terracotta primary accent, and `JetBrains Mono` for all code elements. The goal is to make learning programming feel like reading a high-quality print textbook.

All design tokens are defined as CSS variables, adapting immediately to light/dark modes. Runtime `MutationObserver` instances track theme changes to redraw certificate canvas mockups and favicon assets on the fly.

---

## Authors / Developers

Built by **Team DevZee**:

- **Zaki Ul Hassan** (Team Leader)
  - [LinkedIn](https://www.linkedin.com/in/zakiuh/)
  - [GitHub](https://github.com/zakiuhh/)
- **Saad Qureshi** (Vibe Coder)
- **Aliba Shakeel** (Vibe Coder)
- **Anosha Shakeel** (Vibe Coder)

