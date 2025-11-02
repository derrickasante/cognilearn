import { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import type { ColorWord, StroopEvent } from "../types";
import { summarizeStroop, nextDifficulty } from "../lib/scoring";

const COLORS: ColorWord[] = ["RED", "GREEN", "BLUE", "YELLOW"];
function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function StroopGame() {
  const [trial, setTrial] = useState(0);
  const [nTrials] = useState(30);
  const [events, setEvents] = useState<StroopEvent[]>([]);
  const [stim, setStim] = useState<{ word: ColorWord; font: ColorWord; congruent: boolean }>();
  const [sessionId, setSessionId] = useState<string>("");
  const [windowMs, setWindowMs] = useState(2500);
  const startMs = useRef<number | null>(null);

  useEffect(() => {
    const u = auth.currentUser; if (!u) return;
    const ref = doc(collection(db, "sessions"));
    setDoc(ref, { uid: u.uid, game: "stroop", startedAt: Date.now(), nTrials }).then(() => setSessionId(ref.id));
  }, []);

  useEffect(() => {
    if (trial >= nTrials) return;
    const { avgRT, accuracy } = summarizeStroop(events);
    const diff = nextDifficulty({ avgRT: avgRT || 1000, accuracy: accuracy || 0.8 });
    setWindowMs(diff.responseWindowMs);

    const congruent = Math.random() < diff.congruentRatio;
    const word = pick(COLORS);
    const font = congruent ? word : pick(COLORS.filter(c => c !== word));
    setStim({ word, font, congruent });

    startMs.current = performance.now();
    const to = setTimeout(() => handleAnswer(null), diff.responseWindowMs);
    return () => clearTimeout(to);
  }, [trial]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(choice: ColorWord | null) {
    if (!stim) return;
    const end = performance.now();
    const e: StroopEvent = {
      trialIndex: trial,
      word: stim.word,
      fontColor: stim.font,
      isCongruent: stim.congruent,
      choice: choice ?? undefined,
      isCorrect: choice ? choice === stim.font : false,
      rtMs: startMs.current ? Math.round(end - startMs.current) : undefined,
      ts: Date.now(),
    };
    const nextEvents = [...events, e];
    setEvents(nextEvents);
    if (sessionId) addDoc(collection(db, "sessions", sessionId, "events"), e);

    if (trial + 1 < nTrials) setTrial(t => t + 1);
    else finish(nextEvents);
  }

  async function finish(all: StroopEvent[]) {
    const s = summarizeStroop(all);
    if (sessionId) {
      await setDoc(doc(db, "sessions", sessionId), {
        endedAt: Date.now(), avgRT: s.avgRT, accuracy: s.accuracy
      }, { merge: true });
    }
  }

  if (trial >= nTrials) {
    const s = summarizeStroop(events);
    return (
      <div className="section">
        <div className="card">
          <h2>Session complete</h2>
          <p>Trials: {s.n} · Avg RT: {s.avgRT} ms · Accuracy: {(s.accuracy * 100).toFixed(0)}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ textAlign: "center" }}>
      <h2>Stroop — Trial {trial + 1}/{nTrials}</h2>
      <p>Press 1–4 or click a button below.</p>
      <div className="spacer"></div>

      {stim && <div className={`stim-word color-${stim.font}`}>{stim.word}</div>}

      <div className="choice-row">
        {COLORS.map((c) => (
          <button key={c} className="btn btn-ghost" onClick={() => handleAnswer(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="kb-hint">Time limit: {windowMs} ms</div>
    </div>
  );
}
