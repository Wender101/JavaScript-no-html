let codigoSala = localStorage.getItem('CódigoSala') //? Vai pegar o código da antiga sala

localStorage.setItem('SalaCriadaAgora', true) //? Vai impedir de criar outra sala ao atualizar a página
let salaCriadaAgora = JSON.parse(localStorage.getItem('SalaCriadaAgora'))
//? Vai cancelar a sala

document.getElementById('cancelar').addEventListener('click', () => {
    excluirSala(true)
})

function excluirSala(cancelar = false) {
    if(salaCriadaAgora == false) {
        db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let Salas = valSalas.data()
    
                //? Vai checar se o user é o Host de alguma sala existente. e vai deletar a sala, pelo o fato de o user estar criando outra
                if(valSalas.id == codigoSala && email == Salas.Host) {
                    db.collection('Salas').doc(valSalas.id).delete() //? Vai apagar a sala antiga desse admin
    
                    criarSalaNoDB()
                    pegarInfosSala()
                }
            })
        })
    } else {
        db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let Salas = valSalas.data()

                if(valSalas.id == codigoSala && email == Salas.Host && cancelar == true) {
                    db.collection('Salas').doc(valSalas.id).delete() //? Vai apagar a sala antiga desse admin 

                    setTimeout(() => {
                        location.href = 'http://127.0.0.1:5500/home.html'
                    }, 1000)
                }
            })
        })
    }
} excluirSala()

//? Vai criar a sala no banco de dados
function criarSalaNoDB() {
    let InfoSala = {
        Estado: 'Publica',
        Host: email,
        Vez: 0,
        Palavra: '',
        Letras: [],
        GanhadorDaVez: {
            Nome: '',
            Email: '', 
        },
        SobreOsJogadores: [
            {
                ImgUser: sobreOUser.photoURL,
                EmailJogador: email,
                Estado: 'Jogando',
                Pontos: 0
            }
        ]
    }

    db.collection('Salas').add(InfoSala)

    localStorage.setItem('errosDoUser', -1)
} 

function pegarInfosSala() {
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            if(Salas.Host == email) {
                qntJogadores = 1
                document.getElementById('localPlayersName').innerHTML = ''
                localStorage.setItem('CódigoSala', valSalas.id) //? Vai salvar o id da sala no localStorage do user

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