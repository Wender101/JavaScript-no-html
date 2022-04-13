function animais() {
    let tema = document.getElementById('tema')
    tema.style.display = 'none'

    let palavra = 'Cabrito'
    let quantasLetras = palavra.length
    const section = document.getElementById('letras')
    const cabrito = 'c'&& 'a'

    //Vai criar uma linha pra cada letra
    for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
        let div = document.createElement('div')
        div.className = 'div'
        section.appendChild(div)
        var p = document.createElement('p')
        p.id = `p${totalLetras}`
        div.appendChild(p)
    }

    //o jogo começa aqui
    let enviar = document.getElementById('enviar')

    enviar.addEventListener('click', function() {
        let res = document.getElementById('res').value
        let resposta = res.length
        //Caso o usuario digite mais de 1 letra por vez
        if(resposta > 1) {
            window.alert('Por favor, digite apenas 1 letra por vez')
        } else {
            let letCerta = ['C', 'a', 'b', 'r', 'i', 't', 'o']
            let g = letCerta.indexOf(res)
            if(g == -1) {
                let cabeca = document.getElementById('cabeça')
                let tronco = document.getElementById('tronco')
                let braco1 = document.getElementById('braco1')
                let braco2 = document.getElementById('braco2')
                let perna1 = document.getElementById('perna1')
                let perna2 = document.getElementById('perna2')
                let errou = 6

                if(errou == 6) {
                    cabeca.style.display = 'block'
                    errou = 5

                } else if(errou == 5) {
                    tronco.style.display = 'block'
                    errou = 4

                } else if(errou == 4) {
                    braco1.style.display = 'block'
                    errou = 3

                } else if(errou == 3) {
                    braco2.style.display = 'block'
                    errou = 2

                } else if(errou == 2) {
                    perna1.style.display = 'block'
                    errou = 1

                } else if(errou == 1) {
                    perna2.style.display = 'block'
                    errou = 0
                }

                let errado = document.getElementById('ja-digitado')
                errado.innerText += `, ${res}`

                console.log(errou);
            } else {
                let p0 = document.getElementById('p0')
                let p1 = document.getElementById('p1')
                let p2 = document.getElementById('p2')
                let p3 = document.getElementById('p3')
                let p4 = document.getElementById('p4')
                let p5 = document.getElementById('p5')
                let p6 = document.getElementById('p6')
                let p7 = document.getElementById('p7')

                if(g == 0) {
                    p0.innerText = letCerta[g]
                } else if(g == 1) {
                    p1.innerText = letCerta[g]
                } else if(g == 2) {
                    p2.innerText = letCerta[g]
                } else if(g == 3) {
                    p3.innerText = letCerta[g]
                } else if(g == 4) {
                    p4.innerText = letCerta[g]
                } else if(g == 5) {
                    p5.innerText = letCerta[g]
                } else if(g == 6) {
                    p6.innerText = letCerta[g]
                } else if(g == 7) {
                    p7.innerText = letCerta[g]
                }
                
            }
        }
    })
}





