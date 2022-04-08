let player = 1
let estrutura = document.getElementById('estrutura')
let velha = 9
let h1 = document.querySelector('h1')
let fim = document.getElementById('fim')

//Locais de click do player2 (circulo)
var local1 = document.getElementById('local1')
var local2 = document.getElementById('local2')
var local3 = document.getElementById('local3')
var local4 = document.getElementById('local4')
var local5 = document.getElementById('local5')
var local6 = document.getElementById('local6')
var local7 = document.getElementById('local7')
var local8 = document.getElementById('local8')
var local9 = document.getElementById('local9')

//Locais de click do player1 (x)
var s1 = document.getElementById('s1')
var s2 = document.getElementById('s2')
var s3 = document.getElementById('s3')
var s4 = document.getElementById('s4')
var s5 = document.getElementById('s5')
var s6 = document.getElementById('s6')
var s7 = document.getElementById('s7')
var s8 = document.getElementById('s8')
var s9 = document.getElementById('s9')

//Vai verificar se a div já foi clicada ou não
var ativo1 = false
var ativo2 = false
var ativo3 = false
var ativo4 = false
var ativo5 = false
var ativo6 = false
var ativo7 = false
var ativo8 = false
var ativo9 = false

local1.addEventListener('click', function() {
    if(ativo1 === false) {
        if(player === 1) {
            s1.style.display = 'block'
        } else {
            local1.style.borderRadius = '50%'
            local1.style.border = '4px solid blue'
            local1.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo1 = true
    }   
}) 

local2.addEventListener('click', function() {
       if(ativo2 === false) {
        if(player === 1) {
            s2.style.display = 'block'
        } else {
            local2.style.borderRadius = '50%'
            local2.style.border = '4px solid blue'
            local2.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo2 = true
    }
})

local3.addEventListener('click', function() {
    if(ativo3 === false) {   
        if(player === 1) {
            s3.style.display = 'block'
        } else {
            local3.style.borderRadius = '50%'
            local3.style.border = '4px solid blue'
            local3.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo3 = true
    }
})

local4.addEventListener('click', function() {
    if(ativo4 === false) {
        if(player === 1) {
            s4.style.display = 'block'
        } else {
            local4.style.borderRadius = '50%'
            local4.style.border = '4px solid blue'
            local4.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo4 = true
    }
})

local5.addEventListener('click', function() {
    if(ativo5 === false) {
        if(player === 1) {
            s5.style.display = 'block'
        } else {
            local5.style.borderRadius = '50%'
            local5.style.border = '4px solid blue'
            local5.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo5 = true
    }
})

local6.addEventListener('click', function() {
    if(ativo6 === false) {
        if(player === 1) {
            s6.style.display = 'block'
        } else {
            local6.style.borderRadius = '50%'
            local6.style.border = '4px solid blue'
            local6.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo6 = true
    }
})

local7.addEventListener('click', function() {
    if(ativo7 === false) {
        if(player === 1) {
            s7.style.display = 'block'
        } else {
            local7.style.borderRadius = '50%'
            local7.style.border = '4px solid blue'
            local7.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo7 = true
    }
})

local8.addEventListener('click', function() {
    if(ativo8 === false) {
        if(player === 1) {
            s8.style.display = 'block'
        } else {
            local8.style.borderRadius = '50%'
            local8.style.border = '4px solid blue'
            local8.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }

        //Vai indicar que a div já foi clicada
        ativo8 = true
    }
})

local9.addEventListener('click', function() {
    if(ativo9 === false) {
        if(player === 1) {
            s9.style.display = 'block'
        } else {
            local9.style.borderRadius = '50%'
            local9.style.border = '4px solid blue'
            local9.style.background = 'white'
        }

        velha -=1

        if(velha <= 0) {
            h1.innerHTML = 'Ops, deu Velha'
        }

        /*
            Detecta qual player vai dar o proximo movimento
        */
        if(player === 1) {
            player = 2
        } else {
            player = 1
        }
        
        //Vai indicar que a div já foi clicada
        ativo9 = true
    }
})

//Essa função vai reiniciar toda vez que clicarem no jogo da velha, e vai checar se alguém ganhou ou não
estrutura.addEventListener('click', function() {
    if(s1.style.display === 'block' && s4.style.display === 'block' && s7.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s2.style.display === 'block' && s5.style.display === 'block' && s8.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s3.style.display === 'block' && s6.style.display === 'block' && s9.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'
    
    } else if(s7.style.display === 'block' && s8.style.display === 'block' && s9.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s4.style.display === 'block' && s5.style.display === 'block' && s6.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s1.style.display === 'block' && s2.style.display === 'block' && s3.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s1.style.display === 'block' && s5.style.display === 'block' && s9.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    } else if(s3.style.display === 'block' && s5.style.display === 'block' && s7.style.display === 'block') {
        h1.innerHTML = 'O X é o vencedor'
        fim.style.display = 'block'

    }   else if(local1.style.background === 'white' && local4.style.background === 'white' && local7.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'

    } else if(local2.style.background === 'white' && local5.style.background === 'white' && local8.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'

    } else if(local3.style.background === 'white' && local6.style.background === 'white' && local9.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'
    
    } else if(local7.style.background === 'white' && local8.style.background === 'white' && local9.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'

    } else if(local4.style.background === 'white' && local5.style.background === 'white' && local6.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'

    } else if(local1.style.background === 'white' && local2.style.background === 'white' && local3.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'
        
    } else if(local1.style.background === 'white' && local5.style.background === 'white' && local9.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'
        
    } else if(local3.style.background === 'white' && local5.style.background === 'white' && local7.style.background === 'white') {
        h1.innerHTML = 'O circulo é o vencedor'
        fim.style.display = 'block'
    }
})