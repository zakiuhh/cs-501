import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { MessageSquare, X } from "lucide-react";
import Lenis from "lenis";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CommandPalette } from "@/components/CommandPalette";
import { PageTransition } from "@/components/PageTransition";

import darkFavicon16 from "@/assets/dark/dark-favicon-16x16.png";
import darkFavicon32 from "@/assets/dark/dark-favicon-32x32.png";
import darkFaviconIco from "@/assets/dark/dark-favicon.ico";
import darkAppleTouchIcon from "@/assets/dark/dark-apple-touch-icon.png";

import lightFavicon16 from "@/assets/light/light-favicon-16x16.png";
import lightFavicon32 from "@/assets/light/light-favicon-32x32.png";
import lightFaviconIco from "@/assets/light/light-favicon.ico";
import lightAppleTouchIcon from "@/assets/light/light-apple-touch-icon.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "C++ Crashed - Interactive Programming Fundamentals" },
      { name: "description", content: "Interactive C++ course - slides, code playgrounds, quizzes." },
      { name: "author", content: "Team DevZee" },
      { property: "og:title", content: "C++ Crashed - Interactive Programming Fundamentals" },
      { property: "og:description", content: "Interactive C++ course - slides, code playgrounds, quizzes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;800&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      // Favicons (will be updated dynamically by useEffect/script to match dark/light theme)
      { id: "favicon-ico", rel: "icon", href: lightFaviconIco, type: "image/x-icon" },
      { id: "favicon-16", rel: "icon", href: lightFavicon16, sizes: "16x16", type: "image/png" },
      { id: "favicon-32", rel: "icon", href: lightFavicon32, sizes: "32x32", type: "image/png" },
      { id: "apple-touch-icon", rel: "apple-touch-icon", href: lightAppleTouchIcon, sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');var f=document.getElementById('favicon-ico');if(f){f.href='${darkFaviconIco}';}var f16=document.getElementById('favicon-16');if(f16){f16.href='${darkFavicon16}';}var f32=document.getElementById('favicon-32');if(f32){f32.href='${darkFavicon32}';}var a=document.getElementById('apple-touch-icon');if(a){a.href='${darkAppleTouchIcon}';}}}catch(e){}})();`,
          }}
        />
        {children}
        <Scripts />
      </body>

    </html>
  );
}

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-32px)] sm:w-[400px] h-[500px] sm:h-[600px] max-h-[calc(100vh-140px)] bg-canvas border border-hairline rounded-xl shadow-2xl overflow-hidden flex flex-col animate-blur-in mr-2 sm:mr-0">
          {/* Header */}
          <div className="bg-surface-soft border-b border-hairline px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif text-[16px] text-ink font-medium">csHelper AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-ink cursor-pointer transition-colors p-1 rounded-md hover:bg-surface-cream-strong border-none bg-transparent"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Iframe */}
          <div className="flex-1 bg-surface-soft/30">
            <iframe 
              src="https://interfaces.zapier.com/embed/chatbot/cmrm9rfd3007fzqj9wlkplw6e" 
              height="100%" 
              width="100%" 
              allow="clipboard-write *" 
              style={{ border: "none" }}
              className="w-full h-full"
              title="CS501 AI Chatbot"
            />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer outline-none border-none ${
          isOpen 
            ? "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated" 
            : "bg-primary text-on-primary hover:bg-primary-active"
        }`}
        title="Chat with csHelper"
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isExcluded = pathname === "/" || pathname.startsWith("/faq") || pathname.startsWith("/practice");

  useEffect(() => {
    // Function to update the favicon based on whether dark theme is active
    const updateFavicons = (isDark: boolean) => {
      const faviconIco = document.getElementById("favicon-ico") as HTMLLinkElement | null;
      const favicon16 = document.getElementById("favicon-16") as HTMLLinkElement | null;
      const favicon32 = document.getElementById("favicon-32") as HTMLLinkElement | null;
      const appleTouchIcon = document.getElementById("apple-touch-icon") as HTMLLinkElement | null;

      if (faviconIco) faviconIco.href = isDark ? darkFaviconIco : lightFaviconIco;
      if (favicon16) favicon16.href = isDark ? darkFavicon16 : lightFavicon16;
      if (favicon32) favicon32.href = isDark ? darkFavicon32 : lightFavicon32;
      if (appleTouchIcon) appleTouchIcon.href = isDark ? darkAppleTouchIcon : lightAppleTouchIcon;
    };

    // Initial check
    const isDarkInitial = document.documentElement.classList.contains("dark");
    updateFavicons(isDarkInitial);

    // Watch for theme class changes on html tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          updateFavicons(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll on client mount
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <PageTransition>
        <Outlet />
      </PageTransition>
      <CommandPalette />
      {!isExcluded && <FloatingChatbot />}
    </QueryClientProvider>
  );
}
