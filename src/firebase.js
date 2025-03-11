// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDginICuYhG_FamqPzgoSqqQCxZ6uOgVFs",
    authDomain: "password-manager-d3521.firebaseapp.com",
    projectId: "password-manager-d3521",
    storageBucket: "password-manager-d3521.firebasestorage.app",
    messagingSenderId: "1076985995602",
    appId: "1:1076985995602:web:45883717505da19dc55a8b",
    measurementId: "G-RJKY3SPQRB"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
