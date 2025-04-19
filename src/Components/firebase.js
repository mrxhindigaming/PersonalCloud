// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Add these for login

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJvw5Y5tcGSK0o-lo8HtaAqg49_hNmQ5I",
  authDomain: "mycloudapp-ee562.firebaseapp.com",
  projectId: "mycloudapp-ee562",
  storageBucket: "mycloudapp-ee562.appspot.com", // ✅ Fixed here
  messagingSenderId: "139660313995",
  appId: "1:139660313995:web:0a2a808830aea6b8d95b8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add these exports if you're using Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
