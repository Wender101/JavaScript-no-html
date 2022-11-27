let jaTemCodigo = false
let codigoSalvo = localStorage.getItem('IdSala')
//? Vai colocar o nome do adversario na tela
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()

        auth.onAuthStateChanged((valorEmail) => { 
            if(salas.Admin == valorEmail.email) {
                let p = document.getElementById('otherPlayer')
                p.innerText = salas.otherPlayer

                document.getElementById('codigoSala').innerText = salas.codigoSala
                jaTemCodigo = true
                
                localStorage.setItem('IdSala', salas.codigoSala)

                if(p.innerText != '') {
                    location.href = 'http://127.0.0.1:5500/Jogo-Da-Velha.html'
                }
            }
        })
    })
})

setTimeout(() => {
    if(jaTemCodigo == false) {
        gerarCodigo()
    }
}, 1000)

let respostaFinal
function gerarCodigo() {
    //? Vai gerar o código da sala
    const letras = 'abcdefghijklmnopqrstuvwxyz'
    const numeros = '1234567890'
    respostaFinal = ''
    
    for(let c = 0; respostaFinal.length < 10; c++) {
        //? Vai sortear as letras
        if(respostaFinal.length < 10) {
            let num1 = Math.floor(Math.random() * 26) 
            let respletras = letras.charAt(num1) 
            respostaFinal += respletras
        } 
    
        //? Vai sortear os números
        if(respostaFinal.length < 10) {
            let num3 = Math.floor(Math.random() * 10) 
            let resNumeros = numeros.charAt(num3)
            respostaFinal += resNumeros
        }
    
        //? Vai colocar na tela o código da sala
        if(respostaFinal.length == 10) {
            document.getElementById('codigoSala').innerText = respostaFinal
        }

        localStorage.setItem('IdSala', respostaFinal)
        codigoSalvo = localStorage.getItem('IdSala')
    } //? Fim Gerador de códigos
}

//? Vai colocar teu email na tela
auth.onAuthStateChanged((valorEmail) => { 
    document.getElementById('yourEmail').innerText = valorEmail.email
    //? Vai chamar a function de adicionar a sala no DB
    addSala(valorEmail.email)
})

//? Vai colocar sua sala no DB
function addSala(email) {
    let jaTemSala = false

    db.collection('SalasJogoDaVelha').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let salas = valSalas.data()

            //? Vai checar se já há uma sala pra esse usuario
            if(salas.Admin == email) {
                jaTemSala = true
                return
            }
            setTimeout(() => {
                if(salas.Admin != email && jaTemSala == false) {
                    let objSala = {
                        Admin: email,
                        movimentosP1: [],
                        movimentosP2: [],
                        otherPlayer: '',
                        codigoSala: respostaFinal
                    }
                    
                    db.collection('SalasJogoDaVelha').add(objSala)
                }
            }, 1000)
        })
    })
}