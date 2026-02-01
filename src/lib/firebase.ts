import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2wX09EfzQKGyrTds3gdzb-HEPBw5jAsk",
  authDomain: "opportunest-b44b4.firebaseapp.com",
  projectId: "opportunest-b44b4",
  storageBucket: "opportunest-b44b4.firebasestorage.app",
  messagingSenderId: "720405957842",
  appId: "1:720405957842:web:bda373cae22b1c8315310b",
  measurementId: "G-Y3YJNMJ0N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

