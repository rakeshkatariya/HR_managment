// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgpT2SqY9Ms0tvtpnDvRQBorVearUomzA",
    authDomain: "zeroday-e7e57.firebaseapp.com",
    projectId: "zeroday-e7e57",
    storageBucket: "zeroday-e7e57.appspot.com",
    messagingSenderId: "674340898876",
    appId: "1:674340898876:web:f5dd056e00d24d1f83db39",
    measurementId: "G-6JXBW88EW8"
  };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;