import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar, FaSync, FaCheck, FaPen } from "react-icons/fa";
import { AI_DIALOG } from "../../data/testIds";

function AIGenerateDialog({ open, onOpenChange, title = "AI Suggestion", description, mockOutput, onAccept }) {
  const [state, setState] = useState("idle");
  const [output, setOutput] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);

  const variants = Array.isArray(mockOutput) ? mockOutput : [mockOutput || ""];

  const start = async () => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setOutput(variants[variantIdx % variants.length]);
    setState("ready");
  };

  const regenerate = async () => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 1600));
    const next = (variantIdx + 1) % variants.length;
    setVariantIdx(next);
    setOutput(variants[next]);
    setState("ready");
  };

  const close = (o) => {
    onOpenChange?.(o);
    if (!o) { setState("idle"); setOutput(""); setVariantIdx(0); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => close(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center"><FaStar className="h-4 w-4" /></span>
            <h3 className="font-heading font-bold text-lg">{title}</h3>
          </div>
          <button onClick={() => close(false)} className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <div className="min-h-[160px] rounded-xl border border-border bg-muted/40 p-4 text-sm">
            {state === "idle" && (
              <div className="h-full text-muted-foreground text-sm">
                Ready to generate. We'll create <span className="font-semibold text-foreground">3 tailored variants</span> — you can accept, edit or regenerate.
              </div>
            )}
            {state === "loading" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary text-xs font-mono-stat">thinking…</div>
                {[80, 95, 70, 88].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-foreground/10 relative overflow-hidden" style={{ width: `${w}%` }}>
                    <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                  </div>
                ))}
              </div>
            )}
            {(state === "ready" || state === "editing") && (
              <AnimatePresence mode="wait">
                <motion.div key={output} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {state === "editing" ? (
                    <textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={7} className="w-full bg-transparent focus:outline-none resize-none text-sm" />
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed">{output}</p>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t border-border">
          {(state === "ready" || state === "editing") && (
            <>
              <button type="button" onClick={regenerate} data-testid={AI_DIALOG.regenerateBtn} className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border text-xs font-semibold hover:bg-muted transition-colors"><FaSync className="h-4 w-4" /> Regenerate</button>
              <button type="button" onClick={() => setState(state === "editing" ? "ready" : "editing")} data-testid={AI_DIALOG.editBtn} className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border text-xs font-semibold hover:bg-muted transition-colors"><FaPen className="h-4 w-4" /> {state === "editing" ? "Done" : "Edit"}</button>
            </>
          )}
          {state === "idle" && (
            <button type="button" onClick={start} data-testid={AI_DIALOG.generateBtn} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"><FaStar className="h-4 w-4" /> Generate</button>
          )}
          {(state === "ready" || state === "editing") && (
            <button type="button" onClick={() => { onAccept?.(output); close(false); }} data-testid={AI_DIALOG.acceptBtn} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"><FaCheck className="h-4 w-4" /> Accept</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AIGenerateDialog;
