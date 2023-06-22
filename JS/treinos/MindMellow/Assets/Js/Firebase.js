var firebaseConfig = {
    apiKey: "AIzaSyA-QkX-UT_A_Z2kIW0--sYjXhFQbGevWw8",
    authDomain: "mindmellow-35b4e.firebaseapp.com",
    projectId: "mindmellow-35b4e",
    storageBucket: "mindmellow-35b4e.appspot.com",
    messagingSenderId: "746650711497",
    appId: "1:746650711497:web:98943210d597169feba418"
}

firebase.initializeApp(firebaseConfig)

//? My code
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()
const storage = firebase.storage()

let emailUser
auth.onAuthStateChanged((val) => {
    //? Vai tentar acessar o email do user
    try {
        if(val.email) {
            emailUser = val.email
        }

    //? Caso n consiga
    } catch (error) {
        setTimeout(() => {
            location.href = 'PageError.html'
        }, 2000)
    }
})