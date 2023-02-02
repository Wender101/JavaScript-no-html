//! Vai criar a sala no banco de dados
function criarSalaNoDB() {
    let InfoSala = {
        Estado: 'Publica',
        Host: email,
        Vez: 1,
        Palavra: '',
        Letras: [],
        SobreOsJogadores: [
            {
                EmailJogador: email,
                Estado: 'Jogando',
                Pontos: 0
            }
        ]
    }

    db.collection('Salas').add(InfoSala)
} 

function pegarInfosSala() {
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            if(Salas.Host == email) {
                qntJogadores = 1
                document.getElementById('localPlayersName').innerHTML = ''

                for(let c = 0; c < qntJogadores; c++) {
                    try {
                        if(Salas.SobreOsJogadores[c].EmailJogador != '') {
                            qntJogadores++
                            document.getElementById('quantidadeJogadores').innerText = `${qntJogadores-1}/5`
                            document.getElementById('codigoSala').innerText = valSalas.id
        
                            let div = document.createElement('div')
                            let p = document.createElement('p')
        
                            div.className = 'sobreJogador'
                            p.innerText = Salas.SobreOsJogadores[c].EmailJogador
                            div.appendChild(p)
                            document.getElementById('localPlayersName').appendChild(div)
                        }
                    } catch{}
                }
            }
        })
    })
} pegarInfosSala()

//! vai apagar a sala e voltar para a página principal
function cancelSala() {

}

let qntJogadores = 1 //? Vai contar qnts jogadores tem na sala

let iniciar = document.getElementById('iniciar')
if(qntJogadores < 2) {
    iniciar.addEventListener('click', (e) => {
        if(qntJogadores < 2) {
            e.preventDefault()
        }
    })
}

//! vai começar o jogo se haver mais de 1 player
function iniciarSala() {
    if(qntJogadores < 2) {
        iniciar.addEventListener('click', (e) => {
            e.preventDefault()
        })
    }
}