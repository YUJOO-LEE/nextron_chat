import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, updateProfile } from '@firebase/auth';
import { child, ref, set } from 'firebase/database';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { firebaseClientAuth, realtimeDB } from '../config/firebase';
import type { UserType } from '../types/user';
import { uploadImageToStorage } from './storage';

type ContextType = {
  User?: UserType;
  signup?: (userEmail: string, userPw: string, userName: string) => Promise<UserCredential>;
  login?: (userEmail: string, userPw: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  editUserInfo?: (payload: EditUserPayload) => Promise<boolean>;
  uploadImage?: (uid: string, file: File) => Promise<string>;
}

type EditUserPayload = {
  uid: string;
  type: string;
  value: string;
}

const AuthContext = createContext<ContextType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (
  { children }: PropsWithChildren
) => {
  const [User, setUser] = useState<UserType>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  const signup = async (userEmail: string, userPw: string, userName: string) => {
    const result = await createUserWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
    const { user } = result;
    const avatar = 'https://api.dicebear.com/5.x/bottts/png?seed=' + user.uid;

    await updateProfile(firebaseClientAuth.currentUser, { displayName: userName, photoURL: avatar });
    await set(child(ref(realtimeDB, 'users'), user.uid), { displayName: userName, photoURL: avatar });

    setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });

    return result;
  }

  const login = (userEmail: string, userPw: string) => {
    return signInWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
  }

  const logout = async () => {
    await signOut(firebaseClientAuth);
    setUser(null);
  }

  const editUserInfo = async ({uid, type, value }: EditUserPayload) => {
    const data = Object();
    data[type] = value;

    await updateProfile(firebaseClientAuth.currentUser, data);
    await set(child(ref(realtimeDB, 'users'), uid), data);
    setUser({ ...User, ...data });

    return true;
  }

  const uploadImage = async (uid: string, file: File) => {
    const photoURL = await uploadImageToStorage(uid, file);
    await editUserInfo({ uid, type: 'photoURL' , value: photoURL });

    return photoURL;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseClientAuth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={{User, signup, login, logout, editUserInfo, uploadImage}}>
      {Loading ? 'loading...' : children}
    </AuthContext.Provider>
  )
}