import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
  apiKey: "<YOUR_API_KEY",
  authDomain: "<AUTH_DOMAIN>",
  databaseURL: "<DATABASE_URL>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGE_SENDER_ID>",
  appId: "<APP_ID>",
  measurementId: "<MEASUREMENT_ID>"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;


