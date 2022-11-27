let carregadoSalas = false
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()
        
        setTimeout(() => {
            carregadoSalas = true
        }, 1000)

        if(carregadoSalas == true) {
            document.querySelector('main').innerHTML = ''
            carregadoSalas = false
        }
        criarBtnSalas(salas.codigoSala)
    })
})

function criarBtnSalas(codigo) {
    let btn = document.createElement('button')
    let main = document.querySelector('main')

    btn.innerText = `Sala: ${codigo}`

    main.appendChild(btn)

    //? funções ao clicar
    btn.addEventListener('click', () => {
        db.collection('SalasJogoDaVelha').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let salas = valSalas.data()
                
                if(salas.codigoSala == codigo) {
                    auth.onAuthStateChanged((valorEmail) => {
                        db.collection('SalasJogoDaVelha').doc(valSalas.id).update({otherPlayer: valorEmail.email})

                        localStorage.setItem('IdSala', codigo)

                        setTimeout(() => {
                            location.href = 'http://127.0.0.1:5500/Jogo-Da-Velha.html'
                        }, 1000)
                    })

                }
            })
        })
    })
}