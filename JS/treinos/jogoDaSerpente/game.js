import { SNAKE_SPEED } from "./snake.js"

let lasRenderTime = 0

requestAnimationFrame(main)


function main(currentTime) {
    requestAnimationFrame(main)

    const secondsSinceLastRender = currentTime - lasRenderTime / 1000

    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lasRenderTime = currentTime
}

function update() {

}

function draw() {

}