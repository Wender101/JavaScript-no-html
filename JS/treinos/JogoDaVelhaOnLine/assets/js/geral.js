//? firebase
var firebaseConfig = {
    apiKey: "AIzaSyB2L9DSpNkipXQFswkHImAmoqx4xK8Y0IM",
    authDomain: "flutterflowfirebase-d5651.firebaseapp.com",
    projectId: "flutterflowfirebase-d5651",
    storageBucket: "flutterflowfirebase-d5651.appspot.com",
    messagingSenderId: "887145766105",
    appId: "1:887145766105:web:fbd4332aea58cc7ca9f2c8"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

function login() {
    auth.signInWithPopup(provider)
}

const db = firebase.firestore()

let emailAtual
let email
auth.onAuthStateChanged((valorEmail) => {
    //? Vai atualizar a página quando alterar o email
    try {
        emailAtual = valorEmail.email

        email = valorEmail.email
        document.querySelector('#imgPlayer').src = valorEmail.photoURL
        document.querySelector('#btnLogar').innerHTML = 'Logado'
    } catch (error){console.log(error);}

    if(emailAtual != email) {
        location.reload()
    }
})