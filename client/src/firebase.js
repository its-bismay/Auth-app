// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "oath-app-e847e.firebaseapp.com",
  projectId: "oath-app-e847e",
  storageBucket: "oath-app-e847e.appspot.com",
  messagingSenderId: "396163528305",
  appId: "1:396163528305:web:c72061b045462bbe4b4dd0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);