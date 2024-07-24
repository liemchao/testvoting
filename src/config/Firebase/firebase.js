// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASLFRVp634Y7jUVxodNBxAeX_MKUD3hP4",
  authDomain: "binhchonfpt.firebaseapp.com",
  projectId: "binhchonfpt",
  storageBucket: "binhchonfpt.appspot.com",
  messagingSenderId: "464981303043",
  appId: "1:464981303043:web:731a495ffcbe1678ac1336",
  measurementId: "G-FMPSX0L36S",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth(app);
const auth = firebase.auth();
const provider = new GoogleAuthProvider();
export { auth };
export default firebase;
