//? Vai colocar as imgs do jogadores nos seus respectivos lugares
function criarJogadores() {
    let localJogadores = document.getElementById('localJogadores')
    localJogadores.innerHTML = ''
    let feito = false

     db.collection('Salas').onSnapshot((data) => {
            data.docs.map(function(valSalas) {
                let Salas = valSalas.data()

            if(valSalas.id == codigoSala && feito == false) {
                feito = true
                for(let c = 0; c < Salas.SobreOsJogadores.length; c++) {
                    let div = document.createElement('div')
                    let p = document.createElement('p')
                    let img = document.createElement('img')

                    div.className = 'jogadores'
                    p.className = 'pontos'
                    
                    p.innerText = 0
                    img.src = Salas.SobreOsJogadores[c].ImgUser

                    div.appendChild(p)
                    div.appendChild(img)
                    localJogadores.appendChild(div)
                }
            }
        })
    })
} criarJogadores()

//? Vai checar de quem é a fez
function checarVez() {
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            if(valSalas.id == codigoSala) {
                if(email == Salas.SobreOsJogadores[Salas.Vez].EmailJogador) {
                    document.getElementById('localTeclado').querySelector('#vezOponente').style.display = 'none'
                    document.getElementsByClassName('keyboard')[0].style.display = 'block'
                }
            }
        })
    })
} checarVez()