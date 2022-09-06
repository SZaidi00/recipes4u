// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDXcQQd93gOS0f5lBAH_C8ogFiF-xuisog",
    authDomain: "recipes4u-79eda.firebaseapp.com",
    projectId: "recipes4u-79eda",
    storageBucket: "recipes4u-79eda.appspot.com",
    messagingSenderId: "260143494526",
    appId: "1:260143494526:web:1e809586cb611b7b59af2f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
