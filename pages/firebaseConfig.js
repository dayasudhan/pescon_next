// import firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBF-DAmmXX_UDuf0_CbYcGe4ka931qu51Y",
  authDomain: "pescon.firebaseapp.com",
  projectId: "pescon",
  storageBucket: "pescon.appspot.com",
  messagingSenderId: "1025577333110",
  appId: "1:1025577333110:web:305fb631f8aa676ff88a57"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


//const app = initializeApp(firebaseConfig);
export default firebase;