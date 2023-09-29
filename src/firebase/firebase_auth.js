import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDkK1ZnrUQ-KEZSNjciZ5MZkmm_Oo1ILeA",
    authDomain: "deprimera-e38c9.firebaseapp.com",
    databaseURL: "https://deprimera-e38c9-default-rtdb.firebaseio.com",
    projectId: "deprimera-e38c9",
    storageBucket: "deprimera-e38c9.appspot.com",
    messagingSenderId: "989458014084",
    appId: "1:989458014084:web:80f5743e5570016f8ec7d1"
  };
  
export const app = initializeApp(firebaseConfig);

export const firebase_auth = getAuth(app)