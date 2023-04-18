let textLetra = document.querySelector('#textLetra')
textLetra.spellcheck = false //? Vai impedir que o navegador acuse erros ortograficos.

let nextLetras = document.querySelector('#nextLetras')
textLetra.addEventListener('input', () => {
    if(textLetra.value.length > 0) {
        nextLetras.style.display = 'block'
    } else {
        nextLetras.style.display = 'none'
    }
})

let configTimeLetra =  document.querySelector('#configTimeLetra')
let addLetra = document.querySelector('#addLetra')
let marcarLetra = document.querySelector('#marcarLetra')

nextLetras.addEventListener('click', () => {
    addLetra.style.display = 'none'
    configTimeLetra.style.display = 'block'
    configTimeLetra.querySelector('pre').innerText = textLetra.value
    document.querySelector('#localBtnsLetra').style.display = 'flex'
    document.querySelector('#pagCriarLetra').style.overflow = 'auto'
})

//? Vai marcar o time
let contador = 0
// let arrayTime = [1, 6, 8, 12, 15, 19, 21, 25, 27, 30, 34, 37, 42, 45, 48, 52, 54, 56, 61, 65, 75, 79, 82, 86, 88, 91, 95, 98, 101, 103, 105, 108, 115, 118, 121, 125, 127, 131, 134, 141, 147, 167, 170, 174, 177, 182, 185, 188, 192, 194, 197, 201, 205, 209, 212, 218, 221]
// let arrayTime = [2, 6, 8, 13, 15, 19, 22, 26, 27, 31, 34, 37, 42, 45, 48, 52, 54, 57, 61, 65, 75, 79, 82, 85, 88, 92, 95, 98, 101, 104, 107, 110, 115, 118, 121, 125, 127, 130, 134, 138, 147, 168, 170, 174, 177, 182, 185, 188, 192, 194, 197, 201, 205, 209, 212, 216, 221]
let arrayTime = []

let secMarcar = 0
let enviarLetra = document.querySelector('#enviarLetra')
marcarLetra.addEventListener('click', () => {
    if(marcarLetra.innerText == 'Começar') {
        darPlayNaMusica(musicaSelecionadaLetra)
        marcarLetra.innerText = 'Marcar'
        setTimeout(() => {
            document.querySelector('#menuTocandoMusica').style.bottom = '-100vh'
            document.querySelector('nav').style.height = '100vh'
        }, 200)

        setInterval(() => {
            if(marcarLetra.innerText == 'Marcar') {
                secMarcar++
            }
        }, 1000)

    } else if(marcarLetra.innerText == 'Marcar') {
        newLine(contador)
        arrayTime.push(secMarcar)

        contador++
    } else if(marcarLetra.innerText == 'Ver') {
        verLetra()
        enviarLetra.style.display = 'block'
    }
})

function newLine(num) {
    let meuTexto = document.getElementById("perLetra")
    let linhas = meuTexto.innerText.split("\n") // divide o texto em linhas
    let linhaSelecionada = linhas[num] // seleciona a quinta linha (índice 4)
    linhas[num] = "<span class='letraFocus'>" + linhaSelecionada + "</span>" // envolve a quinta linha em um span com cor vermelha
    meuTexto.innerHTML = linhas.join("\n") // junta as linhas novamente em um único texto com quebras de linha

    if(arrayTime.length + 1 >= linhas.length) {
        marcarLetra.innerText = 'Ver'
        enviarLetra.style.display = 'block'
    }
} //newLine(0)

function verLetra() {
    darPlayNaMusica(musicaSelecionadaLetra)
    setTimeout(() => {
        document.querySelector('#menuTocandoMusica').style.bottom = '-100vh'
        document.querySelector('nav').style.height = '100vh'
    }, 200)
    let secondsTocar = 0
    let contador = 0
    newLine(contador)
    setInterval(() => {
        if(contador < arrayTime.length) {
            console.log(secondsTocar, arrayTime[contador])
            if(secondsTocar + 1 == arrayTime[contador]) {
                newLine(contador)
                contador++
            }
            secondsTocar++
        } else {
            let playBtn = document.getElementById('play')
            audio.pause()
            estadoMusica = 'pause'
            playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
        }
    }, 1000)
}

let zerarMarcacao = document.querySelector('#zerarMarcacao')

zerarMarcacao.addEventListener('click', () => {
    let playBtn = document.getElementById('play')
    audio.pause()
    estadoMusica = 'pause'
    playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
    arrayTime = []
    marcarLetra.innerText = 'Começar'
    secMarcar = 0
    contador = 0
    newLine(-1)
})

enviarLetra.addEventListener('click', () => {
    let feito = false
    if(marcarLetra.innerText == 'Ver') {
        console.log(musicaSelecionadaLetra);

        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Usuarios = valor.data()
    
                if(Usuarios.infUser.Email == email) {
                    for(let c = 0; c < Usuarios.Musica.MusicasPostadas.length; c++) {
                        if(Usuarios.Musica.MusicasPostadas[c].LinkAudio == musicaSelecionadaLetra.LinkAudio && Usuarios.Musica.MusicasPostadas[c].LinkImgiMusica == musicaSelecionadaLetra.LinkImgiMusica && Usuarios.Musica.MusicasPostadas[c].NomeMusica == musicaSelecionadaLetra.NomeMusica && feito == false) {
                            feito = true
                            let musicasPostadas = Usuarios.Musica
                            musicasPostadas.MusicasPostadas[c].LetraMusica = {
                                Letra: document.getElementById("perLetra").innerText,
                                Time: arrayTime
                            }
                            db.collection('Usuarios').doc(valor.id).update({Musica: musicasPostadas})
                            let playBtn = document.getElementById('play')
                            audio.pause()
                            estadoMusica = 'pause'
                            playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
                            marcarLetra.innerText = 'Começar'
                            secMarcar = 0
                            contador = 0
                            newLine(-1)
                        }
                    }
                }
            })
        })

        let feito2 = false
        let feito3 = false
        db.collection('TodasAsMusicas').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let TodasAsMusicas = valor.data()
                if(feito2 == false) {
                    feito2 = true
                    for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                        if(TodasAsMusicas.Musicas[c].LinkAudio == musicaSelecionadaLetra.LinkAudio && TodasAsMusicas.Musicas[c].LinkImgiMusica == musicaSelecionadaLetra.LinkImgiMusica && TodasAsMusicas.Musicas[c].NomeMusica == musicaSelecionadaLetra.NomeMusica && TodasAsMusicas.Musicas[c].EmailUser == email && feito3 == false) {
                            feito3 = true
                            let arrayTodasAsMusicas = TodasAsMusicas.Musicas
                            arrayTodasAsMusicas[c].LetraMusica = {
                                Letra: document.getElementById("perLetra").innerText,
                                Time: arrayTime
                            }
                            db.collection('TodasAsMusicas').doc(valor.id).update({Musicas: arrayTodasAsMusicas})
                            let playBtn = document.getElementById('play')
                            audio.pause()
                            estadoMusica = 'pause'
                            playBtn.style.backgroundImage = 'url(assets/img/icones/play.png)'
                            setTimeout(() => {
                                arrayTime = []
                                document.querySelector('#pagCriarLetra').style.display = 'none'
                            }, 3000)
                            marcarLetra.innerText = 'Começar'
                            secMarcar = 0
                            contador = 0
                            newLine(-1)
                        }
                    }
                }
            })
        })
    }
})

//! Vai abrir a letra da música
let btnLetras = document.querySelector('#btnLetras')
btnLetras.addEventListener('click', () => {
    if(document.querySelector('#pagLetraDaMusica').style.display == 'block') {
        document.querySelector('#pagLetraDaMusica').style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    } else {
        fecharAbas()
        document.querySelector('#pagLetraDaMusica').style.display = 'block'
        document.querySelector('body').style.overflow = 'hidden'
    }
})