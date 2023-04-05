let inputNomeDaMusica = document.querySelector('#inputNomeDaMusica')
let inputAutorDaMusica = document.querySelector('#inputAutorDaMusica')
let inputTipoDaMusica = document.querySelector('#inputTipoDaMusica')
let inputPublicaPrivada = document.querySelector('#inputPublicaPrivada')
let uploadMusica = document.querySelector('#uploadMusica')
let uploadImg = document.querySelector('#uploadImg')
let btnPostar = document.querySelector('#postar')

let cloneMusicasSequencia = []
let musicaAtualFavoritada = false //? Vai controlar se a música foi favoritada ou n

//? Vai fechar a aba de add musica e limpar todos os inputs
document.querySelector('#AddMusicaBtn').addEventListener('click', () => {
    if(fecharAbas()) {
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
    }
})

document.querySelector('#btnFecharAddMusic').addEventListener('click', () => {
    if(fecharAbas()) {
        let pagAddMusicas = document.querySelector('#pagAddMusicas')
        pagAddMusicas.style.display = 'none'
        inputNomeDaMusica.value = ''
        inputAutorDaMusica.value = ''
        inputTipoDaMusica.value = ''
        inputPublicaPrivada.checked  = false
        document.querySelector('body').style.overflow = 'auto'
    }
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
function criarRecentes(lista) {
    let Recente = document.querySelector('#Recente').querySelector('article')
    document.querySelector('#Recente').style.display = 'block'
    Recente.innerHTML = ''

    //? Vai escrever a lista de tras para frente deixando o audio mais recente em primeiro
    let contador = 0

    for(let c = lista.length; c > 0 ; c--) {

        //? Vai adicionar um tamanho proporcional a quantidade de elementos
        contador++
        Recente.style.width = `${(137 * contador)}px`
        
        let musicaRecente = document.createElement('div')
        let img = document.createElement('img')
        
        musicaRecente.className = 'musicaRecente'
        img.src = lista[c - 1].LinkImgiMusica
        
        musicaRecente.appendChild(img)
        Recente.appendChild(musicaRecente)

        musicaRecente.addEventListener('click', () => {
            darPlayNaMusica(lista[c - 1])
        })
    }

}

//! Vai pegar as músicas do banco de dados
let musicasNaTela = false
let numSelecionado = ''
let MusicasFavoritasLista = [] //? Vai armazenar sua músicas favoritas
let idLocalUser = ''
let numeroMusicasSorteadas = []
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
            
            let maxMusicasMaisOuvidas = 8 //? Vai limitar a quantidade de musica na parte mais tocadas
            
            if(TodasAsMusicas.Musicas.length <= maxMusicasMaisOuvidas) {
                maxMusicasMaisOuvidas = TodasAsMusicas.Musicas.length
            }

            for(let c = 0; c < maxMusicasMaisOuvidas; c++) {
                function sortearMusica() {
                    let numMusicaAleatoria = Math.floor(Math.random() * (TodasAsMusicas.Musicas.length - 1))
                    let jaTemEsteNumero = false

                    if(numeroMusicasSorteadas.length == 0) {
                        numeroMusicasSorteadas.push(numMusicaAleatoria)

                    } else {

                        for(let b = 0; b < numeroMusicasSorteadas.length; b++) {
                            if(numeroMusicasSorteadas[b] == numMusicaAleatoria) {
                                jaTemEsteNumero = true
                            }

                        }

                        setTimeout(() => {
                            if(jaTemEsteNumero == true) {
                                sortearMusica()
                            } else {
                                numeroMusicasSorteadas.push(numMusicaAleatoria)
                            }
                        }, 100)
                    }

                    let musicaMaisTocada = document.createElement('div')
                    let localImgMaisTocada = document.createElement('div')
                    let img = document.createElement('img')
                    let nomeMusicaMaisTocada = document.createElement('h3')
                    let nomeAutorMaisTocada = document.createElement('p')

                    musicaMaisTocada.className = 'musicaMaisTocada'
                    localImgMaisTocada.className = 'localImgMaisTocada'
                    nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                    nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'

                    img.src = TodasAsMusicas.Musicas[numMusicaAleatoria].LinkImgiMusica
                    nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[numMusicaAleatoria].NomeMusica
                    nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[numMusicaAleatoria].NomeAutor

                    localImgMaisTocada.appendChild(img)
                    musicaMaisTocada.appendChild(localImgMaisTocada)
                    musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                    musicaMaisTocada.appendChild(nomeAutorMaisTocada)

                    MaisTocadas.appendChild(musicaMaisTocada)

                    //! Funções de click
                    //? Ao clicar em favoritar música
                    
                    //? Vai tocar a música selecionada
                    musicaMaisTocada.addEventListener('click', () => {
                        numSelecionado = numMusicaAleatoria

                        cloneMusicasSequencia = []
                        darPlayNaMusica(TodasAsMusicas.Musicas[numMusicaAleatoria])
                    })
                } sortearMusica()
            }
        })
    })
} CriarMusicasNaTela()

//! Variaveis do time
let tempoSegundosPassou = 0 //? Vai contar os segundos que a música esta passando
let tempoSeconds = 0
let tempoMin = 0
let tempoMax = 0
let duracao = 0
let acumulartime = 0
let valorAumentarDoInput = 0
let data = new Date(null)
let audio = document.querySelector('#audioMusica')
let inputTime = document.querySelector('#timeMusica')

//! Ao mudar o valor do inputTime
inputTime.addEventListener('change', () => {
    let a = 100 / tempoMax
    let b = inputTime.value
    tempoSegundosPassou = b
})

//! Vai informar o time na tela
let valtarFeito = false
let checkProximaClonePerfil = false
let checkBack = false
let numMusicaSequencia = 0
function atualizarTimeMusica(estado = 'play', arrayDeMusica = []) {
    if(tempoSegundosPassou < tempoMax && estado == 'play' || tempoSegundosPassou < tempoMax && estado == 'loop') {
        tempoSegundosPassou++
        tempoSeconds++

        if(tempoSeconds == 60) {
            tempoSeconds = 0
            tempoMin++
        }


        //? Vai marcar o tmp que passou
        let tempoContando = document.querySelector('#tempoContando')

        if(tempoSeconds < 10 && tempoMin < 10) {
            tempoContando.innerText = `0${tempoMin}:0${tempoSeconds}`

        } else if(tempoSeconds >= 10 && tempoMin < 10) {
            tempoContando.innerText = `0${tempoMin}:${tempoSeconds}`

        } else if(tempoSeconds < 10 && tempoMin >= 10) {
            tempoContando.innerText = `${tempoMin}:0${tempoSeconds}`

        } else {
            tempoContando.innerText = `${tempoMin}:${tempoSeconds}`
        }

        //? Vai aumetar o input ao passar o tmp
        valorAumentarDoInput = 100 / tempoMax
        acumulartime = acumulartime + valorAumentarDoInput
        inputTime.value = acumulartime

    } else if(estado == 'zerar') {
        tempoSegundosPassou = 0
        tempoSeconds = 0
        tempoMin = 0
        duracao = 0
        tempoMax = 0
        tempoContando.innerText = `0${tempoMin}:0${tempoSeconds}`
        inputTime.value = 0
        acumulartime = 0

    } else if(tempoSegundosPassou >= tempoMax && tempoMax > 0 || estado == 'next') {
        atualizarTimeMusica('zerar', cloneMusicasSequencia)
        if(valtarFeito == false && arrayDeMusica.length == 0 && estado != 'loop') {
            valtarFeito = true
            db.collection('TodasAsMusicas').onSnapshot((data) => {
                data.docs.map(function(valor) {
                    let TodasAsMusicas = valor.data()
                    
                    // if(numSelecionado < TodasAsMusicas.Musicas.length - 1) {
                    //     numSelecionado = numSelecionado + 1
                    //     if(TodasAsMusicas.Musicas[numSelecionado]) {
                    //         darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                    //     }
                    // } else {
                    //     numSelecionado = 0
                    //     darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                    // }

                    if(numSelecionado > 0) {
                        numSelecionado = numSelecionado - 1
                        if(TodasAsMusicas.Musicas[numSelecionado]) {
                            darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                        }
                    } else {
                        numSelecionado = TodasAsMusicas.Musicas.length - 1
                        darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                    }
    
                })
            })

            setTimeout(() => {
                valtarFeito = false
            }, 100)

        } else if(arrayDeMusica.length > 0 && checkProximaClonePerfil == false && estado != 'loop') {
            checkProximaClonePerfil = true
            setTimeout(() => {
                checkProximaClonePerfil = false
            }, 100)
            atualizarTimeMusica('zerar', cloneMusicasSequencia)
            
            // if(numMusicaSequencia < arrayDeMusica.length - 1) {
            //     numMusicaSequencia += 1
            //     darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            // } else {
            //     numMusicaSequencia = 0
            //     darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            // }

            if(numMusicaSequencia > 0) {
                numMusicaSequencia -=1
                darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            } else {
                numMusicaSequencia = arrayDeMusica.length - 1
                darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            }
        } else if(estado == 'loop') {
            audio.currentTime = 0
        }

        //! Vai voltar a musica ---------------------------------------
    } else if(estado == 'back') {
        if(arrayDeMusica.length == 0) {
            if(tempoSegundosPassou > 10 && tempoMax > 0) {
                audio.currentTime = 0
                atualizarTimeMusica('zerar', cloneMusicasSequencia)
                
                setTimeout(() => {
                    atualizarTimeMusica('play', cloneMusicasSequencia)
                }, 100)
    
            } else if(tempoSegundosPassou <= 10 && tempoMax > 0) {
                atualizarTimeMusica('zerar', cloneMusicasSequencia)
                db.collection('TodasAsMusicas').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let TodasAsMusicas = valor.data()
                        
                        // if(numSelecionado > 0) {
                        //     numSelecionado = parseInt(numSelecionado) - 1
                        //     darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                        // } else {
                        //     numSelecionado = TodasAsMusicas.Musicas.length - 1
                        //     darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                        // }

                        if(numSelecionado < TodasAsMusicas.Musicas.length - 1) {
                            numSelecionado = parseInt(numSelecionado) + 1
                            darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                        } else {
                            numSelecionado = 0
                            darPlayNaMusica(TodasAsMusicas.Musicas[numSelecionado])
                        }
                    })
                })
            }
        } else {
            atualizarTimeMusica('zerar', cloneMusicasSequencia)
                    
            if(numMusicaSequencia < arrayDeMusica.length - 1 && checkBack == false) {
                checkBack = true
                numMusicaSequencia = numMusicaSequencia + 1
                darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            } else if(checkBack == false){
                checkBack = true
                numMusicaSequencia = 0
                darPlayNaMusica(arrayDeMusica[numMusicaSequencia])
            }

            setTimeout(() => {
                checkBack = false
            }, 100)
        }
    }
}

//! Ficar marcando o time de segundo em segundo
let estadoMusica = 'zerar'
setInterval(() => {
    atualizarTimeMusica(estadoMusica, cloneMusicasSequencia)
}, 1000)

//? Vai dar play na música
let checarRepetidas = false
let pausadoMusica = false
function darPlayNaMusica(lista) {
    estadoMusica = 'play'

    tempoSegundosPassou = 0 //? Vai contar os segundos que a música esta passando
    tempoSeconds = 0
    tempoMin = 0
    tempoMax = 0
    duracao = 0

    let inputIimeMusica = document.querySelector('#timeMusica')
    let playBtn = document.getElementById('play')
    playBtn.style.backgroundImage = 'url(assets/img/icones/pause.png)'

    inputIimeMusica.value = 0

    //? Vai colocar as informações na tela
    document.querySelector('#imgMusicaTocandoAgora').src = lista.LinkImgiMusica
    document.querySelector('#nomeMusicaTocandoAgora').innerText = lista.NomeMusica
    document.querySelector('#autorMusicaTocandoAgora').innerText = lista.NomeAutor

    //? Vai colocar no sobre a música pra cell
    document.querySelector('#pagSobreMusicaImgMusica').src = lista.LinkImgiMusica
    document.querySelector('#nomeMusicaPagSobreMusica').innerText = lista.NomeMusica
    document.querySelector('#autorMusicaPagSobreMusica').innerText = lista.NomeAutor

    document.querySelector('#menuTocandoMusica').style.bottom = '0px'

    audio.src = lista.LinkAudio

    audio.addEventListener('canplaythrough', function() {
        audio.play()
        atualizarTimeMusica('zerar') //? Vai zerar o time
        document.querySelector('title').innerText = `Home - ${lista.NomeMusica}` //? Vai mudar o título da pág para o nome da música

        //! Vai marcar o tempo da música
        data = new Date(null)
        data.setSeconds(audio.duration)
        duracao = data.toISOString().substr(12, 8)           
        duracao = duracao.replace('0:', '')
        duracao = duracao.replace('.', '')             

        //? Vai caucular o temp max em segundos formadatos
        let tempoMax2 = `${duracao.replace(':', '')}`
        tempoMax = parseInt(tempoMax2.substr(1, 1))
        tempoMax = (60 * tempoMax) + parseInt(tempoMax2.substr(2, 2))
        document.querySelector('#tempoTotal').innerText =  duracao
        
        
        //! Vai controlar o volume da música
        let inputVolume = document.querySelector('#inputVolume')
        audio.volume = inputVolume.value / 100

        inputVolume.addEventListener('input', () => {
            audio.volume = inputVolume.value / 100
        })

        //! -------------------------------

        //! Pausar musica
        playBtn.addEventListener('click', () => {
            if(pausadoMusica == false) {
                pausadoMusica = true

                audio.pause()
                estadoMusica = 'pause'
                playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
                
            } else {
                pausadoMusica = false
                audio.play()
                estadoMusica = 'play'
                playBtn.style.backgroundImage = 'url(assets/img/icones/pause.png)'
            }
        })

        //! Vai passar a música
        let btnNext = document.querySelector('#next')
        btnNext.addEventListener('click', () => {
            atualizarTimeMusica('next', cloneMusicasSequencia)
        })


        //! Vai voltar a música
        let btnBack = document.querySelector('#back')
        btnBack.addEventListener('click', () => {
            atualizarTimeMusica('back', cloneMusicasSequencia)
        })

        //! Vai manter a música em loop
        let emLoop = false
        let loopbtn = document.querySelector('#repetir')
        loopbtn.addEventListener('click', () => {
            if(emLoop == false) {
                estadoMusica = 'loop'
                emLoop = true
                loopbtn.style.backgroundImage = "url('assets/img/icones/icon\ _repeat_ (2).png')"

            } else {
                estadoMusica = 'play'
                emLoop = false
                loopbtn.style.backgroundImage = "url('assets/img/icones/icon\ _repeat_.png')"
            }
        })

        //? ------------------------------------------------------
        db.collection('TodasAsMusicas').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let TodasAsMusicas = valor.data()

                //! Vai criar uma lista das músicas escutadas
                let listaCheckRecentes = listaMusicasRecentes //? Vai checar se há recentes repetidos

                let jaTemEssaMusica = false
                let addMusicaEmRecentes = false
                
                //? Vai checar se a música que está tocando já foi adicionada as músicas curtidas
                db.collection('Usuarios').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let Usuarios = valor.data()

                        
                        if(Usuarios.infUser.Email == email) {
                            idLocalUser = valor.id
                            MusicasFavoritasLista = Usuarios.Musica
                            let musicasFavoritas = Usuarios.Musica
                            let musicaEstaEmFavoritos = false

                            document.querySelector('#carregando2').style.display = 'none'

                            try {
                                for(let contadorFavoritas = 0; contadorFavoritas < Usuarios.Musica.MusicasCurtidas.length; contadorFavoritas++) {
                                    if(musicasFavoritas.MusicasCurtidas[contadorFavoritas].NomeMusica == lista.NomeMusica && musicasFavoritas.MusicasCurtidas[contadorFavoritas].NomeAutor == lista.NomeAutor && musicasFavoritas.MusicasCurtidas[contadorFavoritas].EmailUser == lista.EmailUser && musicasFavoritas.MusicasCurtidas[contadorFavoritas].LinkImgiMusica == lista.LinkImgiMusica && musicasFavoritas.MusicasCurtidas[contadorFavoritas].LinkAudio == lista.LinkAudio) {
                                        musicaEstaEmFavoritos = true
                                        hearAdd.src = 'assets/img/icones/icon _heart_.png'
                                    }
                                    
                                    setTimeout(() => {
                                        if(musicaEstaEmFavoritos == false) {
                                            hearAdd.src = 'assets/img/icones/icon _heart_ (1).png'
                                        }
                                    }, 200)
                                }
                            } catch{}
                        }
                    })
                })
                
                if(listaMusicasRecentes.length <= 0) {
                    let formaLista =  {
                        NomeMusica: lista.NomeMusica,
                        NomeAutor: lista.NomeAutor,
                        Tipo: lista.Tipo,
                        LinkAudio: lista.LinkAudio,
                        LinkImgiMusica: lista.LinkImgiMusica,
                        EmailUser: lista.EmailUser,
                        EstadoMusica: lista.EstadoMusica,
                    }

                    listaMusicasRecentes.push(formaLista)
                    criarRecentes(listaMusicasRecentes)

                } else if(listaMusicasRecentes.length > 0) {
                    for(let b = 0; b < listaMusicasRecentes.length; b++) {
                        if(listaMusicasRecentes.length == 9) {
                            listaMusicasRecentes.splice(0, 1)
                        }

                        if(listaCheckRecentes[b].LinkImgiMusica == lista.LinkImgiMusica && lista.NomeMusica) {
                            jaTemEssaMusica = true
                        }
                        setTimeout(() => {
                            if(jaTemEssaMusica == false && checarRepetidas == false) {
                                checarRepetidas = true
                                let formaLista =  {
                                    NomeMusica: lista.NomeMusica,
                                    NomeAutor: lista.NomeAutor,
                                    Tipo: lista.Tipo,
                                    LinkAudio: lista.LinkAudio,
                                    LinkImgiMusica: lista.LinkImgiMusica,
                                    EmailUser: lista.EmailUser,
                                    EstadoMusica: lista.EstadoMusica,
                                }
            
                                if(addMusicaEmRecentes == false) {
                                    addMusicaEmRecentes = true
                                    listaMusicasRecentes.push(formaLista)
                                    criarRecentes(listaMusicasRecentes)
                                }

                                setTimeout(() => {
                                    checarRepetidas = false
                                }, 100)
                            }
                        }, 100)
                    }
                }
            })
        })
    })
}

//! Vai fechar as páginas
let btnHome = document.querySelector('#HomeBtn')
btnHome.addEventListener('click', () => {
    fecharAbas()
})

function fecharAbas() {
    for(let c = 0; c < 11; c++) {
        try {
            document.getElementsByClassName('paginas')[c].style.display = 'none'
        } catch{}
    }
    playlistAdd = false
    document.querySelector('body').style.overflow = 'auto'
    return true
    ultimasPesquisas()
}


//! Vai salvar a música nos favoritos

// let hearAdd = document.querySelector('#hearAdd')
// let feitoAddFavoritos = false
// hearAdd.addEventListener('click', () => {
//     if(feitoAddFavoritos == false) {
//         let feito = false
//         feitoAddFavoritos = true
//         db.collection('TodasAsMusicas').onSnapshot((data) => {
//             data.docs.map(function(valor) {
//                 let TodasAsMusicas = valor.data()
    
//                 if(feito == false) {
//                     feito = true
//                     let feito2 = false
//                     if(hearAdd.src == 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_%20(1).png' && feito2 == false || hearAdd.src == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/assets/img/icones/icon%20_heart_%20(1).png' && feito2 == false) {
//                         favoritarMusica(TodasAsMusicas.Musicas[numSelecionado].NomeMusica, TodasAsMusicas.Musicas[numSelecionado].NomeAutor, TodasAsMusicas.Musicas[numSelecionado].Tipo, TodasAsMusicas.Musicas[numSelecionado].LinkAudio, TodasAsMusicas.Musicas[numSelecionado].LinkImgiMusica, TodasAsMusicas.Musicas[numSelecionado].EmailUser, TodasAsMusicas.Musicas[numSelecionado].EstadoMusica, 'Adicionar')
//                         feito2 = true
//                         hearAdd.src = 'assets/img/icones/icon _heart_.png'
    
//                     } else if(hearAdd.src == 'http://127.0.0.1:5500/assets/img/icones/icon%20_heart_.png' && feito2 == false && hearAdd.src == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/assets/img/icones/icon%20_heart_.png' && feito2 == false) {
//                         favoritarMusica(TodasAsMusicas.Musicas[numSelecionado].NomeMusica, TodasAsMusicas.Musicas[numSelecionado].NomeAutor, TodasAsMusicas.Musicas[numSelecionado].Tipo, TodasAsMusicas.Musicas[numSelecionado].LinkAudio, TodasAsMusicas.Musicas[numSelecionado].LinkImgiMusica, TodasAsMusicas.Musicas[numSelecionado].EmailUser, TodasAsMusicas.Musicas[numSelecionado].EstadoMusica, 'Remover')
//                         feito2 = true
//                         hearAdd.src = 'assets/img/icones/icon _heart_ (1).png'
//                     }
//                 }
//             })
//         })
//     }

//     setTimeout(() => {
//         feitoAddFavoritos = false
//     }, 300)
// })

// function favoritarMusica(NomeMusica, NomeAutor, Tipo, LinkAudio, LinkImgiMusica, EmailUser, EstadoMusica, oQfazerComAmusica) {
//     if(oQfazerComAmusica == 'Adicionar') {
//         let formaFavoritos =  {
//             NomeMusica,
//             NomeAutor,
//             Tipo,
//             LinkAudio,
//             LinkImgiMusica,
//             EmailUser,
//             EstadoMusica,
//         }

//         MusicasFavoritasLista.MusicasCurtidas.push(formaFavoritos)
//         db.collection('Usuarios').doc(idLocalUser).update({Musica: MusicasFavoritasLista})

//     } else {
//         for(let contador = 0; contador < MusicasFavoritasLista.MusicasCurtidas.length; contador++) {
//             if(MusicasFavoritasLista.MusicasCurtidas[contador].NomeMusica == NomeMusica && MusicasFavoritasLista.MusicasCurtidas[contador].NomeAutor == NomeAutor && MusicasFavoritasLista.MusicasCurtidas[contador].EmailUser == EmailUser && MusicasFavoritasLista.MusicasCurtidas[contador].LinkImgiMusica == LinkImgiMusica && MusicasFavoritasLista.MusicasCurtidas[contador].LinkAudio == LinkAudio) {
//                 MusicasFavoritasLista.MusicasCurtidas.splice(contador, 1)
//                 db.collection('Usuarios').doc(idLocalUser).update({Musica: MusicasFavoritasLista})
//             }
//         }
//     }
// }

//? Vai abrir a página de editar as playlists
let numMusicasSelecionadas =  []
let numPlaylistEditada
let estadoPlaylist = 'criando'
document.querySelector('#EditarPlaylistsBtn').addEventListener('click', () => {
    estadoPlaylist = 'editando'
    document.querySelector('body').style.overflow = 'hidden'
    document.querySelector('#pagEditarPlaylist').querySelector('article').innerHTML = ''
    
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()
            
            if(Usuarios.infUser.Email == email) {
                document.querySelector('#pagEditarPlaylist').style.display = 'block'

                for(let a = 0; a < Usuarios.Musica.Playlist.length; a++) {
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

                    document.querySelector('#pagEditarPlaylist').querySelector('article').appendChild(musicaMaisTocada)
                    
                    musicaMaisTocada.addEventListener('click', () => {
                        numPlaylistEditada = a
                        document.querySelector('#nomeDaPlaylist').value = Usuarios.Musica.Playlist[a].NomePlaylist
                        let localMusicasUserPagPessoal = document.querySelector('#localMusicasUserPagPessoal')
                        localImgMaisTocada.innerHTML = ''
                        numMusicasSelecionadas = []
                        musicasNovaPlaylist = []
                        functionPlaylist()
                       
                        for(let b = 0; b < Usuarios.Musica.Playlist[a].Musicas.length; b++) {

                            db.collection('TodasAsMusicas').onSnapshot((data) => {
                                data.docs.map(function(valor) {
                                    let TodasAsMusicas = valor.data()

                                    for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                                        if(TodasAsMusicas.Musicas[c].LinkImgiMusica == Usuarios.Musica.Playlist[a].Musicas[b].LinkImgiMusica && TodasAsMusicas.Musicas[c].LinkAudio == Usuarios.Musica.Playlist[a].Musicas[b].LinkAudio && TodasAsMusicas.Musicas[c].Nome == Usuarios.Musica.Playlist[a].Musicas[b].Nome) {
                                            document.querySelector('#pagEditarPlaylist').style.display = 'none'
                                            //numMusicasSelecionadas.push(TodasAsMusicas.Musicas[c])

                                            //! ------------
                                            function criarMusicasDaPlaylistEdita(musica, contador) {
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
                                            } criarMusicasDaPlaylistEdita(TodasAsMusicas.Musicas[c], c)
                                        }
                                    }
                                })
                            })
                        }
                    })
                }
            }
        })
    })
})