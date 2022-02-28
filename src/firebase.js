import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyDDt1ljtV-w-N84vvpc6dHNsvPO_M6_t0Y",
    authDomain: "face-d7149.firebaseapp.com",
    projectId: "face-d7149",
    storageBucket: "face-d7149.appspot.com",
    messagingSenderId: "825916952654",
    appId: "1:825916952654:web:125b61003e4d00a4f1731f",
    measurementId: "G-G206ZZQM49"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}
