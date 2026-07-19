import { useEffect, useState, useRef } from "react";
import { lectures } from "@/data/lectures";
import { getProgress, importProgress } from "@/lib/progress";
import { 
  exportProgressJSON, 
  downloadCertificate, 
  drawCertificateCanvas, 
  downloadCertificatePDF, 
  getVerificationId, 
  downloadSyllabusPDF, 
  registerCertificate,
  type CertTheme
} from "@/lib/export";
import { supabase } from "@/lib/supabase";
import { BRAND_THEMES } from "@/assets/themes";
import { toast } from "sonner";
import { 
  Download, 
  Upload, 
  FileJson, 
  ChevronDown, 
  FileText, 
  Image, 
  Linkedin, 
  Share2,
  Cloud,
  CloudLightning,
  Copy,
  Search,
  Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const THEMES: { id: CertTheme; name: string; bg: string; accent: string }[] = [
  { id: "cream", name: "Warm Editorial", bg: "#faf9f5", accent: "#cc785c" },
  { id: "dark", name: "Midnight Developer", bg: "#181715", accent: "#e88f73" },
  { id: "slate", name: "Minimalist Slate", bg: "#f8fafc", accent: "#3b82f6" },
  { id: "ocean", name: "Ocean Breeze", bg: "#f0f9ff", accent: "#0284c7" },
  { id: "forest", name: "Forest Sage", bg: "#f0fdf4", accent: "#16a34a" },
  { id: "amber", name: "Sunset Amber", bg: "#fffbeb", accent: "#d97706" },
  ...BRAND_THEMES
];

function CertificateLivePreview({ name, theme }: { name: string; theme: CertTheme }) {
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
      drawCertificateCanvas(ctx, W, H, name.trim() || "Ada Lovelace", theme);
    };

    render();

    // Redraw on theme change
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [name, theme]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1600/1131" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
      />
    </div>
  );
}

export function ProgressActions() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<CertTheme>("cream");
  const [themeSearch, setThemeSearch] = useState("");

  // Cloud Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [syncCode, setSyncCode] = useState<string | null>(null);
  const [showRestoreInput, setShowRestoreInput] = useState(false);
  const [enteredRestoreCode, setEnteredRestoreCode] = useState("");

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

  const filteredThemes = THEMES.filter((t) =>
    t.name.toLowerCase().includes(themeSearch.toLowerCase())
  );

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
    const text = `🎓 Exciting Milestone: CS501 C++ Course Completed! 🚀\n\nI'm happy to share that I have successfully completed the rigorous C++ Crashed: Interactive Programming Fundamentals (CS501) curriculum!\n\nOver the past few weeks, I’ve worked through 27 interactive lectures, coding playground sandboxes, and quiz assessments, focusing on:\n✅ Algorithmic logic and language compilation pipelines\n✅ Relational/logical operations & control structures\n✅ Memory layout of 1D and 2D arrays & sorting algorithms\n✅ Modular parameter passing (pass-by-value vs. reference)\n✅ Recursive call stacks & stack tracing\n✅ User-defined struct records & persistent file I/O streams\n\nSpecial thanks to instructor Zaki Ul Hassan for designing this hands-on, browser-based learning experience. \n\nYou can verify my verified completion credential using the link below:\n🔗 ${certUrl}\n\n#Cpp #Programming #Learning #SoftwareDevelopment #ComputerScience #CS501 #Accreditation`;

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

  // Sync to Cloud
  const handleCloudSync = async () => {
    setIsSyncing(true);
    try {
      // 6-character random alphanumeric key
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const progress = getProgress();
      const progressStr = JSON.stringify(progress);
      const nameValue = `${code}#${progressStr}`;
      const id = getVerificationId(nameValue);

      const { error } = await supabase.from("certificates").insert([
        {
          id,
          name: nameValue,
          course: "C++ Crashed: Interactive Programming Fundamentals (CS501)",
        }
      ]);

      if (error) throw error;

      setSyncCode(code);
      navigator.clipboard.writeText(code);
      toast.success(`Backup created! Sync code copied: ${code}`);
    } catch (err) {
      console.error(err);
      toast.error("Cloud backup failed. Please check network connection.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Restore from Cloud
  const handleCloudRestore = async () => {
    const code = enteredRestoreCode.trim().toUpperCase();
    if (!code || code.length !== 6) {
      toast.error("Please enter a valid 6-character sync code.");
      return;
    }

    setIsRestoring(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("name")
        .like("name", `${code}#%`)
        .order("issued_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (!data || data.length === 0) {
        toast.error("No progress data found for this sync code.");
        return;
      }

      const parts = data[0].name.split("#");
      const jsonStr = parts.slice(1).join("#");
      const success = importProgress(jsonStr);

      if (success) {
        toast.success("Progress restored successfully!");
        setEnteredRestoreCode("");
        setShowRestoreInput(false);
        setCompleted(getProgress().completed); // Refresh state
      } else {
        toast.error("Failed to parse retrieved progress.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch progress. Check your sync code.");
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-6 md:p-8 space-y-8">
      {/* Overview Row */}
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
              ? "Generate a themed certificate of completion or download a JSON snapshot of every lecture and quiz score."
              : `You've completed ${done}/${total} lectures (${pct}%). The certificate unlocks at 100% - cloud sync, JSON export, and import are always available.`}
          </p>
        </div>
        <span className="font-serif text-5xl text-primary">{pct}%</span>
      </div>

      {/* Cloud Sync Section */}
      <div className="bg-canvas border border-hairline rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h4 className="font-serif text-lg text-ink flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" />
            Cloud Synchronization
          </h4>
          <p className="text-[12.5px] text-body max-w-xl">
            Sync progress to the cloud anonymously. Get a 6-character key to restore your course state on any other device without files.
          </p>
          {syncCode && (
            <div className="pt-2 flex items-center gap-2 text-[13px] text-success font-semibold">
              <Check className="w-4 h-4" />
              <span>Active Sync Key: {syncCode} (copied)</span>
              <button 
                onClick={() => { navigator.clipboard.writeText(syncCode); toast.success("Key copied!"); }}
                className="p-1 hover:bg-surface-cream-strong rounded text-muted cursor-pointer"
                title="Copy code again"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2.5 flex-wrap shrink-0 w-full md:w-auto">
          {showRestoreInput ? (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                maxLength={6}
                value={enteredRestoreCode}
                onChange={(e) => setEnteredRestoreCode(e.target.value.toUpperCase())}
                placeholder="Key (e.g. J8X3B2)"
                className="bg-canvas border border-hairline rounded px-3 py-1.5 text-[13px] uppercase font-mono max-w-[140px] focus:outline-none focus:border-primary text-center"
              />
              <button
                onClick={handleCloudRestore}
                disabled={isRestoring || enteredRestoreCode.length !== 6}
                className="btn-primary py-1.5 px-4 text-[13px] cursor-pointer disabled:opacity-40"
              >
                {isRestoring ? "Loading..." : "Restore"}
              </button>
              <button
                onClick={() => setShowRestoreInput(false)}
                className="btn-secondary py-1.5 px-3 text-[13px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleCloudSync}
                disabled={isSyncing}
                className="btn-secondary text-[13px] py-2 px-4 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 disabled:opacity-50"
              >
                <CloudLightning className="w-4 h-4" />
                <span>{isSyncing ? "Syncing..." : "Backup to Cloud"}</span>
              </button>
              <button
                onClick={() => setShowRestoreInput(true)}
                className="btn-secondary text-[13px] py-2 px-4 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
              >
                <Cloud className="w-4 h-4" />
                <span>Restore progress</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Certificate Editor Grid */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        
        {/* Settings Box (4 cols) */}
        <div className="md:col-span-4 bg-canvas border border-hairline rounded-lg p-5 space-y-5">
          <h4 className="font-serif text-lg text-ink pb-2 border-b border-hairline">Certificate Details</h4>
          
          {/* Name Field */}
          <div>
            <label className="text-[11px] text-muted font-mono uppercase tracking-[0.1em] block mb-1.5">
              Name on Certificate
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ada Lovelace"
              className="w-full bg-canvas border border-hairline rounded-md px-3.5 py-2 text-[13.5px] text-ink outline-none focus:border-primary transition-colors min-h-[40px]"
            />
          </div>

          {/* Theme Selector */}
          <div className="space-y-2.5">
            <label className="text-[11px] text-muted font-mono uppercase tracking-[0.1em] block">
              Design Theme
            </label>
            
            {/* Search filter for themes */}
            <div className="relative">
              <input
                type="text"
                value={themeSearch}
                onChange={(e) => setThemeSearch(e.target.value)}
                placeholder="Search themes..."
                className="w-full bg-canvas border border-hairline rounded pl-8 pr-3 py-1.5 text-[12px] focus:outline-none focus:border-primary"
              />
              <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Themes list with swatches */}
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
              {filteredThemes.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all text-left text-[12.5px] cursor-pointer ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-ink font-medium" 
                        : "border-hairline bg-canvas text-body hover:bg-surface-cream-strong"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Color swatches */}
                      <div className="flex items-center -space-x-1 shrink-0">
                        <span className="w-3.5 h-3.5 rounded-full border border-hairline shadow-sm" style={{ backgroundColor: theme.bg }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-hairline shadow-sm" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <span>{theme.name}</span>
                    </div>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
              {filteredThemes.length === 0 && (
                <p className="text-[11.5px] text-muted italic text-center py-2">No themes matched</p>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview (8 cols) */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <div className="rounded-lg overflow-hidden border border-hairline shadow-md max-w-2xl bg-canvas">
            <p className="bg-surface-soft border-b border-hairline px-4 py-2 text-[11px] font-mono uppercase text-muted">
              Live certificate preview
            </p>
            <CertificateLivePreview name={name} theme={selectedTheme} />
          </div>
        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <DropdownMenuContent align="start" className="bg-canvas border border-hairline rounded-lg p-1 shadow-lg min-w-[180px]">
              <DropdownMenuItem
                onClick={() => {
                  const activeName = name.trim() || "A determined learner";
                  registerCertificate(activeName);
                  downloadCertificate(activeName, selectedTheme);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <Image className="w-4 h-4 text-primary" />
                <span>Export as PNG ({THEMES.find(t => t.id === selectedTheme)?.name})</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const activeName = name.trim() || "A determined learner";
                  registerCertificate(activeName);
                  downloadCertificatePDF(activeName, selectedTheme);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink hover:bg-surface-soft rounded-md cursor-pointer transition-colors outline-none"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Export as PDF ({THEMES.find(t => t.id === selectedTheme)?.name})</span>
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

          <button
            onClick={downloadSyllabusPDF}
            className="btn-secondary hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span>Syllabus PDF</span>
          </button>
        </div>

        <div className="flex gap-2.5 items-center flex-wrap">
          <button
            onClick={exportProgressJSON}
            className="btn-secondary hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer"
          >
            <FileJson className="w-4 h-4 text-primary" />
            <span>Export JSON</span>
          </button>

          <label className="btn-secondary hover:-translate-y-0.5 min-h-[44px] px-5 py-2.5 flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-primary" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
