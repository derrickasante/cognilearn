import { Link } from "react-router-dom";

export default function AnimatedHero(){
  return (
    <div className="hero">
      <div className="blob b1" />
      <div className="blob b2" />
      <svg className="constellation" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <g stroke="#b1c5ff" strokeWidth="0.6" opacity="0.45">
          <path d="M80,260 L260,120 L520,180 L760,80 L1000,140" />
          <path d="M140,300 L340,220 L700,240 L980,220" />
        </g>
      </svg>

      <div className="container section" style={{paddingTop:64, paddingBottom:64}}>
        <div className="grid grid-2" style={{alignItems:"center"}}>
          <div>
            <div className="badge">NEW · Learn + Quiz</div>
            <h1>Train your focus, understand the science, track your progress.</h1>
            <p>CogniLearn blends cognitive mini-games with clear feedback—no buzzwords, just what improves and why.</p>
            <div className="row" style={{marginTop:16}}>
              <Link to="/game"><button className="btn btn-primary">Play Stroop</button></Link>
              <Link to="/learn"><button className="btn">See how it works</button></Link>
            </div>
          </div>
          <div>
            {/* Hero mosaic – uses public images if present, gracefully falls back */}
            <div className="grid grid-2">
              <div className="card">
                <img src="/hero.jpg" onError={(e)=>((e.target as HTMLImageElement).style.display="none")} alt="" style={{width:"100%", borderRadius:12}} />
                <div className="ph" />
                <p style={{marginTop:8}}>Simple visuals that teach attention & inhibition.</p>
              </div>
              <div className="card">
                <img src="/brain.jpg" onError={(e)=>((e.target as HTMLImageElement).style.display="none")} alt="" style={{width:"100%", borderRadius:12}} />
                <div className="ph" />
                <p style={{marginTop:8}}>Live metrics: reaction time and accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
