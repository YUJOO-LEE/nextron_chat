// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBshHK63OGbkjg6J2FaEIIdWUlpBkWQcgY',
  authDomain: 'nextron-chat-yujoo.firebaseapp.com',
  projectId: 'nextron-chat-yujoo',
  storageBucket: 'nextron-chat-yujoo.appspot.com',
  messagingSenderId: '627641044749',
  appId: '1:627641044749:web:7c29ca4c0aaa76378f2a44',
  databaseURL: 'https://nextron-chat-yujoo-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const firebaseClientApp = initializeApp(firebaseConfig);
export const firebaseClientAuth = getAuth(firebaseClientApp);
export const firebaseStorage = getStorage(firebaseClientApp);
export const realtimeDB = getDatabase(firebaseClientApp);