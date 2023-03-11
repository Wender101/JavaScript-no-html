var firebaseConfig = {
    apiKey: "AIzaSyAf64jnLWXDgb8HziVAbqDyHS5xMuupgo4",
    authDomain: "treefy-3e5ae.firebaseapp.com",
    projectId: "treefy-3e5ae",
    storageBucket: "treefy-3e5ae.appspot.com",
    messagingSenderId: "444736184889",
    appId: "1:444736184889:web:9e07e1a665a52b8230a3e8"
}

firebase.initializeApp(firebaseConfig)

//? My code
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()
const storage = firebase.storage()

let logado = false
function login() {
    logado = true
    auth.signInWithPopup(provider)
}

let email
auth.onAuthStateChanged((val) => {
    if(val.email) {
        email = val.email

        if(logado == true) {
            trocarDeConta = false
            let emailEncontrado = false

            db.collection('Usuarios').onSnapshot((data) => {
                data.docs.map(function(valor) {
                    let DadosDB = valor.data()
                    
                    try {
                        if(DadosDB.infUser.Email == email) {
                            irParaPagPrincipal()
                            emailEncontrado = true
                        }
                    } catch(e){}
                })
            })

            //? Caso o user não tenha uma conta de email
            setTimeout(() => {
                if(emailEncontrado == false) {
                    let inputNome = document.querySelector('input').value

                    let perfilUser = {
                        infUser: {
                            Email: email,
                            Nome: inputNome
                        },

                        Musica: {
                            MusicasCurtidas: [],
                            MusicasPostadas: []
                        }
                    }

                    db.collection('Usuarios').add(perfilUser)
                    irParaPagPrincipal()
                }
            }, 1000)
        }
    } 
})

function irParaPagPrincipal() {
    if(location.href == 'http://127.0.0.1:5500/Cadastro.html' || location.href == 'http://127.0.0.1:5500/Acesso-Antecipado.html') {
        setTimeout(() => {
            location.href = 'http://127.0.0.1:5500/Home.html'
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 2000)
    }
}

const chaves = ['+g4Q#t9Y&w4D)y1P$r0V#e2', ')g5F#i3A#t1G&e7W_y0I+r0', ')u2I%r1O(p1D=x1K*y7M)g4', '+p1N#p0A+o9Z-h6Y_q7S)k8', '@l8F)i1E(a2X)p1Q!m8H+m1', '@p4F)u9B+x5K&t4S%u2U$a3']