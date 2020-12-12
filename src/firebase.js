// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDHyPqemBrlngiZwkcmZF58HEI5D3iUjTo",
    authDomain: "whats-app-clone-78905.firebaseapp.com",
    projectId: "whats-app-clone-78905",
    storageBucket: "whats-app-clone-78905.appspot.com",
    messagingSenderId: "217263856394",
    appId: "1:217263856394:web:012ea2e057929e015d78f3",
    measurementId: "G-GSELSTCEF9"
  };
const firebaseApp =firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authentication=firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();
export{authentication,provider,database};
