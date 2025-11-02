// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjkOlG307g_KevGbLUfXBLazYb9yo5Hxo",
  authDomain: "cognilearn-470f0.firebaseapp.com",
  projectId: "cognilearn-470f0",
  storageBucket: "cognilearn-470f0.firebasestorage.app",
  messagingSenderId: "184947644773",
  appId: "1:184947644773:web:5f43fa8a56413b8bf1e98c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOutNow = () => signOut(auth);

