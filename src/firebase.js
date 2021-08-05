import firebase from "firebase"; // For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config = {};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
