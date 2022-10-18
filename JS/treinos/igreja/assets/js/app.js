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

auth.onAuthStateChanged((valor) => {
    if(valor) {
        if(valor.email == 'wendernatanael2019@gmail.com') {
            console.log('logado!');
        }
    }
})

const db = firebase.firestore()

for (let c = 1; c <= 100; c++) {
    criar(c)
}

let numC
function criar(c) {
    let button = document.createElement('button')
    let span = document.createElement('span')
    button.id = c
    span.innerText = c
    button.appendChild(span)
    document.getElementById('container').appendChild(button)

    //? Evento de click
    button.addEventListener('click', (e) => {
        let clas = e.target.className
        let idBtn = e.target.id

        if(clas != 'jaEscolhido' && idBtn != 'jaEscolhido' ) {
            document.getElementById('abaSorteio').style.display = 'flex'
            let numEscolhido = document.getElementById('numEscolhido').innerText = `Número: ${c}`
            numC = c
        }
    })
}

function fechar() {
    document.getElementById('abaSorteio').style.display = 'none'
}

//? Vai enviar as informações
function enviar() {
    let nome = document.getElementById('nome').value
    let telefone = document.getElementById('telefone').value

    //? Vai salvar no banco de dados
    salvar(nome, telefone, numC)
    fechar()
}

function salvar(nome, telefone, numero) {
    let dados = {
        nome,
        telefone,
        numero
    }
    db.collection('Sorteio').add(dados)
}

db.collection('Sorteio').onSnapshot((data) => {
    document.getElementById('container').style.display = 'block'
    data.docs.map(function(val) {
        let p = val.data()
        //? Vai bloquear os números que já foram escolhidos
        let numeroJaSelecionado = document.getElementById(p.numero)
        let numbers = numeroJaSelecionado.querySelector('span')
        numeroJaSelecionado.className = 'jaEscolhido'
        numbers.className = 'jaEscolhido'
    })
}) 

//? Função Sortear
function sortear() {
    let todosOsNumeros = []
    
    db.collection('Sorteio').onSnapshot((data) => {
        document.getElementById('container').style.display = 'block'
        data.docs.map(function(val) {
            let p = val.data()
            todosOsNumeros.push(p.numero)
        })
    }) 

    setTimeout(() => {
        let numSorteado = Math.floor(Math.random() * todosOsNumeros.length)
        alert(todosOsNumeros[numSorteado])
    }, 1000);
}