let codigoSala = localStorage.getItem('codigoSala')
let carregado = false
auth.onAuthStateChanged((valorEmail) => {
    const btnCriarSala = document.getElementById('btnCriarSala')
    const btnEntrarSala = document.getElementById('btnEntrarSala')

    //? O user sera barrado não tenha conta e tente criar sala ou entrar em uma
    if(valorEmail == undefined || valorEmail == null) {
        btnCriarSala.href = ''
        btnEntrarSala.href = ''

        btnCriarSala.addEventListener('click', (event) => {
            event.preventDefault()
            auth.signInWithPopup(provider)

        })

        btnEntrarSala.addEventListener('click', (event) => {
            event.preventDefault()
            auth.signInWithPopup(provider)
        })

    } else {
        btnCriarSala.href = 'Criar-Sala.html'
        
        //? Ao clicar em se juntar a uma sala
        btnEntrarSala.addEventListener('click', () => {
            const inputCodigoSala = document.querySelector('#inputCodigoSala')
            
            //? Vai checar o código e entrar na sala
            if(inputCodigoSala.style.display == 'block') {
                db.collection('SalasJogoDaVelha').onSnapshot((data) => {
                    data.docs.map(function(valSalas) {
                        let salas = valSalas.data()

                        if(inputCodigoSala.value == valSalas.id) {

                        }
                    })
                })

            } else {
                inputCodigoSala.style.display = 'block'
            }

        })
    }
})

//? Vai excluir as salas do jogador
function excluirSalas() {
    db.collection('SalasJogoDaVelha').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let salas = valSalas.data()
    
            if(email != undefined && email != null) {
                if(salas.Host == email) {
                    db.collection('SalasJogoDaVelha').doc(valSalas.id).delete()
                }
            }
        })
    })
} //excluirSalas()

let atualuzado = false
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()

        if(salas.ModoSala == 'Pública') {
            if(atualuzado == false) {
                atualuzado = true
                document.querySelector('#todasAsSalas').innerHTML = ''
                setTimeout(() => {
                    atualuzado = false
                }, 1000)
            }

            colocarSalasNaTela(valSalas.id)

            if(salas.Oponente.EmailPlayer == email) {
                if(location.href == 'http://127.0.0.1:5500/Home.html') {
                    location.href = 'http://127.0.0.1:5500/Criar-Sala.html'
        
                    setTimeout(() => {
                        location.reload()
                    }, 200)
        
                } else if(location.href == 'http://127.0.0.1:5500/Home.html') {
                    location.href = 'http://127.0.0.1:5500/Criar-Sala.html'
        
                    setTimeout(() => {
                        location.reload()
                    }, 200)
                }
            }
        }
    })
})

function colocarSalasNaTela(idSala) {
    let todasAsSalas = document.querySelector('#todasAsSalas')
    let sala = document.createElement('div')
    let codiguinhoDaSalaOMG = document.createElement('p')

    codiguinhoDaSalaOMG.innerText = idSala

    sala.appendChild(codiguinhoDaSalaOMG)
    todasAsSalas.appendChild(sala)

    sala.addEventListener('click', () => {
        localStorage.setItem('codigoSala', idSala)
        db.collection('SalasJogoDaVelha').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let salas = valSalas.data()

                if(codigoSala == valSalas.id) {
                    let obj = {
                        EmailPlayer: email,
                        Pontos: 0,
                        Movimentos: []
                    }
                    db.collection('SalasJogoDaVelha').doc(valSalas.id).update({Oponente: obj})
                }
            })
        })

    })
}