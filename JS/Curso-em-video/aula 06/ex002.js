var nome = window.prompt('Qual é o seu nome?')
        window.alert('Fico feliz em te conhecer ' + nome + '!')

        var senha = '54321'

        var qsenha = window.prompt('Quanl a senha:')

        if(qsenha != senha){
            window.document.body.style.display = 'none'
        }
        else {
            window.document.body.style.display = 'block'
        }