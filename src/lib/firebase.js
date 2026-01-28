'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBgSYwgwEgQmbQYjUsHaD6tAFk1MZc3HCE",
  authDomain: "chartsok.firebaseapp.com",
  projectId: "chartsok",
  storageBucket: "chartsok.firebasestorage.app",
  messagingSenderId: "498941505489",
  appId: "1:498941505489:web:06c8de41deb430432ebaf0",
  measurementId: "G-4DXB5LWFWP"
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
