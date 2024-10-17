// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import {
  FB_APIKEY,
  FB_AUTHDOMAIN,
  FB_PROJECTID,
  FB_STORAGEBUCKET,
  FB_MESSAGINGSENDERID,
  FB_APPID,
} from '../../config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FB_APIKEY,
  authDomain: FB_AUTHDOMAIN,
  projectId: FB_PROJECTID,
  storageBucket: FB_STORAGEBUCKET,
  messagingSenderId: FB_MESSAGINGSENDERID,
  appId: FB_APPID,
};

// Initialize Firebase
const appFB = initializeApp(firebaseConfig);

export const authFB = getAuth(appFB);
export const databaseFB = getDatabase(appFB);
export const firestoreFB = getFirestore(appFB);
export default appFB;