// src/components/AuthGate.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, googleSignIn } from "../lib/firebase";

/** Gate that shows a sign-in prompt if no user, otherwise renders children. */
export default function AuthGate({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  if (!ready) {
    return <div className="container section">Loading…</div>;
  }

  // ⬇️ This is the “end” block I mentioned: when NOT signed in, show a centered prompt.
  if (!user) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h2>Sign in required</h2>
        <p>You need to sign in to play games and see your dashboard.</p>
        <button className="btn btn-primary" onClick={googleSignIn}>
          Sign in with Google
        </button>
      </div>
    );
  }

  // When signed in, just render the protected content (Navbar already handles header/controls)
  return children;
}
