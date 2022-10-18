// A var "ativo" vai impedir que vc envie sem antes add as inf do produto 
let ativo = false
function add() {
    // Vai fazer a section aparecer
    let adicioar = document.getElementById('Sadd')
    adicioar.style.display = 'block'
    ativo = true
}

function sumir() {
    // Vai fazer a section sumir
    let adicioar = document.getElementById('Sadd')
    adicioar.style.display = 'none'
}

document.addEventListener('keydown', e => {

    if(ativo == false && e.keyCode == 107) {
        add()
        ativo = true

    } else if(ativo == true && e.keyCode == 13) {
        enviar()
        ativo = false
    }
})


function enviar() {
    const imagem = document.getElementById('imagem').value
    console.log(imagem);
    const nome = document.getElementById('nome').value
    const desc = document.getElementById('desc').value
    
    addNoBancoDeDados(nome, desc, imagem)
}

let id = 0
function construirProduto(nome, desc, imagem) {
    const main = document.querySelector('main')

    if(nome == '' || desc == '' || imagem == '') {
        const alerta = document.getElementById('alerta')
        alerta.style.display = 'block'

    } else {
        const div = document.createElement('div')
        const img = document.createElement('img')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        div.id = id
        img.src = imagem
        h3.innerText = nome
        p.innerText = desc

        main.appendChild(div)
        div.appendChild(img)
        div.appendChild(h3)
        div.appendChild(p)
        
        ativo = false

        // Vai fazer a section sumir
        sumir()

        div.addEventListener('click', () => {
            deletar(div.id)
        })

        id++
    }

}

//? Firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyASXflrIBeCuJNyBzj_PMLUK4ogiXNrRxM",
authDomain: "testefirebase-f5ba5.firebaseapp.com",
projectId: "testefirebase-f5ba5",
storageBucket: "testefirebase-f5ba5.appspot.com",
messagingSenderId: "74488269277",
appId: "1:74488269277:web:920d6da919c6fa2e1bce34"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//? My code
const provider = new firebase.auth.GoogleAuthProvider()

const db = firebase.firestore()

function addNoBancoDeDados(nome, desc, imagem) {
    let objProdutos = {
        imagem,
        nome,
        desc
    }
    db.collection('Produtos').add(objProdutos)
}

db.collection('Produtos').onSnapshot((data) => {
    const main = document.querySelector('main')
    main.innerHTML = ''
    data.docs.map(function(val) {
        let p = val.data()
        construirProduto(p.nome, p.desc, p.imagem)
    })
}) 

function deletar(id) {
    let objDeletado = document.getElementById(id)
    objDeletado.parentNode.removeChild(objDeletado)
}