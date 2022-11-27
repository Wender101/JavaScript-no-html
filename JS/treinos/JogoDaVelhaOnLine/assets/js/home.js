let carregado = false
auth.onAuthStateChanged((valorEmail) => {
    const btnCriarSala = document.getElementById('btnCriarSala')
    const btnEntrarSala = document.getElementById('btnEntrarSala')

    //? O user sera barrado não tenha conta e tente criar sala ou entrar em uma
    if(valorEmail == undefined || valorEmail == null) {
        btnCriarSala.href = ''
        btnEntrarSala.href = ''

        btnCriarSala.addEventListener('click', (event) => {
            event.preventDefault()
            auth.signInWithPopup(provider)

        })

        btnEntrarSala.addEventListener('click', (event) => {
            event.preventDefault()
            auth.signInWithPopup(provider)
        })

    } else {
        btnCriarSala.href = 'Criar-Sala.html'
        btnEntrarSala.href = 'Entrar-Em-Sala.html'
    }
})