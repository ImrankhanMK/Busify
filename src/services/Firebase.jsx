// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";          // for initializing Firebase
import { getAuth } from "firebase/auth";              // for authentication
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-fNHiNLdpNcaD8dkQKviiAXULMNsOS9M",
  authDomain: "busify-f6069.firebaseapp.com",
  projectId: "busify-f6069",
  storageBucket: "busify-f6069.firebasestorage.app",
  messagingSenderId: "480677207712",
  appId: "1:480677207712:web:0fa9376ebc19eb81a8f3c5",
  measurementId: "G-LY2GL0T8BP"
};

const app = initializeApp(firebaseConfig);

// Export auth and db correctly
export const auth = getAuth(app);
export const db = getFirestore(app);