var a = window.document.getElementById('area')

//Segunda forma

a.addEventListener('click', clicar)
a.addEventListener('mouseenter', entrar)
a.addEventListener('mouseout', sair)

function clicar() {
    a.innerText = 'Clicou!'

    a.style.background = 'blue'

    a.style.color = 'white'
}

function entrar() {
    a.innerText = 'Entrou!'

    a.style.background = 'green'

    a.style.color = 'white'
}

function sair() {
    a.innerText = 'Saiu!'

    a.style.background = 'black'

    a.style.color = 'white'
}