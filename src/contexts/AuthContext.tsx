import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  fullName: string;
  email: string;
  course: string;
  branch: string;
  skills: string;
  interests: string;
  collegeName: string;
  collegeLocation: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, profile: UserProfile) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore with real-time updates
  const fetchUserProfile = (uid: string) => {
    const userDocRef = doc(db, 'users', uid);
    
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserProfile(snapshot.data() as UserProfile);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        setUserProfile(null);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // Sign up function
  async function signup(email: string, password: string, profile: UserProfile) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update Firebase Auth display name
    await updateProfile(userCredential.user, {
      displayName: profile.fullName,
    });

    // Save user profile to Firestore
    const userData = {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    setUserProfile(profile);
  }

  // Login function
  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  async function logout() {
    await signOut(auth);
    setUserProfile(null);
  }

  // Reset password function
  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  // Update user profile
  async function updateUserProfile(profile: Partial<UserProfile>) {
    if (!currentUser) throw new Error('No user logged in');
    
    const updatedData = {
      ...profile,
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', currentUser.uid), updatedData, { merge: true });
    setUserProfile((prev) => (prev ? { ...prev, ...profile } : null));
  }

  useEffect(() => {
    let unsubscribeAuth: (() => void) | null = null;
    let unsubscribeProfile: (() => void) | null = null;

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Set up real-time listener for user profile
        unsubscribeProfile = fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

