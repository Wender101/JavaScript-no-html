//? Vai buscar no treefy uma playlist chamada mind mellow
let playlist = []
let infPlaylistCompleta = []
let shuffledPlaylist
let playlistEmbaralhada

function musicasTreeFy() {
    var firebaseConfigTreeFy = {
        apiKey: "AIzaSyAf64jnLWXDgb8HziVAbqDyHS5xMuupgo4",
        authDomain: "treefy-3e5ae.firebaseapp.com",
        projectId: "treefy-3e5ae",
        storageBucket: "treefy-3e5ae.appspot.com",
        messagingSenderId: "444736184889",
        appId: "1:444736184889:web:9e07e1a665a52b8230a3e8"
    }
    
    //? My code
    var otherFirebaseApp = firebase.initializeApp(firebaseConfigTreeFy, "other")
    const dbTreeFy = otherFirebaseApp.firestore()
    
    function pesquisarPlaylist(pesquisa) {
        let pesquisaEncontrada = false

        return new Promise((resolve, reject) => {
            dbTreeFy.collection('Usuarios').onSnapshot((data) => {
                data.docs.map(function(valor) {
                    let Usuarios = valor.data()
                    
                    if(pesquisaEncontrada == false) {
                        try {
                            for(let a = 0; a < Usuarios.Musica.Playlist.length; a++) {
                                pesquisa = pesquisa.toLocaleLowerCase()
                                pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                                
                                let NomePlaylist = Usuarios.Musica.Playlist[a].NomePlaylist.toLocaleLowerCase()
                                NomePlaylist = NomePlaylist.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                                NomePlaylist = NomePlaylist.replace(/\s/g, '') //? Vai remover os espaços
                                
                                if(NomePlaylist.includes(pesquisa) || pesquisa.includes(NomePlaylist)) {
                                    pesquisaEncontrada = true
    
                                    for (let c = 0; c < Usuarios.Musica.Playlist[a].Musicas.length; c++) {
                                        //playlist.push(Usuarios.Musica.Playlist[a].Musicas[c].LinkAudio)
                                        infPlaylistCompleta = Usuarios.Musica.Playlist[a].Musicas

                                        if(c + 1 >= Usuarios.Musica.Playlist[a].Musicas.length) {
                                            resolve()
                                        }
                                    }
                                }
                            }
                        } catch{}
                    }
                })
            })
        })
    } pesquisarPlaylist('Mind Mellow').then(() => {
        function shuffleArray(array) {
            var currentIndex = array.length
            var temporaryValue, randomIndex
          
            // Enquanto ainda há elementos para embaralhar
            while (currentIndex !== 0) {
              // Seleciona um elemento restante
              randomIndex = Math.floor(Math.random() * currentIndex)
              currentIndex--
          
              // Troca com o elemento atual
              temporaryValue = array[currentIndex]
              array[currentIndex] = array[randomIndex]
              array[randomIndex] = temporaryValue
            }
          
            return array
          }

        playlistEmbaralhada = shuffleArray(infPlaylistCompleta)

        for (let c = 0; c < playlistEmbaralhada.length; c++) {
            playlist.push(playlistEmbaralhada[c].LinkAudio)

            if(c + 1 >= playlistEmbaralhada.length) {
                
                var currentTrack = 0
                var audio = new Audio()

                audio.addEventListener('ended', playNextRandomTrack)
                shuffledPlaylist = playlist
                function playNextRandomTrack() {
                    if (currentTrack < shuffledPlaylist.length) {
                        currentTrack++
                        audio.src = shuffledPlaylist[currentTrack]
                        audio.play()
                
                        try {
                            document.querySelector('#musicaTocandoAgr').style.display = 'flex'
                            document.querySelector('#imgMusica').src = playlistEmbaralhada[currentTrack].LinkImgiMusica
                            document.querySelector('#nomeMusica').innerHTML = playlistEmbaralhada[currentTrack].NomeMusica
                            document.querySelector('#nomeAutor').innerHTML = playlistEmbaralhada[currentTrack].NomeAutor
                        } catch{}
                
                        //! Vai passar a música ou voltar usando os btns do teclado
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: playlistEmbaralhada[currentTrack].NomeMusica,
                            artist: playlistEmbaralhada[currentTrack].NomeAutor,
                            album: '...',
                            artwork: [
                                { 
                                    src: playlistEmbaralhada[currentTrack].LinkImgiMusica, 
                                    sizes: '300x300', 
                                    type: 'image/png', 
                                    purpose: 'cover', 
                                    style: 'object-fit: cover'
                                }
                            ]
                        })
                
                        navigator.mediaSession.setActionHandler('nexttrack', function() {
                            currentTrack++
                            playNextRandomTrack()
                        })
                
                        navigator.mediaSession.setActionHandler('previoustrack', function() {
                            currentTrack--
                            playNextRandomTrack()
                        })
                
                    } else {
                        currentTrack = 0
                    }
                }

                let tocando = false
                document.addEventListener('click', () => {
                    if(tocando == false ) {
                        tocando = true
                        playNextRandomTrack()
                    }
                })
            }
        }
    })
} musicasTreeFy()