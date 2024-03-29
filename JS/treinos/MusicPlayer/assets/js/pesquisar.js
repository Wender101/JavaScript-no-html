let inputPesquisa = document.querySelector('#pesquisarMusica')
let inputPesquisa2 = document.querySelector('#pesquisarMusica2')
let imgUserPessoalClicado = false
let oQueEstaPassando = 'nada'

inputPesquisa.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        document.querySelector('#localMlhResutado').innerHTML = ''
        document.querySelector('#relacionadas').innerHTML = ''
        document.querySelector('#TipoPesquisa').innerHTML = ''
        document.querySelector('#musicasPostadasPeloUserPesquisado').innerHTML = ''
        document.querySelector('#localPlaylistsPesquisa').innerHTML = ''

        document.querySelector('#localMlhResutado').style.display = 'none'
        document.querySelector('#relacionadas').style.display = 'none'
        document.querySelector('#TipoPesquisa').style.display = 'none'

        document.querySelector('#h1MelhorResutado').style.display = 'none'
        document.querySelector('#h1Relacionadas').style.display = 'none'
        document.querySelector('#h1Tipo').style.display = 'none'

        document.querySelector('#pagPesquisa').style.display = 'none'
        document.querySelector('#h1AutorPesquisa').style.display = 'none'
        document.querySelector('#autorPesquisa').style.display = 'none'

        document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'none'
        document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'none'

        document.querySelector('#h1Playlists').style.display = 'none'
        document.querySelector('#localPlaylistsPesquisa').style.display = 'none'

        document.querySelector('#nehumResultado').style.display = 'block'

        for(let a = 1; a < 5; a++) {
            document.querySelector(`#musicaAutor${a}`).style.display = 'none'
        }

        if(inputPesquisa.value.length > 0) {
            document.querySelector('#pagPesquisa').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'

            inputPesquisa2.value = inputPesquisa.value
            pesquisar(inputPesquisa.value)
    
        } else {
            document.querySelector('#pagPesquisa').style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
            inputPesquisa2.value = ''
        }
    }
})

inputPesquisa2.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        document.querySelector('#localMlhResutado').innerHTML = ''
        document.querySelector('#relacionadas').innerHTML = ''
        document.querySelector('#TipoPesquisa').innerHTML = ''
        document.querySelector('#musicasPostadasPeloUserPesquisado').innerHTML = ''
        document.querySelector('#localPlaylistsPesquisa').innerHTML = ''

        document.querySelector('#localMlhResutado').style.display = 'none'
        document.querySelector('#relacionadas').style.display = 'none'
        document.querySelector('#TipoPesquisa').style.display = 'none'

        document.querySelector('#h1MelhorResutado').style.display = 'none'
        document.querySelector('#h1Relacionadas').style.display = 'none'
        document.querySelector('#h1Tipo').style.display = 'none'

        document.querySelector('#pagPesquisa').style.display = 'none'
        document.querySelector('#h1AutorPesquisa').style.display = 'none'
        document.querySelector('#autorPesquisa').style.display = 'none'

        document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'none'
        document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'none'

        document.querySelector('#h1Playlists').style.display = 'none'
        document.querySelector('#localPlaylistsPesquisa').style.display = 'none'

        document.querySelector('#nehumResultado').style.display = 'block'

        for(let a = 1; a < 5; a++) {
            document.querySelector(`#musicaAutor${a}`).style.display = 'none'
        }

        if(inputPesquisa2.value.length > 0) {
            document.querySelector('#pagPesquisa').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'

            inputPesquisa.value = inputPesquisa2.value
            pesquisar(inputPesquisa2.value)
    
        } else {
            document.querySelector('#pagPesquisa').style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
            inputPesquisa.value = ''
        }
    }
})


//? Vai checar se o user pesquisado tem algumas conquista ou n
let conquisatasUserPesquisado = []

let clonePerfilUserPesquisado //! Vai guardar as infos do user pesquisado
function pesquisar(pesquisa) {
    let musicaJaFoiPesquisado = false
    let contadorResutado = 0
    let userPesquisado = false
    let pesquisaSalvaMusica = false
    let pesquisaSalvaGenero = false
    let pesquisaSalvaPlaylist = false
    let contadorMusicaMaxPerfil = 0 //? Vai limiar o max de músicas que vai aparecer qnd pesquisar por perfil
    
    db.collection('TodasAsMusicas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let TodasAsMusicas = valor.data()

            if(musicaJaFoiPesquisado == false) {
                setTimeout(() => {
                    musicaJaFoiPesquisado = true
                }, 1000)

                function localArmazenar(local, contador) {
                    //? Vai salvar a pesquisa
                    if(pesquisaSalvaMusica == false && ultimasPesquisasDoUser.Musicas.length < 8) {
                        pesquisaSalvaMusica = true
                        let jaTemEssaPesquisa = false
                        for(let c = 0; c < ultimasPesquisasDoUser.Musicas.length; c++) {
                            MusicasUltimasPesquisas = ultimasPesquisasDoUser.Musicas[c].toLocaleLowerCase()
                            MusicasUltimasPesquisas = MusicasUltimasPesquisas.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            MusicasUltimasPesquisas = MusicasUltimasPesquisas.replace(/\s/g, '') //? Vai remover os espaços
    
                            if(MusicasUltimasPesquisas.includes(pesquisa) || pesquisa.includes(MusicasUltimasPesquisas)) {
                                jaTemEssaPesquisa = true
                            }
                        }
    
                        setTimeout(() => {
                            if(jaTemEssaPesquisa == false) {
                                jaTemEssaPesquisa = true
                                ultimasPesquisasDoUser.Musicas.push(pesquisa)
                                localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                            }
                        }, 100)
    
                        //? Caso a parte Recomendadas esteja cheia, ele vai remover a primera pesquisa
                    } else if(pesquisaSalvaMusica == false && ultimasPesquisasDoUser.Musicas.length >= 8) {
                        ultimasPesquisasDoUser.Musicas.splice(0, 1)
                        pesquisaSalvaMusica = true
                        let jaTemEssaPesquisa = false
                        for(let c = 0; c < ultimasPesquisasDoUser.Musicas.length; c++) {
                            MusicasUltimasPesquisas = ultimasPesquisasDoUser.Musicas[c].toLocaleLowerCase()
                            MusicasUltimasPesquisas = MusicasUltimasPesquisas.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                            MusicasUltimasPesquisas = MusicasUltimasPesquisas.replace(/\s/g, '') //? Vai remover os espaços
    
                            if(MusicasUltimasPesquisas.includes(pesquisa) || pesquisa.includes(MusicasUltimasPesquisas)) {
                                jaTemEssaPesquisa = true
                            }
                        }
    
                        setTimeout(() => {
                            if(jaTemEssaPesquisa == false) {
                                jaTemEssaPesquisa = true
                                ultimasPesquisasDoUser.Musicas.push(pesquisa)
                                localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                            }
                        }, 100)
                    }
    
    
                    userPesquisado = true
                    document.querySelector('#nehumResultado').style.display = 'none'
                    let musicaMaisTocada = document.createElement('div')
                    let localImgMaisTocada = document.createElement('div')
                    let img = document.createElement('img')
                    let nomeMusicaMaisTocada = document.createElement('h3')
                    let nomeAutorMaisTocada = document.createElement('p')
    
                    musicaMaisTocada.className = 'musicaMaisTocada'
                    localImgMaisTocada.className = 'localImgMaisTocada'
                    nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                    nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
    
                    img.src = TodasAsMusicas.Musicas[contador].LinkImgiMusica
                    nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[contador].NomeMusica
                    nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[contador].NomeAutor
    
                    localImgMaisTocada.appendChild(img)
                    musicaMaisTocada.appendChild(localImgMaisTocada)
                    musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                    musicaMaisTocada.appendChild(nomeAutorMaisTocada)
    
                    local.appendChild(musicaMaisTocada)
    
                    //? Funções de click
                    musicaMaisTocada.addEventListener('click', () => {
                        numSelecionado = contador
    
                        //! Vai criar uma lista das músicas escutadas
                        let listaCheckRecentes = listaMusicasRecentes //? Vai checar se há recentes repetidos
    
                        let jaTemEssaMusica = false
                        let addMusicaEmRecentes = false
    
                        if(listaMusicasRecentes.length <= 0) {
                            let formaLista =  {
                                NomeMusica: TodasAsMusicas.Musicas[contador].NomeMusica,
                                NomeAutor: TodasAsMusicas.Musicas[contador].NomeAutor,
                                Tipo: TodasAsMusicas.Musicas[contador].Tipo,
                                LinkAudio: TodasAsMusicas.Musicas[contador].LinkAudio,
                                LinkImgiMusica: TodasAsMusicas.Musicas[contador].LinkImgiMusica,
                                EmailUser: TodasAsMusicas.Musicas[contador].EmailUser,
                                EstadoMusica: TodasAsMusicas.Musicas[contador].EstadoMusica,
                            }
        
                            listaMusicasRecentes.push(formaLista)
                            criarRecentes(listaMusicasRecentes)
        
                        } else if(listaMusicasRecentes.length > 0) {
                            for(let b = 0; b < listaMusicasRecentes.length; b++) {
                                if(listaMusicasRecentes.length == 9) {
                                    listaMusicasRecentes.splice(0, 1)
                                }
        
                                if(listaCheckRecentes[b].LinkImgiMusica == TodasAsMusicas.Musicas[contador].LinkImgiMusica && TodasAsMusicas.Musicas[contador].NomeMusica) {
                                    jaTemEssaMusica = true
                                }
        
                                setTimeout(() => {
                                    if(jaTemEssaMusica == false) {
                                        let formaLista =  {
                                            NomeMusica: TodasAsMusicas.Musicas[contador].NomeMusica,
                                            NomeAutor: TodasAsMusicas.Musicas[contador].NomeAutor,
                                            Tipo: TodasAsMusicas.Musicas[contador].Tipo,
                                            LinkAudio: TodasAsMusicas.Musicas[contador].LinkAudio,
                                            LinkImgiMusica: TodasAsMusicas.Musicas[contador].LinkImgiMusica,
                                            EmailUser: TodasAsMusicas.Musicas[contador].EmailUser,
                                            EstadoMusica: TodasAsMusicas.Musicas[contador].EstadoMusica,
                                        }
                    
                                        if(addMusicaEmRecentes == false) {
                                            addMusicaEmRecentes = true
                                            listaMusicasRecentes.push(formaLista)
                                            criarRecentes(listaMusicasRecentes)
                                        }
                                    }
                                }, 100)
                            }
                        }
    
                        darPlayNaMusica(TodasAsMusicas.Musicas[contador])
                    })
                } //! Fim da function ----------------------
    
                let feitoPesquisarUser = false
                for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                    pesquisa = pesquisa.toLocaleLowerCase()
                    pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                    
                    let contadorMusicasAutor = 0
                    //! Vai pesquisar pelo(a) user q postou a música
                    let Autor = TodasAsMusicas.Musicas[c].NomeAutor.toLocaleLowerCase()
                    Autor = Autor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    Autor = Autor.replace(/\s/g, '') //? Vai remover os espaços
    
                    if(feitoPesquisarUser == false) {
                        feitoPesquisarUser = true
                        let userEncontrado = false
                        db.collection('Usuarios').onSnapshot((data) => {
                            data.docs.map(function(valor) {
                                let Usuarios = valor.data()
        
                                let nomeAutor = Usuarios.infUser.Nome.toLocaleLowerCase()
                                nomeAutor = nomeAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                nomeAutor = nomeAutor.replace(/\s/g, '') //? Vai remover os espaços
                
                                if(nomeAutor.includes(pesquisa) && userEncontrado == false) {
                                    userEncontrado = true

                                    for(let c2 = Usuarios.Musica.MusicasPostadas.length - 1; c2 >= 0; c2--) {
                                        if(contadorMusicasAutor < 4) {
                                            contadorMusicasAutor++
                                            document.querySelector('#nehumResultado').style.display = 'none'
                                            document.querySelector('#pagPesquisa').style.display = 'block'
                                            document.querySelector('#h1AutorPesquisa').style.display = 'block'
                                            document.querySelector('#autorPesquisa').style.display = 'flex'
                                            document.querySelector(`#musicaAutor${contadorMusicasAutor}`).style.display = 'flex'
                                            
                                            let musicaAutor = document.querySelector(`#musicaAutor${contadorMusicasAutor}`)
                                            let img = document.querySelector(`#imgMusicaAutor${contadorMusicasAutor}`)
                                            let h3 = document.querySelector(`#localTextoAutor${contadorMusicasAutor}`).querySelector('h3')
                                            let p = document.querySelector(`#localTextoAutor${contadorMusicasAutor}`).querySelector('p')
        
                                            img.src = Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica
                                            h3.innerText = Usuarios.Musica.MusicasPostadas[c2].NomeMusica
                                            p.innerText = Usuarios.Musica.MusicasPostadas[c2].NomeAutor
        
                                            document.querySelector('#nomeAutorPesquisa').innerText = Usuarios.infUser.Nome
                                            document.querySelector('#nomeAutorPesquisa').style.display = 'block'
        
                                            clonePerfilUserPesquisado = Usuarios
    
                                            try {
                                                document.querySelector('#sobreAutor').style.backgroundImage = `url(${clonePerfilUserPesquisado.infUser.ImgParedePerfil})`
                                            } catch{}
                                        
                                        
                                            let imgPerfilUserPagPessoal = document.querySelector('#fotoAutorPesquisa')
                                            try {
                                                if(clonePerfilUserPesquisado.infUser.FotoPerfil != undefined) {
                                                    imgPerfilUserPagPessoal.src = clonePerfilUserPesquisado.infUser.FotoPerfil
                                                    imgPerfilUserPagPessoal.style.padding = '0px'
                                                    imgPerfilUserPagPessoal.style.width = '180px'
                                                    imgPerfilUserPagPessoal.style.height = '180px'
                                                    imgPerfilUserPagPessoal.style.objectFit = 'cover'
                                                    document.querySelector('#infosPerfilUser').style.background = 'transparent'
                                        
                                                } else {
                                                    imgPerfilUserPagPessoal.src = 'assets/img/icones/icon _profile_.png'
                                                    imgPerfilUserPagPessoal.style.padding = '20px'
                                                    imgPerfilUserPagPessoal.style.width = '100px'
                                                    imgPerfilUserPagPessoal.style.height = '100px'
                                                    imgPerfilUserPagPessoal.style.objectFit = 'contain'
                                                }
                                            } catch{}
        
                                            //!-
                                            musicaAutor.addEventListener('click', () => {
                                                darPlayNaMusica(Usuarios.Musica.MusicasPostadas[c2])
                                                numSelecionado = c2
                                                numMusicaSequencia = c2
                                                cloneMusicasSequencia = Usuarios.Musica.MusicasPostadas
                                                //let musicaEncontrda = false
        
                                                // db.collection('TodasAsMusicas').onSnapshot((data) => {
                                                //     data.docs.map(function(valor) {
                                                //         let TodasAsMusicas = valor.data()
        
                                                //         for(let c3 = 0; c3 < TodasAsMusicas.Musicas.length; c3++) {
                                                //             if(TodasAsMusicas.Musicas[c3].Email == Usuarios.Musica.MusicasPostadas[c2].Email && TodasAsMusicas.Musicas[c3].LinkImgiMusica == Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica && TodasAsMusicas.Musicas[c3].LinkAudio == Usuarios.Musica.MusicasPostadas[c2].LinkAudio && TodasAsMusicas.Musicas[c3].NomeMusica == Usuarios.Musica.MusicasPostadas[c2].NomeMusica && musicaEncontrda == false) {
                                                //                 musicaEncontrda = true
                                                //                 numSelecionado = c3
                                                //             }
                                                //         }
                                                //     })
                                                // })
        
                                                //! Vai criar uma lista das músicas escutadas
                                                let listaCheckRecentes = listaMusicasRecentes //? Vai checar se há recentes repetidos
        
                                                let jaTemEssaMusica = false
                                                let addMusicaEmRecentes = false
                                                
                                                if(listaMusicasRecentes.length <= 0) {
                                                    let formaLista =  {
                                                        NomeMusica: Usuarios.Musica.MusicasPostadas[c2].NomeMusica,
                                                        NomeAutor: Usuarios.Musica.MusicasPostadas[c2].NomeAutor,
                                                        Tipo: Usuarios.Musica.MusicasPostadas[c2].Tipo,
                                                        LinkAudio: Usuarios.Musica.MusicasPostadas[c2].LinkAudio,
                                                        LinkImgiMusica: Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica,
                                                        EmailUser: Usuarios.Musica.MusicasPostadas[c2].EmailUser,
                                                        EstadoMusica: Usuarios.Musica.MusicasPostadas[c2].EstadoMusica,
                                                    }
                                
                                                    listaMusicasRecentes.push(formaLista)
                                                    criarRecentes(listaMusicasRecentes)
                                
                                                } else if(listaMusicasRecentes.length > 0) {
                                                    for(let b = 0; b < listaMusicasRecentes.length; b++) {
                                                        if(listaMusicasRecentes.length == 9) {
                                                            listaMusicasRecentes.splice(0, 1)
                                                        }
                                
                                                        if(listaCheckRecentes[b].LinkImgiMusica == Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica && Usuarios.Musica.MusicasPostadas[c2].NomeMusica) {
                                                            jaTemEssaMusica = true
                                                        }
                                
                                                        setTimeout(() => {
                                                            if(jaTemEssaMusica == false) {
                                                                let formaLista =  {
                                                                    NomeMusica: Usuarios.Musica.MusicasPostadas[c2].NomeMusica,
                                                                    NomeAutor: Usuarios.Musica.MusicasPostadas[c2].NomeAutor,
                                                                    Tipo: Usuarios.Musica.MusicasPostadas[c2].Tipo,
                                                                    LinkAudio: Usuarios.Musica.MusicasPostadas[c2].LinkAudio,
                                                                    LinkImgiMusica: Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica,
                                                                    EmailUser: Usuarios.Musica.MusicasPostadas[c2].EmailUser,
                                                                    EstadoMusica: Usuarios.Musica.MusicasPostadas[c2].EstadoMusica,
                                                                }
                                            
                                                                if(addMusicaEmRecentes == false) {
                                                                    addMusicaEmRecentes = true
                                                                    listaMusicasRecentes.push(formaLista)
                                                                    criarRecentes(listaMusicasRecentes)
                                                                }
                                                            }
                                                        }, 100)
                                                    }
                                                }
                                            })
                                        }
        
                                        //! -------------------------------- Vai mostrar as músicas postadas pelo user pesquisado
                                        if(userPesquisado == false && contadorMusicaMaxPerfil < 8) {
                                            contadorMusicaMaxPerfil++
                                            let musicaMaisTocada = document.createElement('div')
                                            let localImgMaisTocada = document.createElement('div')
                                            let img = document.createElement('img')
                                            let nomeMusicaMaisTocada = document.createElement('h3')
                                            let nomeAutorMaisTocada = document.createElement('p')
        
                                            musicaMaisTocada.className = 'musicaMaisTocada'
                                            localImgMaisTocada.className = 'localImgMaisTocada'
                                            nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                            nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
        
                                            img.src = Usuarios.Musica.MusicasPostadas[c2].LinkImgiMusica
                                            nomeMusicaMaisTocada.innerText = Usuarios.Musica.MusicasPostadas[c2].NomeMusica
                                            nomeAutorMaisTocada.innerText = Usuarios.Musica.MusicasPostadas[c2].NomeAutor
        
                                            localImgMaisTocada.appendChild(img)
                                            musicaMaisTocada.appendChild(localImgMaisTocada)
                                            musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                            musicaMaisTocada.appendChild(nomeAutorMaisTocada)
        
                                            document.querySelector('#noneDoUserQuePostouPesquisa').innerText = Usuarios.infUser.Nome
                                            document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'block'
                                            document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'block'
                                            document.querySelector('#musicasPostadasPeloUserPesquisado').appendChild(musicaMaisTocada)
        
                                            //? Funções de click
                                            musicaMaisTocada.addEventListener('click', () => {
                                                darPlayNaMusica(Usuarios.Musica.MusicasPostadas[c2])
                                                numMusicaSequencia = c2
                                                cloneMusicasSequencia = Usuarios.Musica.MusicasPostadas
                                            })
                                        }
                                    }
                                }
                            })
                        })
                    }
    
    
                    //! - Vai pesquisar pelo nome da música e nome do autor
                    let NomeMusica = TodasAsMusicas.Musicas[c].NomeMusica.toLocaleLowerCase()
                    NomeMusica = NomeMusica.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    NomeMusica = NomeMusica.replace(/\s/g, '') //? Vai remover os espaços
    
                    let nomeDoAutor = TodasAsMusicas.Musicas[c].NomeAutor.toLocaleLowerCase()
                    nomeDoAutor = nomeDoAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    nomeDoAutor = nomeDoAutor.replace(/\s/g, '') //? Vai remover os espaços
    
                    if(NomeMusica.includes(pesquisa) && contadorResutado < 10 || nomeDoAutor.includes(pesquisa) && contadorResutado < 10) {
                        contadorResutado++
                        localArmazenar(document.querySelector('#localMlhResutado'), c)
    
                        document.querySelector('#localMlhResutado').style.display = 'block'
                        document.querySelector('#h1MelhorResutado').style.display = 'block'
    
                    } else if(NomeMusica.includes(pesquisa) && contadorResutado >= 10 || nomeDoAutor.includes(pesquisa) && contadorResutado >= 10) {
                        contadorResutado++
                        localArmazenar(document.querySelector('#relacionadas'), c)
    
                        document.querySelector('#relacionadas').style.display = 'block'
                        document.querySelector('#h1Relacionadas').style.display = 'block'
                    }
    
                    //! - Vai pesquisar pelo gênero da música
                    let Tipo = TodasAsMusicas.Musicas[c].Tipo.toLocaleLowerCase()
                    Tipo = Tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    Tipo = Tipo.replace(/\s/g, '') //? Vai remover os espaços
    
                    if(Tipo.includes(pesquisa) /*|| pesquisa.includes(Tipo)*/) {
                         //? Vai salvar a pesquisa
                        if(pesquisaSalvaGenero == false && ultimasPesquisasDoUser.Generos.length < 8) {
                            pesquisaSalvaGenero = true
                            let jaTemEssaPesquisa = false
                            for(let c = 0; c < ultimasPesquisasDoUser.Generos.length; c++) {
                                GenerosUltimasPesquisasDoUser = ultimasPesquisasDoUser.Generos[c].toLocaleLowerCase()
                                GenerosUltimasPesquisasDoUser = GenerosUltimasPesquisasDoUser.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                GenerosUltimasPesquisasDoUser = GenerosUltimasPesquisasDoUser.replace(/\s/g, '') //? Vai remover os espaços
    
                                if(GenerosUltimasPesquisasDoUser.includes(pesquisa) || pesquisa.includes(GenerosUltimasPesquisasDoUser)) {
                                    jaTemEssaPesquisa = true
                                }
                            }
    
                            setTimeout(() => {
                                if(jaTemEssaPesquisa == false) {
                                    jaTemEssaPesquisa = true
                                    pesquisaSalvaGenero = true
                                    ultimasPesquisasDoUser.Generos.push(pesquisa)
                                    localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                                }
                            }, 100)
    
                            //? Caso a parte Talvez você curta esteja cheia, ele vai remover a primera pesquisa
                        } else if(pesquisaSalvaGenero == false && ultimasPesquisasDoUser.Generos.length >= 8) {
                            ultimasPesquisasDoUser.Generos.splice(0, 1)
                            pesquisaSalvaGenero = true
                            let jaTemEssaPesquisa = false
                            for(let c = 0; c < ultimasPesquisasDoUser.Generos.length; c++) {
                                GenerosUltimasPesquisasDoUser = ultimasPesquisasDoUser.Generos[c].toLocaleLowerCase()
                                GenerosUltimasPesquisasDoUser = GenerosUltimasPesquisasDoUser.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                GenerosUltimasPesquisasDoUser = GenerosUltimasPesquisasDoUser.replace(/\s/g, '') //? Vai remover os espaços
    
                                if(GenerosUltimasPesquisasDoUser.includes(pesquisa) || pesquisa.includes(GenerosUltimasPesquisasDoUser)) {
                                    jaTemEssaPesquisa = true
                                }
                            }
    
                            setTimeout(() => {
                                if(jaTemEssaPesquisa == false) {
                                    jaTemEssaPesquisa = true
                                    pesquisaSalvaGenero = true
                                    ultimasPesquisasDoUser.Generos.push(pesquisa)
                                    localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                                }
                            }, 100)
                        }
    
                        localArmazenar(document.querySelector('#TipoPesquisa'), c)
    
                        document.querySelector('#TipoPesquisa').style.display = 'block'
                        document.querySelector('#h1Tipo').style.display = 'block'
                    }
                }
    
                //! Vai pesquisar por playlists
                let playlistJaFoiPesquisada = false
                db.collection('Usuarios').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let Usuarios = valor.data()
    
                        try {
                            if(playlistJaFoiPesquisada == false) {
                                setTimeout(() => {
                                    playlistJaFoiPesquisada = true
                                }, 1000)

                                for(let a = 0; a < Usuarios.Musica.Playlist.length; a++) {
                                    pesquisa = pesquisa.toLocaleLowerCase()
                                    pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                    pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
            
                                    NomePlaylist = Usuarios.Musica.Playlist[a].NomePlaylist.toLocaleLowerCase()
                                    NomePlaylist = NomePlaylist.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                    NomePlaylist = NomePlaylist.replace(/\s/g, '') //? Vai remover os espaços
            
                                    if(NomePlaylist.includes(pesquisa) || pesquisa.includes(NomePlaylist)) {
                                        document.querySelector('#nehumResultado').style.display = 'none'
                                        document.querySelector('#h1Playlists').style.display = 'block'
                                        document.querySelector('#localPlaylistsPesquisa').style.display = 'block'
                                        let musicaMaisTocada = document.createElement('div')
                                        let localImgMaisTocada = document.createElement('div')
                                        let img = document.createElement('img')
                                        let nomeMusicaMaisTocada = document.createElement('h3')
                                        let nomeAutorMaisTocada = document.createElement('p')
            
                                        musicaMaisTocada.className = 'musicaMaisTocada'
                                        localImgMaisTocada.className = 'localImgMaisTocada'
                                        nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                        nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'
            
                                        img.src = Usuarios.Musica.Playlist[a].Musicas[0].LinkImgiMusica
                                        nomeMusicaMaisTocada.innerText = Usuarios.Musica.Playlist[a].NomePlaylist
                                        nomeAutorMaisTocada.innerText = Usuarios.infUser.Nome
            
                                        localImgMaisTocada.appendChild(img)
                                        musicaMaisTocada.appendChild(localImgMaisTocada)
                                        musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                        musicaMaisTocada.appendChild(nomeAutorMaisTocada)
            
                                        document.querySelector('#localPlaylistsPesquisa').appendChild(musicaMaisTocada)
        
                                        musicaMaisTocada.addEventListener('click', () => {
                                            abrirPlaylist(valor.id, a)
                                        })
        
                                        //! Vai salvar a playlist pesquisada
                                        if(NomePlaylist.includes(pesquisa) || pesquisa.includes(NomePlaylist)) {
                                            //? Vai salvar a pesquisa
                                            if(pesquisaSalvaPlaylist == false && ultimasPesquisasDoUser.Playlists.length < 8) {
                                                pesquisaSalvaPlaylist = true
                                                let jaTemEssaPesquisa = false
                                                for(let c = 0; c < ultimasPesquisasDoUser.Playlists.length; c++) {
                                                    NomePlaylistUltimasPesquisasDoUser = ultimasPesquisasDoUser.Playlists[c].toLocaleLowerCase()
                                                    NomePlaylistUltimasPesquisasDoUser = NomePlaylistUltimasPesquisasDoUser.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                                    NomePlaylistUltimasPesquisasDoUser = NomePlaylistUltimasPesquisasDoUser.replace(/\s/g, '') //? Vai remover os espaços
        
                                                    if(NomePlaylistUltimasPesquisasDoUser.includes(pesquisa) || pesquisa.includes(NomePlaylistUltimasPesquisasDoUser)) {
                                                        jaTemEssaPesquisa = true
                                                    }
                                                }
                        
                                                setTimeout(() => {
                                                    if(jaTemEssaPesquisa == false) {
                                                        jaTemEssaPesquisa = true
                                                        pesquisaSalvaPlaylist = true
                                                        ultimasPesquisasDoUser.Playlists.push(pesquisa)
                                                        localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                                                    }
                                                }, 100)
                        
                                                //? Caso a parte Talvez você curta esteja cheia, ele vai remover a primera pesquisa
                                            } else if(pesquisaSalvaPlaylist == false && ultimasPesquisasDoUser.Playlists.length >= 8) {
                                                ultimasPesquisasDoUser.Playlists.splice(0, 1)
                                                pesquisaSalvaPlaylist = true
                                                let jaTemEssaPesquisa = false
                                                for(let c = 0; c < ultimasPesquisasDoUser.Playlists.length; c++) {
                                                    NomePlaylistUltimasPesquisasDoUser = ultimasPesquisasDoUser.Playlists[c].toLocaleLowerCase()
                                                    NomePlaylistUltimasPesquisasDoUser = NomePlaylistUltimasPesquisasDoUser.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                                    NomePlaylistUltimasPesquisasDoUser = NomePlaylistUltimasPesquisasDoUser.replace(/\s/g, '') //? Vai remover os espaços
        
                                                    if(NomePlaylistUltimasPesquisasDoUser.includes(pesquisa) || pesquisa.includes(NomePlaylistUltimasPesquisasDoUser)) {
                                                        jaTemEssaPesquisa = true
                                                    }
                                                }
                        
                                                setTimeout(() => {
                                                    if(jaTemEssaPesquisa == false) {
                                                        jaTemEssaPesquisa = true
                                                        pesquisaSalva = true
                                                        ultimasPesquisasDoUser.Playlists.push(pesquisa)
                                                        localStorage.setItem('ultimasPesquisasDoUser', JSON.stringify(ultimasPesquisasDoUser))
                                                    }
                                                }, 100)
                                            }
                        
                                            localArmazenar(document.querySelector('#TipoPesquisa'), a)
                        
                                            document.querySelector('#TipoPesquisa').style.display = 'block'
                                            document.querySelector('#h1Tipo').style.display = 'block'
                                        }
                                    }
                                }
                            }
                        } catch{}
                    })
                })
            }
        })
    })
}

//? Vai ir para a pág pessoal do User pesquisado
document.querySelector('#sobreAutor').addEventListener('click', () => {
    conquisatasUserPesquisado = []
    let conquistas = document.querySelector('#conquistas')
    conquistas.innerHTML = ''

    //! Vai checar se o user esta em umas das 3 primeiras colocações
    checarRanking(clonePerfilUserPesquisado.infUser.Nome).then((resolve) => {
        if(conquisatasUserPesquisado[0] == 'primeiro-lugar') {
            let img = document.createElement('img')
            img.src = 'assets/img/icones/icon_first2.png'
            conquistas.appendChild(img)

        } else if(conquisatasUserPesquisado[0] == 'segundo-lugar') {
            let img = document.createElement('img')
            img.src = 'assets/img/icones/icon_second.png'
            conquistas.appendChild(img)

        } if(conquisatasUserPesquisado[0] == 'terceiro-lugar') {
            let img = document.createElement('img')
            img.src = 'assets/img/icones/icon_third.png'
            conquistas.appendChild(img)
        }

        //? Vai abrir o perfil
        criarPerfilUser()
    })

    function criarPerfilUser() {
        let localMusicasUserPagPessoal = document.querySelector('#localMusicasUserPagPessoal')
        localMusicasUserPagPessoal.innerHTML = ''

        document.getElementsByClassName('btnEdit')[0].style.display = 'none'
        document.querySelector('#pagPessoalUser').style.display = 'block'
        document.querySelector('#addPlaylist').style.display = 'none'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('img').style.display = 'block'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('h1').style.display = 'block'
        document.querySelector('#infosPerfilUser').querySelector('div').style.maxWidth = '661px'
        document.querySelector('#descPerfilPagPessoal').style.display = 'block'
        document.querySelector('#infosPerfilUser').style.height = '300px'
        document.querySelector('#headerPessalUser').querySelector('div').querySelector('textarea').style.display = 'none'
        document.querySelector('#headerPessalUser').style.backgroundSize = 'cover'
        document.querySelector('#headerPessalUser').style.backgroundRepeat = 'no-repeat'
        imgUserPagPessoal.src = 'assets/img/icones/play.png'
        imgUserPagPessoal.style.background = '#0DCBA9'

        oQueEstaPassando = 'user pesquisado'

        try {
            document.querySelector('#headerPessalUser').style.backgroundImage = `url("${clonePerfilUserPesquisado.infUser.ImgParedePerfil}")`
        } catch{}


        let imgPerfilUserPagPessoal = document.querySelector('#imgPerfilUserPagPessoal')
        try {
            if(clonePerfilUserPesquisado.infUser.FotoPerfil != undefined) {
                imgPerfilUserPagPessoal.src = clonePerfilUserPesquisado.infUser.FotoPerfil
                imgPerfilUserPagPessoal.style.padding = '0px'
                imgPerfilUserPagPessoal.style.width = '180px'
                imgPerfilUserPagPessoal.style.height = '180px'
                imgPerfilUserPagPessoal.style.objectFit = 'cover'
                document.querySelector('#infosPerfilUser').style.background = 'transparent'

            } else {
                imgPerfilUserPagPessoal.src = 'assets/img/icones/icon _profile_.png'
                imgPerfilUserPagPessoal.style.padding = '20px'
                imgPerfilUserPagPessoal.style.width = '100px'
                imgPerfilUserPagPessoal.style.height = '100px'
                imgPerfilUserPagPessoal.style.objectFit = 'contain'
            }
        } catch{}

        document.querySelector('#nomeUserPagPessoal').innerText = clonePerfilUserPesquisado.infUser.Nome
        if(clonePerfilUserPesquisado.infUser.Desc != undefined) {
            document.querySelector('#descPerfilPagPessoal').innerText = clonePerfilUserPesquisado.infUser.Desc
        } else {
            document.querySelector('#descPerfilPagPessoal').innerText = '...'
        }

        for(let c = clonePerfilUserPesquisado.Musica.MusicasPostadas.length - 1; c >= 0; c--) {

            let musicaPostadaUser = document.createElement('div')
            let localMusicaPostadaUser = document.createElement('div')
            let div = document.createElement('div')
            let img = document.createElement('img')
            let localTextoPostadoUser = document.createElement('div')
            let h3 = document.createElement('h3')
            let p = document.createElement('p')
            let heart = document.createElement('img')

            musicaPostadaUser.className = 'musicaPostadaUser'
            localMusicaPostadaUser.className = 'localMusicaPostadaUser'
            localTextoPostadoUser.className = 'localTextoPostadoUser'

            img.src = clonePerfilUserPesquisado.Musica.MusicasPostadas[c].LinkImgiMusica
            h3.innerText = clonePerfilUserPesquisado.Musica.MusicasPostadas[c].NomeMusica
            p.innerText = clonePerfilUserPesquisado.Musica.MusicasPostadas[c].NomeAutor
            heart.src = 'assets/img/icones/icon _heart_ (1).png'

            localMusicaPostadaUser.appendChild(img)
            localTextoPostadoUser.appendChild(h3)
            localTextoPostadoUser.appendChild(p)
            div.appendChild(localMusicaPostadaUser)
            div.appendChild(localTextoPostadoUser)
            musicaPostadaUser.appendChild(div)
            musicaPostadaUser.appendChild(heart)
            localMusicasUserPagPessoal.appendChild(musicaPostadaUser)

            //! Funções de click

            //? Vai checar se a música já foi adicionada aos favoritos
            cehcarFavoritos(clonePerfilUserPesquisado.Musica.MusicasPostadas[c], heart)

            //? Vai salvar como favoritos a música
            heart.addEventListener('click', () => {
                favoritarMusica(clonePerfilUserPesquisado.Musica.MusicasPostadas[c])

                setTimeout(() => {
                    cehcarFavoritos(clonePerfilUserPesquisado.Musica.MusicasPostadas[c], heart)
                }, 200)
            })


            imgUserPagPessoal.addEventListener('click', () => {
                cloneMusicasSequencia = clonePerfilUserPesquisado.Musica.MusicasPostadas
                numMusicaSequencia = clonePerfilUserPesquisado.Musica.MusicasPostadas.length - 1
                darPlayNaMusica(clonePerfilUserPesquisado.Musica.MusicasPostadas[clonePerfilUserPesquisado.Musica.MusicasPostadas.length - 1])
            })

            div.addEventListener('click', () => {
                cloneMusicasSequencia = clonePerfilUserPesquisado.Musica.MusicasPostadas
                numMusicaSequencia = c
                darPlayNaMusica(clonePerfilUserPesquisado.Musica.MusicasPostadas[c])
            })
        }
    }
})


// const menuLinks = document.querySelectorAll("#voltarTopo a[href^=\"#\"]")

// function getDistanceFromTheTop(element) {
// 	const id = element.getAttribute("href")
// 	return document.querySelector(id).offsetTop
// }

// function scrollToSection(event) {
// 	event.preventDefault()
// 	const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90
// 	smoothScrollTo(0, distanceFromTheTop)
// }

// menuLinks.forEach((link) => {
// 	link.addEventListener("click", scrollToSection)
// })

// function smoothScrollTo(endX, endY, duration) {
// 	const startX = window.scrollX || window.pageXOffset
// 	const startY = window.scrollY || window.pageYOffset
// 	const distanceX = endX - startX
// 	const distanceY = endY - startY
// 	const startTime = new Date().getTime()

// 	duration = typeof duration !== "undefined" ? duration : 700

// 	const easeInOutQuart = (time, from, distance, duration) => {
// 		if ((time /= duration / 2) < 1)
// 			return (distance / 2) * time * time * time * time + from
// 		return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
// 	}

// 	const timer = setInterval(() => {
// 		const time = new Date().getTime() - startTime
// 		const newX = easeInOutQuart(time, startX, distanceX, duration)
// 		const newY = easeInOutQuart(time, startY, distanceY, duration)
// 		if (time >= duration) {
// 			clearInterval(timer)
// 		}
// 		window.scroll(newX, newY)
// 	}, 1000 / 60)
// }