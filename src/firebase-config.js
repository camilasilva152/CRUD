import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDN7b7uM4UeRxhW23PVVZM85Ar7JSOgUyQ",
  authDomain: "crudoficial2022.firebaseapp.com",
  projectId: "crudoficial2022",
  storageBucket: "crudoficial2022.appspot.com",
  messagingSenderId: "201402037828",
  appId: "1:201402037828:web:020442903a1bda4ce46e11",
  measurementId: "G-940D4D8N00"
};
const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);