var firebaseConfig = {
    apiKey: "AIzaSyDHcRmRAQCwQfzdENqn_U2J-RechPmtZQw",
    authDomain: "stoymori.firebaseapp.com",
    projectId: "stoymori",
    storageBucket: "stoymori.appspot.com",
    messagingSenderId: "36689661356",
    appId: "1:36689661356:web:34357bb2f97adcbbb93e09"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()