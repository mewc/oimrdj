import * as firebase from 'firebase'


const config = {
    apiKey: "AIzaSyBxuOtV0cO3BWYBWgUiGvIgcgPeogVyXfc",
    authDomain: "oimrdj-oimrdj.firebaseapp.com",
    databaseURL: "https://oimrdj-oimrdj.firebaseio.com",
    projectId: "oimrdj-oimrdj",
    storageBucket: "oimrdj-oimrdj.appspot.com",
    messagingSenderId: "279225300962"
}

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
