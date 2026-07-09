import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { drawCertificateCanvas } from "@/lib/export";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Award, CheckCircle, ShieldAlert, Calendar, User, BookOpen } from "lucide-react";

export const Route = createFileRoute("/verify/$id")({
  component: VerifyPage,
  head: ({ params }) => ({
    meta: [
      { title: `Verify CS501 Certificate - ${params.id}` },
      { name: "description", content: `Official verification page for C++ Crashed (CS501) completion certificate.` },
    ],
  }),
});

function VerifyPage() {
  const { id } = Route.useParams();
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState<{ id: string; name: string; course: string; issued_at: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchCert() {
      try {
        setLoading(true);
        console.log("Supabase Client Init Config - URL:", supabase.supabaseUrl);
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase query error:", error);
          setError("This verification ID does not exist or is invalid.");
        } else {
          console.log("Successfully verified certificate:", data);
          setCert(data);
        }
      } catch (err) {
        console.error("Fetch certificate connection exception:", err);
        setError("Failed to verify credentials due to a server connection issue.");
      } finally {
        setLoading(false);
      }
    }
    fetchCert();
  }, [id]);

  useEffect(() => {
    if (!cert || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const W = 1600;
    const H = 1131;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      drawCertificateCanvas(ctx, W, H, cert.name);
    };

    render();

    // Redraw on theme change
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [cert]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col selection:bg-primary/10">
      <Nav />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted font-mono text-sm uppercase">Verifying certificate credentials...</p>
          </div>
        ) : error || !cert ? (
          <div className="bg-surface-card border border-hairline rounded-xl p-8 max-w-md w-full text-center shadow-md">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-serif text-2xl mb-2 text-ink">Verification Failed</h2>
            <p className="text-body text-[14px] leading-relaxed mb-6">
              {error || "The credential verification code provided could not be authenticated against our database."}
            </p>
            <Link to="/" className="btn-primary w-full inline-block text-center py-2.5">
              Back to Homepage
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-8 md:gap-12 animate-in fade-in duration-500">
            {/* Header Status Card */}
            <div className="bg-surface-card border border-hairline rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded-full font-semibold">
                      Verified Credential
                    </span>
                    <span className="text-[11px] font-mono uppercase text-muted">
                      ID: {cert.id}
                    </span>
                  </div>
                  <h1 className="font-serif text-3xl text-ink mb-2">CS501 Course Completion</h1>
                  <p className="text-muted text-[14px] leading-relaxed max-w-xl">
                    This official certificate is database-authenticated and serves as absolute proof of the learner's mastery of C++ core syntax, structures, and algorithmic fundamentals.
                  </p>
                </div>
              </div>
              
              <Link to="/" className="btn-secondary whitespace-nowrap shrink-0 hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer">
                <span>View Course Syllabus</span>
              </Link>
            </div>

            {/* Grid layout for Details & Certificate Image */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Left Column: Metadata */}
              <div className="bg-surface-card border border-hairline rounded-xl p-6 flex flex-col gap-6 shadow-sm">
                <h3 className="font-serif text-lg text-ink border-b border-hairline pb-3">Credential Details</h3>
                
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted font-mono block uppercase">Recipient Name</span>
                    <span className="text-[14px] font-semibold text-ink">{cert.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted font-mono block uppercase">Course Title</span>
                    <span className="text-[14px] text-ink">{cert.course}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted font-mono block uppercase">Date of Issue</span>
                    <span className="text-[14px] text-ink">{formatDate(cert.issued_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted font-mono block uppercase">Issuing Authority</span>
                    <span className="text-[14px] text-ink">CS501 Academy</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mockup Preview */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div className="border border-hairline rounded-xl overflow-hidden shadow-lg bg-canvas">
                  <div className="bg-surface-soft border-b border-hairline px-4 py-2 text-[11px] font-mono uppercase text-muted flex justify-between items-center">
                    <span>Certificate rendering</span>
                    <span>1600 x 1131</span>
                  </div>
                  <canvas ref={canvasRef} className="w-full h-auto block animate-in zoom-in-95 duration-700" />
                </div>
                <p className="text-[11px] text-muted font-mono text-center">
                  This live preview was drawn on canvas matching the original theme at issue time.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
