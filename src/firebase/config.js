// firebase libraries
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAcFjpHmtlmtGygicZvjqjiWYcHeqkB65M",
    authDomain: "mammadonnadaycare.firebaseapp.com",
    projectId: "mammadonnadaycare",
    storageBucket: "mammadonnadaycare.appspot.com",
    messagingSenderId: "124205454352",
    appId: "1:124205454352:web:f8f78bb82dd00819b82695"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init Service
  const projectFirestore = firebase.firestore()
  const projectAuth= firebase.auth()

   // timestamp
   const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }