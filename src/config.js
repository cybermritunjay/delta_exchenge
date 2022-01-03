import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDQtfN0RRFrxjiDdSsRmu2YVJQdahLobxw",
  authDomain: "deltsexchange.firebaseapp.com",
  projectId: "deltsexchange",
  storageBucket: "deltsexchange.appspot.com",
  messagingSenderId: "93099999941",
  appId: "1:93099999941:web:1f50df07e098e2092fe6ac"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();
export {db,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword};