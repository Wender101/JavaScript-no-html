function sortearPalavra() {
    const palavras = ['Restaurantes', 'Comunicação', 'Transporte', 'Sistemático', 'Participante', 'Conhecimento', 'Desenvolvimento', 'Conteúdo', 'Atividade', 'Preparação', 'Aviação', 'Tecnológico', 'Habitação', 'Experiência', 'Comunicação', 'Estudantes', 'Inovação', 'Empresarial', 'Investimento', 'Comercio', 'Reconhecimento', 'Professor', 'Distribuição', 'Aprendizado', 'Inteligência']
    let numSorteado = Math.floor(Math.random() * 24)

   return palavras[numSorteado]

} 

let letras = []

let palavraSorteada 
function adminSortear() {
    let feito = false
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()
    
            if(Salas.Host == email && feito == false) {
                feito = true
                if(Salas.Palavra == '') {
                    palavraSorteada = sortearPalavra()
                    db.collection('Salas').doc(valSalas.id).update({Palavra: palavraSorteada})
                } else {
                    palavraSorteada = Salas.Palavra
                }
                criarEspacosLetras()
                
            } else if(valSalas.id == codigoSala && feito == false) {
                feito = true
                palavraSorteada = Salas.Palavra
                criarEspacosLetras()
            }
        })
    })
} adminSortear()

let errosDoPlayer = 0
for(let c = 0; c < 50; c++) {
    try {
        let btnTeclado = document.getElementsByClassName('btn')[c]
        btnTeclado.onclick = () => {
            letras.push(btnTeclado.innerText)
            let feito = false
            db.collection('Salas').onSnapshot((data) => {
                data.docs.map(function(valSalas) {
                    let Salas = valSalas.data()
            
                        if(feito == false) {
                            db.collection('Salas').doc(valSalas.id).update({Letras: letras})
                        }
                    })
                })

            let palavraSorteada2 = palavraSorteada.toLocaleLowerCase()
            palavraSorteada2 = palavraSorteada2.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
            palavraSorteada2 = palavraSorteada2.replace(/\s/g, '') //? Vai remover os espaços

            let letraEscolhida = btnTeclado.innerText.toLocaleLowerCase()
            letraEscolhida = letraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
            letraEscolhida = letraEscolhida.replace(/\s/g, '') //? Vai remover os espaços

            let errouMeuFi = true
            for(c = 0; c < palavraSorteada.length; c++) {
                if(palavraSorteada2[c] == letraEscolhida) {
                    errouMeuFi = false
                    btnTeclado.style.color = 'white'
                    btnTeclado.style.background = '#1fbd74'
                    btnTeclado.style.borderColor = '#1fbd74'
                    document.getElementsByClassName('letraPalavra')[c].querySelector('p').innerText = palavraSorteada[c]
                }
            }

            setTimeout(() => {
                if(errouMeuFi == true) {
                    try {
                        btnTeclado.style.color = 'white'
                        btnTeclado.style.background = '#ff6170'
                        btnTeclado.style.borderColor = '#ff6170'
                        document.getElementsByClassName('persona')[errosDoPlayer].style.display = 'block'
                    } catch {}
                    errosDoPlayer++

                    setTimeout(() => {
                        if(errosDoPlayer > 5) {
                            alert('Perdeu feio, a palavra era: ' + palavraSorteada);
                        }
                    }, 100)
                }
            }, 100)
        }
    } catch{}

}

function criarEspacosLetras() {

    try {
        for(c = 0; c < palavraSorteada.length; c++) {
            let div = document.createElement('div')
            let p = document.createElement('p')
    
            div.className = 'letraPalavra'
    
            div.appendChild(p)
            document.getElementById('localPalavra').appendChild(div)
        }
    } catch {}
}