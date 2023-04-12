let BibliotecaBtn = document.querySelector('#BibliotecaBtn')

BibliotecaBtn.addEventListener('click', () => {
    if(fecharAbas()) {
        let pagFavoritas = document.querySelector('#pagFavoritas')

        if(pagFavoritas.style.display == 'none') {
            pagFavoritas.style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'

        } else {
            pagFavoritas.style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
        }

        construirNaTelaAsMusicas(true)
    }
})

let favoritasCarregadas = false
function construirNaTelaAsMusicas(podeAtualizar = false) {
    let pagFavoritas = document.querySelector('#pagFavoritas').querySelector('article').querySelector('#localMusicasFavoritas')
    pagFavoritas.innerHTML = ''
    let poderAtualizarMesmo = podeAtualizar
    
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()
            
            if(favoritasCarregadas == true) {
                favoritasCarregadas = false
            }

                setTimeout(() => {
                    favoritasCarregadas = true
                }, 300)

            if(Usuarios.infUser.Email == email && poderAtualizarMesmo == true) {
                poderAtualizarMesmo = false
                pagFavoritas.innerHTML = ''
                idLocalUser = valor.id
                MusicasFavoritasLista = Usuarios.Musica

                if(Usuarios.Musica.MusicasCurtidas.length > 0) {
                    let feito = false
                    for(let c = Usuarios.Musica.MusicasCurtidas.length - 1; c >= 0; c--) {

                        let musicaFavorias = document.createElement('div')
                        let div = document.createElement('div')
                        let localImgMscFavoritas = document.createElement('div')
                        let img = document.createElement('img')
                        let heart = document.createElement('img')
                        let localTextoMscFavoritas = document.createElement('div')
                        let h3 = document.createElement('h3')
                        let p = document.createElement('p')

                        musicaFavorias.className = 'musicaFavorias'
                        localImgMscFavoritas.className = 'localImgMscFavoritas'
                        localTextoMscFavoritas.className = 'localTextoMscFavoritas'

                        heart.src = 'assets/img/icones/icon _heart_.png'
                        img.src = Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica
                        h3.innerText = Usuarios.Musica.MusicasCurtidas[c].NomeMusica
                        p.innerText = Usuarios.Musica.MusicasCurtidas[c].NomeAutor

                        localImgMscFavoritas.appendChild(img)
                        localTextoMscFavoritas.appendChild(h3)
                        localTextoMscFavoritas.appendChild(p)
                        div.appendChild(localImgMscFavoritas)
                        div.appendChild(localTextoMscFavoritas)
                        musicaFavorias.appendChild(div)
                        musicaFavorias.appendChild(heart)
                        pagFavoritas.appendChild(musicaFavorias)

                        //! Funções de click

                        div.addEventListener('click', () => {
                            //hearAdd.src = 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_.png'
                            darPlayNaMusica(Usuarios.Musica.MusicasCurtidas[c])
                        })

                        let feitoAddFavoritos = false
                        heart.addEventListener('click', () => {
                            favoritarMusica(Usuarios.Musica.MusicasCurtidas[c])
                        })

                        div.addEventListener('click', () => {
                            if(feito == false) {
                                feito = true
                                cloneMusicasSequencia = Usuarios.Musica.MusicasCurtidas
                                numMusicaSequencia = Usuarios.Musica.MusicasCurtidas.length - 1
                                darPlayNaMusica(Usuarios.Musica.MusicasCurtidas[c])

                                setTimeout(() => {
                                    feito = false
                                }, 200)
                            }
                        })

                        //! Vai tocar as músicas da pág curtidas
                        document.querySelector('#iconePlayFavoritas').addEventListener('click', () => {
                            if(feito == false) {
                                feito = true
                                cloneMusicasSequencia = Usuarios.Musica.MusicasCurtidas
                                numMusicaSequencia = Usuarios.Musica.MusicasCurtidas.length - 1
                                darPlayNaMusica(Usuarios.Musica.MusicasCurtidas[c])

                                setTimeout(() => {
                                    feito = false
                                }, 200)

                                document.querySelector('#hearAdd').src = 'assets/img/icones/icon _heart_.png'
                            }
                        })
                    }
                }
            }
        })
    })
}