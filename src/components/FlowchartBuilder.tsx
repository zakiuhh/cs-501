import { useState, useEffect } from "react";
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  X,
  HelpCircle,
  Move
} from "lucide-react";
import { FlowchartPuzzle, FlowchartBlock } from "@/data/flowcharts";

export function FlowchartBuilder({ puzzle, onComplete }: { puzzle: FlowchartPuzzle; onComplete?: () => void }) {
  const [available, setAvailable] = useState<FlowchartBlock[]>([]);
  const [mainSlots, setMainSlots] = useState<(FlowchartBlock | null)[]>([]);
  const [leftBranchSlot, setLeftBranchSlot] = useState<FlowchartBlock | null>(null);
  const [rightBranchSlot, setRightBranchSlot] = useState<FlowchartBlock | null>(null);
  
  const [activeDrag, setActiveDrag] = useState<{
    block: FlowchartBlock;
    source: "available" | "mainSlot" | "leftBranchSlot" | "rightBranchSlot";
    slotIndex: number | null;
  } | null>(null);
  
  const [checked, setChecked] = useState(false);
  const [success, setSuccess] = useState(false);

  // Locate the correct index where the decision block belongs
  const decisionBlockId = puzzle.blocks.find((b) => b.type === "decision")?.id || "";
  const dIdx = puzzle.correctOrder.indexOf(decisionBlockId);
  const linearSize = puzzle.blocks.length - 2;

  // Initialize and reset
  useEffect(() => {
    resetPuzzle();
  }, [puzzle]);

  const resetPuzzle = () => {
    const shuffled = [...puzzle.blocks].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
    setMainSlots(Array(linearSize).fill(null));
    setLeftBranchSlot(null);
    setRightBranchSlot(null);
    setChecked(false);
    setSuccess(false);
    setActiveDrag(null);
  };

  // Drag and Drop handlers
  const handleDragStart = (
    e: React.DragEvent,
    block: FlowchartBlock,
    source: "available" | "mainSlot" | "leftBranchSlot" | "rightBranchSlot",
    slotIndex: number | null
  ) => {
    if (success) {
      e.preventDefault();
      return;
    }
    setActiveDrag({ block, source, slotIndex });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (activeDrag && activeDrag.source !== "available" && e.dataTransfer.dropEffect === "none") {
      // Dragged away and dropped outside a valid target -> unsnap it
      let newAvailable = [...available];
      const newMainSlots = [...mainSlots];
      let newLeftBranch = leftBranchSlot;
      let newRightBranch = rightBranchSlot;

      const block = activeDrag.block;
      const source = activeDrag.source;

      if (source === "mainSlot") {
        const srcIdx = activeDrag.slotIndex!;
        newMainSlots[srcIdx] = null;
        if (srcIdx === dIdx) {
          if (newLeftBranch) newAvailable.push(newLeftBranch);
          if (newRightBranch) newAvailable.push(newRightBranch);
          newLeftBranch = null;
          newRightBranch = null;
        }
      } else if (source === "leftBranchSlot") {
        newLeftBranch = null;
      } else if (source === "rightBranchSlot") {
        newRightBranch = null;
      }

      newAvailable.push(block);

      setMainSlots(newMainSlots);
      setAvailable(newAvailable);
      setLeftBranchSlot(newLeftBranch);
      setRightBranchSlot(newRightBranch);
      setChecked(false);
    }
    setActiveDrag(null);
  };

  const handleDropToMainSlot = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!activeDrag) return;

    if (activeDrag.source === "mainSlot" && activeDrag.slotIndex === index) {
      setActiveDrag(null);
      return;
    }

    const newMainSlots = [...mainSlots];
    let newAvailable = [...available];
    let newLeftBranch = leftBranchSlot;
    let newRightBranch = rightBranchSlot;

    const clearBranchSlots = () => {
      if (newLeftBranch) {
        newAvailable.push(newLeftBranch);
        newLeftBranch = null;
      }
      if (newRightBranch) {
        newAvailable.push(newRightBranch);
        newRightBranch = null;
      }
    };

    const block = activeDrag.block;
    const source = activeDrag.source;

    // 1. Remove from source
    if (source === "available") {
      newAvailable = newAvailable.filter((b) => b.id !== block.id);
    } else if (source === "mainSlot") {
      const srcIdx = activeDrag.slotIndex!;
      newMainSlots[srcIdx] = null;
      if (srcIdx === dIdx) {
        clearBranchSlots();
      }
    } else if (source === "leftBranchSlot") {
      newLeftBranch = null;
    } else if (source === "rightBranchSlot") {
      newRightBranch = null;
    }

    // 2. Displace target if occupied
    const existing = mainSlots[index];
    if (existing) {
      newAvailable.push(existing);
      if (index === dIdx) {
        clearBranchSlots();
      }
    }

    newMainSlots[index] = block;

    setMainSlots(newMainSlots);
    setAvailable(newAvailable);
    setLeftBranchSlot(newLeftBranch);
    setRightBranchSlot(newRightBranch);
    setActiveDrag(null);
    setChecked(false);
  };

  const handleDropToBranchSlot = (e: React.DragEvent, branch: "left" | "right") => {
    e.preventDefault();
    if (!activeDrag) return;

    if (
      (activeDrag.source === "leftBranchSlot" && branch === "left") ||
      (activeDrag.source === "rightBranchSlot" && branch === "right")
    ) {
      setActiveDrag(null);
      return;
    }

    let newAvailable = [...available];
    const newMainSlots = [...mainSlots];
    let newLeftBranch = leftBranchSlot;
    let newRightBranch = rightBranchSlot;

    const block = activeDrag.block;
    const source = activeDrag.source;

    // 1. Remove from source
    if (source === "available") {
      newAvailable = newAvailable.filter((b) => b.id !== block.id);
    } else if (source === "mainSlot") {
      const srcIdx = activeDrag.slotIndex!;
      newMainSlots[srcIdx] = null;
      if (srcIdx === dIdx) {
        if (newLeftBranch) newAvailable.push(newLeftBranch);
        if (newRightBranch) newAvailable.push(newRightBranch);
        newLeftBranch = null;
        newRightBranch = null;
      }
    } else if (source === "leftBranchSlot") {
      newLeftBranch = null;
    } else if (source === "rightBranchSlot") {
      newRightBranch = null;
    }

    // 2. Place in branch
    if (branch === "left") {
      if (newLeftBranch) {
        newAvailable.push(newLeftBranch);
      }
      newLeftBranch = block;
    } else {
      if (newRightBranch) {
        newAvailable.push(newRightBranch);
      }
      newRightBranch = block;
    }

    setMainSlots(newMainSlots);
    setAvailable(newAvailable);
    setLeftBranchSlot(newLeftBranch);
    setRightBranchSlot(newRightBranch);
    setActiveDrag(null);
    setChecked(false);
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!activeDrag || activeDrag.source === "available") return;

    let newAvailable = [...available];
    const newMainSlots = [...mainSlots];
    let newLeftBranch = leftBranchSlot;
    let newRightBranch = rightBranchSlot;

    const block = activeDrag.block;
    const source = activeDrag.source;

    if (source === "mainSlot") {
      const srcIdx = activeDrag.slotIndex!;
      newMainSlots[srcIdx] = null;
      if (srcIdx === dIdx) {
        if (newLeftBranch) newAvailable.push(newLeftBranch);
        if (newRightBranch) newAvailable.push(newRightBranch);
        newLeftBranch = null;
        newRightBranch = null;
      }
    } else if (source === "leftBranchSlot") {
      newLeftBranch = null;
    } else if (source === "rightBranchSlot") {
      newRightBranch = null;
    }

    newAvailable.push(block);

    setMainSlots(newMainSlots);
    setAvailable(newAvailable);
    setLeftBranchSlot(newLeftBranch);
    setRightBranchSlot(newRightBranch);
    setActiveDrag(null);
    setChecked(false);
  };

  // Tap-to-move fallback (mobile support)
  const handleAvailableClick = (block: FlowchartBlock) => {
    if (success) return;

    let newMainSlots = [...mainSlots];
    let newLeftBranch = leftBranchSlot;
    let newRightBranch = rightBranchSlot;
    let placed = false;

    const isDecisionPlaced = mainSlots[dIdx]?.type === "decision";

    if (isDecisionPlaced) {
      // 1. Fill main slots up to decision box
      for (let i = 0; i <= dIdx; i++) {
        if (newMainSlots[i] === null) {
          newMainSlots[i] = block;
          placed = true;
          break;
        }
      }
      // 2. Fill left branch slot
      if (!placed && newLeftBranch === null) {
        newLeftBranch = block;
        placed = true;
      }
      // 3. Fill right branch slot
      if (!placed && newRightBranch === null) {
        newRightBranch = block;
        placed = true;
      }
      // 4. Fill main slots after decision box
      if (!placed) {
        for (let i = dIdx + 1; i < newMainSlots.length; i++) {
          if (newMainSlots[i] === null) {
            newMainSlots[i] = block;
            placed = true;
            break;
          }
        }
      }
    } else {
      // Decision box not yet placed - fill first empty main slot
      const firstEmpty = newMainSlots.findIndex((s) => s === null);
      if (firstEmpty !== -1) {
        newMainSlots[firstEmpty] = block;
        placed = true;
      }
    }

    if (placed) {
      setMainSlots(newMainSlots);
      setLeftBranchSlot(newLeftBranch);
      setRightBranchSlot(newRightBranch);
      setAvailable(available.filter((b) => b.id !== block.id));
      setChecked(false);
    }
  };

  const handleMainSlotClick = (index: number) => {
    if (success) return;
    const block = mainSlots[index];
    if (block) {
      const newMainSlots = [...mainSlots];
      newMainSlots[index] = null;
      let newAvailable = [...available, block];
      let newLeftBranch = leftBranchSlot;
      let newRightBranch = rightBranchSlot;

      if (index === dIdx) {
        if (newLeftBranch) newAvailable.push(newLeftBranch);
        if (newRightBranch) newAvailable.push(newRightBranch);
        newLeftBranch = null;
        newRightBranch = null;
      }

      setMainSlots(newMainSlots);
      setAvailable(newAvailable);
      setLeftBranchSlot(newLeftBranch);
      setRightBranchSlot(newRightBranch);
      setChecked(false);
    }
  };

  const handleBranchClick = (branch: "left" | "right") => {
    if (success) return;
    const block = branch === "left" ? leftBranchSlot : rightBranchSlot;
    if (block) {
      if (branch === "left") {
        setLeftBranchSlot(null);
      } else {
        setRightBranchSlot(null);
      }
      setAvailable([...available, block]);
      setChecked(false);
    }
  };

  // Evaluate solutions
  const checkSolution = () => {
    const isDecisionPlaced = mainSlots[dIdx]?.type === "decision";

    if (mainSlots.some((s) => s === null)) {
      setChecked(true);
      setSuccess(false);
      return;
    }

    if (isDecisionPlaced && (leftBranchSlot === null || rightBranchSlot === null)) {
      setChecked(true);
      setSuccess(false);
      return;
    }

    const assembledOrder: string[] = [];
    for (let i = 0; i <= dIdx; i++) {
      if (mainSlots[i]) assembledOrder.push(mainSlots[i]!.id);
    }
    if (leftBranchSlot) assembledOrder.push(leftBranchSlot.id);
    if (rightBranchSlot) assembledOrder.push(rightBranchSlot.id);
    for (let i = dIdx + 1; i < mainSlots.length; i++) {
      if (mainSlots[i]) assembledOrder.push(mainSlots[i]!.id);
    }

    const assembledLabels = assembledOrder.map(id => puzzle.blocks.find(b => b.id === id)?.label || "");
    const correctLabels = puzzle.correctOrder.map(id => puzzle.blocks.find(b => b.id === id)?.label || "");

    const isCorrect = assembledLabels.length === correctLabels.length &&
      assembledLabels.every((label, idx) => label === correctLabels[idx]);

    setChecked(true);
    setSuccess(isCorrect);
    if (isCorrect && onComplete) {
      onComplete();
    }
  };

  // Visual layout helper
  const getShapeStyle = (type: string) => {
    switch (type) {
      case "terminal":
        return "border-2 border-accent-teal bg-accent-teal/10 rounded-full py-1.5 px-3 sm:py-2 sm:px-5 text-center font-semibold text-[11px] sm:text-[12.5px]";
      case "process":
        return "border-2 border-primary bg-primary/10 rounded-md py-1.5 px-3 sm:py-2 sm:px-5 text-center font-medium text-[11px] sm:text-[12.5px]";
      case "decision":
        return "border-2 border-accent-amber bg-accent-amber/10 py-2.5 px-3 sm:py-3.5 sm:px-4 text-center font-medium aspect-square max-w-[95px] sm:max-w-[120px] flex items-center justify-center rotate-45 [&>*]:-rotate-45 text-[11px] sm:text-[12.5px]";
      case "io":
        return "border-2 border-indigo-400 bg-indigo-400/10 skew-x-12 py-1.5 px-3 sm:py-2 sm:px-5 text-center font-medium [&>*]:-skew-x-12 text-[11px] sm:text-[12.5px]";
      default:
        return "border border-hairline bg-surface-card rounded-lg py-1.5 px-3 sm:py-2 sm:px-5 text-center text-[11px] sm:text-[12.5px]";
    }
  };

  const isDecisionPlaced = mainSlots[dIdx]?.type === "decision";

  // Group available blocks by label to prevent duplicates on the UI
  const groupedAvailable: { block: FlowchartBlock; count: number }[] = [];
  available.forEach((b) => {
    const existing = groupedAvailable.find((g) => g.block.label === b.label);
    if (existing) {
      existing.count++;
    } else {
      groupedAvailable.push({ block: b, count: 1 });
    }
  });

  return (
    <div className="space-y-5">
      {/* Game Header */}
      <div className="bg-surface-card border border-hairline rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl text-ink">{puzzle.title}</h2>
          <p className="text-body text-[13.5px] mt-0.5 leading-relaxed">{puzzle.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={resetPuzzle}
            className="flex items-center gap-1.5 text-body hover:text-ink border border-hairline bg-canvas rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button 
            onClick={checkSolution}
            disabled={mainSlots.every((s) => s === null)}
            className="btn-primary text-[12.5px] px-4 py-1.5 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Check Order</span>
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid md:grid-cols-12 gap-5 items-start">
        {/* Available blocks panel */}
        <div 
          className="md:col-span-5 bg-surface-card border border-hairline rounded-xl p-4 animate-blur-in-soft md:sticky md:top-[160px] self-start md:max-h-[calc(100vh-220px)] md:overflow-y-auto pr-1.5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToAvailable}
        >
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-muted" />
            <h3 className="font-serif text-[17px] text-ink font-medium">Available Steps</h3>
          </div>
          <p className="text-[12.5px] text-muted mb-3">Drag steps to the right to snap them, or tap to place them.</p>
          
          {available.length === 0 ? (
            <div className="text-center py-6 text-muted text-[12.5px] border-2 border-dashed border-hairline rounded-lg">
              All steps are placed. Drag away from slots to unsnap them.
            </div>
          ) : (
            <div className="space-y-3 py-1">
              {groupedAvailable.map(({ block, count }) => (
                <div
                  key={block.id}
                  className={`w-full flex items-center justify-center ${block.type === "decision" ? "min-h-[100px]" : "min-h-[48px]"}`}
                >
                  <div
                    draggable={!success}
                    onDragStart={(e) => handleDragStart(e, block, "available", null)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleAvailableClick(block)}
                    className={`w-full max-w-[200px] text-[12.5px] text-ink cursor-grab active:cursor-grabbing transform transition-transform hover:scale-[1.03] select-none flex items-center justify-center gap-1.5 ${getShapeStyle(block.type)}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Move className="w-3.5 h-3.5 opacity-40 shrink-0 print:hidden" />
                      <span>
                        {block.label}
                        {count > 1 && (
                          <span className="ml-1.5 bg-primary/20 text-primary text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md">
                            x{count}
                          </span>
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Target Workspace slots */}
        <div className="md:col-span-7 bg-surface-card border border-hairline rounded-xl p-4 md:p-5 md:max-h-[calc(100vh-220px)] md:overflow-y-auto pr-1.5">
          <h3 className="font-serif text-[17px] text-ink font-medium mb-3">Workspace Flowchart</h3>
          
          <div className="flex flex-col items-center gap-3 py-1">
            {mainSlots.map((block, idx) => (
              <div key={idx} className="w-full flex flex-col items-center gap-3">
                {idx > 0 && (
                  <div className="w-0.5 h-4 bg-muted-soft opacity-30 flex items-center justify-center">
                    <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-soft mt-4" />
                  </div>
                )}
                
                {/* Main Slot */}
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropToMainSlot(e, idx)}
                  className={`w-full max-w-[340px] min-h-[48px] rounded-lg transition-all flex items-center justify-center border-2 ${
                    block 
                      ? "border-transparent bg-transparent" 
                      : "border-dashed border-hairline bg-canvas/30 hover:bg-canvas/50"
                  }`}
                >
                  {block ? (
                    <div
                      draggable={!success}
                      onDragStart={(e) => handleDragStart(e, block, "mainSlot", idx)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleMainSlotClick(idx)}
                      className={`w-full text-[12.5px] text-ink cursor-grab active:cursor-grabbing select-none flex items-center justify-center gap-1.5 ${getShapeStyle(block.type)}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Move className="w-3.5 h-3.5 opacity-40 shrink-0 print:hidden" />
                        <span>{block.label}</span>
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-muted font-mono uppercase tracking-wider">
                      {idx === dIdx ? "Decision Slot" : `Slot ${idx + 1}`}
                    </span>
                  )}
                </div>

                {/* Conditional branches underneath the decision slot */}
                {idx === dIdx && isDecisionPlaced && (
                  <div className="w-full flex flex-col items-center gap-3">
                    {/* Connecting arrows split */}
                    <div className="flex justify-between w-full max-w-[340px] px-8 py-0.5 opacity-45">
                      <span className="text-[12px] text-accent-teal font-mono uppercase tracking-wide">Yes</span>
                      <span className="text-[12px] text-accent-amber font-mono uppercase tracking-wide">No</span>
                    </div>

                    {/* Side by side branch slots */}
                    <div className="w-full max-w-[500px] grid grid-cols-2 gap-4 pb-1">
                      {/* Left Branch Slot (Yes) */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div 
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropToBranchSlot(e, "left")}
                          className={`w-full min-h-[48px] rounded-lg transition-all flex items-center justify-center border-2 ${
                            leftBranchSlot 
                              ? "border-transparent bg-transparent" 
                              : "border-dashed border-accent-teal/40 bg-canvas/20 hover:bg-canvas/40"
                          }`}
                        >
                          {leftBranchSlot ? (
                            <div
                              draggable={!success}
                              onDragStart={(e) => handleDragStart(e, leftBranchSlot, "leftBranchSlot", null)}
                              onDragEnd={handleDragEnd}
                              onClick={() => handleBranchClick("left")}
                              className={`w-full text-[12.5px] text-ink cursor-grab active:cursor-grabbing select-none flex items-center justify-center gap-1.5 ${getShapeStyle(leftBranchSlot.type)}`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Move className="w-3.5 h-3.5 opacity-40 shrink-0 print:hidden" />
                                <span>{leftBranchSlot.label}</span>
                              </span>
                            </div>
                          ) : (
                            <span className="text-[9.5px] text-accent-teal/70 font-mono uppercase tracking-wider px-1 text-center">
                              Yes Action
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Branch Slot (No) */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div 
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropToBranchSlot(e, "right")}
                          className={`w-full min-h-[48px] rounded-lg transition-all flex items-center justify-center border-2 ${
                            rightBranchSlot 
                              ? "border-transparent bg-transparent" 
                              : "border-dashed border-accent-amber/40 bg-canvas/20 hover:bg-canvas/40"
                          }`}
                        >
                          {rightBranchSlot ? (
                            <div
                              draggable={!success}
                              onDragStart={(e) => handleDragStart(e, rightBranchSlot, "rightBranchSlot", null)}
                              onDragEnd={handleDragEnd}
                              onClick={() => handleBranchClick("right")}
                              className={`w-full text-[12.5px] text-ink cursor-grab active:cursor-grabbing select-none flex items-center justify-center gap-1.5 ${getShapeStyle(rightBranchSlot.type)}`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Move className="w-3.5 h-3.5 opacity-40 shrink-0 print:hidden" />
                                <span>{rightBranchSlot.label}</span>
                              </span>
                            </div>
                          ) : (
                            <span className="text-[9.5px] text-accent-amber/70 font-mono uppercase tracking-wider px-1 text-center">
                              No Action
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification alerts */}
      {checked && (
        <div className={`p-5 rounded-xl border animate-blur-in ${
          success 
            ? "bg-success/10 border-success text-ink" 
            : "bg-error/10 border-error text-ink"
        }`}>
          {success ? (
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[15px]">Perfect logic!</h4>
                <p className="text-[13px] mt-1">You have correctly ordered the algorithm blocks. Excellent job.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-error shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[15px]">Logic error!</h4>
                <p className="text-[13px] mt-1">
                  {mainSlots.some((s) => s === null) || (isDecisionPlaced && (leftBranchSlot === null || rightBranchSlot === null))
                    ? "Fill all available slots in the workspace, including the branching Yes/No slots, to test." 
                    : "The logic sequence is incorrect. Try swapping blocks or tracing the flowchart from Start again."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
