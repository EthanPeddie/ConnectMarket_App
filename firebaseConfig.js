// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTJyF9FSAs7gl5J8dTE-xQ5dy3uMq00JY",
  authDomain: "ethanpeddie-app.firebaseapp.com",
  projectId: "ethanpeddie-app",
  storageBucket: "ethanpeddie-app.appspot.com",
  messagingSenderId: "271896810021",
  appId: "1:271896810021:web:3e5b9977cce05c083765cc",
  measurementId: "G-YLEMYJHT3W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
