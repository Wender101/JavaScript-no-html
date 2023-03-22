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

//! Vai colocar na pag home o resultado de suas ultimas pesquisas
function ultimasPesquisas() {
    db.collection('TodasAsMusicas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let TodasAsMusicas = valor.data()



            let musicaMaisTocada = document.createElement('div')
            let localImgMaisTocada = document.createElement('div')
            let img = document.createElement('img')
            let nomeMusicaMaisTocada = document.createElement('h3')
            let nomeAutorMaisTocada = document.createElement('p')

            musicaMaisTocada.className = 'musicaMaisTocada'
            localImgMaisTocada.className = 'localImgMaisTocada'
            nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
            nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'

            img.src = TodasAsMusicas.Musicas[numMusicaAleatoria].LinkImgiMusica
            nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[numMusicaAleatoria].NomeMusica
            nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[numMusicaAleatoria].NomeAutor

            localImgMaisTocada.appendChild(img)
            musicaMaisTocada.appendChild(localImgMaisTocada)
            musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
            musicaMaisTocada.appendChild(nomeAutorMaisTocada)

            document.querySelector('#ultimasPesquisas').querySelector('article').appendChild(musicaMaisTocada)

            //! Funções de click
            //? Ao clicar em favoritar música
            
            //? Vai tocar a música selecionada
            musicaMaisTocada.addEventListener('click', () => {
                numSelecionado = numMusicaAleatoria

                cloneMusicasSequencia = []
                darPlayNaMusica(TodasAsMusicas.Musicas[numMusicaAleatoria])
            })

        })
    })
}