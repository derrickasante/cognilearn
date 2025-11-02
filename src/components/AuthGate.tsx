// src/components/AuthGate.tsx
import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, googleSignIn } from "../lib/firebase";

/** Gate that shows a sign-in prompt if no user; otherwise renders children. */
export default function AuthGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setReady(true); });
    return unsub;
  }, []);

  if (!ready) return <div className="container section">Loading…</div>;

  if (!user) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h2>Sign in required</h2>
        <p>You need to sign in to play games and see your dashboard.</p>
        <button className="btn btn-primary" onClick={googleSignIn}>Sign in with Google</button>
      </div>
    );
  }

  return <>{children}</>;
}

