import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, updateProfile } from '@firebase/auth';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { firebaseClientAuth } from '../config/firebase';
import type { UserType } from '../types/user';

type ContextType = {
  User?: UserType;
  signup?: (userEmail: string, userPw: string, UserName: string) => Promise<UserCredential>;
  login?: (userEmail: string, userPw: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<ContextType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (
  { children }: PropsWithChildren
) => {
  const [User, setUser] = useState<UserType>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  const signup = async (userEmail: string, userPw: string, UserName: string) => {
    const result = await createUserWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
    await updateProfile(firebaseClientAuth.currentUser, { displayName: UserName });
    return result;
  }

  const login = (userEmail: string, userPw: string) => {
    return signInWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
  }

  const logout = async () => {
    await signOut(firebaseClientAuth);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseClientAuth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={{User, signup, login, logout}}>
      {Loading ? 'loading...' : children}
    </AuthContext.Provider>
  )
}