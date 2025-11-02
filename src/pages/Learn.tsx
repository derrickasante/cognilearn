export default function Learn() {
  const node: React.CSSProperties = {
    width: 24, height: 24, borderRadius: "50%", background:"#90caf9",
    boxShadow:"0 0 16px #90caf9aa", animation:"pulse 1.8s infinite"
  };
  const line = (w:number, rot:number, left:number, top:number): React.CSSProperties => ({
    position:"absolute", width:w, height:2, background:"#90caf9aa",
    left, top, transform:`rotate(${rot}deg)`, transformOrigin:"left center"
  });

  return (
    <div style={{ padding:24 }}>
      <h1>The science, simplified</h1>
      <p>Attention tasks (like Stroop) tap selective attention and interference control.
         Go/No-Go targets response inhibition. We show your reaction time (ms) and accuracy (%). 
         These reflect task-specific performance, not overall intelligence.</p>

      <div style={{position:"relative",height:180,marginTop:24}}>
        <div style={{position:"absolute",left:40,top:70,...node}}/>
        <div style={{position:"absolute",left:200,top:30,...node}}/>
        <div style={{position:"absolute",left:360,top:110,...node}}/>
        <div style={line(170, -15, 52, 82)} />
        <div style={line(180, 25, 214, 42)} />
      </div>

      <style>{`
        @keyframes pulse { 0%{transform:scale(0.9)} 50%{transform:scale(1.1)} 100%{transform:scale(0.9)} }
      `}</style>

      <h2 style={{marginTop:24}}>What we record</h2>
      <ul>
        <li><b>Reaction time (RT)</b>: milliseconds to respond on Go / correct color.</li>
        <li><b>Accuracy</b>: share of correct responses (and correct withholds on No-Go).</li>
        <li><b>Trend</b>: how RT and accuracy change across sessions.</li>
      </ul>
    </div>
  );
}
