import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAxtooG_J4odHaSi1mqGHOia6T7lnKcE8g",
  authDomain: "chatting-application-7ec77.firebaseapp.com",
  projectId: "chatting-application-7ec77",
  storageBucket: "chatting-application-7ec77.firebasestorage.app",
  messagingSenderId: "38826680369",
  appId: "1:38826680369:web:7c340d8fe3f5ff9302b510",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app };
export { auth };
