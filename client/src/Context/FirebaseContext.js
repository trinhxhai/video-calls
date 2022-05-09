import { createContext, useContext } from "react";

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyBGy8O00lMDCfjRXC3lK0MJoAHfALSuYkI",
  authDomain: "video-call-1253a.firebaseapp.com",
  projectId: "video-call-1253a",
  storageBucket: "video-call-1253a.appspot.com",
  messagingSenderId: "214121688820",
  appId: "1:214121688820:web:dd5f7a73858d6ccd6df8a1",
  measurementId: "G-0WT93P2MVG",
};

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  const value = {
    auth,
    db,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
