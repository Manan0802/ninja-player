// shared/FirebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiR6eKuK-aN0JXxO7Evtvf3vABEXKI02w",
  authDomain: "placement-projects.firebaseapp.com",
  projectId: "placement-projects",
  storageBucket: "placement-projects.appspot.com",
  messagingSenderId: "81382306117",
  appId: "1:81382306117:web:453abb59eb653d27704e2c",
  measurementId: "G-SYGK37NL5J"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Firestore and Auth Exports
export const db = getFirestore(app);
export const auth = getAuth(app);
