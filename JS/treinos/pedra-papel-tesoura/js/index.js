
let pedra = document.getElementById('pedra')
let papel = document.getElementById('papel')
let tesoura = document.getElementById('tesoura')
let p1 = document.getElementById('p1')

let pedra2 = document.getElementById('pedra2')
let papel2 = document.getElementById('papel2')
let tesoura2 = document.getElementById('tesoura2')
let p2 = document.getElementById('p2')

let pontos1 = 0
let pontos2 = 0

function iniciar() {
    var num1 = Math.floor(Math.random() * 3) // Vai gerar um número aleatório de 0 a 2
    var num2 = Math.floor(Math.random() * 3) // Vai gerar um número aleatório de 0 a 2

    //player 1

    if(num1 == 0) {
        pedra.style.display = 'block'
        papel.style.display = 'none'
        tesoura.style.display = 'none'
    }

    if(num1 == 1) {
        papel.style.display = 'block'
        tesoura.style.display = 'none'
        pedra.style.display = 'none'
    }

    if(num1 == 2) {
        tesoura.style.display = 'block'
        papel.style.display = 'none'
        pedra.style.display = 'none'
    }

    //player 2

    if(num2 == 0) {
        pedra2.style.display = 'block'
        papel2.style.display = 'none'
        tesoura2.style.display = 'none'
    }

    if(num2 == 1) {
        papel2.style.display = 'block'
        tesoura2.style.display = 'none'
        pedra2.style.display = 'none'
    }

    if(num2 == 2) {
        tesoura2.style.display = 'block'
        papel2.style.display = 'none'
        pedra2.style.display = 'none'
    }

    // Vai checar se o player1 venceu

    if(num1 == 0 && num2 == 2) {
        pontos1 = pontos1 + 1

        p1.innerText = 'Pontos: ' + pontos1 

    } else if(num1 == 1 && num2 == 0) {
        pontos1 = pontos1 + 1

        p1.innerText = 'Pontos: ' + pontos1 

    } else if(num1 == 2 && num2 == 1) {
        pontos1 = pontos1 + 1

        p1.innerText = 'Pontos: ' + pontos1 
    }

    // Vai checar se o player1 venceu

    if(num2 == 0 && num1 == 2) {
        pontos2 = pontos2 + 1

        p2.innerText = 'Pontos: ' + pontos2

    } else if(num2 == 1 && num1 == 0) {
        pontos2 = pontos2 + 1

        p2.innerText = 'Pontos: ' + pontos2

    } else if(num2 == 2 && num1 == 1) {
        pontos2 = pontos2 + 1

        p2.innerText = 'Pontos: ' + pontos2  
    }
}