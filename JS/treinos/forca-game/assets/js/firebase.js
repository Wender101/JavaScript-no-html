// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

let trocarDeConta = false
function login() {
    trocarDeConta = true
    auth.signInWithPopup(provider)
}

let email
let reload = false
var countCheck = false
let sobreOUser
auth.onAuthStateChanged((val) => {
    sobreOUser = val
    if(val.email) {
        if(email != undefined && trocarDeConta == true || reload == true) {
            location.reload()

        } else {
            email = val.email
            trocarDeConta = false

            try {
                //! Vai criar a sala
                let jaTemSala = false
                db.collection('Salas').onSnapshot((data) => {
                    data.docs.map(function(valSalas) {
                        let Salas = valSalas.data()

                        if(email == Salas.Host) {
                            jaTemSala = true
                        }

                        setTimeout(() => {
                            if(location.pathname == '/sala.html' && jaTemSala != true) {
                                criarSalaNoDB()
                            }
                        }, 1000)
                    })
                })
            } catch{}

            //! Vai alterar a img do user
            try {
                document.querySelector('#imgUser').src = val.photoURL
                document.querySelector('#imgUser').style.display = 'block'
                document.getElementsByClassName('bi-person-circle')[0].style.display = 'none'
            } catch{}
        }

    } else {
        //! Vai impedir de entrar em uma sala sem antes fazer login em alguma conta para jogar
        try {
            let btnCriaSala = document.querySelector('#btnCriarSala')
            btnCriaSala.addEventListener('click', (e) => {
                e.preventDefault()
            })
        } catch{}
    }
})