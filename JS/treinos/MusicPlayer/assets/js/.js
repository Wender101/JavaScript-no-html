if(listaMusicasRecentes.length <= 0) {
    let formaLista =  {
        NomeMusica: TodasAsMusicas.Musicas[numSelecionado].NomeMusica,
        NomeAutor: TodasAsMusicas.Musicas[numSelecionado].NomeAutor,
        Tipo: TodasAsMusicas.Musicas[numSelecionado].Tipo,
        LinkAudio: TodasAsMusicas.Musicas[numSelecionado].LinkAudio,
        LinkImgiMusica: TodasAsMusicas.Musicas[numSelecionado].LinkImgiMusica,
        EmailUser: TodasAsMusicas.Musicas[numSelecionado].EmailUser,
        EstadoMusica: TodasAsMusicas.Musicas[numSelecionado].EstadoMusica,
    }

    listaMusicasRecentes.push(formaLista)
    criarRecentes(listaMusicasRecentes)

} else if(listaMusicasRecentes.length > 0) {
    for(let b = 0; b < listaMusicasRecentes.length; b++) {
        if(listaMusicasRecentes.length == 9) {
            listaMusicasRecentes.splice(0, 1)
        }

        if(listaCheckRecentes[b].LinkImgiMusica == TodasAsMusicas.Musicas[numSelecionado].LinkImgiMusica && TodasAsMusicas.Musicas[numSelecionado].NomeMusica) {
            jaTemEssaMusica = true
        }
        setTimeout(() => {
            if(jaTemEssaMusica == false && checarRepetidas == false) {
                checarRepetidas = true
                let formaLista =  {
                    NomeMusica: TodasAsMusicas.Musicas[numSelecionado].NomeMusica,
                    NomeAutor: TodasAsMusicas.Musicas[numSelecionado].NomeAutor,
                    Tipo: TodasAsMusicas.Musicas[numSelecionado].Tipo,
                    LinkAudio: TodasAsMusicas.Musicas[numSelecionado].LinkAudio,
                    LinkImgiMusica: TodasAsMusicas.Musicas[numSelecionado].LinkImgiMusica,
                    EmailUser: TodasAsMusicas.Musicas[numSelecionado].EmailUser,
                    EstadoMusica: TodasAsMusicas.Musicas[numSelecionado].EstadoMusica,
                }

                if(addMusicaEmRecentes == false) {
                    addMusicaEmRecentes = true
                    listaMusicasRecentes.push(formaLista)
                    criarRecentes(listaMusicasRecentes)
                }

                setTimeout(() => {
                    checarRepetidas = false
                }, 100)
            }
        }, 100)
    }
}