let cartasEscolhidas = []
let podeJogar = true
let inputTentativas = document.querySelector('input')
inputTentativas.value = 0
let tentativas = 0
let acertos = 0

for(let c = 0; c < 12; c++) {
    let flipper = document.getElementsByClassName('flipper')[c]
    let imgPokemon = document.getElementsByClassName('back')[c].querySelector('img')

    flipper.addEventListener('click', () => {
        if(podeJogar == true) {
            let obj = {
                src: imgPokemon.src,
                contador: c,
            }
            cartasEscolhidas.push(obj)
            console.log(cartasEscolhidas);
            flipper.style.transform = 'rotateY(180deg)'
            
            if(cartasEscolhidas.length == 2) {
                podeJogar = false //? Vai impedir o jogador de jogar até as aminações acabarem
                
                tentativas++
                document.querySelector('#tentativas').innerText = `${tentativas}/17`

                let aumentandoOInput = 0
                setInterval(() => {
                    if(aumentandoOInput < 6) {
                        aumentandoOInput = aumentandoOInput + 1
                        inputTentativas.value = parseInt(inputTentativas.value) + 1.1
                    }
                }, 100)

                if(cartasEscolhidas[0].src != cartasEscolhidas[1].src) {
    
                    setTimeout(() => {
                        document.getElementsByClassName('flipper')[cartasEscolhidas[0].contador].style.transform = 'rotateY(0deg)'
                        document.getElementsByClassName('flipper')[cartasEscolhidas[1].contador].style.transform = 'rotateY(0deg)'
                        cartasEscolhidas = []
                        podeJogar = true
                    }, 800)
                } else {
                    acertos++
                    cartasEscolhidas = []
                    setTimeout(() => {
                        podeJogar = true
                    }, 200)
                }

                if(acertos == 6) {
                    document.querySelector('main').style.display = 'none'
                    document.querySelector('#msgFinal').style.display = 'flex'

                } else if(tentativas >= 17) {
                    document.querySelector('main').style.display = 'none'
                    document.querySelector('#msgFinal').style.display = 'flex'
                    document.querySelector('#msgFinal').querySelector('div').querySelector('h1').innerText = 'Suas Tentativas Acabaram'
                }
            }
        }
    })
}

let links = ['assets/img/charmander.png', 'assets/img/bulbasaur.png', 'assets/img/cyndaquil.png', 'assets/img/eevee.png', 'assets/img/píkachu.png', 'assets/img/squirtle.png']
let numerosSorteados = []
let contador = 0
let posibilidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
function sortear() {
    if(posibilidades.length != 0) {
        let numSorteado = Math.floor(Math.random() * posibilidades.length)

        let repetido = false
        for(let c = 0; c <= numerosSorteados.length; c++) {
            if(numerosSorteados[c] == numerosSorteados) {
                repetido = true
            }

            setTimeout(() => {
                if(repetido == false) {
                    document.getElementsByClassName('back')[posibilidades[numSorteado]].querySelector('img').src = links[contador]
                    posibilidades.splice(numSorteado, 1)
                    contador++

                    if(contador == 6) {
                        contador = 0
                    }
                }
            }, 50)
        }
        
        setTimeout(() => {
            sortear()
        }, 70)
    }
} sortear()