import { lectures } from "@/data/lectures";
import { modules, getModuleProgress } from "@/data/modules";
import { getProgress } from "@/lib/progress";
import { jsPDF } from "jspdf";
import { supabase } from "@/lib/supabase";

export function exportProgressJSON() {
  const p = getProgress();
  const payload = {
    course: "C++ Crashed - CS501",
    exportedAt: new Date().toISOString(),
    totalLectures: lectures.length,
    completed: p.completed,
    completedCount: p.completed.length,
    percent: lectures.length ? Math.round((p.completed.length / lectures.length) * 100) : 0,
    quizScores: p.quizScores,
    bookmarks: p.bookmarks || [],
    modules: modules.map((m) => ({
      id: m.id,
      title: m.title,
      ...getModuleProgress(m.id, p.completed),
    })),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cpp-crashed-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Generates a high-DPI PNG certificate using the same visual language as the site:
 * canvas background, hairline borders, Instrument Serif headline, primary accent.
 */
export function downloadCertificate(name: string) {
  registerCertificate(name); // Register on Supabase async
  const W = 1600;
  const H = 1131; // ~A4 landscape ratio
  const scale = 2; // retina

  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(scale, scale);

  drawCertificateCanvas(ctx, W, H, name);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cpp-crashed-certificate-${slug(name)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export function drawCertificateCanvas(ctx: CanvasRenderingContext2D, W: number, H: number, name: string) {
  // read live theme tokens so light/dark certificates look native
  const css = getComputedStyle(document.documentElement);
  const t = (v: string, fb: string) => (css.getPropertyValue(v).trim() || fb);
  const bg = t("--canvas", "#faf9f5");
  const surface = t("--surface-soft", "#f5f0e8");
  const ink = t("--ink", "#141413");
  const body = t("--body", "#3d3d3a");
  const muted = t("--muted", "#6c6a64");
  const hairline = t("--hairline", "#e6dfd8");
  const primary = t("--primary", "#cc785c");

  // background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Draw background pattern (subtle dot grid)
  ctx.fillStyle = hairline;
  ctx.globalAlpha = 0.35;
  const gridSpacing = 40;
  for (let x = 72 + gridSpacing; x < W - 72; x += gridSpacing) {
    for (let y = 72 + gridSpacing; y < H - 72; y += gridSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1.0;

  // Draw large background watermark (a giant, thin, semi-transparent C++ style badge)
  ctx.strokeStyle = primary;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.02; // extremely faint
  ctx.save();
  ctx.translate(W / 2, H / 2 - 30);
  
  // Giant star
  ctx.beginPath();
  const numPoints = 8;
  const outerR = 250;
  const innerR = 130;
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? outerR : innerR;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.stroke();
  
  // Giant letters
  ctx.fillStyle = primary;
  ctx.font = "italic bold 150px 'Instrument Serif', serif";
  ctx.textAlign = "center";
  ctx.fillText("C++", 0, 50);
  
  ctx.restore();
  ctx.globalAlpha = 1.0;

  // outer hairline frame
  ctx.strokeStyle = hairline;
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  // inner accent frame
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 72, W - 144, H - 144);

  // top label band
  ctx.fillStyle = surface;
  ctx.fillRect(72, 72, W - 144, 96);

  ctx.fillStyle = muted;
  ctx.font = "500 15px 'JetBrains Mono', ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("C++ CRASHED · CS501 · CERTIFICATE OF COMPLETION", 104, 130);

  ctx.textAlign = "right";
  ctx.fillText(`VERIFY: ${getVerificationId(name)}`, W - 104, 130);

  // 4-point spike mark, top-center
  drawSpike(ctx, W / 2, 230, 22, primary);

  // small caption
  ctx.fillStyle = muted;
  ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
  ctx.textAlign = "center";
  ctx.fillText("This certifies that", W / 2, 300);

  // recipient name - Instrument Serif huge
  ctx.fillStyle = ink;
  ctx.font = "400 100px 'Instrument Serif', Garamond, serif";
  ctx.textAlign = "center";
  ctx.fillText(name || "A determined learner", W / 2, 420);

  // accent underline
  const nameWidth = ctx.measureText(name || "A determined learner").width;
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - Math.min(nameWidth, 700) / 2, 450);
  ctx.lineTo(W / 2 + Math.min(nameWidth, 700) / 2, 450);
  ctx.stroke();

  // body
  ctx.fillStyle = body;
  ctx.font = "400 24px 'Inter', -apple-system, sans-serif";
  ctx.fillText("has successfully completed all lectures, code playgrounds, and assessments for", W / 2, 520);

  ctx.fillStyle = ink;
  ctx.font = "italic 52px 'Instrument Serif', Garamond, serif";
  ctx.fillText("C++ Crashed: Interactive Programming Fundamentals (CS501)", W / 2, 595);

  ctx.fillStyle = body;
  ctx.font = "400 20px 'Inter', -apple-system, sans-serif";
  ctx.fillText("demonstrating mastery of algorithmic logic, control structures, functions, arrays, recursion, structures, and file I/O.", W / 2, 645);

  // stats row with cards
  const stats: [string, string][] = [
    [String(lectures.length), "Lectures Completed"],
    [String(modules.length), "Modules Mastered"],
    ["100%", "Course Progress"],
  ];
  
  const cardW = 280;
  const cardH = 96;
  const cardSpacing = 60;
  const totalStatsW = (cardW * stats.length) + (cardSpacing * (stats.length - 1));
  const startX = (W - totalStatsW) / 2;
  
  stats.forEach(([n, l], i) => {
    const cx = startX + i * (cardW + cardSpacing);
    
    // Card border & background
    ctx.strokeStyle = hairline;
    ctx.lineWidth = 1;
    ctx.fillStyle = surface;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(cx, 715, cardW, cardH, 8);
    } else {
      ctx.rect(cx, 715, cardW, cardH);
    }
    ctx.fill();
    ctx.stroke();
    
    // Stat number
    ctx.fillStyle = primary;
    ctx.font = "400 46px 'Instrument Serif', Garamond, serif";
    ctx.textAlign = "center";
    ctx.fillText(n, cx + cardW / 2, 768);
    
    // Stat label
    ctx.fillStyle = muted;
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    ctx.fillText(l.toUpperCase(), cx + cardW / 2, 792);
  });

  // hairline above signatures — move up slightly to fit 4 sigs
  ctx.strokeStyle = hairline;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 890);
  ctx.lineTo(W - 120, 890);
  ctx.stroke();

  // === 4-member signature row ===
  const sigMembers = [
    { name: "Zaki Ul Hassan",  role: "TEAM LEADER",  drawFn: drawSignatureZaki   },
    { name: "Saad Qureshi",    role: "VIBE CODER",   drawFn: drawSignatureSaad   },
    { name: "Aliba Shakeel",   role: "VIBE CODER",   drawFn: drawSignatureAliba  },
    { name: "Anosha Shakeel",  role: "VIBE CODER",   drawFn: drawSignatureAnosha },
  ];

  const sigZoneW = W - 240; // from x=120 to x=W-120
  const sigSlotW = sigZoneW / sigMembers.length;
  const sigBaseY = 890;

  sigMembers.forEach((member, i) => {
    const slotX = 120 + i * sigSlotW;
    const slotCX = slotX + sigSlotW / 2;

    // Draw signature above the line
    member.drawFn(ctx, slotCX, sigBaseY - 10, primary);

    // "TEAM MEMBER" label
    ctx.fillStyle = muted;
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(member.role, slotCX, sigBaseY + 22);

    // Name in serif
    ctx.fillStyle = ink;
    ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
    ctx.textAlign = "center";
    ctx.fillText(member.name, slotCX, sigBaseY + 46);

    // vertical divider between slots (except after last)
    if (i < sigMembers.length - 1) {
      ctx.strokeStyle = hairline;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(slotX + sigSlotW, sigBaseY + 5);
      ctx.lineTo(slotX + sigSlotW, sigBaseY + 58);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  });

  // DATE ISSUED — bottom left, below sig row
  ctx.fillStyle = muted;
  ctx.font = "500 11px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("DATE ISSUED", 120, 970);
  ctx.fillStyle = ink;
  ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
  ctx.fillText(formatDate(new Date()), 120, 995);

  // footer mono
  ctx.fillStyle = muted;
  ctx.font = "500 11px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("cpp-crashed · interactive · browser-based · no account required", W / 2, H - 100);

  // Draw the official Gold Crest / Seal in the center of the signature row
  drawCrest(ctx, W / 2, 960, primary);
}

export function getVerificationId(name: string) {
  const activeName = (name || "Learner").trim();
  const storageKey = "pf-certificates-v1";
  
  // Try to get cached IDs
  let cachedIds: Record<string, string> = {};
  if (typeof window !== "undefined") {
    try {
      cachedIds = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (e) {
      console.error("Failed to parse cached certificate IDs", e);
    }
  }

  // If we already have a generated ID for this name, return it
  if (cachedIds[activeName]) {
    return cachedIds[activeName];
  }

  // Otherwise, generate a completely random and unique ID
  const chars = "0123456789ABCDEF";
  const genSegment = (len: number) => {
    let s = "";
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(Math.random() * 16)];
    }
    return s;
  };
  const newId = `CS501-${genSegment(4)}-${genSegment(4)}-${genSegment(4)}`;

  // Save the new ID in cache
  if (typeof window !== "undefined") {
    cachedIds[activeName] = newId;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cachedIds));
    } catch (e) {
      console.error("Failed to save certificate ID", e);
    }
  }

  return newId;
}

function drawSignatureZaki(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  
  // 'Z' sweep
  ctx.moveTo(x - 38, y - 22);
  ctx.bezierCurveTo(x - 20, y - 44, x - 5,  y - 48, x - 16, y - 18);
  ctx.bezierCurveTo(x - 26, y + 6,  x - 62, y + 14, x - 38, y - 4);
  // 'a'
  ctx.bezierCurveTo(x - 22, y - 18, x - 8,  y - 9,  x - 12, y + 4);
  ctx.bezierCurveTo(x - 16, y + 13, x - 4,  y + 12, x - 1,  y - 4);
  // 'k'
  ctx.bezierCurveTo(x + 4,  y - 26, x - 1,  y - 35, x + 4,  y - 35);
  ctx.bezierCurveTo(x + 9,  y - 35, x + 2,  y + 12, x + 4,  y + 8);
  ctx.bezierCurveTo(x + 8,  y - 8,  x + 16, y - 8,  x + 12, y + 8);
  // 'i'
  ctx.bezierCurveTo(x + 16, y,      x + 20, y + 8,  x + 22, y + 8);
  // dot for 'i'
  ctx.moveTo(x + 20, y - 14);
  ctx.arc(x + 20, y - 14, 1.5, 0, Math.PI * 2);
  // underline flourish
  ctx.moveTo(x - 62, y + 14);
  ctx.bezierCurveTo(x - 20, y + 24, x + 28, y + 18, x + 55, y + 4);
  ctx.stroke();
  ctx.restore();
}

// Saad Qureshi — 'S' loop + flowing 'aad' tail with underline
function drawSignatureSaad(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  // 'S' — large loop
  ctx.moveTo(x + 18, y - 35);
  ctx.bezierCurveTo(x - 10, y - 48, x - 40, y - 38, x - 32, y - 18);
  ctx.bezierCurveTo(x - 22, y - 2,  x + 20, y - 2,  x + 22, y + 16);
  ctx.bezierCurveTo(x + 24, y + 34, x - 14, y + 38, x - 38, y + 22);

  // 'a' small loop
  ctx.moveTo(x - 10, y + 2);
  ctx.bezierCurveTo(x + 2,  y - 12, x + 22, y - 8,  x + 18, y + 8);
  ctx.bezierCurveTo(x + 14, y + 20, x + 28, y + 18, x + 30, y + 4);

  // 'd' upstroke
  ctx.bezierCurveTo(x + 34, y - 28, x + 38, y - 38, x + 42, y - 30);
  ctx.bezierCurveTo(x + 46, y - 22, x + 40, y + 14, x + 44, y + 10);

  // underline
  ctx.moveTo(x - 42, y + 28);
  ctx.bezierCurveTo(x,     y + 38, x + 50, y + 30, x + 70, y + 10);
  ctx.stroke();
  ctx.restore();
}

// Aliba Shakeel — 'A' peak + 'li' strokes with a long rightward flourish
function drawSignatureAliba(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  // 'A' — two strokes meeting at a peak
  ctx.moveTo(x - 42, y + 14);
  ctx.bezierCurveTo(x - 28, y - 30, x - 14, y - 44, x - 4, y - 44);
  ctx.bezierCurveTo(x + 8,  y - 44, x + 18, y - 26, x + 2,  y + 14);

  // cross-bar of 'A'
  ctx.moveTo(x - 26, y - 8);
  ctx.lineTo(x + 2,  y - 8);

  // 'l' tall upstroke
  ctx.moveTo(x + 10, y - 38);
  ctx.bezierCurveTo(x + 14, y - 42, x + 20, y - 40, x + 18, y + 14);

  // 'i' short stroke
  ctx.moveTo(x + 26, y - 10);
  ctx.bezierCurveTo(x + 28, y - 4,  x + 30, y + 10, x + 30, y + 14);
  // dot
  ctx.moveTo(x + 28, y - 22);
  ctx.arc(x + 28, y - 22, 1.5, 0, Math.PI * 2);

  // 'b' loop
  ctx.moveTo(x + 36, y - 38);
  ctx.bezierCurveTo(x + 40, y - 42, x + 46, y - 36, x + 44, y + 4);
  ctx.bezierCurveTo(x + 42, y + 14, x + 36, y + 18, x + 30, y + 14);

  // 'a' at end
  ctx.moveTo(x + 52, y - 4);
  ctx.bezierCurveTo(x + 56, y - 14, x + 68, y - 10, x + 66, y + 6);
  ctx.bezierCurveTo(x + 64, y + 16, x + 76, y + 14, x + 78, y + 2);

  // underline rightward
  ctx.moveTo(x - 44, y + 22);
  ctx.bezierCurveTo(x + 10, y + 34, x + 64, y + 28, x + 88, y + 8);
  ctx.stroke();
  ctx.restore();
}

// Anosha Shakeel — 'A' + flowing 'n' 'o' arcs + long swooping underline
function drawSignatureAnosha(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  // 'A' — calligraphic diagonal strokes
  ctx.moveTo(x - 44, y + 12);
  ctx.bezierCurveTo(x - 30, y - 36, x - 12, y - 46, x - 2, y - 44);
  ctx.bezierCurveTo(x + 10, y - 44, x + 16, y - 24, x + 2,  y + 12);
  // cross-bar
  ctx.moveTo(x - 28, y - 10);
  ctx.lineTo(x,      y - 10);

  // 'n' humps
  ctx.moveTo(x + 10, y + 12);
  ctx.bezierCurveTo(x + 14, y - 18, x + 24, y - 22, x + 28, y - 10);
  ctx.bezierCurveTo(x + 32, y + 2,  x + 30, y + 12, x + 28, y + 12);
  ctx.bezierCurveTo(x + 32, y - 18, x + 42, y - 22, x + 46, y - 10);
  ctx.bezierCurveTo(x + 50, y + 2,  x + 48, y + 12, x + 46, y + 12);

  // 'o' circle-like
  ctx.moveTo(x + 56, y);
  ctx.bezierCurveTo(x + 58, y - 16, x + 70, y - 20, x + 76, y - 8);
  ctx.bezierCurveTo(x + 82, y + 4,  x + 74, y + 18, x + 62, y + 14);
  ctx.bezierCurveTo(x + 52, y + 10, x + 54, y,      x + 56, y);

  // connect to 's' curve
  ctx.bezierCurveTo(x + 86, y + 4,  x + 98, y - 4,  x + 94, y + 14);
  ctx.bezierCurveTo(x + 90, y + 30, x + 76, y + 30, x + 72, y + 18);

  // sweeping underline
  ctx.moveTo(x - 46, y + 24);
  ctx.bezierCurveTo(x + 10, y + 38, x + 72, y + 32, x + 104, y + 12);
  ctx.stroke();
  ctx.restore();
}

function drawCrest(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) {
  ctx.save();
  
  // 1. Draw Ribbons
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.85;
  
  // Left ribbon
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy + 15);
  ctx.lineTo(cx - 35, cy + 80);
  ctx.lineTo(cx - 20, cy + 70);
  ctx.lineTo(cx - 5, cy + 80);
  ctx.closePath();
  ctx.fill();
  
  // Right ribbon
  ctx.beginPath();
  ctx.moveTo(cx + 15, cy + 15);
  ctx.lineTo(cx + 5, cy + 80);
  ctx.lineTo(cx + 20, cy + 70);
  ctx.lineTo(cx + 35, cy + 80);
  ctx.closePath();
  ctx.fill();
  
  // Restore opacity
  ctx.globalAlpha = 1.0;
  
  // 2. Outer gold serrated/star shape (the seal backing)
  const outerRadius = 50;
  const innerRadius = 42;
  const points = 32;
  ctx.fillStyle = "#D4AF37"; // Metallic Gold
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
  
  // 3. Inner golden-yellow circle
  ctx.fillStyle = "#F9F5E3"; // Soft gold cream
  ctx.beginPath();
  ctx.arc(cx, cy, 35, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  
  // 4. Accent thin ring inside
  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 31, 0, Math.PI * 2);
  ctx.stroke();
  
  // 5. Star or emblem in the center of the crest
  drawSpike(ctx, cx, cy - 4, 12, color);
  
  // 6. Text inside the seal: "CS501" / "VERIFIED"
  ctx.fillStyle = color;
  ctx.font = "bold 8px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("CS501", cx, cy + 16);
  ctx.font = "800 5.5px 'Inter', sans-serif";
  ctx.fillText("VERIFIED", cx, cy + 23);
  
  ctx.restore();
}

function drawSpike(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  // 4-point star matching the .spike glyph
  const pts = [
    [cx, cy - r],
    [cx + r * 0.28, cy - r * 0.28],
    [cx + r, cy],
    [cx + r * 0.28, cy + r * 0.28],
    [cx, cy + r],
    [cx - r * 0.28, cy + r * 0.28],
    [cx - r, cy],
    [cx - r * 0.28, cy - r * 0.28],
  ];
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fill();
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function slug(s: string) {
  return (s || "learner").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "learner";
}

export function downloadCertificatePDF(name: string) {
  registerCertificate(name); // Register on Supabase async
  const W = 1600;
  const H = 1131; // A4 landscape ratio
  const scale = 2; // retina

  // Page 1: Landscape Certificate Canvas
  const canvas1 = document.createElement("canvas");
  canvas1.width = W * scale;
  canvas1.height = H * scale;
  const ctx1 = canvas1.getContext("2d");
  if (!ctx1) return;
  ctx1.scale(scale, scale);
  drawCertificateCanvas(ctx1, W, H, name);
  const imgData1 = canvas1.toDataURL("image/png");

  // Page 2: Portrait Acknowledgement Canvas
  const W2 = 1131;
  const H2 = 1600; // A4 portrait ratio
  const canvas2 = document.createElement("canvas");
  canvas2.width = W2 * scale;
  canvas2.height = H2 * scale;
  const ctx2 = canvas2.getContext("2d");
  if (!ctx2) return;
  ctx2.scale(scale, scale);
  drawAcknowledgementCanvas(ctx2, W2, H2, name);
  const imgData2 = canvas2.toDataURL("image/png");

  // Create PDF
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  // Page 1
  pdf.addImage(imgData1, "PNG", 0, 0, 297, 210);

  // Page 2
  pdf.addPage("a4", "portrait");
  pdf.addImage(imgData2, "PNG", 0, 0, 210, 297);

  // Download
  pdf.save(`cpp-crashed-credential-${slug(name)}.pdf`);
}

export function drawAcknowledgementCanvas(ctx: CanvasRenderingContext2D, W: number, H: number, name: string) {
  // read live theme tokens so light/dark certificates look native
  const css = getComputedStyle(document.documentElement);
  const t = (v: string, fb: string) => (css.getPropertyValue(v).trim() || fb);
  const bg = t("--canvas", "#faf9f5");
  const surface = t("--surface-soft", "#f5f0e8");
  const ink = t("--ink", "#141413");
  const body = t("--body", "#3d3d3a");
  const muted = t("--muted", "#6c6a64");
  const hairline = t("--hairline", "#e6dfd8");
  const primary = t("--primary", "#cc785c");
  const success = t("--success", "#5db872");

  // background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Draw background pattern (subtle dot grid)
  ctx.fillStyle = hairline;
  ctx.globalAlpha = 0.35;
  const gridSpacing = 40;
  for (let x = 72 + gridSpacing; x < W - 72; x += gridSpacing) {
    for (let y = 72 + gridSpacing; y < H - 72; y += gridSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1.0;

  // Draw large background watermark (a giant, thin, semi-transparent C++ style badge)
  ctx.strokeStyle = primary;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.015; // extremely faint
  ctx.save();
  ctx.translate(W / 2, H / 2);
  
  // Giant star
  ctx.beginPath();
  const numPoints = 8;
  const outerR = 300;
  const innerR = 150;
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? outerR : innerR;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
  ctx.globalAlpha = 1.0;

  // outer hairline frame
  ctx.strokeStyle = hairline;
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  // inner accent frame
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 72, W - 144, H - 144);

  // top label band
  ctx.fillStyle = surface;
  ctx.fillRect(72, 72, W - 144, 96);

  ctx.fillStyle = muted;
  ctx.font = "500 15px 'JetBrains Mono', ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("C++ CRASHED · CS501 · CURRICULUM outline", 104, 130);

  ctx.textAlign = "right";
  ctx.fillText(`VERIFY: ${getVerificationId(name)}`, W - 104, 130);

  // 4-point spike mark, top-center
  drawSpike(ctx, W / 2, 220, 20, primary);

  // Header Titles
  ctx.fillStyle = muted;
  ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
  ctx.textAlign = "center";
  ctx.fillText("Official Record of Achievement", W / 2, 275);

  ctx.fillStyle = ink;
  ctx.font = "bold 56px 'Instrument Serif', Garamond, serif";
  ctx.fillText("Document of Acknowledgement", W / 2, 345);

  // Body text
  ctx.fillStyle = body;
  ctx.font = "400 20px 'Inter', -apple-system, sans-serif";
  ctx.fillText("This document serves as an official curriculum record and acknowledgement of", W / 2, 420);
  ctx.fillText("the academic accomplishment of the learner named below in C++ programming:", W / 2, 450);

  // Name
  ctx.fillStyle = primary;
  ctx.font = "400 68px 'Instrument Serif', Garamond, serif";
  ctx.fillText(name || "A determined learner", W / 2, 535);

  ctx.fillStyle = muted;
  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillText(`ISSUED ON ${formatDate(new Date()).toUpperCase()}`, W / 2, 575);

  // Outline Header
  ctx.fillStyle = ink;
  ctx.font = "italic 24px 'Instrument Serif', Garamond, serif";
  ctx.fillText("Completed Curriculum Outline", W / 2, 635);

  // Modules outline grid
  const modulesList = [
    { title: "Module 1: Foundations", desc: "Algorithms, flowcharts, compilation, & variables." },
    { title: "Module 2: Operators & Control Flow", desc: "Logic operators, expressions, if/else, & switch decisions." },
    { title: "Module 3: Loops", desc: "for/while/do-while loops, break/continue, & random numbers." },
    { title: "Module 4: Arrays", desc: "One-dimensional and multi-dimensional memory layouts." },
    { title: "Module 5: Functions", desc: "Function parameters, scopes, return values, & pass-by-reference." },
    { title: "Module 6: Recursion & Strings", desc: "Recursive logic calls, tracing stacks, & character arrays." },
    { title: "Module 7: Structures & Files", desc: "Custom struct models, arrays of structs, & persistent file streams." },
    { title: "Module 8: Code Quality", desc: "Refactoring standards, clean code principles, & documentation." }
  ];

  const colW = 430;
  const cardH = 100;
  const colGap = 40;
  const startX = 120;
  const startY = 670;
  const rowGap = 25;

  modulesList.forEach((mod, idx) => {
    const colIdx = idx % 2;
    const rowIdx = Math.floor(idx / 2);
    const cx = startX + colIdx * (colW + colGap);
    const cy = startY + rowIdx * (cardH + rowGap);

    // Card background
    ctx.strokeStyle = hairline;
    ctx.lineWidth = 1;
    ctx.fillStyle = surface;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(cx, cy, colW, cardH, 8);
    } else {
      ctx.rect(cx, cy, colW, cardH);
    }
    ctx.fill();
    ctx.stroke();

    // Checkmark/Passed text top right
    ctx.fillStyle = success;
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText("✓ PASSED", cx + colW - 15, cy + 28);

    // Module title
    ctx.fillStyle = primary;
    ctx.font = "400 18px 'Instrument Serif', Garamond, serif";
    ctx.textAlign = "left";
    ctx.fillText(mod.title, cx + 15, cy + 28);

    // Module description text wrapped
    ctx.fillStyle = body;
    ctx.font = "400 13px 'Inter', sans-serif";
    
    // Manual text wrap
    const descText = mod.desc;
    const words = descText.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let metrics = ctx.measureText(testLine);
      if (metrics.width > colW - 30 && i > 0) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    lines.slice(0, 2).forEach((txt, lineIdx) => {
      ctx.fillText(txt, cx + 15, cy + 54 + lineIdx * 18);
    });
  });

  // Hairline above signatures
  ctx.strokeStyle = hairline;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 1410);
  ctx.lineTo(W - 120, 1410);
  ctx.stroke();

  // === 4-member signature row ===
  const ackSigMembers = [
    { name: "Zaki Ul Hassan",  role: "TEAM LEADER",  drawFn: drawSignatureZaki   },
    { name: "Saad Qureshi",    role: "VIBE CODER",   drawFn: drawSignatureSaad   },
    { name: "Aliba Shakeel",   role: "VIBE CODER",   drawFn: drawSignatureAliba  },
    { name: "Anosha Shakeel",  role: "VIBE CODER",   drawFn: drawSignatureAnosha },
  ];

  const ackSigZoneW = W - 240;
  const ackSigSlotW = ackSigZoneW / ackSigMembers.length;
  const ackSigBaseY = 1410;

  ackSigMembers.forEach((member, i) => {
    const slotX = 120 + i * ackSigSlotW;
    const slotCX = slotX + ackSigSlotW / 2;

    member.drawFn(ctx, slotCX, ackSigBaseY - 10, primary);

    ctx.fillStyle = muted;
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(member.role, slotCX, ackSigBaseY + 22);

    ctx.fillStyle = ink;
    ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
    ctx.textAlign = "center";
    ctx.fillText(member.name, slotCX, ackSigBaseY + 46);

    if (i < ackSigMembers.length - 1) {
      ctx.strokeStyle = hairline;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(slotX + ackSigSlotW, ackSigBaseY + 5);
      ctx.lineTo(slotX + ackSigSlotW, ackSigBaseY + 58);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  });

  // DATE ISSUED
  ctx.fillStyle = muted;
  ctx.font = "500 11px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("DATE ISSUED", 120, 1485);
  ctx.fillStyle = ink;
  ctx.font = "italic 22px 'Instrument Serif', Garamond, serif";
  ctx.fillText(formatDate(new Date()), 120, 1510);

  // Official Gold Crest / Seal
  drawCrest(ctx, W / 2, 1470, primary);

  // footer mono
  ctx.fillStyle = muted;
  ctx.font = "500 11px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("cpp-crashed · interactive · browser-based · no account required", W / 2, H - 90);
}

export function downloadSyllabusPDF() {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pad = 20;

  const drawHeader = (pageNum: number) => {
    // Header line & title
    pdf.setDrawColor(220, 210, 200);
    pdf.setLineWidth(0.5);
    pdf.line(pad, pad + 10, 210 - pad, pad + 10);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text("CS501 · C++ CRASHED · REFERENCE MANUAL", pad, pad + 5);
    pdf.text(`PAGE ${pageNum} OF 2`, 210 - pad, pad + 5, { align: "right" });
  };

  // ==================== PAGE 1 ====================
  drawHeader(1);

  pdf.setFont("times", "italic");
  pdf.setFontSize(28);
  pdf.setTextColor(204, 120, 92); // Terracotta accent
  pdf.text("Syllabus & Code Reference", pad, pad + 25);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(80, 80, 80);
  const intro = "This manual serves as a quick-reference syntax guide and syllabus outline for the CS501 curriculum. It covers variables, operators, looping constructs, array manipulation, procedural functions, recursion, structures, and persistent file input/output.";
  const introLines = pdf.splitTextToSize(intro, 170);
  pdf.text(introLines, pad, pad + 33);

  // Modules 1 to 4 details
  const p1Modules = [
    {
      num: "01",
      title: "Foundations & Basics",
      desc: "Compilation pipelines, compilers vs interpreters, memory storage, & initialization.",
      code: [
        '#include <iostream>',
        'int main() {',
        '  int age = 21;',
        '  std::cout << "Age: " << age;',
        '  return 0;',
        '}'
      ]
    },
    {
      num: "02",
      title: "Operators & Decisions",
      desc: "Relational/logical expressions, truth tables, if-else branches, switch statements.",
      code: [
        'if (score >= 90 && active) {',
        '  grade = \'A\';',
        '} else if (score >= 80) {',
        '  grade = \'B\';',
        '} else {',
        '  grade = \'F\';',
        '}'
      ]
    },
    {
      num: "03",
      title: "Loops & Control Flow",
      desc: "Iterative execution loops, break and continue flow interrupts, and random seeds.",
      code: [
        'for (int i = 0; i < 10; ++i) {',
        '  if (i == 5) continue;',
        '  std::cout << i << " ";',
        '}',
        'while (running) { /* ... */ }'
      ]
    },
    {
      num: "04",
      title: "Arrays & Sorting",
      desc: "Contiguous memory layouts, 1D and 2D arrays, element swapping, and bubble/selection sort.",
      code: [
        'int matrix[2][3] = {{1,2,3}, {4,5,6}};',
        'for (int r = 0; r < 2; ++r) {',
        '  for (int c = 0; c < 3; ++c) {',
        '    std::cout << matrix[r][c];',
        '  }',
        '}'
      ]
    }
  ];

  let y = 78;
  p1Modules.forEach((m) => {
    // Number and Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(204, 120, 92);
    pdf.text(m.num, pad, y);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text(m.title, pad + 10, y);

    // Description
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(90, 90, 90);
    const descLines = pdf.splitTextToSize(m.desc, 80);
    pdf.text(descLines, pad + 10, y + 5);

    // Code Box Background
    const boxX = 115;
    const boxY = y - 4;
    const boxW = 75;
    const boxH = 40;
    pdf.setDrawColor(230, 225, 218);
    pdf.setFillColor(249, 248, 245);
    pdf.rect(boxX, boxY, boxW, boxH, "F");

    // Code text
    pdf.setFont("courier", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(50, 50, 50);
    let codeY = boxY + 6;
    m.code.forEach((line) => {
      pdf.text(line, boxX + 4, codeY);
      codeY += 5.5;
    });

    y += 50;
  });

  // Footer page 1
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text("CS501 C++ Crashed Course Syllabus · Zaki Ul Hassan", 105, 282, { align: "center" });

  // ==================== PAGE 2 ====================
  pdf.addPage("a4", "portrait");
  drawHeader(2);

  pdf.setFont("times", "italic");
  pdf.setFontSize(28);
  pdf.setTextColor(204, 120, 92);
  pdf.text("Advanced Syllabus Modules", pad, pad + 25);

  const p2Modules = [
    {
      num: "05",
      title: "Modular Functions",
      desc: "Function definitions, prototyping, local vs global scope, value vs reference params.",
      code: [
        '// Pass by reference',
        'void swap(int &a, int &b) {',
        '  int temp = a;',
        '  a = b;',
        '  b = temp;',
        '}'
      ]
    },
    {
      num: "06",
      title: "Recursion & Strings",
      desc: "Recursive stack traces, base cases vs recursive steps, character array string mapping.",
      code: [
        'int factorial(int n) {',
        '  if (n <= 1) return 1; // Base',
        '  return n * factorial(n - 1);',
        '}',
        'char phrase[] = "C++ Crashed";'
      ]
    },
    {
      num: "07",
      title: "Structures & Files",
      desc: "Heterogeneous struct records, arrays of structures, persistent file streams, ifstream/ofstream.",
      code: [
        'struct Student {',
        '  std::string name;',
        '  double gpa;',
        '};',
        'std::ofstream out("scores.txt");',
        'out << "Ada " << 4.0;'
      ]
    },
    {
      num: "08",
      title: "Code Quality & Refactoring",
      desc: "Self-documenting code naming conventions, formatting, single-responsibility functions.",
      code: [
        '// Bad: void p(int x) { ... }',
        '// Good practice refactored:',
        'void printUserAge(int age) {',
        '  std::cout << "Age: " << age;',
        '}'
      ]
    }
  ];

  y = 78;
  p2Modules.forEach((m) => {
    // Number and Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(204, 120, 92);
    pdf.text(m.num, pad, y);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text(m.title, pad + 10, y);

    // Description
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(90, 90, 90);
    const descLines = pdf.splitTextToSize(m.desc, 80);
    pdf.text(descLines, pad + 10, y + 5);

    // Code Box Background
    const boxX = 115;
    const boxY = y - 4;
    const boxW = 75;
    const boxH = 40;
    pdf.setDrawColor(230, 225, 218);
    pdf.setFillColor(249, 248, 245);
    pdf.rect(boxX, boxY, boxW, boxH, "F");

    // Code text
    pdf.setFont("courier", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(50, 50, 50);
    let codeY = boxY + 6;
    m.code.forEach((line) => {
      pdf.text(line, boxX + 4, codeY);
      codeY += 5.5;
    });

    y += 50;
  });

  // Footer page 2
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text("CS501 C++ Crashed Course Syllabus · Zaki Ul Hassan", 105, 282, { align: "center" });

  pdf.save("cpp-crashed-syllabus-manual.pdf");
}

export async function registerCertificate(name: string) {
  const activeName = (name || "Learner").trim();
  try {
    let isUnique = false;
    let verId = "";
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      verId = getVerificationId(activeName);
      
      // Query the database to check if this ID already exists
      const { data, error } = await supabase
        .from("certificates")
        .select("id")
        .eq("id", verId)
        .maybeSingle();

      if (error) {
        console.error("Error checking ID uniqueness:", error);
        break; // Other error, break to prevent infinite loop
      }

      if (!data) {
        // ID is unique (no matching record found in Supabase)
        isUnique = true;
      } else {
        // ID already exists, clear from cache to generate a new one
        attempts++;
        console.warn(`ID collision found for ${verId}. Regenerating a new unique ID... (Attempt ${attempts}/${maxAttempts})`);
        if (typeof window !== "undefined") {
          try {
            const storageKey = "pf-certificates-v1";
            const cachedIds = JSON.parse(localStorage.getItem(storageKey) || "{}");
            delete cachedIds[activeName];
            localStorage.setItem(storageKey, JSON.stringify(cachedIds));
          } catch (e) {
            console.error("Failed to clear colliding ID from cache", e);
          }
        }
      }
    }

    // Now insert the verified unique ID
    if (isUnique) {
      const { error } = await supabase.from("certificates").insert([
        {
          id: verId,
          name: activeName,
          course: "C++ Crashed: Interactive Programming Fundamentals (CS501)",
        }
      ]);
      if (error) {
        console.error("Failed to insert certificate after uniqueness check:", error);
      }
    }
  } catch (err) {
    console.error("Failed to register certificate:", err);
  }
}
