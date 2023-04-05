let RankingBtn = document.querySelector('#RankingBtn')
RankingBtn.addEventListener('click', () => {
    document.querySelector('body').style.overflow = 'hidden'
    document.querySelector('#pagRanking').style.display = 'flex'

    checarRanking()
})

function checarRanking() {
    document.querySelector('#carregando').style.display = 'flex'
    let quantidadeMusicasPostadas = []

    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            quantidadeMusicasPostadas.push(Usuarios.Musica.MusicasPostadas.length)
        })
    })

    setTimeout(() => {
        quantidadeMusicasPostadas.sort(function(a,b){
            if(a > b) return 1;
            if(a <b) return -1;
        
            return 0    
        })

        let primeiroLugar = quantidadeMusicasPostadas[quantidadeMusicasPostadas.length - 1]
        let segundoLugar = quantidadeMusicasPostadas[quantidadeMusicasPostadas.length - 2]
        let terceiroLugar = quantidadeMusicasPostadas[quantidadeMusicasPostadas.length - 3]

        let tudoPronto = []
        
        //? Vai procurar os users com essa pontuação
        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Usuarios = valor.data()

                if(tudoPronto.length < 3) {
                    if(Usuarios.Musica.MusicasPostadas.length == primeiroLugar) {
                        document.querySelector('#nomePrimeiroLugar').innerText = Usuarios.infUser.Nome
                        document.querySelector('#primeiroLugar').src = Usuarios.infUser.FotoPerfil
                        tudoPronto.push(true)
    
                    } else if(Usuarios.Musica.MusicasPostadas.length == segundoLugar) {
                        document.querySelector('#nomePrimeiroLugar').innerText = Usuarios.infUser.Nome
                        document.querySelector('#segundoLugar').src = Usuarios.infUser.FotoPerfil
                        tudoPronto.push(true)
    
                    } else if(Usuarios.Musica.MusicasPostadas.length == terceiroLugar) {
                        document.querySelector('#nomeTerceiroLugar').innerText = Usuarios.infUser.Nome
                        document.querySelector('#terceiroLugar').src = Usuarios.infUser.FotoPerfil
                        tudoPronto.push(true)
                    }
                } else {
                    setTimeout(() => {
                        document.querySelector('#carregando').style.display = 'none'
                    }, 200)    
                }
            })
        })
    }, 300)
}