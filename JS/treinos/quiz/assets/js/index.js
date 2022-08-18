//! Vai pegar os pontos salvos no browser
const pontos1 = localStorage.getItem('pontos')
const pontos2 = JSON.parse(pontos1)

try {
    if(pontos2 == null) pontos2 = 0
    var pontos = pontos2
    document.getElementById('pontos').innerText = `Pontos: ${pontos}`

} catch {
    var pontos = 0
}

//! Vai criar as alternativas
let num1 = Math.floor(Math.random() * 649)
api(num1)

let num2 = Math.floor(Math.random() * 649)
api(num2)

let num3 = Math.floor(Math.random() * 649)
api(num3)

let num4 = Math.floor(Math.random() * 649)
api(num4)

let num5 = Math.floor(Math.random() * 4)

//! Vai alterar as posições da resposta
if(num5 == 0) {
    document.getElementsByTagName('p')[0].className = num2
    document.getElementsByTagName('p')[1].className = num1
    document.getElementsByTagName('p')[2].className = num4
    document.getElementsByTagName('p')[3].className = num3

    document.getElementsByTagName('div')[0].id = num2
    document.getElementsByTagName('div')[1].id = num1
    document.getElementsByTagName('div')[2].id = num4
    document.getElementsByTagName('div')[3].id = num3

} else if(num5 == 1) {
    document.getElementsByTagName('p')[0].className = num4
    document.getElementsByTagName('p')[1].className = num3
    document.getElementsByTagName('p')[2].className = num2
    document.getElementsByTagName('p')[3].className = num1

    document.getElementsByTagName('div')[0].id = num4
    document.getElementsByTagName('div')[1].id = num3
    document.getElementsByTagName('div')[2].id = num2
    document.getElementsByTagName('div')[3].id = num1

} else if(num5 == 2) {
    document.getElementsByTagName('p')[0].className = num1
    document.getElementsByTagName('p')[1].className = num2
    document.getElementsByTagName('p')[2].className = num3
    document.getElementsByTagName('p')[3].className = num4

    document.getElementsByTagName('div')[0].id = num1
    document.getElementsByTagName('div')[1].id = num2
    document.getElementsByTagName('div')[2].id = num3
    document.getElementsByTagName('div')[3].id = num4

} else if(num5 == 3) {
    document.getElementsByTagName('p')[0].className = num3
    document.getElementsByTagName('p')[1].className = num2
    document.getElementsByTagName('p')[2].className = num1
    document.getElementsByTagName('p')[3].className = num4

    document.getElementsByTagName('div')[0].id = num3
    document.getElementsByTagName('div')[1].id = num2
    document.getElementsByTagName('div')[2].id = num1
    document.getElementsByTagName('div')[3].id = num4
}

var clique = false
let q = 0
function api(c) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${c}`).then(resposta => {
        return resposta.json()
    
    }).then(corpo => {
        contador = corpo.id
        const localGif = document.getElementById('gif')
        localGif.className = corpo.id
        localGif.style.display = 'block'
        localGif.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${corpo.id}.gif`

        let p = document.getElementsByTagName('p')[q]
        p.innerText = corpo.name

        let time = 1000
        let div = document.getElementById(p.className)
        div.addEventListener('click', () => {
            if(div.id == p.className) {
                if(clique == false) {
                    div.style.background = 'var(--cor4)'
    
                    pontos++
                    document.getElementById('pontos').innerText = `Pontos: ${pontos}`
                    var pontosJSON = JSON.stringify(pontos)
                    localStorage.setItem('pontos', pontosJSON)
                    clique = true

                    time = 2000
                }

            } else {
                clique = true
                if(clique == true) {
                    div.style.background = 'var(--cor1)'
                    let divCerta = document.getElementById(localGif.className)
                    divCerta.style.animation = '1s divCerta infinite'
    
                    time = 4000
                }
            }

            document.getElementById('gif').style.animation = '500ms mostrar linear'
            document.getElementById('gif').style.filter = 'brightness(1)'

            setTimeout(() => {
                location.reload()
            }, time)
        })

        q++
    })
}