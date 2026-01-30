'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Create initial user profile in Firestore
  const createUserProfile = async (uid, data) => {
    try {
      const initialProfile = {
        uid,
        onBoarded: false,
        createdAt: new Date().toISOString(),
        ...data,
      };
      await setDoc(doc(db, 'users', uid), initialProfile);
      return initialProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (data) => {
    if (!user) return null;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      const updatedProfile = { ...userProfile, ...data };
      setUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
  };

  // Complete onboarding
  const completeOnboarding = async (onboardingData) => {
    if (!user) return null;
    try {
      const profileData = {
        ...onboardingData,
        onBoarded: true,
        onBoardedAt: new Date().toISOString(),
      };
      await updateDoc(doc(db, 'users', user.uid), profileData);
      const updatedProfile = { ...userProfile, ...profileData };
      setUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch or create user profile
        let profile = await fetchUserProfile(firebaseUser.uid);
        if (!profile) {
          profile = await createUserProfile(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
          });
        }
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    // Create user profile in Firestore
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      displayName: displayName || '',
      photoURL: '',
    });
    // Send signup notification emails (don't await - let it run in background)
    fetch('/api/signup-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, displayName }),
    }).catch(console.error);
    return result;
  };

  const logout = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    // Send custom password reset email notification (don't await)
    fetch('/api/password-reset-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(console.error);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Check if user profile exists, if not create one (new user)
    let profile = await fetchUserProfile(result.user.uid);
    const isNewUser = !profile;
    if (!profile) {
      profile = await createUserProfile(result.user.uid, {
        email: result.user.email,
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
      });
      // Send signup notification for new Google users (don't await)
      fetch('/api/signup-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.user.email,
          displayName: result.user.displayName,
        }),
      }).catch(console.error);
    }
    setUserProfile(profile);
    return { ...result, isNewUser };
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    loginWithGoogle,
    updateUserProfile,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
