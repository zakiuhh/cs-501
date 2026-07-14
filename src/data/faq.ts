export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: FaqItem[];
};

export const faqs: FaqCategory[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "Do I need to install anything to use C++ Crashed?",
        answer: "No. Everything runs in your browser - the slides, the code playground, and the quizzes. No account or software installation is needed to start learning.",
      },
      {
        question: "Do I need to create an account?",
        answer: "No account is required for learning. Your progress is saved locally on your device using your browser's storage. A certificate ID is only generated when you complete 100% of the course and choose to register it.",
      },
      {
        question: "What order should I go through the lectures in?",
        answer: "The lectures are numbered and grouped into 8 modules that build on each other, from Foundations through Code Quality. We recommend going in order, but you're free to jump around using the Lectures page or the ⌘K command palette.",
      },
    ],
  },
  {
    category: "Progress & Certificates",
    items: [
      {
        question: "Where is my progress saved?",
        answer: "Progress (completed lectures, quiz scores, bookmarks) is stored locally in your browser using localStorage. If you clear your browser data or switch devices, that local progress won't carry over unless you export and import it.",
      },
      {
        question: "Can I move my progress to another device?",
        answer: "Yes. Use the export option on the Lectures page to download your progress as a JSON file, then import that file on the new device from the same page.",
      },
      {
        question: "How do I get a certificate?",
        answer: "Once you've completed all lectures (100%), a Download Certificate option appears. You can export it as a PNG or a full PDF, and optionally register it so it gets a public, verifiable link.",
      },
      {
        question: "How does certificate verification work?",
        answer: "Registered certificates are stored in a Supabase database with a unique Verification ID. Anyone can enter that ID on the Verify page to confirm a certificate is genuine and see the completion details.",
      },
    ],
  },
  {
    category: "Using the Platform",
    items: [
      {
        question: "What does the code playground actually run?",
        answer: "The playground shows simulated compiler output for the pre-loaded lecture examples, so you can see expected behavior without setting up a compiler. For running your own arbitrary C++ code with a real compiler, check out the linked Zenith C++ companion IDE.",
      },
      {
        question: "Can I practice coding beyond the lecture examples?",
        answer: "Yes - the Practice page has extra coding problems organized by module, each with a hint and a full worked solution you can reveal when you're ready.",
      },
      {
        question: "How do I quickly find a specific lecture or page?",
        answer: "Press Cmd+K (or Ctrl+K on Windows/Linux) anywhere on the site to open the command palette and jump straight to any lecture, module, or page.",
      },
      {
        question: "Does the site work on mobile?",
        answer: "Yes, the whole platform is responsive, including slides, the playground, and quizzes, though a larger screen is more comfortable for longer coding examples.",
      },
    ],
  },
  {
    category: "About the Course",
    items: [
      {
        question: "What is CS501 based on?",
        answer: "The content follows the CS501 Programming Fundamentals syllabus taught in C++, covering everything from basic syntax and control flow through functions, recursion, arrays, structures, and file handling.",
      },
      {
        question: "Who built C++ Crashed?",
        answer: "It was built by Team DevZee. You can find the team credits and design philosophy on the About page.",
      },
    ],
  },
];
