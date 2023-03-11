let inputPesquisa = document.querySelector('#pesquisarMusica')

inputPesquisa.addEventListener('input', () => {
    if(inputPesquisa.value.length > 0) {
        document.querySelector('#pagPesquisa').style.display = 'block'
        document.querySelector('body').style.overflow = 'hidden'

    } else {
        document.querySelector('#pagPesquisa').style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    }
})