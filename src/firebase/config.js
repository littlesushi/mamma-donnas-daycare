// firebase libraries
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyBbG_NxZCOkusL6cJcL4lPBsrWhuPxkKrM",

  authDomain: "donnasdaycare-540de.firebaseapp.com",

  databaseURL: "https://donnasdaycare-540de-default-rtdb.firebaseio.com",

  projectId: "donnasdaycare-540de",

  storageBucket: "donnasdaycare-540de.appspot.com",

  messagingSenderId: "712682302188",

  appId: "1:712682302188:web:f4b1bbb1b14bc8517013c9",

  measurementId: "G-FT32PD60FT"

};

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init Service
  const projectFirestore = firebase.firestore()
  const projectAuth= firebase.auth()

   // timestamp
   const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }