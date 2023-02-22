//? Vai colocar as imgs do jogadores nos seus respectivos lugares
function criarJogadores() {
    let localJogadores = document.getElementById('localJogadores')
    localJogadores.innerHTML = ''
    let feito = false

     db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let Salas = valSalas.data()

            if(valSalas.id == codigoSala && feito == false) {
                feito = true
                for(let c = 0; c < Salas.SobreOsJogadores.length; c++) {

                    let div = document.createElement('div')
                    let p = document.createElement('p')
                    let img = document.createElement('img')

                    div.className = 'jogadores'
                    p.className = 'pontos'
                    
                    p.innerText = 0
                    img.src = Salas.SobreOsJogadores[c].ImgUser

                    div.appendChild(p)
                    div.appendChild(img)
                    localJogadores.appendChild(div)
                }
            }
        })
    })
} criarJogadores()

//? Vai checar de quem é a vez
let ultimoJogador = 0
function checarVez() {
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            
            if(valSalas.id == codigoSala) {
                try {
                    if(email == Salas.SobreOsJogadores[Salas.Vez].EmailJogador) {
                        document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'none'
                        document.getElementsByClassName('keyboard')[0].style.display = 'block'

                    } else {
                        foiOuserQuePrecionouEssaTecla = false
                        document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'block'
                        document.getElementsByClassName('keyboard')[0].style.display = 'none'
                    }
                } catch (error) {
                    document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'block'
                    document.getElementsByClassName('keyboard')[0].style.display = 'none'
                }
            }
        })
    })
} checarVez()

//? Sempre que houver uma atualização na sala, essa function será acionada
db.collection('Salas').onSnapshot((data) => {
    data.docs.map(function(valSalas) {
        let Salas = valSalas.data()

        //? Vai checar a sala correta, a qual o jogador está conectado
        if(valSalas.id == codigoSala) {
            //? Vai checar se há um vencedor
            if(Salas.GanhadorDaVez.Email != '') {
                temosUmVencedor(true, Salas.GanhadorDaVez.Nome, Salas.GanhadorDaVez.Email)
            }
    
            //? Sempre que a vez for alterada, ele vai chamar a função checarVez()
            if(Salas.Vez != ultimoJogador) {
                checarVez()
                ultimoJogador = parseInt(Salas.Vez)
            }
    
            //? Vai atualizar a página quando o Host iniciar uma nova partida
            for(let c = 0; c < Salas.SobreOsJogadores.length; c++) {

                //? Vai atualizar a pagina quando o Host começar uma nova partida
                if(Salas.Palavra != palavraSorteada && parseInt(Salas.SobreOsJogadores[c].Pontos) > 0) {
                    location.reload()
                }


                // //? Vai checar se a sala foi criada recentemente
                // let AsalaFoiCriadaRecentemente = false

                // if(localStorage.getItem('SalaCriadaRecentemente') != undefined && localStorage.getItem('SalaCriadaRecentemente') != null) {
                //     let a = localStorage.getItem('SalaCriadaRecentemente') 
                //     AsalaFoiCriadaRecentemente = JSON.parse(a)
                // }

                // if(Salas.SobreOsJogadores[c].Pontos != 0 && AsalaFoiCriadaRecentemente == false) {
                //     AsalaFoiCriadaRecentemente = true

                // }

                // //? Vai atualizar a sala se ele identificar que a sala foi criada agr
                // setTimeout(() => {
                //    if(AsalaFoiCriadaRecentemente == true) {
                //         AsalaFoiCriadaRecentemente = false
                //         localStorage.setItem('SalaCriadaRecentemente', AsalaFoiCriadaRecentemente)
                //         location.reload()
                //    } 
                // }, 1000)
            }

        }
    })
})

//? Vai checar se o jogador ganhou e marcar o ponto
function temosUmVencedor(vencedor = false, nomeVencedor, emailVencedor) {

    let jogadorVencedor //? vai conter o número da vez do jogador vencedor, fanzendo assim com que a proxima partida comece por ele

    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            if(valSalas.id == codigoSala) {
                //? vai tirar a aba de carregando
                document.getElementById('carregando').style.display = 'none'

                document.getElementById('InfoGanhador').style.top = '0px'
                document.getElementById('nomeGanhador').innerText = nomeVencedor

                //? Vai pegar o número da vez do jogador vencedor, fanzendo assim com que a proxima partida comece por ele
                for(let c = 0; c < Salas.SobreOsJogadores.length; c++) {
                    if(emailVencedor == Salas.SobreOsJogadores[c].EmailJogador) {
                        jogadorVencedor = c
                    }
                }

                if(email == Salas.Host) {
                    let btn = document.getElementById('btnHost')
                    btn.style.display = 'block'

                    //? Vai começar uma nova partida
                    btn.addEventListener('click', () => {

                        localStorage.setItem('errosDoUser', -1)

                        db.collection('Salas').doc(valSalas.id).update({Vez: jogadorVencedor, Palavra: '', Letras: [],GanhadorDaVez: {Nome: '',Email: ''}})
                    })

                } else {
                    document.getElementById('avisoAosParticipantes').style.display = 'block'
                }
            }
        })
    })
}

//? Pontos, vai marcar os pontos de cada jogador e arrumar o rank de acordo com a pontuação