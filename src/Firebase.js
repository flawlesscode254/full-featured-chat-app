import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCkmvDNXY-qPXyFuFsfEqDUNtLfQ1Ww764",
    authDomain: "messenger-clone-94aa1.firebaseapp.com",
    projectId: "messenger-clone-94aa1",
    storageBucket: "messenger-clone-94aa1.appspot.com",
    messagingSenderId: "552364157176",
    appId: "1:552364157176:web:c93350194f54836029730d",
    measurementId: "G-TN730N5Y1R"
});

const db = firebaseApp.firestore();

export default db;