let nome = 'Wender'
let horario = new Date
let horas = horario.getHours()
let dia = 'manhã'

if(horas < 12) {
    dia = 'manhã'

} else if(horas > 12 && horas < 18) {
    dia = 'tarde'

} else {
    dia = 'noite'
}

console.log(`Menu nome é "${nome}". Estou aprendendo JavaScript às ${horas} da ${dia}.`); 