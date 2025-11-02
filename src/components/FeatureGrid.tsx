const features = [
  { t:"Evidence-inspired", s:"Classic tasks (Stroop, Go/No-Go) tied to attention & control." },
  { t:"Progress you can see", s:"Trends over sessions—celebrate lower RT and higher accuracy." },
  { t:"Adaptive challenge", s:"Automatic difficulty nudges to keep you in the learning zone." },
  { t:"Privacy first", s:"Your data stays under your account; export or delete anytime." },
  { t:"Bite-size learning", s:"Animations and micro-articles in plain language." },
  { t:"Accessibility", s:"Keyboard-first, high-contrast mode, color-blind safe palette (toggle soon)." },
];

export default function FeatureGrid(){
  return (
    <div className="container section">
      <h2>Why CogniLearn?</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {features.map((f,i)=>(
          <div key={i} className="card">
            <h3>{f.t}</h3>
            <p>{f.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
