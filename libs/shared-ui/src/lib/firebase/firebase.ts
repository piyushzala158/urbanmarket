// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEmedOZDKkmwY-wkR08p6laTLUZrCCAUI",
  authDomain: "products-27e5d.firebaseapp.com",
  projectId: "products-27e5d",
  storageBucket: "products-27e5d.appspot.com",
  messagingSenderId: "1050649548700",
  appId: "1:1050649548700:web:49a5928580a25245ddda59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// import * as admin from 'firebase-admin';

// const serviceAccount = require('../../../products-27e5d-firebase-adminsdk-xx63l-e257414ebe.json'); // Replace with the path to your service account key JSON file

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // Replace with your Firebase project ID
//   databaseURL: 'https://products-27e5d.firebaseio.com'
// });

// // Update your existing imports
// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';
// import { getStorage } from 'firebase-admin/storage';

// // Update the initialization of Firebase components
// export const auth = getAuth();
// export const db: admin.firestore.Firestore = admin.firestore(); 
// export const storage = getStorage();
