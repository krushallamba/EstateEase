// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-ease-d152c.firebaseapp.com",
  projectId: "estate-ease-d152c",
  storageBucket: "estate-ease-d152c.firebasestorage.app",
  messagingSenderId: "271474939370",
  appId: "1:271474939370:web:fcf5bd6198dc6732cb8e93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);