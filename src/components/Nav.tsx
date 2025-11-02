import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, googleSignIn, signOutNow } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Nav(){
  const [name, setName] = useState<string | null>(null);
  useEffect(() => onAuthStateChanged(auth, u => setName(u?.displayName || u?.email || null)), []);
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">CogniLearn</Link>
        <nav style={{display:"flex", gap:10}}>
          <Link to="/learn">Learn</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/game">Stroop</Link>
          <Link to="/game/gonogo">Go/No-Go</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <div style={{marginLeft:"auto"}}>
          {!name
            ? <button className="btn btn-primary" onClick={googleSignIn}>Sign in</button>
            : <div className="row"><span style={{opacity:.8}}>Hi, {name.split(" ")[0]}</span><button className="btn btn-ghost" onClick={signOutNow}>Sign out</button></div>}
        </div>
      </div>
    </header>
  );
}
