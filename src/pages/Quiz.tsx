import { useState } from "react";

const Q = [
  {
    q: "What does Stroop primarily measure?",
    a: ["Selective attention & interference control", "Spatial memory", "Language comprehension", "Motor coordination"],
    i: 0
  },
  {
    q: "In Go/No-Go, a correct 'No-Go' response is:",
    a: ["Pressing quickly", "Doing nothing", "Pressing twice", "Pressing later"],
    i: 1
  },
  {
    q: "Our charts show:",
    a: ["RT (ms) & Accuracy (%) over sessions", "IQ score", "Sleep cycles", "Network speed"],
    i: 0
  }
];

export default function Quiz(){
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const done = idx >= Q.length;

  function pick(j:number){
    if (done) return;
    if (j === Q[idx].i) setScore(s=>s+1);
    setIdx(i=>i+1);
  }

  return (
    <div style={{ padding:24 }}>
      <h1>Quick quiz</h1>
      {!done ? (
        <div>
          <h3>{idx+1}. {Q[idx].q}</h3>
          <div style={{display:"grid",gap:8,marginTop:12,maxWidth:560}}>
            {Q[idx].a.map((opt,j)=>(
              <button key={j} onClick={()=>pick(j)} style={{padding:"10px 14px"}}>{opt}</button>
            ))}
          </div>
        </div>
      ) : (
        <h2>Score: {score}/{Q.length}</h2>
      )}
    </div>
  );
}
