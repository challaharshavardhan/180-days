// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC23BX98KeYS3MxB-C42dMkUXVx3qxm2os",
  authDomain: "taskauth-7b088.firebaseapp.com",
  projectId: "taskauth-7b088",
  storageBucket: "taskauth-7b088.firebasestorage.app",
  messagingSenderId: "11352290268",
  appId: "1:11352290268:web:e0fe94d3c7baf4268f5519",
  measurementId: "G-34VZR7SFZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
// const analytics = getAnalytics(app);