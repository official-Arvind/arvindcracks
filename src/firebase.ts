// Firebase client initialization (modular SDK)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsAMQeybtum_C8dHPE2oexdxJ_4UzK6ZA",
  authDomain: "arvindjicracks.firebaseapp.com",
  projectId: "arvindjicracks",
  storageBucket: "arvindjicracks.firebasestorage.app",
  messagingSenderId: "445408443051",
  appId: "1:445408443051:web:24178135da5089063cd5ee"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
