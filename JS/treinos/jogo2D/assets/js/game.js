const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const canvasWidth = 1024
const canvasHeigth = 576

canvas.width = canvasWidth
canvas.height = canvasHeigth

let prevTime = 0

animate()

function animate() {
    window.requestAnimationFrame(animate)

    handleControls()

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvasWidth, canvasHeigth)

    background.update()
    player.update()
    //player2.update()

    //? Vai rodar o jogo a quantidade de frames que o pc aguenta
    let delta = (performance.now() - prevTime) / 1000
    let fps = 1 / delta
    
    prevTime = performance.now()
    document.getElementById('fps').innerText = `FPS: ${fps.toFixed(0)}`
}