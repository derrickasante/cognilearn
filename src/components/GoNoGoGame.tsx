import { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { summarizeGoNoGo } from "../lib/scoring";
import type { GoNoGoEvent } from "../types";

export default function GoNoGoGame() {
  const nTrials = 30;
  const [trial, setTrial] = useState(0);
  const [stim, setStim] = useState<{ isNoGo: boolean }>();
  const [events, setEvents] = useState<GoNoGoEvent[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const windowMs = 1500; // fixed value; removes unused setter warning
  const startRef = useRef<number | null>(null);
  const respondedRef = useRef(false);

  useEffect(() => {
    const u = auth.currentUser; if (!u) return;
    const ref = doc(collection(db, "sessions"));
    setDoc(ref, { uid: u.uid, game: "gonogo", startedAt: Date.now(), nTrials });
    setSessionId(ref.id);
  }, []);

  useEffect(() => {
    if (trial >= nTrials) return;
    const isNoGo = Math.random() < 0.3; // 30% withhold trials
    setStim({ isNoGo });
    respondedRef.current = false;
    startRef.current = performance.now();
    const to = setTimeout(() => finishTrial(null), windowMs);
    return () => clearTimeout(to);
  }, [trial]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") finishTrial("space"); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stim, trial]); // eslint-disable-line react-hooks/exhaustive-deps

  function finishTrial(key: "space" | null) {
    if (!stim || respondedRef.current) return;
    respondedRef.current = true;

    const end = performance.now();
    const responded = key === "space";
    const rtMs = responded && startRef.current ? Math.round(end - startRef.current) : undefined;
    const isCorrect = stim.isNoGo ? !responded : responded;

    const e: GoNoGoEvent = {
      trialIndex: trial, isNoGo: stim.isNoGo, responded, isCorrect, rtMs, ts: Date.now()
    };
    const next = [...events, e];
    setEvents(next);
    if (sessionId) addDoc(collection(db, "sessions", sessionId, "events"), e);

    if (trial + 1 < nTrials) setTrial(t => t + 1);
    else {
      const s = summarizeGoNoGo(next);
      if (sessionId) {
        setDoc(doc(db, "sessions", sessionId), {
          endedAt: Date.now(), avgRT: s.avgRT, accuracy: s.accuracy
        }, { merge: true });
      }
    }
  }

  if (trial >= nTrials) {
    const s = summarizeGoNoGo(events);
    return (
      <div className="section">
        <div className="card">
          <h2>Go/No-Go complete</h2>
          <p>Trials: {s.n} · Avg RT: {s.avgRT} ms (Go only) · Accuracy: {(s.accuracy * 100).toFixed(0)}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ textAlign: "center" }}>
      <h2>Go/No-Go — Trial {trial + 1}/{nTrials}</h2>
      <p>Press <b>SPACE</b> quickly on <b>green</b> (Go). Do nothing on <b>red</b> (No-Go).</p>
      <div className={`circle ${stim?.isNoGo ? "nogo" : "go"}`} />
      <div className="kb-hint">Time limit: {windowMs} ms</div>
    </div>
  );
}
