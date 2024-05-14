import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBWyPaa2PqH_q3AmG33X2zGC2l8XIvX4lQ",
    authDomain: "gym-log-5fa38.firebaseapp.com",
    projectId: "gym-log-5fa38",
    storageBucket: "gym-log-5fa38.appspot.com",
    messagingSenderId: "609896180155",
    appId: "1:609896180155:web:c0493fc35c2f947bfbbc9e",
    measurementId: "G-8NY4GRBK9C"
  };

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)