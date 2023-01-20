import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDnfNG9kQcGAwMyTHh3AxLkKrHRaIYA77c",
  authDomain: "foodsup-v3.firebaseapp.com",
  projectId: "foodsup-v3",
  storageBucket: "foodsup-v3.appspot.com",
  messagingSenderId: "225083575823",
  appId: "1:225083575823:web:b52589a44c38f95a2add7a",
  measurementId: "G-L2PMB3Y3YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };