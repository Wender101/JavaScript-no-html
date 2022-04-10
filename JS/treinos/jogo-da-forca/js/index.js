function animais() {
    let tema = document.getElementById('tema')
    tema.style.display = 'none'

    let palavra = 'Cachorro'
    let quantasLetras = palavra.length
    const section = document.getElementById('letras')
    const cachorro = 'c'&& 'a'

    //Vai criar uma linha pra cada letra
    for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
        let div = document.createElement('div')
        section.appendChild(div)
    }

    //o jogo começa aqui
    let enviar = document.getElementById('enviar')

    enviar.addEventListener('click', function() {
        let res = document.getElementById('res')
        let resposta = res.value.length
        //Caso o usuario digite mais de 1 letra por vez
        if(resposta > 1) {
            window.alert('Por favor, digite apenas 1 letra por vez')
        } 

        if(res.value == C) {
            window.alert('ganhou')
        }
    })
}

function frutas() {
    let tema = document.getElementById('tema')
    tema.style.display = 'none'

    let palavra = 'Tomate'
    let quantasLetras = palavra.length
    const section = document.getElementById('letras')

    //Vai criar uma linha pra cada letra
    for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
        let div = document.createElement('div')
        section.appendChild(div)
    }
}

function pais() {
    let tema = document.getElementById('tema')
    tema.style.display = 'none'

    let palavra = 'Orlanda'
    let quantasLetras = palavra.length
    const section = document.getElementById('letras')

    //Vai criar uma linha pra cada letra
    for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
        let div = document.createElement('div')
        section.appendChild(div)
    }
}

function objeto() {
    let tema = document.getElementById('tema')
    tema.style.display = 'none'

    let palavra = 'Teclado'
    let quantasLetras = palavra.length
    const section = document.getElementById('letras')

    //Vai criar uma linha pra cada letra
    for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
        let div = document.createElement('div')
        section.appendChild(div)
    }
}




