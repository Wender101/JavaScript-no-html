// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if true;
//     }
//   }
// }
//! -------------
//? -------------
//* -------------

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
//const analytics = firebase.getAnalytics()

// storage.ref().child('X2Download.app - Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack (128 kbps)').child('X2Download.app - Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack (128 kbps)').getMetadata().then(function(metadata) {
//     console.log(1);
//     var storageUsed = metadata.size; // Armazenamento total utilizado em bytes
//     var storageLimit = metadata.bucket; // Limite total de armazenamento em bytes
//     var storageRemaining = storageLimit - storageUsed; // Quantidade de armazenamento disponível em bytes
//     var dailyLimit = metadata.metageneration; // Limite diário de armazenamento em bytes
//     var storageUsedToday = metadata.updated; // Armazenamento utilizado hoje em bytes

//     if (storageUsedToday + storageUsed >= dailyLimit) {
//         alert("Você atingiu o limite diário de armazenamento do Firebase Storage.");
//     }
// });

let logado = false
function login() {
    logado = true
    auth.signInWithPopup(provider)
}

let email
auth.onAuthStateChanged((val) => {
    if(val == null || val == undefined) {
        irParaOacessoAntecipado()
    }

    try {
        if(val.email) {
            logado = true
            email = val.email
    
            try {
                //document.querySelector('#carregando').style.display = 'none'
            } catch{}
    
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
    } catch (error) {
        console.warn(error)
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
    } else if(location.href == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Cadastro.html' || location.href == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Acesso-Antecipado.html') {
        setTimeout(() => {
            location.href = 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Home.html'
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 2000)
    }
}

function irParaOacessoAntecipado() {
    if(location.href == 'http://127.0.0.1:5500/Home.html') {
        setTimeout(() => {
            location.href = 'http://127.0.0.1:5500/Acesso-Antecipado.html'
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 2000)
    } else if(location.href == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Home.html') {
        setTimeout(() => {
            location.href = 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Acesso-Antecipado.html'
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 2000)
    }
}

const chaves = ['+g4Q#t9Y&w4D)y1P$r0V#e2', ')g5F#i3A#t1G&e7W_y0I+r0', ')u2I%r1O(p1D=x1K*y7M)g4', '+p1N#p0A+o9Z-h6Y_q7S)k8', '@l8F)i1E(a2X)p1Q!m8H+m1', '@p4F)u9B+x5K&t4S%u2U$a3']
