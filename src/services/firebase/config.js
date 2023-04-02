// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpePq1ae85NTiZiJcRfyjNB_zYiJ7spuU",
  authDomain: "blog-bacb1.firebaseapp.com",
  projectId: "blog-bacb1",
  storageBucket: "blog-bacb1.appspot.com",
  messagingSenderId: "290544394748",
  appId: "1:290544394748:web:ba763c29c20615d3d8d279",
  measurementId: "G-FC03TQL8EB",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
