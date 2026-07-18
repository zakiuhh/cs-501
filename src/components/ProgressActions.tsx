import { useEffect, useState, useRef } from "react";
import { lectures } from "@/data/lectures";
import { getProgress, importProgress } from "@/lib/progress";
import { exportProgressJSON, downloadCertificate, drawCertificateCanvas, downloadCertificatePDF, getVerificationId, downloadSyllabusPDF, registerCertificate } from "@/lib/export";
import { toast } from "sonner";
import { Download, Upload, FileJson, ChevronDown, FileText, Image, Linkedin, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function CertificateLivePreview({ name }: { name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 1600;
    const H = 1131;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      drawCertificateCanvas(ctx, W, H, name.trim() || "Ada Lovelace");
    };

    render();

    // Redraw on theme change
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [name]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1600/1131" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
      />
    </div>
  );
}

export function ProgressActions({ minimal = false }: { minimal?: boolean } = {}) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const refresh = () => setCompleted(getProgress().completed);
    refresh();
    window.addEventListener("pf-progress-changed", refresh);
    return () => window.removeEventListener("pf-progress-changed", refresh);
  }, []);

  const total = lectures.length;
  const done = completed.length;
  const allDone = done === total && total > 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const shareOnLinkedIn = () => {
    const activeName = name.trim() || "Ada Lovelace";
    registerCertificate(activeName); // Register on Supabase async
    const certId = getVerificationId(activeName);
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const certUrl = `${window.location.origin}/verify/${certId}`;
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=CS501%3A%20C%2B%2B%20Crashed%20-%20Interactive%20Programming%20Fundamentals&organizationName=C%2B%2B%20Crashed&certId=${certId}&issueYear=${year}&issueMonth=${month}&certUrl=${encodeURIComponent(certUrl)}`;
    window.open(url, "_blank");
  };

  const sharePostOnLinkedIn = () => {
    const activeName = name.trim() || "Ada Lovelace";
    registerCertificate(activeName); // Register on Supabase async
    const certId = getVerificationId(activeName);
    const certUrl = `${window.location.origin}/verify/${certId}`;
    const text = `🎓 Exciting Milestone: CS501 C++ Course Completed! 🚀

I'm happy to share that I have successfully completed the rigorous C++ Crashed: Interactive Programming Fundamentals (CS501) curriculum!

Over the past few weeks, I’ve worked through 27 interactive lectures, coding playground sandboxes, and quiz assessments, focusing on:
✅ Algorithmic logic and language compilation pipelines
✅ Relational/logical operations & control structures
✅ Memory layout of 1D and 2D arrays & sorting algorithms
✅ Modular parameter passing (pass-by-value vs. reference)
✅ Recursive call stacks & stack tracing
✅ User-defined struct records & persistent file I/O streams

Special thanks to instructor Zaki Ul Hassan for designing this hands-on, browser-based learning experience. 

You can verify my verified completion credential using the link below:
🔗 ${certUrl}

#Cpp #Programming #Learning #SoftwareDevelopment #ComputerScience #CS501 #Accreditation`;

    navigator.clipboard.writeText(text).then(() => {
      toast.success("LinkedIn post draft copied! Opening LinkedIn...");
      setTimeout(() => {
        window.open("https://www.linkedin.com/", "_blank");
      }, 1000);
    }).catch(() => {
      toast.error("Failed to copy post text. Please copy it manually.");
    });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = importProgress(text);
      if (success) {
        toast.success("Progress imported successfully!");
      } else {
        toast.error("Failed to import progress. Invalid JSON format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const containerClass = minimal 
    ? "flex flex-col gap-6" 
    : "bg-surface-card border border-hairline rounded-xl p-6 md:p-8 flex flex-col gap-6";

  return (
    <div className={containerClass}>
      {!minimal && (
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-muted text-[12px] tracking-[0.15em] uppercase font-mono mb-2">
              Export & certificate
            </p>
            <h3 className="font-serif text-2xl text-ink">
              {allDone ? "You finished the course." : "Take your progress with you."}
            </h3>
            <p className="text-body text-[14px] mt-2 max-w-lg leading-relaxed">
              {allDone
                ? "Generate a certificate of completion or download a JSON snapshot of every lecture and quiz score."
                : `You've completed ${done}/${total} lectures (${pct}%). The certificate unlocks at 100% - JSON export and import are always available.`}
            </p>
          </div>
          <span className="font-serif text-5xl text-primary">{pct}%</span>
        </div>
      )}

      {allDone && (
        <div className="rounded-lg overflow-hidden border border-hairline shadow-md w-full max-w-2xl bg-canvas">
          <p className="bg-surface-soft border-b border-hairline px-4 py-2 text-[11px] font-mono uppercase text-muted">
            Live certificate preview
          </p>
          <CertificateLivePreview name={name} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="w-full max-w-sm">
          <label className="text-[12px] text-muted font-mono uppercase tracking-[0.12em] block mb-2">
            Name on certificate
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ada Lovelace"
            className="w-full bg-canvas border border-hairline rounded-md px-4 py-2.5 text-[14px] text-ink outline-none focus:border-primary transition-colors min-h-[44px]"
          />
        </div>
        <div className="flex gap-2.5 items-center flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                disabled={!allDone}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer"
                title={allDone ? "Download certificate options" : "Complete all lectures to unlock"}
              >
                <Download className="w-4 h-4" />
                <span>Download Certificate</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-canvas border border-hairline rounded-lg p-1 shadow-lg min-w-[180px] z-50">
              <DropdownMenuItem
                onClick={() => {
                  const activeName = name.trim() || "A determined learner";
                  registerCertificate(activeName);
                  downloadCertificate(activeName);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <Image className="w-4 h-4 text-primary" />
                <span>Export as PNG</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const activeName = name.trim() || "A determined learner";
                  registerCertificate(activeName);
                  downloadCertificatePDF(activeName);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Export as PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>Add to LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={sharePostOnLinkedIn}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <Share2 className="w-4 h-4 text-primary" />
                <span>Copy LinkedIn Post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="btn-secondary hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer">
                <span>More Actions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-canvas border border-hairline rounded-lg p-1 shadow-lg min-w-[180px] z-50">
              <DropdownMenuItem
                onClick={downloadSyllabusPDF}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Syllabus PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportProgressJSON}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <FileJson className="w-4 h-4 text-primary" />
                <span>Export Progress JSON</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const input = document.getElementById("import-json-file-dropdown") as HTMLInputElement;
                  if (input) input.click();
                }}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <Upload className="w-4 h-4 text-primary" />
                <span>Import Progress JSON</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="file"
            id="import-json-file-dropdown"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
