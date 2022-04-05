var Anonasceu
var img = document.querySelector('#img')
var mulher = document.querySelector('#mulher')
var homem = document.querySelector('#homem')
var btn = document.querySelector('#btn')
var p = document.querySelector('p')
var anoAtual = new Date()
var ano = anoAtual.getFullYear()
var mes = new Date()
var meses = mes.getMonth()

switch(meses) {
    case 0:
        var mesAtual = 'Janeiro'
    break
    case 1:
        var mesAtual = 'Fevereiro'
    break
    case 2:
        var mesAtual = 'Março'
    break
    case 3:
        var mesAtual = 'Abril'
    break
    case 4:
        var mesAtual = 'Maio'
    break
    case 5:
        var mesAtual = 'Junho'
    break
    case 6:
        var mesAtual = 'Julho'
    break
    case 7:
        var mesAtual = 'Agosto'
    break
    case 8:
        var mesAtual = 'Setembro'
    break
    case 9:
        var mesAtual = 'Outubro'
    break
    case 10:
        var mesAtual = 'Novembro'
    break
    case 11:
        var mesAtual = 'Dezembro'
    break
}

console.log(mesAtual);

homem.addEventListener('click', function() {
    homem.style.background = 'black'
    mulher.style.background = 'white'

    btn.addEventListener('click', function() {
        Anonasceu = document.querySelector('input#ano').value

        var idade = ano - Anonasceu

        if(idade < 4) {
            var genero = 'um bebê'
            img.style.backgroundImage = 'url(imgEx2/bb-homem.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else if(idade < 14) {
            var genero = 'um menino'
            img.style.backgroundImage = 'url(imgEx2/menino.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else if(idade > 14 && idade < 50){
            var genero = 'um homem'
            img.style.backgroundImage = 'url(imgEx2/homem.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else{
            var genero = 'um senhor'
            img.style.backgroundImage = 'url(imgEx2/senhor.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'
        }

        if(ano < Anonasceu) {
            var resultado = p.innerText = `[Error] Data invalida`
            img.style.display = 'none'
        } else {
            var resultado = p.innerText = `Detectamos ${genero} com ${idade} anos`
        }
})
})

mulher.addEventListener('click', function() {
    mulher.style.background = 'black'
    homem.style.background = 'white'

    btn.addEventListener('click', function() {
        Anonasceu = document.querySelector('input#ano').value

        var idade = ano - Anonasceu

        if(idade < 4) {
            var genero = 'um bebê'
            img.style.backgroundImage = 'url(imgEx2/bb-menina.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else if(idade < 14) {
            var genero = 'uma menina'
            img.style.backgroundImage = 'url(imgEx2/menina.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else if(idade > 14 && idade < 50){
            var genero = 'uma mulher'
            img.style.backgroundImage = 'url(imgEx2/mulher.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'

        } else {
            var genero = 'uma senhora'
            img.style.backgroundImage = 'url(imgEx2/senhora.jpg)'
            img.style.backgroundPosition = 'center center'
            img.style.backgroundSize = 'cover'
            img.style.display = 'block'
        }

        if(ano < Anonasceu) {
            var resultado = p.innerText = `[Error] Data invalida`
            img.style.display = 'none'
        } else {
            var resultado = p.innerText = `Detectamos ${genero} com ${idade} anos`
        }
})
})

let day = new Date
let hj = day.getDay()
console.log(hj);

let span = document.querySelector('#hoje')

let today = span.innerHTML =`Hoje é ${hj}/ ${mesAtual} /${ano}`