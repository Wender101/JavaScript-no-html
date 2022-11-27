//? Vai checar qual player é P1 ou P2
let jogador
let codigo = localStorage.getItem('IdSala')
let movimentosArray = []
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()
        
        if(salas.codigoSala == codigo) {
            //? Vai checar se é o administrador da sala(P1)
            auth.onAuthStateChanged((valorEmail) => {
                if(valorEmail.email == salas.Admin) {
                    jogador = 'P1'
                }
            })

            console.log(salas.movimentosP2);
            try {
                for (let c = 0; c < salas.movimentosP1.length; c++) {
                    document.getElementsByClassName('x1')[salas.movimentosP1[c]].style.background = 'blue'
                    document.getElementsByClassName('x2')[salas.movimentosP1[c]].style.background = 'blue'
                }

                for (let c = 0; c < salas.movimentosP2.length; c++) {
                    document.getElementsByClassName('c')[salas.movimentosP2[c]].style.border = '3px solid red'
                }
                
            } catch (error) {
                console.warn(error);
            }
        }
    })
})

let movimentos = []
for(let c = 0; c < 9; c++) {
    let divC = document.getElementsByClassName('c')[c]
    let x1 = document.getElementsByClassName('x1')[c]
    let x2 = document.getElementsByClassName('x2')[c]

    //? Ao clicar
    divC.addEventListener('click', () => {
        if(jogador == 'P1') {
            x1.style.background = 'blue'
            x2.style.background = 'blue'

        } else {
            divC.style.border = '3px solid red'
        }
        movimentos.push(c)

        //? Vai salvar o movimento do jogador
        db.collection('SalasJogoDaVelha').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let salas = valSalas.data()

                if(salas.codigoSala == codigo) {
                    auth.onAuthStateChanged((valorEmail) => {

                        if(valorEmail.email == salas.Admin) {
                            db.collection('SalasJogoDaVelha').doc(valSalas.id).update({movimentosP1: movimentos})
                        } else {
                            db.collection('SalasJogoDaVelha').doc(valSalas.id).update({movimentosP2: movimentos})
                        }
                    })
                }
            })
        })
    })
}