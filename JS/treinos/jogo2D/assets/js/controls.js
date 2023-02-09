const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    },
    x: {
        pressed: false
    },
}
window.addEventListener('keydown', e => {
    let key = e.key

    switch(key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true
            player.lastKeyPressed = key
        break

        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true
            player.lastKeyPressed = key
        break

        case 'ArrowUp':
        case ' ':
        case 'w':
            keys.w.pressed = true
        break

        case 'x':
        case 'X':
            keys.x.pressed = true
        break
    }
})

window.addEventListener('keyup', e => {
    let key = e.key

    switch(key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false
        break

        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false
        break

        case 'ArrowUp':
        case 'w':
        case ' ':
            keys.w.pressed = false
            keys.w.hold = false
        break

        case 'x':
        case 'X':
            keys.x.pressed = false
            keys.x.hold = false
        break
    }
})

function handleControls() {
    muvement()
    attacks()

    function muvement() {
        player.velocity.x = 0

        if(keys.a.pressed && ['a', 'ArrowLeft'].includes(player.lastKeyPressed)) {
            player.velocity.x = -1.5 * 3.4
        }

        if(keys.d.pressed && ['d', 'ArrowRight'].includes(player.lastKeyPressed)) {
            player.velocity.x = 1.5 * 3.4
        }

        if(keys.w.pressed /*&& !keys.w.hold*/) {
            player.jump()
            keys.w.hold = true
        }
    }

    function attacks() {
        if(keys.x.pressed /*&& !keys.x.hold*/) {
            player.attack()
            keys.x.hold = true
        }
    }
}