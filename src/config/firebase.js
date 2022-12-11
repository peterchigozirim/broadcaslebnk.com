 // Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCVskfg7KcP-Nmyu01YkMV_TNk0vH8aKUU",
  authDomain: "vuewithfirebase-5f437.firebaseapp.com",
  projectId: "vuewithfirebase-5f437",
  storageBucket: "vuewithfirebase-5f437.appspot.com",
  messagingSenderId: "161135734749",
  appId: "1:161135734749:web:4bc50e9ba9dd8e3a1d9034"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
}