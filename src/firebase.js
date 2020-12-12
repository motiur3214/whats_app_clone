// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
const firebaseApp =firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authentication=firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();
export{authentication,provider,database};
