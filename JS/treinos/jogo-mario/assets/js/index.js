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
    const tuboPosition = tubo.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if(tuboPosition <= 103 && tuboPosition > 0 && marioPosition < 103) {
        perdeuOJogo = true
        tubo.style.left = `${tuboPosition}px`
        mario.src = 'assets/img/game-over.png'
        mario.classList.add('perdeu')
        tubo.style.animation = 'none'
        perdeu()
    }

    if(perdeuOJogo == false) {
        audio.play()
        pontuacao.innerText = `Pontos: ${p}`
        p++
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

document.addEventListener('keypress', jump)
document.addEventListener('click', jump)


