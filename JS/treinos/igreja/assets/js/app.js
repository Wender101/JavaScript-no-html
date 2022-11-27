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

//? essas variaveis ("emailAtual" e "ja" servem para atualisar a pág sempre que o usuario trocar de conta)
let email
let emailAtual
let ja = false
auth.onAuthStateChanged((val) => {
    email = val.email
    
    //? Vai passar o email atual do user para a var "emailAtual"
    if(ja == false) {
        emailAtual = email
        ja = true
    }

    setInterval(() => {
        try {
            //? Vai checar de o usuario trocou de conta
            if(email != emailAtual) {
                location.reload()
            }
            
            //? Vai checar se o user é o adimnistrador
            if(email == 'wendernatanael2019@gmail.com') {
                document.getElementById('btnSortear').style.display = 'block'
                document.addEventListener('keypress', (e) => {
                    if(e.keyCode == 13) {
                        sortear()
                    }
                })
                
            } else {
                document.getElementById('btnSortear').style.display = 'none'
            }
        } catch{}
    }, 100)
})

function login() {
    auth.signInWithPopup(provider)
}

const db = firebase.firestore()

//? Vai checar se o serteio já ocorreu
db.collection('Sorteado').onSnapshot((data) => {
    document.getElementById('container').style.display = 'block'
    data.docs.map(function(val) {
        if(typeof(val.data().numeroSorteado) == 'number' && email != 'wendernatanael2019@gmail.com') {
            document.querySelector('main').remove()
            document.getElementById('sorteado').style.display = 'block'
            document.getElementById('nomeGanhador2').innerText = val.data().ganhador
            document.getElementById('numeroGanhador2').innerText = val.data().numeroSorteado

        } else {
            for (let c = 1; c <= 100; c++) {
                criar(c)
            }
        }
    })
})

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

        //? Vai checar se o número já foi escolhido
        if(clas != 'jaEscolhido' && idBtn != 'jaEscolhido' ) {

            //? Pedir pra logar no site caso não tenha logado
            auth.onAuthStateChanged((val) => {
                if(val == null) {
                    login()

                } else {
                    let feito = false
                    email = val.email
                    document.getElementById('abaSorteio').style.display = 'flex'
                    document.getElementById('add').style.display = 'block'
                    numC = c //? Número que foi clicado pelo user
                    let numEscolhido = document.getElementById('numEscolhido').innerText = `Número: ${c}`
                    document.getElementById('enviar').innerText = 'Enviar'

                    //? Vai limpar os inputs
                    document.getElementById('nome').value = ''
                    document.getElementById('telefone').value = ''

                    db.collection('Sorteio').onSnapshot((data) => {
                        document.getElementById('container').style.display = 'block'
                        data.docs.map(function(val) {
                            let valorSorteio = val.data()

                            //? Vai checar se o user quer editar ou comprar um novo número
                            if(valorSorteio.email == email && valorSorteio.numero == numC && feito == false && clas == 'seu') {
                                document.getElementById('nome').value = valorSorteio.nome
                                document.getElementById('telefone').value = valorSorteio.telefone

                                let enviar = document.getElementById('enviar')
                                enviar.innerText = 'Editar'
                                
                                //? Ao clicar em editar
                                enviar.addEventListener('click', () => {
                                    if(enviar.innerText == 'Editar' && feito == false && valorSorteio.numero == numC) {
                                        db.collection('Sorteio').doc(val.id).update({nome: document.getElementById('nome').value, telefone: document.getElementById('telefone').value})
                                        feito = true

                                        fechar()
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

function fechar() {
    document.getElementById('abaSorteio').style.display = 'none'
}

//? Vai enviar as informações
function enviar() {
    if(document.getElementById('enviar').innerText == 'Enviar') {
        let nome = document.getElementById('nome').value
        let telefone = document.getElementById('telefone').value
    
        //? Vai salvar no banco de dados
        salvar(nome, telefone, numC, email)
        fechar()
    }
}

function salvar(nome, telefone, numero, email) {
    let dados = {
        email,
        nome,
        numero,
        telefone
    }

    db.collection('Sorteio').add(dados)
}

//? Vai colocar as informações na tela
db.collection('Sorteio').onSnapshot((data) => {
    document.getElementById('container').style.display = 'block'
    data.docs.map(function(val) {
        let p = val.data()
        //? Vai bloquear os números que já foram escolhidos
        let numeroJaSelecionado = document.getElementById(p.numero)
        let numbers = numeroJaSelecionado.querySelector('span')

        if(p.email == email) {
            numeroJaSelecionado.className = 'seu'
            numbers.className = 'seu'
            document.querySelector('p').style.display = 'block'

        } else {
            numeroJaSelecionado.className = 'jaEscolhido'
            numbers.className = 'jaEscolhido'
        }
    })
}) 

//? Função Sortear
function sortear() {
    for(let c = 1; c <= 100; c++) {
        document.getElementById(c).style.background = ''
    }

    let todosOsNumeros = []
    
    db.collection('Sorteio').onSnapshot((data) => {
        document.getElementById('container').style.display = 'block'
        data.docs.map(function(val) {
            let p = val.data()
            todosOsNumeros.push(p.numero)
        })
    }) 

    //? Vai sortear um número, de todos os salvos no BD
    let sorteado = 0
    setTimeout(() => {
        let numSorteado = Math.floor(Math.random() * todosOsNumeros.length)
        
        sorteado = todosOsNumeros[numSorteado]
    }, 1000)
    
    let c = 0
    let fistTime = false
    setTimeout(() => {
        setInterval(() => {
            c++

            let btn = document.getElementById(c)
            let btn2 = document.getElementById(c - 1)
            
            if(c <= sorteado) {

                if(c == 1) {
                    document.getElementById('1').style.background = 'red'
                    document.getElementById('1').querySelector('span').style.color = 'var(--cor1)'

                } else if(c == 2) {
                    document.getElementById('1').style.background = ''
                    document.getElementById('1').querySelector('span').style.color = ''

                } else {
                    btn2.style.background = ''
                    btn2.querySelector('span').style.color = ''
    
                    btn.style.background = 'red'
                    btn.querySelector('span').style.color = 'var(--cor1)'
                }


            } else {
                if(fistTime == false) {
                    setTimeout(() => {
                        ganhador(sorteado)
                    }, 3000);
                    fistTime = true
                }
            }
        }, 50)
    }, 2000)
} 

//? Vai mostrar os dados do ganhador
function ganhador(num) {
    db.collection('Sorteio').onSnapshot((data) => {
        data.docs.map(function(val) {
            let p = val.data()
            if(p.numero == num) {
                document.getElementById('abaSorteio').style.display = 'flex'
                document.getElementById('ganhador').style.display = 'block'
                document.getElementById('nomeGanhador').innerText = `Nome: ${p.nome}`
                document.getElementById('emailGanhador').innerText = `Email: ${p.email}`
                document.getElementById('numeroGanhador').innerText = `Número: ${p.numero}`
                document.getElementById('telefoneGanhador').innerText = `Telefone: ${p.telefone}`

                db.collection('Sorteado').onSnapshot((data) => {
                    data.docs.map(function(val) {
                        db.collection('Sorteado').doc(val.id).update({numeroSorteado: num, ganhador: p.nome, email: p.email, numero: p.telefone})
                    })
                })
            }
        })
    }) 
}