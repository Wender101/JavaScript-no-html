const calculadora = document.querySelector('#calculadora')
const tela = document.querySelector('#tela')
let quantidade = 0
calculadora.addEventListener('click', e => {
    const el = e.target
    if(quantidade < 17) {
        if(el.classList.contains('number') || el.classList.contains('simbolo')) {
            tela.innerText += el.innerText
            quantidade++
        }
    } else {
        alert('Número maximo de maracteres exedido!')
    }
})
