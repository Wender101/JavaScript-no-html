function favoritarMusicas(musicaSelecionada) {
    let jaTemEsssaMusicaSalvoComoFavorita = false


    //? Vai checar se está música já foi adicionada anteriormente como favorita
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {
                console.log(34);

                if(Usuarios.Musica.MusicasCurtidas.length > 0) {
                    for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {
    
                        //? Vai cehcar se a música já foi adicionada anteriormente
                        if(musicaSelecionada.Email == email && musicaSelecionada.LinkAudio == Usuarios.Musica.MusicasCurtidas[c].LinkAudio && musicaSelecionada.LinkImgiMusica == Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica && musicaSelecionada.NomeMusica == Usuarios.Musica.MusicasCurtidas[c].NomeMusica) {
                            jaTemEsssaMusicaSalvoComoFavorita = true
                            musicaAtualFavoritada = false
                            document.querySelector('#hearAdd').src = 'assets/img/icones/icon _heart_ (1).png'
                        }
    
                        setTimeout(() => {
                            if(jaTemEsssaMusicaSalvoComoFavorita == false) {
                                musicaAtualFavoritada = true
                                document.querySelector('#hearAdd').src = 'assets/img/icones/icon _heart_.png'
                            }
                        }, 300)
                    }

                } else {
                    if(jaTemEsssaMusicaSalvoComoFavorita == false) {
                        musicaAtualFavoritada = true
                        document.querySelector('#hearAdd').src = 'assets/img/icones/icon _heart_.png'
                    }
                }

            }
        })
    })
}