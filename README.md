# C++ Crashed — CS501 Interactive Course Platform

> The full CS501 Programming Fundamentals syllabus, rebuilt as an interactive experience.
> Read slides, run code, take quizzes, practice problems, and build flowcharts — all in one focused, browser-based place.

---

## What is this?

**C++ Crashed** is a self-contained, interactive learning platform built for the CS501 Programming Fundamentals course. Instead of a static PDF or a set of lecture slides you passively scroll through, every lecture is structured as three connected experiences — a slide deck you step through one idea at a time, a live code playground showing real C++ output, and a short quiz that checks if the concept actually landed.

The whole thing runs in the browser. No account needed, progress is stored locally on your device using `localStorage`, and certificates are dynamically registered and verified against a secure Supabase database.

---

## Pages

### `/` — Home
The landing page. Introduces the platform with a hero section, animated headline, and a live code preview snippet. Lays out the core features (slides, playground, quiz, progress tracking) and includes a certificate showcase. Also links to Zenith C++ as a companion IDE.

### `/lectures` — Lecture Index
Lists every lecture in the course as a browsable card grid. Shows the lecture number, title, summary, and completion indicators. Displays total progress and per-module completion trackers. Features a "Resume" pill that jumps directly to the last in-progress lecture.

### `/lecture/:id` — Individual Lecture
The main learning interface containing three tabs:
- **Slides** — step through the lecture using arrow keys or buttons. Supports fullscreen (`F`).
- **Playground** — editable code block with pre-loaded lecture examples and simulated compiler output.
- **Quiz** — multiple-choice quiz with color-coded review screens, explanations, and scores.

### `/playground` — Standalone Playground
A dedicated page compiling all lecture playgrounds in one place with a selection sidebar on the left.

### `/practice` — Practice Problems
A filterable problem set covering every module. Each problem card has a difficulty badge (Easy / Medium / Hard), a collapsible hint, a starter code block, and a full worked solution reveal. Completion state is persisted locally per problem.

### `/cheatsheet` — C++ Syntax Cheat Sheet
An interactive, printable quick-reference guide covering every major C++ syntax topic in the course. Sections can be toggled on/off via a customizer panel to build a focused, printable cheat sheet. Supports copy-to-clipboard per snippet and full PDF/print export.

### `/flowchart` — Flowchart Puzzles
An interactive drag-and-drop flowchart builder where students reconstruct algorithm flowcharts from scrambled blocks. Each puzzle maps to a real lecture topic. Progress and correctness are checked client-side.

### `/syllabus` — Course Outline
Syllabus summary detailing lecture titles, numbering, module headers, and estimated durations.

### `/faq` — Frequently Asked Questions
Accordion-style FAQ page answering common questions about the platform, the certificate, and the course content.

### `/verify` — Certificate Lookup
A manual credential verification search engine where employers or peers can type a Verification ID (e.g. `CS501-XXXX-XXXX-XXXX`) to fetch and authenticate student credentials.

### `/verify/:id` — Verified Credential Page
A public, dynamic route that queries the Supabase database. If the ID is valid, it retrieves credential metadata (student name, issue date, curriculum stats) and renders a live, high-resolution certificate canvas mockup. If invalid, displays a clean error status.

### `/about` — About
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
| 7 | **Structures & Files** | User-defined structs, arrays of structures, persistent file I/O streams |
| 8 | **Code Quality** | Refactoring, clean code principles |

---

## Key Features

### Multi-page, Dual-Orientation Certificate Export
Once the course is 100% completed, users can click **Download Certificate** to select:
- **Export as PNG:** A high-res A4 landscape certificate canvas drawing tailored to the active light/dark theme.
- **Export as PDF:** A high-quality, dual-page PDF consisting of:
  - *Page 1 (Landscape):* The main completion certificate.
  - *Page 2 (Portrait):* A formal Document of Acknowledgement containing the complete 8-module syllabus checklist, accreditation credits, and verified seals.
- **Export Syllabus Manual:** A beautiful, vector-drawn 2-page C++ Syntax Cheatsheet PDF containing references for all modules.

### LinkedIn Sharing & Auto-Drafting
- **Add to Profile:** Directs users to the LinkedIn Certifications form, pre-filling name, provider, and the public verification URL.
- **Copy LinkedIn Post:** Copies an engaging, pre-formatted completion announcement detailing all modules completed along with their specific verification link to the clipboard, then opens LinkedIn in a new tab.

### Command Palette & Navigation
- Press `⌘K` or `Ctrl+K` to search and jump to any lecture, page, or module instantly.
- Slide decks are keyboard-accessible (use `←` and `→` to navigate, `F` for fullscreen).

### Daily Streak Tracking
A streak system that awards and tracks consecutive days of learning activity. Streak count and last-active date are persisted in `localStorage` and displayed via the `StreakBadge` component in the nav.

### Practice Problems
A dedicated practice module with difficulty-filtered problem sets, inline hints, starter code, and full solution reveals. Solved state is tracked per-problem locally.

### Flowchart Puzzle Engine
An interactive drag-and-drop flowchart builder with correctness validation, supporting multiple algorithm puzzles aligned to course lectures.

### Interactive C++ Cheat Sheet
A fully customizable, printable C++ syntax reference. Students can toggle individual sections, copy code snippets, and print or export a tailored PDF reference card.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR + file-based routing) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL + RLS + Rate Limits) |
| UI & Icons | React 19 + Lucide Icons |
| Styling | Tailwind CSS v4 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
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
│   ├── CertificateProgress.tsx    # Certificate progress tracker & unlock UI
│   ├── CodePlayground.tsx         # Code editor sandbox + output console
│   ├── CommandPalette.tsx         # Fuzzy search overlay (⌘K)
│   ├── FloatingIllustrations.tsx  # Decorative animated SVG illustrations
│   ├── FlowchartBuilder.tsx       # Drag-and-drop flowchart puzzle engine
│   ├── Footer.tsx
│   ├── Magnetic.tsx               # Magnetic physics hover wrapper
│   ├── Markdown.tsx               # Markdown renderer for slide content
│   ├── ModuleProgress.tsx         # Per-module completion ring/bar
│   ├── Nav.tsx                    # Dynamic navigation menu & dark mode toggle
│   ├── PageTransition.tsx         # Route transition animation wrapper
│   ├── ProgressActions.tsx        # Completion actions (Dropdown exports + JSON)
│   ├── QuizBlock.tsx              # Multi-choice quiz engine + results panel
│   ├── ResumePill.tsx             # "Resume where you left off" floating pill
│   ├── Reveal.tsx                 # Scroll-triggered reveal animation
│   ├── RevealFooter.tsx           # Animated footer reveal section
│   ├── SlideView.tsx              # Slide deck renderer
│   ├── StreakBadge.tsx            # Daily streak counter badge
│   ├── Testimonials.tsx           # Testimonial carousel component
│   ├── ThemeToggle.tsx            # Light/dark mode toggle button
│   └── ui/                        # shadcn/ui components
├── data/
│   ├── enriched.ts                # Enriched lecture content & supplemental data
│   ├── extraquiz.ts               # Additional quiz questions per module
│   ├── faq.ts                     # FAQ question/answer dataset
│   ├── flowcharts.ts              # Flowchart puzzle definitions
│   ├── lectures.ts                # Syllabus database (slides, playground, quizzes)
│   ├── modules.ts                 # Module definitions + progress helpers
│   └── practice.ts                # Practice problem dataset with hints & solutions
├── hooks/
│   ├── use-in-view.ts             # Intersection Observer hook for scroll reveals
│   └── use-mobile.tsx             # Responsive mobile breakpoint hook
├── lib/
│   ├── api/                       # Server-side API route handlers
│   ├── config.server.ts           # Server-side environment configuration
│   ├── error-capture.ts           # Client error capture utilities
│   ├── error-page.ts              # Error page rendering helpers
│   ├── export.ts                  # PDF compiling, canvas drawing, and database sync
│   ├── lovable-error-reporting.ts # Error reporting integration
│   ├── practiceProgress.ts        # Local practice problem progress handlers
│   ├── progress.ts                # Local lecture progress handlers
│   ├── streak.ts                  # Daily streak calculation & persistence
│   ├── supabase.ts                # Supabase client initialization
│   └── utils.ts                   # Shared helper functions
├── routes/
│   ├── __root.tsx                 # Root layout shell
│   ├── index.tsx                  # Landing page
│   ├── lectures.tsx               # Progress dashboard & lecture index
│   ├── lecture.$id.tsx            # Slide / Playground / Quiz classroom
│   ├── playground.tsx             # Standalone playground browser
│   ├── practice.tsx               # Practice problem set
│   ├── cheatsheet.tsx             # Interactive C++ syntax cheat sheet
│   ├── flowchart.tsx              # Flowchart puzzle game
│   ├── faq.tsx                    # Frequently asked questions
│   ├── syllabus.tsx               # Core syllabus index
│   ├── verify.index.tsx           # Manual certificate verification lookup
│   ├── verify.$id.tsx             # Dynamic verified credential display
│   └── about.tsx                  # About & Accreditation page
├── router.tsx                     # TanStack Router configuration
├── server.ts                      # Nitro server entry
├── start.ts                       # App entry point
└── styles.css                     # Global CSS design tokens
```

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/zakiuhh/cs-501.git
cd cs-501

# Install dependencies
bun install

# Set up environment variables (fill in your Supabase credentials)
cp .env.example .env
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |

---

## Design System

The visual design takes its cues from editorial interfaces — a warm cream canvas, classic slab-serif headlines (`DM Serif Display`), a modern blue primary accent, and `JetBrains Mono` for all code elements. The goal is to make learning programming feel like reading a high-quality print textbook.

All design tokens are defined as CSS variables in `styles.css`, adapting immediately to light/dark modes. Runtime `MutationObserver` instances track theme changes to redraw certificate canvas mockups and favicon assets on the fly.

---

## License

[MIT](LICENSE)

---

## Authors / Developers

Built by **Team DevZee** for the CS501 Hackathon:

- **Zaki Ul Hassan** (Team Leader)
  - [LinkedIn](https://www.linkedin.com/in/zakiuh/)
  - [GitHub](https://github.com/zakiuhh/)
- **Saad Qureshi** (Vibe Coder)
- **Aliba Shakeel** (Vibe Coder)
- **Anosha Shakeel** (Vibe Coder)
  - [LinkedIn](https://www.linkedin.com/in/anosha-shakeel-044300416/)
