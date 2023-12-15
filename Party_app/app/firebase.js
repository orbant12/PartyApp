//<********************************************>
//LAST EDITED: 2023.12.04
//EDITED BY: ORBAN TAMAS
//DESCRIPTION: This file contains the firebase configuration.
//<********************************************>

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from  'firebase/storage' ;



const firebaseConfig = {
   apiKey: "AIzaSyC9pJKxFO9QRBUMsewe7FNF9djDxiki9dA",
   authDomain: "partyapp-b18ca.firebaseapp.com",
   projectId: "partyapp-b18ca",
   storageBucket: "partyapp-b18ca.appspot.com",
   messagingSenderId: "479149541002",
   appId: "1:479149541002:web:5d280f499873315dc74f73"
};

//FIREBASE APP INIT
export const app = initializeApp(firebaseConfig);

//FIREBASE AUTH INIT
export const auth = initializeAuth(app, {
   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//FIREBASE FIRESTORE INIT
export const db = getFirestore(app);

//FIREBASE STORAGE INIT
export const storage = getStorage();


