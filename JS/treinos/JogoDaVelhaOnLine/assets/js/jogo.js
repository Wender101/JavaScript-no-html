//? Vai checar qual player é P1 ou P2
let jogador
let codigo = localStorage.getItem('IdSala')
let jogadas = 0
db.collection('SalasJogoDaVelha').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let salas = valSalas.data()
        
        if(salas.codigoSala == codigo) {
            //? Vai checar se é o administrador da sala(P1)
            auth.onAuthStateChanged((valorEmail) => {
                if(valorEmail.email == salas.Admin) {
                    jogador = 'P1'
                } else {
                    jogador = 'P2'
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

                jogadas++
                setTimeout(() => {
                    //? Vai identificar de quem é a vez (p1 ou p2)
                    let aviso = document.getElementById('aviso')
                    if(jogadas % 2 == 0) {
                        if(jogador == 'P1') {
                            aviso.innerText = 'Vez do oponente...'
                        } else {
                            aviso.innerText = 'Sua vez...'
                        }
                    } else {
                        if(jogador == 'P1') {
                            aviso.innerText = 'Sua vez...'
                        } else {
                            aviso.innerText = 'Vez do oponente...'
                        }
                    }
                    
                }, 500)
            } catch{}
            
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
        //? Vai permitir que vc click apenas em sua vez
        if(aviso.innerText == 'Sua vez...') {
            if(jogador == 'P1') {
                x1.style.background = 'blue'
                x2.style.background = 'blue'
    
            } else {
                divC.style.border = '3px solid red'
            }
            movimentos.push(c)
        }

        //? Vai salvar o movimento do jogador
        db.collection('SalasJogoDaVelha').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let salas = valSalas.data()

                if(salas.codigoSala == codigo) {
                    if(jogador == 'P1') {
                        db.collection('SalasJogoDaVelha').doc(valSalas.id).update({movimentosP1: movimentos})
                    } else {
                        db.collection('SalasJogoDaVelha').doc(valSalas.id).update({movimentosP2: movimentos})
                    }
                }
            })
        })
    })
}