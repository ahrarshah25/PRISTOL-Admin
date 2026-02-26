import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC9GIDXMFoGl3dhdX_xhQH4xQKbXV2htHk",
  authDomain: "pristol-application.firebaseapp.com",
  projectId: "pristol-application",
  storageBucket: "pristol-application.firebasestorage.app",
  messagingSenderId: "676662792137",
  appId: "1:676662792137:web:5a69d572221d2f060b6218",
  measurementId: "G-E7RYREDR8Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);