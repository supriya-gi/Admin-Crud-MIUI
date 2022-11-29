// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4zJWUK3QGO1ncbXveiMQ7HB-R0wzzYRA",
  authDomain: "admin-login-25e85.firebaseapp.com",
  projectId: "admin-login-25e85",
  storageBucket: "admin-login-25e85.appspot.com",
  messagingSenderId: "521883192449",
  appId: "1:521883192449:web:bfda47d3f45a4b7f095180",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
