// /src/config/firebaseConfig.js

import { initializeApp } from 'firebase/app';
// Import the new functions
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import the storage package
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCivTGxOkqzCKojnGD4dKOJ0sz2reXKtxE",
  authDomain: "strmly-393bc.firebaseapp.com",
  projectId: "strmly-393bc",
  storageBucket: "strmly-393bc.appspot.com",
  messagingSenderId: "552484623783",
  appId: "1:552484623783:web:831950ba81268d89925282",
  measurementId: "G-KXTNMFZ8BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, db };