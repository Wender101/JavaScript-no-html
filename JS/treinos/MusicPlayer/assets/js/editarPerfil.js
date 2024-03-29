let btnEditarPerfil = document.querySelector('#PagPessoal')

let musicaSelecionadaLetra //? Vai armazenar a música escolhida para add uma letra
btnEditarPerfil.addEventListener('click', () => {
    fecharAbas()
    let aberto = false
    db.collection('Usuarios').onSnapshot((data) => {
    data.docs.map(function(valor) {
        let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email && aberto == false) {
                aberto = true
                let localMusicasUserPagPessoal = document.querySelector('#localMusicasUserPagPessoal')
                localMusicasUserPagPessoal.innerHTML = ''

                //? Vai clonar as músicas postadas pelo user para poder eclui-las se necessário
                let cloneMsucasDoUser = Usuarios.Musica

                document.getElementsByClassName('btnEdit')[0].style.display = 'flex'
                document.querySelector('body').style.overflow = 'hidden'
                document.querySelector('#pagPessoalUser').style.display = 'block'
                document.querySelector('#addPlaylist').style.display = 'none'
                document.querySelector('#headerPessalUser').querySelector('div').querySelector('img').style.display = 'block'
                document.querySelector('#headerPessalUser').querySelector('div').querySelector('h1').style.display = 'block'
                document.querySelector('#headerPessalUser').querySelector('div').querySelector('textarea').style.display = 'none'
                document.querySelector('#headerPessalUser').style.backgroundSize = 'cover'
                document.querySelector('#headerPessalUser').style.backgroundRepeat = 'no-repeat'
                imgUserPagPessoal.src = 'assets/img/icones/play.png'
                imgUserPagPessoal.style.background = '#0DCBA9'

                oQueEstaPassando = 'proprio perfil'

                try {
                    document.querySelector('#headerPessalUser').style.backgroundImage = `url(${Usuarios.infUser.ImgParedePerfil})`
                } catch{}
            
            
                let imgPerfilUserPagPessoal = document.querySelector('#imgPerfilUserPagPessoal')
                try {
                    if(Usuarios.infUser.FotoPerfil != undefined) {
                        imgPerfilUserPagPessoal.style.display = 'block'
                        imgPerfilUserPagPessoal.src = Usuarios.infUser.FotoPerfil
                        imgPerfilUserPagPessoal.style.padding = '0px'
                        imgPerfilUserPagPessoal.style.width = '180px'
                        imgPerfilUserPagPessoal.style.height = '160px'
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
            
                document.querySelector('#nomeUserPagPessoal').innerText = Usuarios.infUser.Nome
                if(Usuarios.infUser.Desc != undefined) {
                    document.querySelector('#descPerfilPagPessoal').innerText = Usuarios.infUser.Desc
                } else {
                    document.querySelector('#descPerfilPagPessoal').innerText = '...'
                }


                for(let d = Usuarios.Musica.MusicasPostadas.length -1; d >= 0 ; d--) {
                    let musicaPostadaUser = document.createElement('div')
                    let localMusicaPostadaUser = document.createElement('div')
                    let div = document.createElement('div')
                    let img = document.createElement('img')
                    let localTextoPostadoUser = document.createElement('div')
                    let h3 = document.createElement('h3')
                    let p = document.createElement('p')
                    let divBtns = document.createElement('div')
                    let btnTrash = document.createElement('button')
                    let imgTrash = document.createElement('img')
                    let btnLetra = document.createElement('button')
                    let imgLetra = document.createElement('img')
            
                    musicaPostadaUser.className = 'musicaPostadaUser'
                    localMusicaPostadaUser.className = 'localMusicaPostadaUser'
                    localTextoPostadoUser.className = 'localTextoPostadoUser'
                    divBtns.className = 'btnsEditar'
                    btnTrash.className = 'editBtn'
                    btnLetra.className = 'editBtn'
            
                    img.src = Usuarios.Musica.MusicasPostadas[d].LinkImgiMusica
                    h3.innerText = Usuarios.Musica.MusicasPostadas[d].NomeMusica
                    p.innerText = Usuarios.Musica.MusicasPostadas[d].NomeAutor
                    imgTrash.src = 'assets/img/icones/icon\ _trash_.png'
                    imgLetra.src = 'assets/img/icones/microphone.png'
            
                    localMusicaPostadaUser.appendChild(img)
                    localTextoPostadoUser.appendChild(h3)
                    localTextoPostadoUser.appendChild(p)
                    div.appendChild(localMusicaPostadaUser)
                    div.appendChild(localTextoPostadoUser)
                    musicaPostadaUser.appendChild(div)
                    btnTrash.appendChild(imgTrash)
                    btnLetra.appendChild(imgLetra)
                    divBtns.appendChild(btnLetra)
                    divBtns.appendChild(btnTrash)
                    musicaPostadaUser.appendChild(divBtns)
                    document.querySelector('#localMusicasUserPagPessoal').appendChild(musicaPostadaUser)

                    //! funções de click
                    
                    //? Vai abrir a aba de add uma letra na música
                    btnLetra.addEventListener('click', () => {
                        document.querySelector('#pagCriarLetra').style.display = 'block'
                        document.querySelector('body').style.overflow = 'hidden'
                        musicaSelecionadaLetra = Usuarios.Musica.MusicasPostadas[d]

                        let playBtn = document.getElementById('play')
                        document.querySelector('#menuTocandoMusica').style.bottom = '-100vh'
                        document.querySelector('nav').style.height = '100vh'
                        audio.pause()
                        estadoMusica = 'pause'
                        playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
                        document.querySelector('#addLetra').style.display = 'block'
                        document.querySelector('#configTimeLetra').style.display = 'none'
                        document.querySelector('#enviarLetra').style.display = 'none'
                        document.querySelector('#textLetra').value = ''
                        document.querySelector('#configTimeLetra').querySelector('pre').innerHTML = ''
                    })

                    //? Vai ecluir a música
                    btnTrash.addEventListener('click', () => {
                        // if(confirm('Tem certeza que quer excluir a música?')) {

                        //     //? Vai pegar o nome da pasta
                        //     async function getFileNameFromUrl(fileUrl) {
                        //         // Extrai o caminho do arquivo do URL
                        //         const filePath = decodeURIComponent(fileUrl.replace(`https://${storage.name}.storage.googleapis.com/`, ''));
                                
                        //         // Obtém o nome do arquivo a partir do caminho do arquivo
                        //         const fileName = filePath.split('/').pop();
                                
                        //         return fileName;
                        //     }

                        //     let nomeDaPasta
                        //     const fileUrl = Usuarios.Musica.MusicasPostadas[d].LinkAudio
                        //     const fileName =  getFileNameFromUrl(fileUrl).then((name) => {
                        //         let pronto = false

                        //         for(let c = 0; c < name.length; c++) {
                        //             if(pronto == false) {
                        //                 let novoNome = name.substring(c, 0)
                        //                 let pontoFinal = novoNome.slice(-1)
                                        
                        //                 if(pontoFinal == '?') {
                        //                     pronto = true
                        //                     nomeDaPasta = name.substring(c -1, 0)

                        //                     //? Vai excluir do storage
                        //                     console.log(nomeDaPasta);
                        //                     storage.ref().child(nomeDaPasta).child().delete().then(() => {

                        //                         //? Vai excluir do perfil pessoal do user
                        //                         cloneMsucasDoUser.MusicasPostadas.splice(d, 1)
                        //                         db.collection('Usuarios').doc(valor.id).update({Musica: cloneMsucasDoUser})

                        //                         //? Vai excluir das playlist
                        //                         db.collection('Usuarios').onSnapshot((data) => {
                        //                             data.docs.map(function(valor) {
                        //                                 let Usuarios = valor.data()

                        //                                 for(let c = 0; c < Usuarios.Musica.Playlist.length; c++) {
                        //                                     if(Usuarios.Musica.Playlist[c].LinkImgiMusica == Usuarios.Musica.MusicasPostadas[d].LinkImgiMusica && Usuarios.Musica.Playlist[c].LinkAudio == Usuarios.Musica.MusicasPostadas[d].LinkAudio && email == Usuarios.Musica.Playlist[c].EmailUser) {
                        //                                         let clonePlaylists = Usuarios.Musica
                        //                                         clonePlaylists.Playlist.splice(c, 1)

                        //                                         db.collection('Usuarios').doc(valor.id).update({Musica: clonePlaylists})
                        //                                     }
                        //                                 }
                        //                             })
                        //                         })

                        //                         //? Vai excluir da parte todas as músicas
                        //                         let excluidoDeTodasAsMusicas = false
                        //                         db.collection('TodasAsMusicas').onSnapshot((data) => {
                        //                             data.docs.map(function(valor) {
                        //                                 let TodasAsMusicas = valor.data()

                        //                                 if(excluidoDeTodasAsMusicas == false) {
                        //                                     excluidoDeTodasAsMusicas = true

                        //                                     let cloneTodasAsMusicas = TodasAsMusicas.Musicas

                        //                                     for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                        //                                         if(TodasAsMusicas.Musicas[c].LinkImgiMusica == Usuarios.Musica.MusicasPostadas[d].LinkImgiMusica && TodasAsMusicas.Musicas[c].LinkAudio == Usuarios.Musica.MusicasPostadas[d].LinkAudio && email == TodasAsMusicas.Musicas[c].EmailUser) {
                        //                                             cloneTodasAsMusicas.splice(c, 1)
                        //                                             db.collection('Usuarios').doc(valor.id).update({Musicas: cloneTodasAsMusicas})
                        //                                         }
                        //                                     }
                        //                                 }
                        //                             })
                        //                         })
                        //                     })
                        //                 }
                        //             }
                        //         }
                        //     })
                        // }
                    })
                }
            }
        })
    })
})

//? Editar perfil
let nomeUserEditarPerfil = document.querySelector('#nomeUserEditarPerfil')
let descUserEditarPerfil = document.querySelector('#descUserEditarPerfil')
let LinkImgFundoEditarPerfil = document.querySelector('#LinkImgFundoEditarPerfil')
let imgPerfilUserEditar = document.querySelector('#imgPerfilUserEditar')
let btnAtualizarPerfil = document.querySelector('#btnAtualizarPerfil')

let valorNomeUserEditarPerfil
let valorDescUserEditarPerfil
let valorLinkImgFundoEditarPerfil
let valorImgPerfilUserEditar

let cloneProprioPerfil
let idProprioPerfil 
function editarPerfil() {
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()
           
            if(Usuarios.infUser.Email == email) {
                idProprioPerfil = valor.id
                cloneProprioPerfil = Usuarios.infUser //? vai clonar as infos do perfil para editar mais tarde

                document.querySelector('#pop-upEditarPerfil').style.display = 'flex'
    
                let podeSalvarAtualizacao = false

                if(podeSalvarAtualizacao == false) {
                    setTimeout(() => {
                        podeSalvarAtualizacao = true
                    }, 100)
                    
                    //? Vai colocar as infos nos inputs
                    nomeUserEditarPerfil.value = Usuarios.infUser.Nome
                    descUserEditarPerfil.value = Usuarios.infUser.Desc
                    LinkImgFundoEditarPerfil.value = Usuarios.infUser.ImgParedePerfil
                    imgPerfilUserEditar.value = Usuarios.infUser.FotoPerfil

                    valorNomeUserEditarPerfil = Usuarios.infUser.Nome
                    valorDescUserEditarPerfil = Usuarios.infUser.Desc
                    valorLinkImgFundoEditarPerfil = Usuarios.infUser.ImgParedePerfil
                    valorImgPerfilUserEditar = Usuarios.infUser.FotoPerfil
                }
    
            }
        })
    })
}

//? Vai checar se está pronto para salvar a edição
function checarAtualizarPerfil(atualizarPerfil = false) {

    //? vai checar se vc alterou alguma coisa nos inputs de editar perfil
    if(nomeUserEditarPerfil.value.length > 0 && descUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && nomeUserEditarPerfil.value != valorNomeUserEditarPerfil || nomeUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && imgPerfilUserEditar.value != valorImgPerfilUserEditar || nomeUserEditarPerfil.value.length > 0 && descUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && LinkImgFundoEditarPerfil.value != valorLinkImgFundoEditarPerfil || nomeUserEditarPerfil.value.length > 0 && descUserEditarPerfil.value != valorDescUserEditarPerfil  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0) {

        btnAtualizarPerfil.style.background = '#0DCBA9'

        if(atualizarPerfil == true) {
            cloneProprioPerfil.Nome = nomeUserEditarPerfil.value
            cloneProprioPerfil.Desc = descUserEditarPerfil.value
            cloneProprioPerfil.ImgParedePerfil = LinkImgFundoEditarPerfil.value
            cloneProprioPerfil.FotoPerfil = imgPerfilUserEditar.value

            //? Vai colocar as alterações na tela
            try {
                document.querySelector('#headerPessalUser').style.backgroundImage = `url(${LinkImgFundoEditarPerfil.value})`
                document.querySelector('#imgPerfilUserPagPessoal').src = imgPerfilUserEditar.value
                document.querySelector('#nomeUserPagPessoal').innerText = nomeUserEditarPerfil.value
                document.querySelector('#descPerfilPagPessoal').innerText = descUserEditarPerfil.value

                db.collection('Usuarios').doc(idProprioPerfil).update({infUser: cloneProprioPerfil})

                setTimeout(() => {
                    fecharEditarPerfil()
                    btnAtualizarPerfil.style.background = '#0DCBA9'
                }, 100)
            } catch (error) {
                alert('Algo deu errado! Certifique de que todas as informações estão corretas.')
            }

        }

    } else {
        //? Caso n tenha alterado nada
        btnAtualizarPerfil.style.background = '#636363'
    }
}

//? Vai fechar a aba de editar perfil
function fecharEditarPerfil() {
    document.querySelector('#pop-upEditarPerfil').style.display = 'none'
}