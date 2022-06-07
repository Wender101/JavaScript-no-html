// Vai escrevar os pontos
const pontos1 = localStorage.getItem('pontos');
const pontos2 = JSON.parse(pontos1);

// inicio
const audio = document.getElementById('audioInicio') 
const audio2 = document.getElementById('audioPerdeu')
const tubo = document.getElementById('tubo')
const mario = document.getElementById('mario')

const jump = () => {
    mario.classList.add('jump')
    
    setTimeout(() => {
        mario.classList.remove('jump')   
    }, 500)
}

// Pontuação
let pontuacao = document.getElementById('pontuacao')
let p = 0

let perdeuOJogo = false
const loop = setInterval(function() {
    let sectionPerdeu = document.getElementById('perdeu')
    let chao = document.getElementById('chao')
    const tuboPosition = tubo.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    
    if(tuboPosition <= 103 && tuboPosition > 0 && marioPosition < 103) {
        perdeuOJogo = true
        tubo.style.left = `${tuboPosition}px`
        mario.src = 'assets/img/game-over.png'
        mario.classList.add('perdeu')
        tubo.style.animation = 'none'
        chao.style.animation = 'none'
        perdeu()
        sectionPerdeu.style.transition = '700ms top linear'
        sectionPerdeu.style.top = '30%'

        // Vai caucular o maior ponto
        let localPontos = document.getElementById('pontosFeitos') 
        if(pontos2 > p++) {
            localPontos.innerText = `Melhor Pontuação: ${pontos2}` 
        } else {
            localPontos.innerText = `Melhor Pontuação: ${pontuacao.innerText}`
            var pontosJSON = JSON.stringify(pontuacao.innerText);
            localStorage.setItem('pontos', pontosJSON);
        }
    }
    
    if(perdeuOJogo == false) {
        p++
        audio.play()
        pontuacao.innerText = p
    } else {
        audio.pause()
    }
}, 10)

let a = false
function perdeu() {
    if(a == false) {
        audio2.play()
        a = true
    }
}

function playAgain() {
    window.location.reload()
}


document.addEventListener('keypress', jump)
document.addEventListener('click', jump)



