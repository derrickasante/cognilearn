// src/lib/scoring.ts
import type { StroopEvent, GoNoGoEvent } from "../types";

export function summarizeStroop(events: StroopEvent[]) {
  const valid = events.filter(e => e.rtMs != null && e.isCorrect != null);
  const n = valid.length;
  const avgRT = n ? Math.round(valid.reduce((a,b)=>a+(b.rtMs || 0),0) / n) : 0;
  const accuracy = n ? valid.filter(e => e.isCorrect).length / n : 0;
  return { n, avgRT, accuracy };
}

export function summarizeGoNoGo(events: GoNoGoEvent[]) {
  const n = events.length;
  const accuracy = n ? events.filter(e => e.isCorrect).length / n : 0;
  const rtOnGo = events.filter(e => !e.isNoGo && e.rtMs != null);
  const avgRT = rtOnGo.length
    ? Math.round(rtOnGo.reduce((a,b)=>a+(b.rtMs || 0),0) / rtOnGo.length)
    : 0;
  return { n, avgRT, accuracy };
}

export function nextDifficulty(prev: { avgRT: number; accuracy: number }) {
  let congruentRatio = 0.5;
  let responseWindowMs = 2500;
  if (prev.accuracy > 0.9 && prev.avgRT < 700) { congruentRatio = 0.3; responseWindowMs = 2000; }
  else if (prev.accuracy < 0.7 || prev.avgRT > 1200) { congruentRatio = 0.7; responseWindowMs = 3000; }
  return { congruentRatio, responseWindowMs };
}

/* Optional: keep old imports working if any file still does `import { summarize }` */
export { summarizeStroop as summarize };
