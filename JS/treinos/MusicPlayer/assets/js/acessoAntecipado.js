let concordoBtn = false
document.querySelector('#inputConcordo').addEventListener('click', () => {
    if(concordoBtn == false) {
        concordoBtn = true
    } else {
        concordoBtn = false
    }
})


document.querySelector('button').addEventListener('click', () => {
    let inputChave = document.querySelector('#inputChave').value

    if(concordoBtn == true && inputChave.length > 0) {
        db.collection('Admins').onSnapshot((data) => {
            data.docs.map(function(val) {
    
                let DadosDB = val.data()
    
                let acessoConcedido = false
               for(let c = 0; c < DadosDB.Chaves.length; c++) {
                    if(DadosDB.Chaves[c] == inputChave) {
                        if(location.href == 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Acesso-Antecipado.html') {

                            location.href = 'https://wender101.github.io/JavaScript-no-html/JS/treinos/MusicPlayer/Cadastro.html'
    
                            setTimeout(() => {
                                location.reload()
                            }, 50)
                        } else if(location.href == 'http://127.0.0.1:5500/Acesso-Antecipado.html') {
                            location.href = 'http://127.0.0.1:5500/Cadastro.html'
    
                            setTimeout(() => {
                                location.reload()
                            }, 50)
                        }
                        acessoConcedido = true
                    }
    
                    if((c + 1) == DadosDB.Chaves.length && acessoConcedido == false) {
                        alert('Chave inexistente ou já em uso.')
                    }
               }
            })
        })
    } else if(concordoBtn == false && inputChave.length > 0) {
        document.querySelector('#inputConcordo').className = 'concordoInputFalse'

        document.querySelector('#spanConcordo').className = 'concordoSpanFalse'

        setTimeout(() => {
            document.querySelector('#inputConcordo').className = ''
            document.querySelector('#spanConcordo').className = ''
        }, 2000)
        
    } else if(concordoBtn == true && inputChave.length <= 0) {

        document.querySelector('#inputChave').className = 'concordoInputFalse'

        setTimeout(() => {
            document.querySelector('#inputChave').className = ''
        }, 2000)

    } else {
        document.querySelector('#inputConcordo').className = 'concordoInputFalse'

        document.querySelector('#inputChave').className = 'concordoInputFalse'

        document.querySelector('#spanConcordo').className = 'concordoSpanFalse'

        setTimeout(() => {
            document.querySelector('#inputConcordo').className = ''
            document.querySelector('#inputChave').className = ''
            document.querySelector('#spanConcordo').className = ''
        }, 2000)
    }
})