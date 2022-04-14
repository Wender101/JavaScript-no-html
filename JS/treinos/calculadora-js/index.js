var t7 = document.getElementById('t7')
var t8 = document.getElementById('t8')
var t9 = document.getElementById('t9')
var t4 = document.getElementById('t4')
var t5 = document.getElementById('t5')
var t6 = document.getElementById('t6')
var t1 = document.getElementById('t1')
var t2 = document.getElementById('t2')
var t3 = document.getElementById('t3')
var t0 = document.getElementById('t0')
var tponto = document.getElementById('t.')
var tigual = document.getElementById('t=')
var tmais = document.getElementById('t+')
var tX = document.getElementById('tX')
var tdivisao = document.getElementById('t/')
var tmenos = document.getElementById('t-')

const tela = document.getElementById('tela')
const teclado = document.getElementById('teclado')
let num1 = []
let num2 = []

let ativo = false
let num1Ativo = true
let UmOuDois = 1
let sinal

teclado.addEventListener('mouseenter', function() {

    if(UmOuDois == 1) {
        //Números
        t0.addEventListener('click', function() {
            tela.innerText += 0
            num1 += 0
        })
    
        t1.addEventListener('click', function() {
            tela.innerText += 1
            num1 += 1
        })
    
        t2.addEventListener('click', function() {
            tela.innerText += 2
            num1 += 2
        })
    
        t3.addEventListener('click', function() {
            tela.innerText += 3
            num1 += 3
        })
    
        t4.addEventListener('click', function() {
            tela.innerText += 4
            num1 += 4
        })
    
        t5.addEventListener('click', function() {
            tela.innerText += 5
            num1 += 5
        })
    
        t6.addEventListener('click', function() {
            tela.innerText += 6
            num1 += 6
        })
    
        t7.addEventListener('click', function() {
            tela.innerText += 7
            num1 += 7
        })
    
        t8.addEventListener('click', function() {
            tela.innerText += 8
            num1 += 8
        })
    
        t9.addEventListener('click', function() {
            tela.innerText += 9
            num1 += 9
        })
    
        //Simbolos
        tdivisao.addEventListener('click', function() {
            if(ativo == false) {
                UmOuDois = 2
                ativo = true
                sinal = '/'
                tela.innerText = ''
            }
        })
    
        tmais.addEventListener('click', function() {
            if(ativo == false) {
                UmOuDois = 2
                ativo = true
                sinal = '+'
                tela.innerText = ''
            }
        })
    
        tmenos.addEventListener('click', function() {
            if(ativo == false) {
                UmOuDois = 2
                ativo = true
                sinal = '-'
                tela.innerText = ''
            }
        })
    
        tX.addEventListener('click', function() {
            if(ativo == false) {
                UmOuDois = 2
                ativo = true
                sinal = 'X'
                tela.innerText = ''
            }
        })

    } else {
        //Números
        t0.addEventListener('click', function() {
            tela.innerText += 0
            num2 += 0
        })
    
        t1.addEventListener('click', function() {
            tela.innerText += 1
            num2 += 1
        })
    
        t2.addEventListener('click', function() {
            tela.innerText += 2
            num2 += 2
        })
    
        t3.addEventListener('click', function() {
            tela.innerText += 3
            num2 += 3
        })
    
        t4.addEventListener('click', function() {
            tela.innerText += 4
            num2 += 4
        })
    
        t5.addEventListener('click', function() {
            tela.innerText += 5
            num2 += 5
        })
    
        t6.addEventListener('click', function() {
            tela.innerText += 6
            num2 += 6
        })
    
        t7.addEventListener('click', function() {
            tela.innerText += 7
            num2 += 7
        })
    
        t8.addEventListener('click', function() {
            tela.innerText += 8
            num2 += 8
        })
    
        t9.addEventListener('click', function() {
            tela.innerText += 9
            num2 += 9
        })

        if(sinal == '/') {
            var resultado = num1 / num2
    
        } else if(sinal == '+') {
            var resultado = parseInt(num1) + parseInt(num2)
            tela.innerText = resultado
    
        } else if(sinal == '-') {
            var resultado = num1 - num2
    
        } else if(sinal == 'X') {
            var resultado = num1 * num2
        }
    } 

    tigual.addEventListener('click', function() {
        
    })
})

