// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth as authInitializeAuth,
  browserSessionPersistence as authBrowserSessionPersistence,
  getReactNativePersistence as authGetReactNativePersistence,
} from "firebase/auth";
import { getFirestore as firestoreGetFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFUSfxpLxSFLUCrlm_e80PTrHg9_l4KHo",
  authDomain: "recuerdate-app.firebaseapp.com",
  projectId: "recuerdate-app",
  storageBucket: "recuerdate-app.appspot.com",
  messagingSenderId: "1097320302695",
  appId: "1:1097320302695:web:92bafe5ff1f87ece946cc2",
  measurementId: "G-4BD5ECPETQ"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = authInitializeAuth(FIREBASE_APP, {
  persistence:
    Platform.OS === 'web'
      ? authBrowserSessionPersistence
      : authGetReactNativePersistence(AsyncStorage),
})
export const FIRESTORE_DB = firestoreGetFirestore(FIREBASE_APP)




