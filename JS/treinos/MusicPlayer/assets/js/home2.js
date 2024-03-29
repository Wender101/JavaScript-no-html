let configBtn = document.querySelector('#config')
let nav = document.querySelector('nav')

//! Vai abrir e fechar o menu para o cell
configBtn.addEventListener('click', () => {
    if(document.defaultView.window.visualViewport.width < 723 && document.querySelector('#menuTocandoMusica').style.bottom == '0px') {
        nav.className = 'navVisibleCell'

    } else {
        nav.className = 'navVisible'
    }
})

document.addEventListener('click', (e) => {
    let tagElemento = e.target.className

    if(tagElemento != 'menuBtns') {
        nav.className = ''
    }
})

//! Vai abrir a pág sobre a música que esta tocando no momento
let menuTocandoMusica = document.querySelector('#menuTocandoMusica')

let menuTocandoMusicaAberto = false
menuTocandoMusica.addEventListener('click', (e) => {
    let idE = e.target.id
    let tamanhoTela = document.defaultView.window.visualViewport.width
    
    if(tamanhoTela <= 723 && idE == 'parteCentralConfigMusica' && menuTocandoMusicaAberto == false) {
        menuTocandoMusicaAberto = true
        document.querySelector('#pagSobreMusicaTocando').style.display = 'flex'

    } else if(tamanhoTela <= 723 && idE == 'parteCentralConfigMusica' && menuTocandoMusicaAberto == true) {
        menuTocandoMusicaAberto = false
        document.querySelector('#pagSobreMusicaTocando').style.display = 'none'

    } else if(tamanhoTela > 723 && idE == 'parteCentralConfigMusica') {
        document.querySelector('#pagSobreMusicaTocando').style.display = 'none'
    }

    let heart = document.querySelector('#heartCellPhone')

    let feito = false
    db.collection('TodasAsMusicas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let TodasAsMusicas = valor.data()

            if(feito == false) {
                feito = true
                cehcarFavoritos(TodasAsMusicas.Musicas[numSelecionado], heart)

                //? Vai salvar como favoritos a música
                heart.addEventListener('click', () => {
                    favoritarMusica(TodasAsMusicas.Musicas[numSelecionado])

                    setTimeout(() => {
                        cehcarFavoritos(TodasAsMusicas.Musicas[numSelecionado], heart)
                    }, 200)
                })
            }

        })
    })
})

let ultimasPesquisasDoUser = {
    Musicas: [],
    Generos: [],
    Playlists: []
}

//localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser)) //! Vai apagar o storage dos user.

if(localStorage.getItem('ultimasPesquisasDoUser') != undefined && localStorage.getItem('ultimasPesquisasDoUser') != null) {
    ultimasPesquisasDoUser = JSON.parse(localStorage.getItem('ultimasPesquisasDoUser'))
    ultimasPesquisas()
}

//! Vai colocar na pag home o resultado de suas ultimas pesquisas
function ultimasPesquisas() {
    let jaTemEsteNum = []
    for(let c = ultimasPesquisasDoUser.Musicas.length - 1; c >= 0; c--) {
        let numRepetidoMusica = false
        let numRepetidoGenero = false
        let numRepetidoPlaylist = false

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
                        for(let c3 = 0; c3 < jaTemEsteNum.length; c3++) {
                            if(jaTemEsteNum[c3] == c2) {
                                numRepetidoMusica = true
                            }
                        }

                        setTimeout(() => {
                            if(numRepetidoMusica == false) {
                                jaTemEsteNum.push(c2)
                                numRepetidoMusica = true
                                document.querySelector('#ultimasPesquisas').style.display = 'block'
        
                                let musicaMaisTocada = document.createElement('div')
                                let localImgMaisTocada = document.createElement('div')
                                //let img = document.createElement('img')
                                let nomeMusicaMaisTocada = document.createElement('h3')
                                let nomeAutorMaisTocada = document.createElement('p')
                    
                                musicaMaisTocada.className = 'musicaMaisTocada'
                                localImgMaisTocada.className = 'localImgMaisTocada'
                                nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
                    
                                localImgMaisTocada.innerHTML = `<img src="${TodasAsMusicas.Musicas[c2].LinkImgiMusica}" onerror = "this.onerror=null; this.src='assets/img/fotos/listSong.jpeg'">`
                                //img.src = TodasAsMusicas.Musicas[c2].LinkImgiMusica
                                nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeMusica
                                nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeAutor
                    
                                //localImgMaisTocada.appendChild(img)
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

                //! Vai add como recomendadas as músicas com os ultimos 8 gêneros que foi pesquisado
                try {
                    for(let c2 = 0; c2 < TodasAsMusicas.Musicas.length; c2++) {
                        pesquisa = ultimasPesquisasDoUser.Generos[c].toLocaleLowerCase()
                        pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                        
                        let Tipo = TodasAsMusicas.Musicas[c2].Tipo.toLocaleLowerCase()
                        Tipo = Tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        Tipo = Tipo.replace(/\s/g, '') //? Vai remover os espaços
        
                        if(pesquisa.includes(Tipo) || Tipo.includes(pesquisa)) {
                            for(let c3 = 0; c3 < jaTemEsteNum.length; c3++) {
                                if(jaTemEsteNum[c3] == c2) {
                                    numRepetidoGenero = true
                                }
                            }
    
                            setTimeout(() => {
                                if(numRepetidoGenero == false) {
                                    jaTemEsteNum.push(c2)
                                    numRepetidoGenero = true
                                    document.querySelector('#ultimasPesquisasGenero').style.display = 'block'
            
                                    let musicaMaisTocada = document.createElement('div')
                                    let localImgMaisTocada = document.createElement('div')
                                    //let img = document.createElement('img')
                                    let nomeMusicaMaisTocada = document.createElement('h3')
                                    let nomeAutorMaisTocada = document.createElement('p')
                        
                                    musicaMaisTocada.className = 'musicaMaisTocada'
                                    localImgMaisTocada.className = 'localImgMaisTocada'
                                    nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                    nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
                        
                                    localImgMaisTocada.innerHTML = `<img src="${TodasAsMusicas.Musicas[c2].LinkImgiMusica}" onerror = "this.onerror=null; this.src='assets/img/fotos/listSong.jpeg'">`
                                    //img.src = TodasAsMusicas.Musicas[c2].LinkImgiMusica
                                    nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeMusica
                                    nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[c2].NomeAutor
                        
                                    //localImgMaisTocada.appendChild(img)
                                    musicaMaisTocada.appendChild(localImgMaisTocada)
                                    musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                    musicaMaisTocada.appendChild(nomeAutorMaisTocada)
                        
                                    document.querySelector('#ultimasPesquisasGenero').querySelector('article').appendChild(musicaMaisTocada)
                        
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
                } catch{}
            })
        })

        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Usuarios = valor.data()

                 //! Vai add como recomendadas as ultimas 8 playlists pesquisadas
                try {
                    for(let c2 = 0; c2 < Usuarios.Musica.Playlist.length; c2++) {
                        pesquisa = ultimasPesquisasDoUser.Playlists[c].toLocaleLowerCase()
                        pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                        
                        let NomePlaylist = Usuarios.Musica.Playlist[c2].NomePlaylist.toLocaleLowerCase()
                        NomePlaylist = NomePlaylist.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        NomePlaylist = NomePlaylist.replace(/\s/g, '') //? Vai remover os espaços
        
                        if(pesquisa.includes(NomePlaylist) || NomePlaylist.includes(pesquisa)) {
                            for(let c3 = 0; c3 < jaTemEsteNum.length; c3++) {
                                if(jaTemEsteNum[c3] == c2) {
                                    numRepetidoPlaylist = true
                                }
                            }
    
                            setTimeout(() => {
                                if(numRepetidoPlaylist == false) {
                                    jaTemEsteNum.push(c2)
                                    numRepetidoPlaylist = true
                                    document.querySelector('#PlaylistsRecomendadas').style.display = 'block'
    
                                    let musicaMaisTocada = document.createElement('div')
                                    let localImgMaisTocada = document.createElement('div')
                                    //let img = document.createElement('img')
                                    let nomeMusicaMaisTocada = document.createElement('h3')
                                    let nomeAutorMaisTocada = document.createElement('p')
                        
                                    musicaMaisTocada.className = 'musicaMaisTocada'
                                    localImgMaisTocada.className = 'localImgMaisTocada'
                                    nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                    nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
                        
                                    localImgMaisTocada.innerHTML = `<img src="${Usuarios.Musica.Playlist[c2].Musicas[0].LinkImgiMusica}" onerror = "this.onerror=null; this.src='assets/img/fotos/listSong.jpeg'">`
                                    //img.src = Usuarios.Musica.Playlist[c2].Musicas[0].LinkImgiMusica
                                    nomeMusicaMaisTocada.innerText = Usuarios.Musica.Playlist[c2].NomePlaylist
                                    nomeAutorMaisTocada.innerText = Usuarios.infUser.Nome
                        
                                    //localImgMaisTocada.appendChild(img)
                                    musicaMaisTocada.appendChild(localImgMaisTocada)
                                    musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                    musicaMaisTocada.appendChild(nomeAutorMaisTocada)
                        
                                    document.querySelector('#PlaylistsRecomendadas').querySelector('article').appendChild(musicaMaisTocada)
                        
                                    //! Funções de click
                                    //? Ao clicar em favoritar música
                                    
                                    //? Vai tocar a música selecionada
                                    musicaMaisTocada.addEventListener('click', () => {
                                        abrirPlaylist(valor.id, c2)
                                    })
                                }
                            }, 100)
                        }
                    }
                } catch{}
            })
        })
    } 
}

function abrirPlaylist(perfilDonoDaPlaylist, numPlaylist) {
    let aberto = false
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(valor.id == perfilDonoDaPlaylist && aberto == false) {
                aberto = true
                try {
                    document.getElementsByClassName('btnEdit')[0].style.display = 'none'
                    document.querySelector('body').style.overflow = 'hidden'
                    document.querySelector('#pagPessoalUser').style.display = 'block'
                    document.querySelector('#addPlaylist').style.display = 'none'
                    document.querySelector('#localMusicasUserPagPessoal').innerHTML = ''
                    document.querySelector('#headerPessalUser').querySelector('div').querySelector('img').style.display = 'none'
                    document.querySelector('#headerPessalUser').querySelector('div').querySelector('h1').style.display = 'block'
                    document.querySelector('#headerPessalUser').querySelector('div').querySelector('h1').innerText = Usuarios.Musica.Playlist[numPlaylist].NomePlaylist
                    document.querySelector('#headerPessalUser').querySelector('div').querySelector('textarea').style.display = 'none'
                    document.querySelector('#headerPessalUser').style.backgroundImage = `url("${Usuarios.Musica.Playlist[numPlaylist].Musicas[0].LinkImgiMusica}")`
                    document.querySelector('#headerPessalUser').style.backgroundSize = 'cover'
                    document.querySelector('#headerPessalUser').style.backgroundRepeat = 'no-repeat'
                    document.querySelector('#infosPerfilUser').querySelector('div').style.maxWidth = '500px'
                    document.querySelector('#descPerfilPagPessoal').style.display = 'none'
                    document.querySelector('#infosPerfilUser').style.height = '260px'
                    imgUserPagPessoal.src = 'assets/img/icones/play.png'
                    imgUserPagPessoal.style.background = '#0DCBA9'
    
                    oQueEstaPassando = 'playlist'
    
                    criarMusicasPlaylist(numPlaylist)
    
                    //? Click, vai iniciar as músicas
                    imgUserPagPessoal.addEventListener('click', () => {
                        if(oQueEstaPassando == 'playlist') {
                            cloneMusicasSequencia = Usuarios.Musica.Playlist[numPlaylist].Musicas
                            numMusicaSequencia = Usuarios.Musica.Playlist[numPlaylist].Musicas.length - 1
                            darPlayNaMusica(Usuarios.Musica.Playlist[numPlaylist].Musicas[Usuarios.Musica.Playlist[numPlaylist].Musicas.length - 1])
                        }
                    })
    
                    function criarMusicasPlaylist(numPlaylist) {
                        for(let d = Usuarios.Musica.Playlist[numPlaylist].Musicas.length - 1; d >= 0; d--) {
                            let musicaPostadaUser = document.createElement('div')
                            let localMusicaPostadaUser = document.createElement('div')
                            let div = document.createElement('div')
                            //let img = document.createElement('img')
                            let localTextoPostadoUser = document.createElement('div')
                            let h3 = document.createElement('h3')
                            let p = document.createElement('p')
                            let heart = document.createElement('img')
                    
                            musicaPostadaUser.className = 'musicaPostadaUser'
                            localMusicaPostadaUser.className = 'localMusicaPostadaUser'
                            localTextoPostadoUser.className = 'localTextoPostadoUser'
                    
                            localMusicaPostadaUser.innerHTML = `<img src="${Usuarios.Musica.Playlist[numPlaylist].Musicas[d].LinkImgiMusica}" onerror = "this.onerror=null; this.src='assets/img/fotos/listSong.jpeg'">`
                            //img.src = Usuarios.Musica.Playlist[numPlaylist].Musicas[d].LinkImgiMusica
                            h3.innerText = Usuarios.Musica.Playlist[numPlaylist].Musicas[d].NomeMusica
                            p.innerText = Usuarios.Musica.Playlist[numPlaylist].Musicas[d].NomeAutor
                            heart.src = 'assets/img/icones/icon _heart_ (1).png'
                    
                            //localMusicaPostadaUser.appendChild(img)
                            localTextoPostadoUser.appendChild(h3)
                            localTextoPostadoUser.appendChild(p)
                            div.appendChild(localMusicaPostadaUser)
                            div.appendChild(localTextoPostadoUser)
                            musicaPostadaUser.appendChild(div)
                            musicaPostadaUser.appendChild(heart)
                            document.querySelector('#localMusicasUserPagPessoal').appendChild(musicaPostadaUser)

                            //! Funções de click

                            //? Vai checar se a música já foi adicionada aos favoritos
                            cehcarFavoritos(Usuarios.Musica.Playlist[numPlaylist].Musicas[d], heart)

                            //? Vai salvar como favoritos a música
                            heart.addEventListener('click', () => {
                                favoritarMusica(Usuarios.Musica.Playlist[numPlaylist].Musicas[d])

                                setTimeout(() => {
                                    cehcarFavoritos(Usuarios.Musica.Playlist[numPlaylist].Musicas[d], heart)
                                }, 200)
                            })
                            
                            div.addEventListener('click', () => {
                                numSelecionado = d
                                darPlayNaMusica(Usuarios.Musica.Playlist[numPlaylist].Musicas[d])
                            })

                        }
                    }
                } catch{}
            }
        })
    })
}