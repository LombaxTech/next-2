import firebase from "firebase/compat/app";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6c1lqkpmcNDRSzL8pPbvGCj5c6qfApOU",
  authDomain: "learning22-9c952.firebaseapp.com",
  databaseURL:
    "https://learning22-9c952-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learning22-9c952",
  storageBucket: "learning22-9c952.appspot.com",
  messagingSenderId: "736912311427",
  appId: "1:736912311427:web:66cf38cfdb6f9372ddc7b6",
  measurementId: "G-3ZR4ZJSTGX",
};

export const analytics = () => {
  if (typeof window !== "undefined") {
    return firebase.analytics();
  } else {
    return null;
  }
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// export const analytics = getAnalytics(firebaseApp);
