import { UserCredential } from 'firebase/auth';

export type UserType = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export type EditUserPayload = {
  uid: string;
  type: string;
  value: string;
}

export type ContextType = {
  User?: UserType;
  signup?: (userEmail: string, userPw: string, userName: string) => Promise<UserCredential>;
  login?: (userEmail: string, userPw: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  editUserInfo?: (payload: EditUserPayload) => Promise<boolean>;
  uploadImage?: (uid: string, file: File) => Promise<string>;
}