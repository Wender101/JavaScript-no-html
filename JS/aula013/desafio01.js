var body = document.querySelector('body')
var img = document.getElementById('img')
var p = document.getElementById('hora')
var hora = new Date()

var agora = hora.getHours()

p.innerText = `Agora são ${agora} hora(s)`

if(agora >= 5  && agora < 13) {
    img.style.background = 'url(imgs/dia.jpg)'
    img.style.backgroundPosition = 'center center'
    img.style.backgroundSize = 'cover'
    body.style.background = 'yellow'

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
