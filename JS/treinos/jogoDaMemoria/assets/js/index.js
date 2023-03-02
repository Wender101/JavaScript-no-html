let cartasEscolhidas = [] //? Vai salvar as 2 cartas e comparar os links das img, caso seja a mesma img para saber se é a mesma img
let cartasAcertadas = []  //? Vai salvar o número das cartas que foram acertas, assim ao clicar nelas, o site vai desconsiderar como uma nova carta
let podeJogar = true    //? Vai impedir o jogador de clicar na tela enquanto o site faz a animação de girar as cartas etc
let inputTentativas = document.querySelector('input')
inputTentativas.value = 0
let tentativas = 0 //? Vai contabilar cada tentativa, sejá acerto ou não, assim que 2 cartas forem clicadas uma tentativa será contabilizada
let acertos = 0 //? Vai contar os acertos para saber se o user ganhou

function dificudade(dificudadeUser) {
    document.querySelector('#escolherDificuldade').style.display = 'none'
    let maxTentativas = 25

    if(dificudadeUser == 'Dificíl') {
        maxTentativas = 11
    } else if(dificudadeUser == 'Médio') {
        maxTentativas = 18
    } else {
        maxTentativas = 25
    }

    document.querySelector('.texto').innerText = `Você tem ${maxTentativas} tentativas para encontrar todos os pokémons`
    document.querySelector('#tentativas').innerText = `0/${maxTentativas}`

    for(let c = 0; c < 20; c++) {
        let flipper = document.getElementsByClassName('flipper')[c] //? A carta
        let imgPokemon = document.getElementsByClassName('back')[c].querySelector('img') //? Img .back
    
        flipper.addEventListener('click', () => {
            let cartaJaAcertada = false
    
            for(let contadorJaAcertada = 0; contadorJaAcertada < cartasAcertadas.length; contadorJaAcertada++) {
                if(cartasAcertadas[contadorJaAcertada] == c) {
                    cartaJaAcertada = true
                }
            }
    
            setTimeout(() => {
                if(podeJogar == true && cartaJaAcertada == false) {
                    let obj = {
                        src: imgPokemon.src,
                        contador: c,
                    }
                    cartasEscolhidas.push(obj)
                    flipper.style.transform = 'rotateY(180deg)'
                    
                    if(cartasEscolhidas.length == 2) {
                        podeJogar = false //? Vai impedir o jogador de jogar até as aminações acabarem
                        
                        tentativas++
                        document.querySelector('#tentativas').innerText = `${tentativas}/${maxTentativas}`
        
                        let aumentandoOInput = 0
                        let maxAumentandoOInput = 100/maxTentativas
                        console.log(maxAumentandoOInput);
                        setInterval(() => {
                            if(aumentandoOInput < maxAumentandoOInput) {
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
                            cartasAcertadas.push(cartasEscolhidas[0].contador, cartasEscolhidas[1].contador)
                            cartasEscolhidas = []
                            setTimeout(() => {
                                podeJogar = true
                            }, 200)
                        }
        
                        if(acertos == 10) {
                            document.querySelector('main').style.display = 'none'
                            document.querySelector('#msgFinal').style.display = 'flex'
        
                        } else if(tentativas >= maxTentativas) {
                            document.querySelector('main').style.display = 'none'
                            document.querySelector('#msgFinal').style.display = 'flex'
                            document.querySelector('#msgFinal').querySelector('div').querySelector('h1').innerText = 'Suas Tentativas Acabaram'
                        }
                    }
                }
            }, 50)
        })
    }
}

let links = ['assets/img/charmander.png', 'assets/img/bulbasaur.png', 'assets/img/cyndaquil.png', 'assets/img/eevee.png', 'assets/img/píkachu.png', 'assets/img/squirtle.png', 'assets/img/a.png', 'assets/img/pokeball.png', 'assets/img/butterfree.png', 'assets/img/piplup.png']
let numerosSorteados = [] //? Vai armazenar os números sorteados anteriormente, dessa forma sempre que um número for sorteado, será checado se já havia sido sorteado anteriormente
let contador = 0 //? Vai contabilizar quantos números foram sorteados
let posibilidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] //? Vai guardar o locais que poderão ser colocadas as imgs

//? Vai sortear as imgs em lugares diferentes sempre que o site for carregado, também caso seja sorteado o mesmo número, a função sorteará outro até sair um número não sorteado
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

                    if(contador == 10) {
                        contador = 0
                    }
                }
            }, 50)
        }
        
        //? Vai chamar a função de volta até todas as cartas estarem prontas para jogo
        setTimeout(() => {
            sortear()
        }, 70)
    }
} sortear()