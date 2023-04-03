let imgUserPagPessoal = document.querySelector('#imgUserPagPessoal')
let textareaNomePlaylist = document.querySelector('#nomeDaPlaylist')
let playlistBtn = document.querySelector('#PlaylistBtn')

let pagAddNovaPlaylist = false

let musicasNovaPlaylist = []
let novaPlaylist = {
    NomePlaylist: textareaNomePlaylist.value,
    Estado: 'Público',
    Musicas: musicasNovaPlaylist
}

let playlistAdd = false

playlistBtn.addEventListener('click', () => {
    functionPlaylist()
})

function functionPlaylist() {
    playlistAdd = true
    if(playlistAdd == true) {
        document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('#pagPessoalUser').style.display = 'block'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('img').style.display = 'none'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('h1').style.display = 'none'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('textarea').style.display = 'block'
        document.querySelector('#headerPessalUser').style.backgroundImage = `url('assets/img/fotos/listSong.jpeg')`
        document.querySelector('#headerPessalUser').style.backgroundSize = 'contain'
        document.querySelector('#headerPessalUser').style.backgroundRepeat = 'repeat'
        document.querySelector('#localMusicasUserPagPessoal').innerHTML = ''
        imgUserPagPessoal.src = 'assets/img/icones/plus2.png'
        imgUserPagPessoal.style.background = '#636363'

        if(playlistAdd == true) {
            document.querySelector('#addPlaylist').style.display = 'block'
        }

        let addMusicaAsPlaylists = document.querySelector('#addMusicaAsPlaylists')
        addMusicaAsPlaylists.addEventListener('input', () => {
            document.querySelector('#localMusicaPlayListPesquisa').innerHTML = ''

            if(addMusicaAsPlaylists.value.length > 0) {
                let contadorMusicasEncontradas = 0 //? Vai datar o tanto maximo de músicas que poderão aparecer na pesquisa

                db.collection('TodasAsMusicas').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let TodasAsMusicas = valor.data()

                        for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                            pesquisa = addMusicaAsPlaylists.value.toLocaleLowerCase()
                            pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços

                            let Autor = TodasAsMusicas.Musicas[c].NomeAutor.toLocaleLowerCase()
                            Autor = Autor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            Autor = Autor.replace(/\s/g, '') //? Vai remover os espaços

                            let NomeMusica = TodasAsMusicas.Musicas[c].NomeMusica.toLocaleLowerCase()
                            NomeMusica = NomeMusica.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            NomeMusica = NomeMusica.replace(/\s/g, '') //? Vai remover os espaços

                            let Tipo = TodasAsMusicas.Musicas[c].Tipo.toLocaleLowerCase()
                            Tipo = Tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            Tipo = Tipo.replace(/\s/g, '') //? Vai remover os espaços

                            if(contadorMusicasEncontradas < 5) {
                                if(Tipo.includes(pesquisa) || NomeMusica.includes(pesquisa) || Autor.includes(pesquisa)) {
                                    contadorMusicasEncontradas++
                                    criarMusicasPesquisaPlaylist(TodasAsMusicas.Musicas[c], c)
                                }
                            }
                        }
                    })
                })
            }
        })

        //? Ao escrevar ao no textarea
        textareaNomePlaylist.addEventListener('input', () => {
            //? Vai checar se está pronto para add a música na playlist
            if(musicasNovaPlaylist.length > 0 && textareaNomePlaylist.value.length > 0) {
                imgUserPagPessoal.style.background = '#0DCBA9'
                imgUserPagPessoal.src = 'assets/img/icones/plus.png'
            } else {
                imgUserPagPessoal.src = 'assets/img/icones/plus2.png'
                imgUserPagPessoal.style.background = '#636363'
            }
        })

        //? Ao clicar em add a playlist
        imgUserPagPessoal.addEventListener('click', () => {
            if(musicasNovaPlaylist.length > 0 && textareaNomePlaylist.value.length > 0 && playlistAdd == true && estadoPlaylist == 'criando') {
                novaPlaylist.NomePlaylist = textareaNomePlaylist.value

                db.collection('Usuarios').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let Usuarios = valor.data()

                        if(Usuarios.infUser.Email == email && playlistAdd == true) {
                            playlistAdd = false
                            
                            if(Usuarios.Musica.Playlist == null || Usuarios.Musica.Playlist == undefined) {
                                let cloneMusicas = {
                                    MusicasCurtidas: Usuarios.Musica.MusicasCurtidas,
                                    MusicasPostadas: Usuarios.Musica.MusicasPostadas,
                                    Playlist: []
                                }

                                cloneMusicas.Playlist.push(novaPlaylist)

                                db.collection('Usuarios').doc(valor.id).update({Musica: cloneMusicas})
                                fecharAbas()

                            } else {
                                let cloneMusicas = {
                                    MusicasCurtidas: Usuarios.Musica.MusicasCurtidas,
                                    MusicasPostadas: Usuarios.Musica.MusicasPostadas,
                                    Playlist: Usuarios.Musica.Playlist
                                }

                                cloneMusicas.Playlist.push(novaPlaylist)
                                db.collection('Usuarios').doc(valor.id).update({Musica: cloneMusicas})
                                fecharAbas()
                            }

                            setTimeout(() => {
                                playlistAdd = false
                            }, 500)
                        }
                    })
                })

            } else if(musicasNovaPlaylist.length > 0 && textareaNomePlaylist.value.length <= 0 && playlistAdd == true && estadoPlaylist == 'criando') {
                alert('Você não deu um nome a playlist :)')

            } else if(musicasNovaPlaylist.length <= 0 && textareaNomePlaylist.value.length > 0 && playlistAdd == true && estadoPlaylist == 'criando') {
                alert('Adicione uma música primeiro apressadinho *-*')
                
            } else if(musicasNovaPlaylist.length <= 0 && textareaNomePlaylist.value.length <= 0 && playlistAdd == true && estadoPlaylist == 'criando') {
                alert('Playlist vazia não dá não né patrão, assim você me quebra .-.')

            } else if(estadoPlaylist == 'editando') {
                db.collection('Usuarios').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let Usuarios = valor.data()
                        
                        if(Usuarios.infUser.Email == email) {
                            novaPlaylist.NomePlaylist = textareaNomePlaylist.value
                            novaPlaylist.Musicas = musicasNovaPlaylist

                            let cloneMusicas = {
                                MusicasCurtidas: Usuarios.Musica.MusicasCurtidas,
                                MusicasPostadas: Usuarios.Musica.MusicasPostadas,
                                Playlist: Usuarios.Musica.Playlist
                            }
    
                            cloneMusicas.Playlist[numPlaylistEditada] = novaPlaylist
                            db.collection('Usuarios').doc(valor.id).update({Musica: cloneMusicas})
    
                            estadoPlaylist = 'criando'
                            fecharAbas()
                        }
                    })
                })
            }
        })
    }
}


function criarMusicasPesquisaPlaylist(musica, contador) {
    let localMusicaPlayListPesquisa = document.querySelector('#localMusicaPlayListPesquisa')
    let musicaPesquisaPlaylist = document.createElement('div')
    let div = document.createElement('div')
    let imgMusica = document.createElement('img')
    let divLocalTexto = document.createElement('div')
    let strong = document.createElement('strong')
    let p = document.createElement('p')
    let imgPlusPlaylist = document.createElement('img')

    musicaPesquisaPlaylist.className = 'musicaPesquisaPlaylist'
    imgPlusPlaylist.className = 'imgPlusPlaylist'

    imgPlusPlaylist.src = 'assets/img/icones/plus.png'
    imgMusica.src = musica.LinkImgiMusica
    strong.innerText = musica.NomeMusica
    p.innerText = musica.NomeAutor

    divLocalTexto.appendChild(strong)
    divLocalTexto.appendChild(p)
    div.appendChild(imgMusica)
    div.appendChild(divLocalTexto)
    musicaPesquisaPlaylist.appendChild(div)
    musicaPesquisaPlaylist.appendChild(imgPlusPlaylist)
    localMusicaPlayListPesquisa.appendChild(musicaPesquisaPlaylist)

    //! Funções de click

    //? Ao clicar em add a música na playlist
    imgPlusPlaylist.addEventListener('click', () => {
        let jaTemEssaMusicaNaPlaylist = false
        for(let c = 0; c < numMusicasSelecionadas.length; c++) {
            if(numMusicasSelecionadas[c] == contador) {
                jaTemEssaMusicaNaPlaylist = true
            }   
        }

        setTimeout(() => {
            if(jaTemEssaMusicaNaPlaylist == false) {
                numMusicasSelecionadas.push(contador)
                jaTemEssaMusicaNaPlaylist = true

                let formaMusicaNovaPlaylist = {
                    NomeMusica: musica.NomeMusica,
                    NomeAutor: musica.NomeAutor,
                    Tipo: musica.Tipo,
                    LinkAudio: musica.LinkAudio,
                    LinkImgiMusica: musica.LinkImgiMusica,
                    EmailUser: musica.EmailUser,
                    EstadoMusica: musica.EstadoMusica,
                }
                
                musicasNovaPlaylist.push(formaMusicaNovaPlaylist)
                
                function addMusica() {
                    let localMusicasUserPagPessoal = document.querySelector('#localMusicasUserPagPessoal')
                    localMusicaPlayListPesquisa.innerHTML = ''

                    //? Vai checar se está pronto para add a música na playlist
                    if(musicasNovaPlaylist.length > 0 && textareaNomePlaylist.value.length > 0) {
                        imgUserPagPessoal.style.background = '#0DCBA9'
                        imgUserPagPessoal.src = 'assets/img/icones/plus.png'
                    } else {
                        imgUserPagPessoal.src = 'assets/img/icones/plus2.png'
                        imgUserPagPessoal.style.background = '#636363'
                    }
                    
                    localMusicasUserPagPessoal.innerHTML = ''
                    document.querySelector('#headerPessalUser').style.backgroundImage = `url("${musicasNovaPlaylist[0].LinkImgiMusica}")`
                    document.querySelector('#headerPessalUser').style.backgroundSize = `cover`

                    for(let b = 0; b < musicasNovaPlaylist.length; b++) {
                        let musicaPostadaUser = document.createElement('div')
                        let localMusicaPostadaUser = document.createElement('div')
                        let div = document.createElement('div')
                        let img = document.createElement('img')
                        let localTextoPostadoUser = document.createElement('div')
                        let h3 = document.createElement('h3')
                        let p = document.createElement('p')
                        let x = document.createElement('img')
            
                        musicaPostadaUser.className = 'musicaPostadaUser'
                        localMusicaPostadaUser.className = 'localMusicaPostadaUser'
                        localTextoPostadoUser.className = 'localTextoPostadoUser'
            
                        img.src = musicasNovaPlaylist[b].LinkImgiMusica
                        h3.innerText = musicasNovaPlaylist[b].NomeMusica
                        p.innerText = musicasNovaPlaylist[b].NomeAutor
                        x.src = 'assets/img/icones/X2.png'
            
                        localMusicaPostadaUser.appendChild(img)
                        localTextoPostadoUser.appendChild(h3)
                        localTextoPostadoUser.appendChild(p)
                        div.appendChild(localMusicaPostadaUser)
                        div.appendChild(localTextoPostadoUser)
                        musicaPostadaUser.appendChild(div)
                        musicaPostadaUser.appendChild(x)
                        localMusicasUserPagPessoal.appendChild(musicaPostadaUser)

                        //? Ao clicar na música, vai dar play na música
                        div.addEventListener('click', () => {
                            numSelecionado = numMusicasSelecionadas[b]
                            darPlayNaMusica(musica)
                        })

                        //? Ao clicar em remover a música
                        x.addEventListener('click', () => {
                            musicasNovaPlaylist.splice(b, 1)
                            numMusicasSelecionadas.splice(b, 1)
                            addMusica()

                            if(musicasNovaPlaylist.length <= 0) {
                                imgUserPagPessoal.src = 'assets/img/icones/plus2.png'
                                imgUserPagPessoal.style.background = '#636363'
                            }
                        })
                    }
                } addMusica()
            }
        }, 100)
    })

    //? Ao clicar na música pesquisada, vai tocar a música
    div.addEventListener('click', () => {
        numSelecionado = contador
        darPlayNaMusica(musica)
    })
}