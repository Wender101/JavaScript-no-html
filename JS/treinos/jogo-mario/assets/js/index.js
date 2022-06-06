const audio = document.querySelector('audio')
audio.play()

const tubo = document.getElementById('tubo')
const mario = document.getElementById('mario')
const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')   
    }, 500)
}

const loop = setInterval(function() {
    const tuboPosition = tubo.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if(tuboPosition <= 103 && tuboPosition > 0 && marioPosition < 103) {
        tubo.style.animation = 'none'
        tubo.style.left = `${tuboPosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = 'assets/img/game-over.png'
    } 
}, 10)

document.addEventListener('keypress', jump)
document.addEventListener('click', jump)


