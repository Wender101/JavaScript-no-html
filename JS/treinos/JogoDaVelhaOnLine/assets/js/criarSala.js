let codigoSala = localStorage.getItem('codigoSala')

let salaEncontrada = false
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()

        if(email != undefined && email != null) {
            if(salas.Host == email) {
                localStorage.setItem('codigoSala', valSalas.id)
                salaEncontrada = true
                colocarInfoDaSalaNaTela(valSalas.id, salas.Oponente.EmailPlayer, salas.Host)
            }
    
            setTimeout(() => {
                if(salaEncontrada == false) {
                    criarSala()
                }
            }, 1000)
        }
    })
})

//? Vai criar a sala no banco de dados
function criarSala() {
    let sala = {
        Host: email,
        ModoSala: 'Pública',
        Adm: {
            movimentos: [],
            Pontos: 0
        },
        Oponente: {
            EmailPlayer: '',
            movimentos: [],
            Pontos: 0
        },
        Ganhador: {
            PartidaFinalizada: false,
            Nome: ''
        }
    }

    db.collection('SalasJogoDaVelha').add(sala)
}

//? Vai alternar os modos da sala
let podeAtualizar = true
function mudarModoSala() {
    let modoAtualSala = 'Pública'
    let modoSala = document.querySelector('#modoSala')

    db.collection('SalasJogoDaVelha').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let salas = valSalas.data()
            
            if(codigoSala == valSalas.id && podeAtualizar == true) {
                podeAtualizar = false
                
                if(modoSala.style.background == 'red') {
                    modoSala.innerHTML = 'Pública'
                    modoSala.style.background = 'rgb(0, 255, 0)'
                } else {
                    modoSala.innerHTML = 'Privado'
                    modoSala.style.background = 'red'
                }
                
                modoAtualSala = modoSala.innerHTML
                db.collection('SalasJogoDaVelha').doc(valSalas.id).update({ModoSala: modoAtualSala})

                setTimeout(() => {
                    podeAtualizar = true
                }, 500)
            }
        })
    })
}

function colocarInfoDaSalaNaTela(codigoDaSala, emailOponente, emailHost) {
    document.querySelector('#codigoSala').innerHTML = codigoDaSala
    document.querySelector('#yourEmail').innerHTML = emailHost
    document.querySelector('#otherPlayer').innerHTML = emailOponente
}