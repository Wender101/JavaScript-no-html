//? Vai sortear uma palvra, das palavras contidas no array
let sorteado = false
function sortearPalavra() {
    const palavras = ['Restaurantes', 'Comunicação', 'Transporte', 'Sistemático', 'Participante', 'Conhecimento', 'Desenvolvimento', 'Conteúdo', 'Atividade', 'Preparação', 'Aviação', 'Tecnológico', 'Habitação', 'Experiência', 'Comunicação', 'Estudantes', 'Inovação', 'Empresarial', 'Investimento', 'Comercio', 'Reconhecimento', 'Professor', 'Distribuição', 'Aprendizado', 'Inteligência']
    let numSorteado = Math.floor(Math.random() * 24)

    //? Vai impedir de sortear mais de uma palavra por vez
    sorteado = false

    //? Vai checar se o user é o host e sortear uma palavra (caso seja o host da sala) logo após vai salvar a palvra no banco de dados para o outros jogadores a veem
   db.collection('Salas').onSnapshot((data) => {
       data.docs.map(function(valSalas) {
           let Salas = valSalas.data()
           
           if(valSalas.id == codigoSala) {
                //? Vai checar se o user é o administrador
                if(email == Salas.Host && sorteado == false && Salas.Palavra == "") {
                    sorteado = true

                    localStorage.setItem('errosDoUser', -1)
                    //? Vai salvar no banco de dados a palavra sorteada pelo administrador (Host)
                    db.collection('Salas').doc(valSalas.id).update({Palavra: palavras[numSorteado]})
                }
           }
        })
    })
} sortearPalavra()

let palavraSorteada = ''//? Vai gardar a palavra que foi sorteada pelo Host
let letras = [] //? Vai salvar todas as letras que foram selecionadas
let errosDoPlayer = -1 //? Vai contar os erros do user individualmente
let letrasEscolhidasPeloUser = [] //? Vai armazenar as letras escolhidas pelo usuário 
let letrasAcertadasNoGeral = [] //? Vai guardar todas as letras que foram acertadas por geral, para checar quem acertou a ultima letra
let foiOuserQuePrecionouEssaTecla = false //? Vai marcar quando o user escolhe uma letra para poder saber se foi ele que acertou a ultima

let arroz = 0

//? Vai pegar do banco de dados a palavra que foi sorteada
function pegarPalavraSorteada() {
    let feito = false
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()

            if(valSalas.id == codigoSala && feito == false) {
                feito = true
                palavraSorteada = Salas.Palavra
                letras = Salas.Letras
                colocarLinhasNaTela()

            }  
            
            if(valSalas.id == codigoSala) {
                 //? Vai colocar na tela caso tenha acertado a letra
                 letrasAcertadasNoGeral = []
                for(let a = 0; a < Salas.Letras.length; a++) {
                    let palavraSorteada2 = palavraSorteada.toLocaleLowerCase()
                    palavraSorteada2 = palavraSorteada2.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    palavraSorteada2 = palavraSorteada2.replace(/\s/g, '') //? Vai remover os espaços

                    let letraEscolhida = Salas.Letras[a].toLocaleLowerCase()
                    letraEscolhida = letraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    letraEscolhida = letraEscolhida.replace(/\s/g, '') //? Vai remover os espaços

                    let errouMeuFi = true
                    for(let d = 0; d < palavraSorteada2.length; d++) {
                        if(palavraSorteada2[d] == letraEscolhida) {
                            for(let c = 0; c < 50; c++) {
                                try {
                                    let btnTeclado = document.getElementsByClassName('btn')[c]
                                    
                                    if(btnTeclado.innerText.toLocaleLowerCase() == letraEscolhida) {
                                        errouMeuFi = false
                                        btnTeclado.style.color = 'white'
                                        btnTeclado.style.background = '#1fbd74'
                                        btnTeclado.style.borderColor = '#1fbd74'
                                        document.getElementsByClassName('letraPalavra')[d].querySelector('p').innerText = palavraSorteada[d]

                                        

                                        arroz = 0
                                        for(let c = 0; c < 50; c++) {
                                            try {
                                                if(document.getElementsByClassName('letraPalavra')[c].querySelector('p').innerText != '') {
                                                    arroz++
                                                    console.log(arroz);
                                                }
                                            } catch{}
                                        }

                                        //? Vai checar se o user ganhou
                                        if(arroz  == palavraSorteada.length && foiOuserQuePrecionouEssaTecla == true) {
                                            //? Vai alterar no db, quem ganhou a partida
                                            db.collection('Salas').onSnapshot((data) => {
                                                data.docs.map(function(valSalas) {
                                                    let Salas = valSalas.data()

                                                    if(valSalas.id = codigoSala) {
                                                        let novoGanhador = {
                                                            Nome: sobreOUser.displayName,
                                                            Email: email
                                                        }
    
                                                        db.collection('Salas').doc(valSalas.id).update({GanhadorDaVez: novoGanhador})
                                                        temosUmVencedor(true, sobreOUser.displayName, email)
                                                    }
                                                })
                                            })
                                        }

                                    }
                                    
                                }catch{}
                            }
                        } else {
                            for(let c = 0; c < 50; c++) {
                                try {
                                    let btnTeclado = document.getElementsByClassName('btn')[c]
                                    if(btnTeclado.innerText.toLocaleLowerCase() == letraEscolhida && errouMeuFi == true) {
                                        try {
                                            btnTeclado.style.color = 'white'
                                            btnTeclado.style.background = '#ff6170'
                                            btnTeclado.style.borderColor = '#ff6170'
                                        } catch {}
                                    }
                                }catch{}
                            }
                        }
                    }
                }
            }
        })
    })
} pegarPalavraSorteada()

let errosDoUser = -1

//? Vai pegar do localStorage os erros que o usuario cometeu, impedindo o user de jogar dnv ao recarregar a página
if(localStorage.getItem('errosDoUser') != undefined && localStorage.getItem('errosDoUser') != null) {
    let a = localStorage.getItem('errosDoUser')
    errosDoUser = JSON.parse(a)

    for(let c = 0; c <= errosDoUser; c++) {
        document.getElementsByClassName('persona')[c].style.display = 'block'
        if(errosDoUser == 5) {
            document.getElementById('localTeclado').style.background = '#fb5555'
            document.getElementById('localTeclado').style.color = 'white'
            document.getElementById('localTeclado').querySelector('#perdeuOgame').style.display = 'block'
            document.getElementsByClassName('keyboard')[0].style.display = 'none'
        }
    }
}

//? Vai adicionar função de click no btns do teclado
for(let c = 0; c < 50; c++) {
    try {
        let btns = document.getElementsByClassName('btn')[c]
        btns.addEventListener('click', () => {
            let jaTemEssaLetra = false
            let errouAletra = true

            foiOuserQuePrecionouEssaTecla = true //? Vai marcar quando o user escolhe uma letra para poder saber se foi ele que acertou a ultima

            alterarAvez()
            

            //? Vai checar se a letra já foi escolhida
            for(let b = 0; b <= letras.length; b++) {
                if(letras[b] == btns.innerText) {
                    jaTemEssaLetra = true
                }
            }

            //? Caso não tenha sido escolhida, será adiconada
            setTimeout(() => {
                if(jaTemEssaLetra == false) {
                    jaTemEssaLetra = true
                    console.log('btn precionado');
                    letras.push(btns.innerText)
                    letrasEscolhidasPeloUser.push(btns.innerText)

                    let feito = false //? Vai impedir de salvar mais de uma vez

                    //! vai checar se o user errou a letra
                    for(let c = 0; c < palavraSorteada.length; c++) {
                        let palavraSorteada2 = palavraSorteada.toLocaleLowerCase()
                        palavraSorteada2 = palavraSorteada2.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        palavraSorteada2 = palavraSorteada2.replace(/\s/g, '') //? Vai remover os espaços


                        let textoBtn = btns.innerText.toLocaleLowerCase()
                        textoBtn = textoBtn.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        textoBtn = textoBtn.replace(/\s/g, '') //? Vai remover os espaços


                        if(textoBtn == palavraSorteada2[c]) {
                            errouAletra = false
                        }

                        setTimeout(() => {
                            if(errouAletra == true) {
                                errouAletra = false
                                errosDoUser++
                                localStorage.setItem('errosDoUser', errosDoUser)
                                document.getElementsByClassName('persona')[errosDoUser].style.display = 'block'

                                if(errosDoUser == 5) {
                                    document.getElementById('localTeclado').style.background = '#fb5555'
                                    document.getElementById('localTeclado').style.color = 'white'
                                    document.getElementById('localTeclado').querySelector('#perdeuOgame').style.display = 'block'
                                    document.getElementsByClassName('keyboard')[0].style.display = 'none'
                                }
                            }
                        }, 1000)
                    }
                    //!

                    //? Vai salvar a nova letra selecionada no db
                    db.collection('Salas').onSnapshot((data) => {
                        data.docs.map(function(valSalas) {
                            let Salas = valSalas.data()

                           if(valSalas.id == codigoSala && feito == false) {
                                feito = true
                                for(let c = 0; c < Salas.Letras.length; c++) {

                                    //? Vai checar se essa letra já existe no array letras
                                    let diferente = true
                                    for(let b = 0; b <= letras.length; b++) {
                                        if(letras[b] == Salas.Letras[c]) {
                                            diferente = false
                                        }
                                        
                                        setTimeout(() => {
                                            if(diferente == true) {
                                                console.log('é diferente');
                                                letras.push(Salas.Letras[c])

                                                var novaArr = letras.filter((este, i) => letras.indexOf(este) === i);
                                                letras = novaArr
                                            }
                                        }, 100)
                                    }
                                } 

                                //? Vai salvar a letra selecionada
                                setTimeout(() => {
                                    db.collection('Salas').doc(valSalas.id).update({Letras: letras})
                                }, 200)
                            }
                        })
                    })
                }
            }, 100)
        })
    } catch{}
}

//? Vai colocar as linhas de cada letra na tela
function colocarLinhasNaTela() {
    for(let c = 0; c < palavraSorteada.length; c++) {
        //? vai tirar a aba de carregando
        document.getElementById('carregando').style.display = 'none'

        let div = document.createElement('div')
        let p = document.createElement('p')

        div.className = 'letraPalavra'

        div.appendChild(p)
        document.getElementById('localPalavra').appendChild(div)
    }
}

//? Vai alterar que que é a vez
function alterarAvez() {
    let vezAlterada = false
    db.collection('Salas').onSnapshot((data) => {
        data.docs.map(function(valSalas) {
            let Salas = valSalas.data()
    
            try {
                if(valSalas.id == codigoSala) {
                    if(vezAlterada == false && Salas.SobreOsJogadores.length >= 2) {
                        vezAlterada = true
                        let vez = parseInt(Salas.Vez) + 1
                        db.collection('Salas').doc(valSalas.id).update({Vez: vez})
                        checarVez()

                        //? Caso a vez tenha chegado no ultimo jogador, ela vai reiniciar para o primeiro
                    } else if(Salas.Vez == Salas.SobreOsJogadores.length) {
                        vezAlterada = true
                        let vez = 0
                        db.collection('Salas').doc(valSalas.id).update({Vez: vez})
                        checarVez()
                    }

                }

            } catch{}
        })
    })
}
