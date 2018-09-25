import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "oimrdj-oimrdj.firebaseapp.com",
    databaseURL: "https://oimrdj-oimrdj.firebaseio.com",
    projectId: "oimrdj-oimrdj",
    storageBucket: "oimrdj-oimrdj.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config);


export const db = firebase.database();
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();


