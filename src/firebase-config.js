import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyChOAywaN6UwxByndmhP91bHt0GrsAMmOY",
  authDomain: "crud-desafio-2022.firebaseapp.com",
  projectId: "crud-desafio-2022",
  storageBucket: "crud-desafio-2022.appspot.com",
  messagingSenderId: "1050804573799",
  appId: "1:1050804573799:web:dfbc0c6f7236f01b04a6c2",
  measurementId: "G-BEXP0BY8S7"
};

const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);