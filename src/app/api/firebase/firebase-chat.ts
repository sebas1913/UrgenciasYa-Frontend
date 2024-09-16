import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACHj9Mgt5vF0o40RJcsH2gBSB3LOgqOXk",
  authDomain: "prueba-chat-a2081.firebaseapp.com",
  projectId: "prueba-chat-a2081",
  storageBucket: "prueba-chat-a2081.appspot.com",
  messagingSenderId: "684653828212",
  appId: "1:684653828212:web:c192d42b749b40a3545921"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);
export { db };
