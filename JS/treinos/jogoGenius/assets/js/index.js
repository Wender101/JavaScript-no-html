let salvarSequencia = []
let sequenciaJogador = []
let contador = 0
let podeJogar = true
let maiorQuantidadeDePontosSalvo = 0
let pVez = document.querySelector('#vez')
//? Vai pegar os pontos do localStorage
try {
    if(localStorage.getItem('PontosJogoGenuis') != undefined && localStorage.getItem('PontosJogoGenuis') != null) {
        document.querySelector('#mlrPontos').innerText = localStorage.getItem('PontosJogoGenuis')
        maiorQuantidadeDePontosSalvo = parseInt(localStorage.getItem('PontosJogoGenuis'))
    }
} catch (error){console.warn(error);}

function iniciarGame() {
    document.querySelector('#iniciarGameModal').style.display = 'none'

    for(let c = 0; c < 16; c++) {
        let td = document.getElementsByClassName('td')[c]
        td.addEventListener('click', () => {

            //? Vai impedir o jogador de jogar qnd o bot estiver mostrando a merda do lugar q é para clicar :/
            if(podeJogar == true) {

                sequenciaJogador.push(c)
                let errou = false
                for(let b = 0; b < sequenciaJogador.length; b++) {

                    if(salvarSequencia[b] != sequenciaJogador[b]) {
                        errou == true
                        td.className = 'errou'

                        //? Só vai salvar os pontos, se for maior que o anterior salvo
                        if(salvarSequencia.length - 1 > maiorQuantidadeDePontosSalvo) {
                            localStorage.setItem('PontosJogoGenuis', salvarSequencia.length -1)
                        }
                        
                        setTimeout(() => {
                            alert('Fim de Jogo.')
                        }, 200)
                        return
                    }
                }

                setTimeout(() => {
                    if(salvarSequencia.length == sequenciaJogador.length && errou == false) {
                        sequenciaJogador = []
                        contador = 0
                        document.querySelector('#qPontos').innerText = salvarSequencia.length
                        sortear()
                    }
                }, 100)
            }
        })
    }

    sortear()
}

function sortear() {
    podeJogar = false
    pVez.innerText = 'Aguardando Sequência...'
    let randomNum = Math.floor(Math.random() * 15)
    salvarSequencia.push(randomNum)

    iniciar()
}

function iniciar() {
    setTimeout(() => {
        if(contador < salvarSequencia.length) {
            let td = document.getElementsByClassName('td')[salvarSequencia[contador]]
            td.className = 'active'
    
            setTimeout(() => {
                td.className = 'td'
                contador++
                iniciar()
            }, 300)
        } else {
            podeJogar = true
            pVez.innerText = 'Sua Vez'
        }
    }, 100)
}