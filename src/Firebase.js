import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDDXly2_Sir7l8hzal1B9I5qtmsOqysJ_g",
  authDomain: "logapp-89dcd.firebaseapp.com",
  databaseURL: "https://logapp-89dcd.firebaseio.com",
  projectId: "logapp-89dcd",
  storageBucket: "logapp-89dcd.appspot.com",
  messagingSenderId: "162447732413",
  appId: "1:162447732413:web:a4263a6c3bb820435011d4",
  measurementId: "G-SSNGLTX96V"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;


