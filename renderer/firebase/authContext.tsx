import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@firebase/auth';
import { child, ref, set, update } from 'firebase/database';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { firebaseClientAuth, realtimeDB } from '../config/firebase';
import type { ContextType, EditUserPayload, UserType } from '../types/user';
import { uploadImageToStorage } from './storage';

const AuthContext = createContext<ContextType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (
  { children }: PropsWithChildren
) => {
  const [User, setUser] = useState<UserType>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  // 회원가입 실행
  const signup = async (userEmail: string, userPw: string, userName: string) => {
    const result = await createUserWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
    const { user } = result;
    const avatar = 'https://api.dicebear.com/5.x/bottts/png?seed=' + user.uid;
    await updateProfile(firebaseClientAuth.currentUser, { 
      displayName: userName, photoURL: avatar 
    });

    // DB 저장
    await set(child(ref(realtimeDB, 'users'), user.uid), { 
      uid: user.uid, displayName: userName, photoURL: avatar 
    });

    // State 저장
    setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });

    return result;
  }

  // 로그인
  const login = (userEmail: string, userPw: string) => {
    return signInWithEmailAndPassword(firebaseClientAuth, userEmail, userPw);
  }

  // 로그아웃
  const logout = async () => {
    await signOut(firebaseClientAuth);
    setUser(null);
  }

  // 정보 수정
  const editUserInfo = async ({uid, type, value }: EditUserPayload) => {
    const data = Object();
    data[type] = value;

    await updateProfile(firebaseClientAuth.currentUser, data);
    await update(child(ref(realtimeDB, 'users'), uid), data);
    setUser({ ...User, ...data });

    return true;
  }

  // 프로필 사진 업로드 (미완)
  const uploadImage = async (uid: string, file: File) => {
    const photoURL = await uploadImageToStorage(uid, file);
    await editUserInfo({ uid, type: 'photoURL' , value: photoURL });

    return photoURL;
  }

  // 로그인 검증 후 state 에 반영
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
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);
  

  // User 관련 메서드 전역에서 사용하도록 전달
  return (
    <AuthContext.Provider value={{User, signup, login, logout, editUserInfo, uploadImage}}>
      {Loading ? 'loading...' : children}
    </AuthContext.Provider>
  )
}