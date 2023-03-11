let inputNomeDaMusica = document.querySelector('#inputNomeDaMusica')
let inputAutorDaMusica = document.querySelector('#inputAutorDaMusica')
let inputTipoDaMusica = document.querySelector('#inputTipoDaMusica')
let inputPublicaPrivada = document.querySelector('#inputPublicaPrivada')
let uploadMusica = document.querySelector('#uploadMusica')
let uploadImg = document.querySelector('#uploadImg')
let btnPostar = document.querySelector('#postar')

//? Vai fechar a aba de add musica e limpar todos os inputs
document.querySelector('#AddMusicaBtn').addEventListener('click', () => {
    let pagAddMusicas = document.querySelector('#pagAddMusicas')

    if(pagAddMusicas.style.display == 'block') {
        pagAddMusicas.style.display = 'none'
        inputNomeDaMusica.value = ''
        inputAutorDaMusica.value = ''
        inputTipoDaMusica.value = ''
        inputPublicaPrivada.checked  = false
        document.querySelector('body').style.overflow = 'auto'
    } else {
        document.querySelector('body').style.overflow = 'hidden'
        pagAddMusicas.style.display = 'block'
    }
})

document.querySelector('#btnFecharAddMusic').addEventListener('click', () => {
    let pagAddMusicas = document.querySelector('#pagAddMusicas')
    pagAddMusicas.style.display = 'none'
    inputNomeDaMusica.value = ''
    inputAutorDaMusica.value = ''
    inputTipoDaMusica.value = ''
    inputPublicaPrivada.checked  = false
    document.querySelector('body').style.overflow = 'auto'
})

//? Vai adicioar a música
inputNomeDaMusica.addEventListener('change', () => {checarBtnPostar()})
inputAutorDaMusica.addEventListener('change', () => {checarBtnPostar()})
inputTipoDaMusica.addEventListener('change', () => {checarBtnPostar()})
inputPublicaPrivada.addEventListener('change', () => {checarBtnPostar()})

let arquivoAudio
uploadMusica.addEventListener('change', (eventAudio) => {
    arquivoAudio = eventAudio.target.files[0]
    checarBtnPostar()
})

let arquivoImg
uploadImg.addEventListener('change', (eventImg) => {
    arquivoImg = eventImg.target.files[0]
    checarBtnPostar()
})

let prontoParaPostar = false
function checarBtnPostar() {
    if(inputNomeDaMusica.value != '' &&  inputAutorDaMusica.value != '' &&  inputTipoDaMusica.value != '' &&  uploadMusica.value != '' &&  uploadImg.value != '') {
        btnPostar.style.background = '#0DCBA9'
        prontoParaPostar = true

    } else {
        btnPostar.style.background = '#636363'
        prontoParaPostar = false

    }
}

//? Ao clicar em postar música
btnPostar.addEventListener('click', () => {
    let jaFoiPostado = false
    let jaFoiPostadoEmTodasAsMusicas = false
    if(prontoParaPostar == true) {
        document.querySelector('#carregando').style.display = 'flex'

        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let DadosDB = valor.data()

                if(jaFoiPostado == false) {
                    let LinkAudio = ''
                    let LinkImgiMusica = ''

                    try {
                        if(DadosDB.infUser.Email == email) {
                            let contagemEtapas = 0

                            try {
                                var uploadTask = storage.ref().child(arquivoAudio.name).child(arquivoAudio.name).put(arquivoAudio)
                                uploadTask.on(arquivoAudio.name, 
                                (snapshot) => {}, 
                                (error) => {}, 
                                () => {
                                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                        LinkAudio = downloadURL
                                        contagemEtapas++
                                        
                                        try {
                                            var uploadTask2 = storage.ref().child(arquivoAudio.name).child(arquivoImg.name).put(arquivoImg)
                                            uploadTask2.on(arquivoImg.name, 
                                            (snapshot) => {}, 
                                            (error) => {}, 
                                            () => {
                                                uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL2) => {
                                                    LinkImgiMusica = downloadURL2
                                                    contagemEtapas++
                                                    postarMusica() 
                                                })
                                            })
                                        } catch (error) {}
                                    })
                                })
                            } catch (error) {}

                            //! ----------------------------------------------
                            function postarMusica() {
                                if(contagemEtapas >= 2) {
                                    jaFoiPostado = true
                                    const musica = DadosDB.Musica

                                    //? Vai checar se a musica é privado ou n
                                    let estadoDaMusica
                                    if(inputPublicaPrivada.checked == false) {
                                        estadoDaMusica = 'Pública'
                                    } else {
                                        estadoDaMusica = 'Privada'
                                    }

                                    const newSong = {
                                        NomeMusica: inputNomeDaMusica.value,
                                        NomeAutor: inputAutorDaMusica.value,
                                        Tipo: inputTipoDaMusica.value,
                                        LinkAudio,
                                        LinkImgiMusica,
                                        EmailUser: email,
                                        EstadoMusica: estadoDaMusica,
                                    }

                                    musica.MusicasPostadas.push(newSong)

                                    db.collection('Usuarios').doc(valor.id).update({Musica: musica})

                                    db.collection('TodasAsMusicas').onSnapshot((data) => {
                                        data.docs.map(function(valor) {
                                            let TodasAsMusicas = valor.data()

                                            if(jaFoiPostadoEmTodasAsMusicas == false) {
                                                jaFoiPostadoEmTodasAsMusicas = true

                                                let cloneTodasAsMusicas = TodasAsMusicas.Musicas
                                                cloneTodasAsMusicas.push(newSong)

                                                db.collection('TodasAsMusicas').doc('yf5i9K9e4CfuzAaHAijM').update({Musicas: cloneTodasAsMusicas})
                                            }

                                        })
                                    })
                                    
                                    //? Vai limpar os inputs e fechar a aba add
                                    pagAddMusicas.style.display = 'none'
                                    inputNomeDaMusica.value = ''
                                    inputAutorDaMusica.value = ''
                                    inputTipoDaMusica.value = ''
                                    inputPublicaPrivada.checked  = false
                                    document.querySelector('#carregando').style.display = 'none'
                                    document.querySelector('body').style.overflow = 'auto'
                                }

                            }
                        }
                    } catch{}
                }
            })
        })
    }
})

let listaMusicasRecentes = [] //! Listas das musicas recentes

//! Vai criar as músicas recentes
let JatemRecente = false
function criarRecentes(lista) {
    let Recente = document.querySelector('#Recente').querySelector('article')
    Recente.innerHTML = ''

    for(let c = 0; c < lista.length; c++) {
        
        let musicaRecente = document.createElement('div')
        let img = document.createElement('img')
        
        musicaRecente.className = 'musicaRecente'
        img.src = lista[c].LinkImgiMusica
        
        musicaRecente.appendChild(img)
        Recente.appendChild(musicaRecente)

        musicaRecente.addEventListener('click', () => {
            darPlayNaMusica(lista[c])
        })
    }

}

//! Vai pegar as músicas do banco de dados
let musicasNaTela = false
function CriarMusicasNaTela() {
    let MaisTocadas = document.querySelector('#MaisTocadas').querySelector('article')
    MaisTocadas.innerHTML = ''

    db.collection('TodasAsMusicas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let TodasAsMusicas = valor.data()

            if(musicasNaTela == true) {
                MaisTocadas.innerHTML = ''
                musicasNaTela = false
            }

            setTimeout(() => {
                musicasNaTela = true
            }, 2000)

            for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {

                let musicaMaisTocada = document.createElement('div')
                let localImgMaisTocada = document.createElement('div')
                let img = document.createElement('img')
                let nomeMusicaMaisTocada = document.createElement('h3')
                let nomeAutorMaisTocada = document.createElement('p')

                musicaMaisTocada.className = 'musicaMaisTocada'
                localImgMaisTocada.className = 'localImgMaisTocada'
                nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'

                img.src = TodasAsMusicas.Musicas[c].LinkImgiMusica
                nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[c].NomeMusica
                nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[c].NomeAutor

                localImgMaisTocada.appendChild(img)
                musicaMaisTocada.appendChild(localImgMaisTocada)
                musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                musicaMaisTocada.appendChild(nomeAutorMaisTocada)

                MaisTocadas.appendChild(musicaMaisTocada)

                //! Funções de click
                
                //? Vai tocar a música selecionada
                musicaMaisTocada.addEventListener('click', () => {
                    //! Vai criar uma lista das músicas escutadas
                    let listaCheckRecentes = listaMusicasRecentes //? Vai checar se há recentes repetidos

                    let jaTemEssaMusica = false
                    let addMusicaEmRecentes = false
                    
                    if(listaMusicasRecentes.length <= 0) {
                        let formaLista =  {
                            NomeMusica: TodasAsMusicas.Musicas[c].NomeMusica,
                            NomeAutor: TodasAsMusicas.Musicas[c].NomeAutor,
                            Tipo: TodasAsMusicas.Musicas[c].Tipo,
                            LinkAudio: TodasAsMusicas.Musicas[c].LinkAudio,
                            LinkImgiMusica: TodasAsMusicas.Musicas[c].LinkImgiMusica,
                            EmailUser: TodasAsMusicas.Musicas[c].EmailUser,
                            EstadoMusica: TodasAsMusicas.Musicas[c].EstadoMusica,
                        }
    
                        listaMusicasRecentes.push(formaLista)
                        criarRecentes(listaMusicasRecentes)

                    } else if(listaMusicasRecentes.length > 0) {
                        for(let b = 0; b < listaMusicasRecentes.length; b++) {
                            if(listaCheckRecentes[b].LinkImgiMusica == TodasAsMusicas.Musicas[c].LinkImgiMusica && TodasAsMusicas.Musicas[c].NomeMusica) {
                                jaTemEssaMusica = true
                            }
    
                            setTimeout(() => {
                                if(jaTemEssaMusica == false) {
                                    let formaLista =  {
                                        NomeMusica: TodasAsMusicas.Musicas[c].NomeMusica,
                                        NomeAutor: TodasAsMusicas.Musicas[c].NomeAutor,
                                        Tipo: TodasAsMusicas.Musicas[c].Tipo,
                                        LinkAudio: TodasAsMusicas.Musicas[c].LinkAudio,
                                        LinkImgiMusica: TodasAsMusicas.Musicas[c].LinkImgiMusica,
                                        EmailUser: TodasAsMusicas.Musicas[c].EmailUser,
                                        EstadoMusica: TodasAsMusicas.Musicas[c].EstadoMusica,
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

                    darPlayNaMusica(TodasAsMusicas.Musicas[c])
                })
            }
        })
    })
} CriarMusicasNaTela()

//? Vai dar play na música
function darPlayNaMusica(lista) {
    let inputIimeMusica = document.querySelector('#timeMusica')
    let playBtn = document.getElementById('play')
    playBtn.style.backgroundImage = 'url(assets/img/icones/pause.png)'

    inputIimeMusica.value = 0

    //? Vai colocar as informações na tela
    document.querySelector('#imgMusicaTocandoAgora').src = lista.LinkImgiMusica
    document.querySelector('#nomeMusicaTocandoAgora').innerText = lista.NomeMusica
    document.querySelector('#autorMusicaTocandoAgora').innerText = lista.NomeAutor

    document.querySelector('#menuTocandoMusica').style.bottom = '0px'

    let audio = document.querySelector('#audioMusica')

    audio.src = lista.LinkAudio

    audio.addEventListener('canplaythrough', function() {
        audio.play()
        
        //? Vai informar a duração da música
        let data = new Date(null)
        data.setSeconds(audio.duration)
        let duracao = data.toISOString().substr(12, 8)           
        duracao = duracao.replace('0:', '')
        duracao = duracao.replace('.', '')             
        tempoMax = parseInt(duracao.replace(':', ''))
        
        document.querySelector('#tempoTotal').innerText =  duracao
        
        //! Vai controlar o volume da música
        let inputVolume = document.querySelector('#inputVolume')
        audio.volume = inputVolume.value / 100

        inputVolume.addEventListener('input', () => {
            audio.volume = inputVolume.value / 100
        })

        //! Pausar musica
        let pausado = false
        playBtn.addEventListener('click', () => {
            if(pausado == false) {
                pausado = true

                audio.pause()
                playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
                
            } else {
                pausado = false
                audio.play()
                playBtn.style.backgroundImage = 'url(assets/img/icones/pause.png)'
            }
        })

    let btnNext = document.querySelector('#next')
    let btnBack = document.querySelector('#back')
    })
}