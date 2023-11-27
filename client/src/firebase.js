import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-fc495.firebaseapp.com",
  projectId: "mern-stack-fc495",
  storageBucket: "mern-stack-fc495.appspot.com",
  messagingSenderId: "686375499401",
  appId: "1:686375499401:web:61f50bab1b70b3ac3ab858",
};

export const app = initializeApp(firebaseConfig);
