const body = document.querySelector('body')
let img = document.getElementById('img')
let p = document.getElementById('hora')
let hora = new Date()

let agora = hora.getHours()

p.innerText = `Agora são ${agora} hora(s)`

if(agora >= 5  && agora < 13) {
    img.style.background = 'url(imgs/dia.jpg)'
    img.style.backgroundPosition = 'center center'
    img.style.backgroundSize = 'cover'
    body.style.background = 'rgb(255, 237, 133)'

} else if(agora > 12 && agora < 18) {
    img.style.background = 'url(imgs/tarde.jpg)'
    img.style.backgroundPosition = 'center center'
    img.style.backgroundSize = 'cover'
    body.style.background = 'orange'

} else if(agora >= 18) {
    img.style.background = 'url(imgs/noite.jpg)'
    img.style.backgroundPosition = 'center center'
    img.style.backgroundSize = 'cover'
    body.style.background = 'rgb(12, 10, 117)'
}
