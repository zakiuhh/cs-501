import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ShieldCheck, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/verify/")({
  head: () => ({
    meta: [
      { title: "Verify Credentials - CS501" },
      { name: "description", content: "Verify CS501 C++ Crashed completion certificates by Verification ID." },
    ],
  }),
  component: VerifySearchPage,
});

function VerifySearchPage() {
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = inputId.trim();
    if (!cleanId) return;

    // Navigate to verify.$id dynamic route
    navigate({
      to: "/verify/$id",
      params: { id: cleanId },
    });
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col selection:bg-primary/10">
      <Nav />
      <main className="flex-1 w-full max-w-xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="bg-surface-card border border-hairline rounded-xl p-8 md:p-10 w-full text-center shadow-md">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl mb-2 text-ink">Certificate Verification</h1>
          <p className="text-muted text-[14px] leading-relaxed mb-8">
            Enter the unique Verification ID found at the top right of the certificate or on the accreditation report to authenticate the graduate's credentials.
          </p>

          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="e.g. CS501-A48F-A463-E7FD"
                className="w-full bg-canvas border border-hairline rounded-md pl-11 pr-4 py-3 text-[14px] text-ink outline-none focus:border-primary transition-colors min-h-[48px]"
              />
              <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={!inputId.trim()}
              className="btn-primary w-full min-h-[48px] py-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              <span>Verify Credential</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
