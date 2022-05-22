function calcular() {
    let peso = document.getElementById('peso').value
    let altura = document.getElementById('altura').value
    let imc = peso / (altura * altura)
    let res = document.getElementById('res')

    // Vai checar o estado do seu imc
    if (imc < 18.5) {
        var estado = 'Abaixo do peso'

    } else if (imc > 18.5 && imc < 24.9) {
        var estado = 'Peso normal'

    } else if (imc > 25 && imc < 29.9) {
        var estado = 'Sobrepeso'
        
    } else if (imc > 30 && imc < 34.9) {
        var estado = 'Obsidade grau 1'
        
    } else if (imc > 35 && imc < 39.9) {
        var estado = 'Obsidade grau 2'
        
    } else {
        var estado = 'Obsidade grau 3'
    }

    res.innerText = `Seu IMC é ${imc.toFixed(2)} (${estado})`
}