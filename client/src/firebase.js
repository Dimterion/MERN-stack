// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-fc495.firebaseapp.com",
  projectId: "mern-stack-fc495",
  storageBucket: "mern-stack-fc495.appspot.com",
  messagingSenderId: "686375499401",
  appId: "1:686375499401:web:61f50bab1b70b3ac3ab858",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
