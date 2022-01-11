// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmotM0IdNK92lKy5nVtsRxYwdh7j8uxwE",
  authDomain: "electron-music-70c47.firebaseapp.com",
  projectId: "electron-music-70c47",
  storageBucket: "electron-music-70c47.appspot.com",
  messagingSenderId: "712172119312",
  appId: "1:712172119312:web:1fe69ae208abeb94c0b195"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);