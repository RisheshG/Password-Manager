// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAtNyOTGwf2DkJNUnwIh_fwak9nY9G4Lwk",
    authDomain: "password-manager-11224.firebaseapp.com",
    projectId: "password-manager-11224",
    storageBucket: "password-manager-11224.appspot.com",
    messagingSenderId: "333322722705",
    appId: "1:333322722705:web:2a342e5a59870c1f430e30",
    measurementId: "G-5Y31ME8SLT"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
