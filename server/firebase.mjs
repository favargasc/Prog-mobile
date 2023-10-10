import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9gwl_7bqn1FCkWAfkYa977yfJL2pg5aU",
  authDomain: "app-mobile-6a371.firebaseapp.com",
  projectId: "app-mobile-6a371",
  storageBucket: "app-mobile-6a371.appspot.com",
  messagingSenderId: "117052615277",
  appId: "1:117052615277:web:243de4d93646a4bfbbed64",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
