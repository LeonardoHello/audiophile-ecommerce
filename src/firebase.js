import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, deleteUser } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyB3g95vQFTVVqA-3xyL8Sh8sfAISKsg9GU",
  authDomain: "audiophile-ecommerce-3195d.firebaseapp.com",
  projectId: "audiophile-ecommerce-3195d",
  storageBucket: "audiophile-ecommerce-3195d.appspot.com",
  messagingSenderId: "859366295839",
  appId: "1:859366295839:web:db86b9b1e3603707be882a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, deleteUser, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot }