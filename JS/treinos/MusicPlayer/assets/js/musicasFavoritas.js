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
    }
})

let favoritasCarregadas = false
function construirNaTelaAsMusicas() {
    let pagFavoritas = document.querySelector('#pagFavoritas').querySelector('article').querySelector('#localMusicasFavoritas')
    pagFavoritas.innerHTML = ''
    
    
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()
            
            if(favoritasCarregadas == true) {
                pagFavoritas.innerHTML = ''
                favoritasCarregadas = false
            }

                setTimeout(() => {
                    favoritasCarregadas = true
                }, 300)

            if(Usuarios.infUser.Email == email) {
                idLocalUser = valor.id
                MusicasFavoritasLista = Usuarios.Musica

                if(Usuarios.Musica.MusicasCurtidas.length > 0) {
                    for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {

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
                            hearAdd.src = 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_.png'
                            darPlayNaMusica(Usuarios.Musica.MusicasCurtidas[c])
                        })

                        let feitoAddFavoritos = false
                            heart.addEventListener('click', () => {

                                if(feitoAddFavoritos == false) {
                                    let feito = false
                                    feitoAddFavoritos = true
                                    db.collection('TodasAsMusicas').onSnapshot((data) => {
                                        data.docs.map(function(valor) {
                                            let TodasAsMusicas = valor.data()
                                
                                            if(feito == false) {
                                                feito = true
                                                favoritarMusica(Usuarios.Musica.MusicasCurtidas[c].NomeMusica, Usuarios.Musica.MusicasCurtidas[c].NomeAutor, Usuarios.Musica.MusicasCurtidas[c].Tipo, Usuarios.Musica.MusicasCurtidas[c].LinkAudio, Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica, Usuarios.Musica.MusicasCurtidas[c].EmailUser, Usuarios.Musica.MusicasCurtidas[c].EstadoMusica, 'Remover')

                                                if(hearAdd.src == 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_.png') {
                                                    hearAdd.src = 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_ (1).png'

                                                } else if(hearAdd.src == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/assets/img/icones/icon%20_heart_.png') {
                                                    hearAdd.src = 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/assets/img/icones/icon%20_heart_%20(1).png'
                                                }
                                            }
                                        })
                                    })
                                }

                                setTimeout(() => {
                                    feitoAddFavoritos = false
                                }, 300)
                            })
                    }
                }
            }
        })
    })
} construirNaTelaAsMusicas()