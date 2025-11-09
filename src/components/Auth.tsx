import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

const Auth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Ensure user profile exists in Firestore
        const userRef = doc(db, 'users', u.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            displayName: u.displayName || '',
            email: u.email || '',
            photoURL: u.photoURL || '',
            createdAt: new Date().toISOString()
          });
        }
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Profile stored in onAuthStateChanged
      return result.user;
    } catch (err) {
      console.error('Sign in error', err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <button onClick={handleSignIn} className="px-3 py-2 rounded-lg bg-primary-600 text-white hover:opacity-95">
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <img src={user.photoURL || ''} alt={user.displayName || 'avatar'} className="w-8 h-8 rounded-full" />
      <div className="text-sm">
        <div className="font-medium">{user.displayName}</div>
        <div className="text-xs text-gray-400">{user.email}</div>
      </div>
      <button onClick={handleSignOut} className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-dark-700">Sign out</button>
    </div>
  );
};

export default Auth;
