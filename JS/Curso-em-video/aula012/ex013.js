//Como pegar a hora do PC
var horario = new Date()
var minutos = new Date()

var hora = horario.getHours()
var minuto = minutos.getMinutes()

if(hora > 5 && hora <= 12) {
    var cumprimento = 'bom dia!'

} else if(hora > 12 && hora < 17) {
    var cumprimento = 'boa tarde!'

} else if(hora > 17) {
    var cumprimento = 'boa noite!'
} else if(hora >= 0 && hora < 6) {
    var cumprimento = 'boa madrugada'
}

var resposta = console.log(`Agoara são exatamente ${hora}:${minuto}, ${cumprimento}`)