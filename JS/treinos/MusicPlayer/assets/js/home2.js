let configBtn = document.querySelector('#config')
let nav = document.querySelector('nav')

//! Vai abrir e fechar o menu para o cell
configBtn.addEventListener('click', () => {
    nav.className = 'navVisible'
})

document.addEventListener('click', (e) => {
    let tagElemento = e.target.className

    if(tagElemento != 'menuBtns') {
        nav.className = ''
    }
})

//! Vai abrir a pág sobre a música que esta tocando no momento
let menuTocandoMusica = document.querySelector('#menuTocandoMusica')

menuTocandoMusica.addEventListener('click', (e) => {
    let idE = e.target.id
    console.log(idE);
    let tamanhoTela = document.defaultView.window.visualViewport.width
    
    if(tamanhoTela <= 723 && idE == 'parteCentralConfigMusica') {
        document.querySelector('#pagSobreMusicaTocando').style.display = 'flex'
    } else if(tamanhoTela > 723 && idE == 'parteCentralConfigMusica') {
        document.querySelector('#pagSobreMusicaTocando').style.display = 'none'
    }
})