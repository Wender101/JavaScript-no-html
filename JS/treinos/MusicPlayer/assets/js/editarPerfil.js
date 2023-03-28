let btnEditarPerfil = document.querySelector('#PagPessoal')

btnEditarPerfil.addEventListener('click', () => {
    db.collection('Usuarios').onSnapshot((data) => {
    data.docs.map(function(valor) {
        let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {
                let localMusicasUserPagPessoal = document.querySelector('#localMusicasUserPagPessoal')
                localMusicasUserPagPessoal.innerHTML = ''

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
                        imgPerfilUserPagPessoal.style.width = '140px'
                        imgPerfilUserPagPessoal.style.height = '140px'
                        imgPerfilUserPagPessoal.style.objectFit = 'cover'
            
            
                    } else {
                        imgPerfilUserPagPessoal.src = 'assets/img/icones/icon _profile_.png'
                        imgPerfilUserPagPessoal.style.padding = '20px'
                        imgPerfilUserPagPessoal.style.width = '100px'
                        imgPerfilUserPagPessoal.style.height = '100px'
                        imgPerfilUserPagPessoal.style.objectFit = 'contain'
                    }
                } catch{}
            
                document.querySelector('#nomeUserPagPessoal').innerText = Usuarios.infUser.Nome

                for(let d = 0; d < Usuarios.Musica.MusicasPostadas.length; d++) {
                    let musicaPostadaUser = document.createElement('div')
                    let localMusicaPostadaUser = document.createElement('div')
                    let div = document.createElement('div')
                    let img = document.createElement('img')
                    let localTextoPostadoUser = document.createElement('div')
                    let h3 = document.createElement('h3')
                    let p = document.createElement('p')
                    let edit = document.createElement('button')
                    let imgEdit = document.createElement('img')
            
                    musicaPostadaUser.className = 'musicaPostadaUser'
                    localMusicaPostadaUser.className = 'localMusicaPostadaUser'
                    localTextoPostadoUser.className = 'localTextoPostadoUser'
                    edit.className = 'btnEdit2'
            
                    img.src = Usuarios.Musica.MusicasPostadas[d].LinkImgiMusica
                    h3.innerText = Usuarios.Musica.MusicasPostadas[d].NomeMusica
                    p.innerText = Usuarios.Musica.MusicasPostadas[d].NomeAutor
                    imgEdit.src = 'assets/img/icones/icon _edit.png'
            
                    localMusicaPostadaUser.appendChild(img)
                    localTextoPostadoUser.appendChild(h3)
                    localTextoPostadoUser.appendChild(p)
                    div.appendChild(localMusicaPostadaUser)
                    div.appendChild(localTextoPostadoUser)
                    musicaPostadaUser.appendChild(div)
                    edit.appendChild(imgEdit)
                    musicaPostadaUser.appendChild(edit)
                    document.querySelector('#localMusicasUserPagPessoal').appendChild(musicaPostadaUser)
                }
            }
        })
    })
})

//? Editar perfil
let nomeUserEditarPerfil = document.querySelector('#nomeUserEditarPerfil')
let LinkImgFundoEditarPerfil = document.querySelector('#LinkImgFundoEditarPerfil')
let imgPerfilUserEditar = document.querySelector('#imgPerfilUserEditar')
let btnAtualizarPerfil = document.querySelector('#btnAtualizarPerfil')

let valorNomeUserEditarPerfil
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
                    LinkImgFundoEditarPerfil.value = Usuarios.infUser.ImgParedePerfil
                    imgPerfilUserEditar.value = Usuarios.infUser.FotoPerfil

                    valorNomeUserEditarPerfil = Usuarios.infUser.Nome
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
    if(nomeUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && nomeUserEditarPerfil.value != valorNomeUserEditarPerfil || nomeUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && imgPerfilUserEditar.value != valorImgPerfilUserEditar || nomeUserEditarPerfil.value.length > 0  && LinkImgFundoEditarPerfil.value.length > 0 && imgPerfilUserEditar.value.length > 0 && LinkImgFundoEditarPerfil.value != valorLinkImgFundoEditarPerfil) {

        btnAtualizarPerfil.style.background = '#0DCBA9'

        if(atualizarPerfil == true) {
            cloneProprioPerfil.Nome = nomeUserEditarPerfil.value
            cloneProprioPerfil.ImgParedePerfil = LinkImgFundoEditarPerfil.value
            cloneProprioPerfil.FotoPerfil = imgPerfilUserEditar.value

            //? Vai colocar as alterações na tela
            try {
                document.querySelector('#headerPessalUser').style.backgroundImage = `url(${LinkImgFundoEditarPerfil.value})`
                document.querySelector('#imgPerfilUserPagPessoal').src = imgPerfilUserEditar.value
                document.querySelector('#nomeUserPagPessoal').innerText = nomeUserEditarPerfil.value

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