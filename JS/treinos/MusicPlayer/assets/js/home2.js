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

let ultimasPesquisasDoUser = {
    Musicas: [],
    Generos: []
}

if(localStorage.getItem('ultimasPesquisasDoUser') != undefined && localStorage.getItem('ultimasPesquisasDoUser') != null) {
    ultimasPesquisasDoUser = JSON.parse(localStorage.getItem('ultimasPesquisasDoUser'))
    ultimasPesquisas()
}

//! Vai colocar na pag home o resultado de suas ultimas pesquisas
function ultimasPesquisas() {
    let jaTemEsteNum = []
    for(let c = 0; c < ultimasPesquisasDoUser.Musicas.length; c++) {
        let numRepetido = false

        db.collection('TodasAsMusicas').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let TodasAsMusicas = valor.data()
    
                for(let c2 = 0; c2 < TodasAsMusicas.Musicas.length; c2++) {

                    pesquisa = ultimasPesquisasDoUser.Musicas[c].toLocaleLowerCase()
                    pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                    
                    let Autor = TodasAsMusicas.Musicas[c2].NomeAutor.toLocaleLowerCase()
                    Autor = Autor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    Autor = Autor.replace(/\s/g, '') //? Vai remover os espaços

                    let NomeMusica = TodasAsMusicas.Musicas[c2].NomeMusica.toLocaleLowerCase()
                    NomeMusica = NomeMusica.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    NomeMusica = NomeMusica.replace(/\s/g, '') //? Vai remover os espaços
    
                    if(pesquisa.includes(Autor) || pesquisa.includes(NomeMusica) || Autor.includes(pesquisa) || NomeMusica.includes(pesquisa)) {
                        console.log(jaTemEsteNum);
                        for(let c3 = 0; c3 < jaTemEsteNum.length; c3++) {
                            if(jaTemEsteNum[c3] == c2) {
                                numRepetido = true
                            }
                        }

                        setTimeout(() => {
                            if(numRepetido == false) {
                                jaTemEsteNum.push(c2)
                                numRepetido = true
        
                                let musicaMaisTocada = document.createElement('div')
                                let localImgMaisTocada = document.createElement('div')
                                let img = document.createElement('img')
                                let nomeMusicaMaisTocada = document.createElement('h3')
                                let nomeAutorMaisTocada = document.createElement('p')
                    
                                musicaMaisTocada.className = 'musicaMaisTocada'
                                localImgMaisTocada.className = 'localImgMaisTocada'
                                nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
                    
                                img.src = TodasAsMusicas.Musicas[c2].LinkImgiMusica
                                nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeMusica
                                nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeAutor
                    
                                localImgMaisTocada.appendChild(img)
                                musicaMaisTocada.appendChild(localImgMaisTocada)
                                musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                musicaMaisTocada.appendChild(nomeAutorMaisTocada)
                    
                                document.querySelector('#ultimasPesquisas').querySelector('article').appendChild(musicaMaisTocada)
                    
                                //! Funções de click
                                //? Ao clicar em favoritar música
                                
                                //? Vai tocar a música selecionada
                                musicaMaisTocada.addEventListener('click', () => {
                                    numSelecionado = c2
                    
                                    cloneMusicasSequencia = []
                                    darPlayNaMusica(TodasAsMusicas.Musicas[c2])
                                })
                            }
                        }, 100)
                    }
                }
            })
        })
    } 
} //ultimasPesquisas()