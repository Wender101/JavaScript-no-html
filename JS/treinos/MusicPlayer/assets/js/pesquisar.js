let inputPesquisa = document.querySelector('#pesquisarMusica')
let inputPesquisa2 = document.querySelector('#pesquisarMusica2')

inputPesquisa.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        document.querySelector('#localMlhResutado').innerHTML = ''
        document.querySelector('#relacionadas').innerHTML = ''
        document.querySelector('#TipoPesquisa').innerHTML = ''

        document.querySelector('#localMlhResutado').style.display = 'none'
        document.querySelector('#relacionadas').style.display = 'none'
        document.querySelector('#TipoPesquisa').style.display = 'none'

        document.querySelector('#h1MelhorResutado').style.display = 'none'
        document.querySelector('#h1Relacionadas').style.display = 'none'
        document.querySelector('#h1Tipo').style.display = 'none'

        document.querySelector('#pagPesquisa').style.display = 'none'
        document.querySelector('#h1AutorPesquisa').style.display = 'none'
        document.querySelector('#autorPesquisa').style.display = 'none'

        document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'none'
        document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'none'

        document.querySelector('#nehumResultado').style.display = 'block'

        for(let a = 1; a < 5; a++) {
            document.querySelector(`#musicaAutor${a}`).style.display = 'none'
        }

        if(inputPesquisa.value.length > 0) {
            document.querySelector('#pagPesquisa').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'

            inputPesquisa2.value = inputPesquisa.value
            pesquisar(inputPesquisa.value)
    
        } else {
            document.querySelector('#pagPesquisa').style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
            inputPesquisa2.value = ''
        }
    }
})

inputPesquisa2.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        document.querySelector('#localMlhResutado').innerHTML = ''
        document.querySelector('#relacionadas').innerHTML = ''
        document.querySelector('#TipoPesquisa').innerHTML = ''

        document.querySelector('#localMlhResutado').style.display = 'none'
        document.querySelector('#relacionadas').style.display = 'none'
        document.querySelector('#TipoPesquisa').style.display = 'none'

        document.querySelector('#h1MelhorResutado').style.display = 'none'
        document.querySelector('#h1Relacionadas').style.display = 'none'
        document.querySelector('#h1Tipo').style.display = 'none'

        document.querySelector('#pagPesquisa').style.display = 'none'
        document.querySelector('#h1AutorPesquisa').style.display = 'none'
        document.querySelector('#autorPesquisa').style.display = 'none'

        document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'none'
        document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'none'

        document.querySelector('#nehumResultado').style.display = 'block'

        for(let a = 1; a < 5; a++) {
            document.querySelector(`#musicaAutor${a}`).style.display = 'none'
        }

        if(inputPesquisa2.value.length > 0) {
            document.querySelector('#pagPesquisa').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'

            inputPesquisa.value = inputPesquisa2.value
            pesquisar(inputPesquisa2.value)
    
        } else {
            document.querySelector('#pagPesquisa').style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
            inputPesquisa.value = ''
        }
    }
})

let clonePerfilUserPesquisado //! Vai guardar as infos do user pesquisado
function pesquisar(pesquisa) {
    let contadorResutado = 0
    let userPesquisado = false
    
    db.collection('TodasAsMusicas').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let TodasAsMusicas = valor.data()

            function localArmazenar(local, contador) {
                userPesquisado = true
                document.querySelector('#nehumResultado').style.display = 'none'
                let musicaMaisTocada = document.createElement('div')
                let localImgMaisTocada = document.createElement('div')
                let img = document.createElement('img')
                let nomeMusicaMaisTocada = document.createElement('h3')
                let nomeAutorMaisTocada = document.createElement('p')

                musicaMaisTocada.className = 'musicaMaisTocada'
                localImgMaisTocada.className = 'localImgMaisTocada'
                nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'

                img.src = TodasAsMusicas.Musicas[contador].LinkImgiMusica
                nomeMusicaMaisTocada.innerText = TodasAsMusicas.Musicas[contador].NomeMusica
                nomeAutorMaisTocada.innerText = TodasAsMusicas.Musicas[contador].NomeAutor

                localImgMaisTocada.appendChild(img)
                musicaMaisTocada.appendChild(localImgMaisTocada)
                musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                musicaMaisTocada.appendChild(nomeAutorMaisTocada)

                local.appendChild(musicaMaisTocada)

                //? Funções de click
                musicaMaisTocada.addEventListener('click', () => {
                    darPlayNaMusica(TodasAsMusicas.Musicas[contador])
                })
            }

            for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
                pesquisa = pesquisa.toLocaleLowerCase()
                pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                pesquisa = pesquisa.replace(/\s/g, '') //? Vai remover os espaços
                
                let contadorMusicasAutor = 0
                //! Vai pesquisar pelo(a) autor da música
                let Autor = TodasAsMusicas.Musicas[c].NomeAutor.toLocaleLowerCase()
                Autor = Autor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                Autor = Autor.replace(/\s/g, '') //? Vai remover os espaços

                db.collection('Usuarios').onSnapshot((data) => {
                    data.docs.map(function(valor) {
                        let Usuarios = valor.data()

                        let nomeAutor = Usuarios.infUser.Nome.toLocaleLowerCase()
                        nomeAutor = nomeAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        nomeAutor = nomeAutor.replace(/\s/g, '') //? Vai remover os espaços
        
                        if(nomeAutor.includes(pesquisa)) {
                            for(let b = 0; b < Usuarios.Musica.MusicasPostadas.length; b++) {
                                if(contadorMusicasAutor < 4) {
                                    contadorMusicasAutor++
                                    document.querySelector('#nehumResultado').style.display = 'none'
                                    document.querySelector('#pagPesquisa').style.display = 'block'
                                    document.querySelector('#h1AutorPesquisa').style.display = 'block'
                                    document.querySelector('#autorPesquisa').style.display = 'flex'
                                    document.querySelector(`#musicaAutor${b + 1}`).style.display = 'flex'
                                    
                                    let musicaAutor = document.querySelector(`#musicaAutor${contadorMusicasAutor}`)
                                    let img = document.querySelector(`#imgMusicaAutor${contadorMusicasAutor}`)
                                    let h3 = document.querySelector(`#localTextoAutor${contadorMusicasAutor}`).querySelector('h3')
                                    let p = document.querySelector(`#localTextoAutor${contadorMusicasAutor}`).querySelector('p')

                                    img.src = Usuarios.Musica.MusicasPostadas[b].LinkImgiMusica
                                    h3.innerText = Usuarios.Musica.MusicasPostadas[b].NomeMusica
                                    p.innerText = Usuarios.Musica.MusicasPostadas[b].NomeAutor

                                    document.querySelector('#nomeAutorPesquisa').innerText = Usuarios.infUser.Nome
                                    document.querySelector('#nomeAutorPesquisa').style.display = 'block'

                                    clonePerfilUserPesquisado = Usuarios

                                    musicaAutor.addEventListener('click', () => {
                                        darPlayNaMusica(Usuarios.Musica.MusicasPostadas[b])
                                    })
                                }

                                //! -------------------------------- Vai mostrar as músicas postadas pelo user pesquisado
                                if(userPesquisado == false) {
                                    let musicaMaisTocada = document.createElement('div')
                                    let localImgMaisTocada = document.createElement('div')
                                    let img = document.createElement('img')
                                    let nomeMusicaMaisTocada = document.createElement('h3')
                                    let nomeAutorMaisTocada = document.createElement('p')

                                    musicaMaisTocada.className = 'musicaMaisTocada'
                                    localImgMaisTocada.className = 'localImgMaisTocada'
                                    nomeMusicaMaisTocada.className = 'nomeMusicaMaisTocada'
                                    nomeAutorMaisTocada.className = 'nomeAutorMaisTocada'

                                    img.src = Usuarios.Musica.MusicasPostadas[b].LinkImgiMusica
                                    nomeMusicaMaisTocada.innerText = Usuarios.Musica.MusicasPostadas[b].NomeMusica
                                    nomeAutorMaisTocada.innerText = Usuarios.Musica.MusicasPostadas[b].NomeAutor

                                    localImgMaisTocada.appendChild(img)
                                    musicaMaisTocada.appendChild(localImgMaisTocada)
                                    musicaMaisTocada.appendChild(nomeMusicaMaisTocada)
                                    musicaMaisTocada.appendChild(nomeAutorMaisTocada)

                                    document.querySelector('#noneDoUserQuePostouPesquisa').innerText = Usuarios.infUser.Nome
                                    document.querySelector('#h1NomeQmPostouPesquisa').style.display = 'block'
                                    document.querySelector('#musicasPostadasPeloUserPesquisado').style.display = 'block'
                                    document.querySelector('#musicasPostadasPeloUserPesquisado').appendChild(musicaMaisTocada)

                                    //? Funções de click
                                    musicaMaisTocada.addEventListener('click', () => {
                                        darPlayNaMusica(Usuarios.Musica.MusicasPostadas[b])
                                    })
                                }
                            }

                            userPesquisado = true
                        }
                    })
                })


                //! - Vai pesquisar pelo nome da música e nome do autor
                let NomeMusica = TodasAsMusicas.Musicas[c].NomeMusica.toLocaleLowerCase()
                NomeMusica = NomeMusica.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                NomeMusica = NomeMusica.replace(/\s/g, '') //? Vai remover os espaços

                let nomeDoAutor = TodasAsMusicas.Musicas[c].NomeAutor.toLocaleLowerCase()
                nomeDoAutor = nomeDoAutor.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                nomeDoAutor = nomeDoAutor.replace(/\s/g, '') //? Vai remover os espaços

                if(NomeMusica.includes(pesquisa) && contadorResutado < 10 || nomeDoAutor.includes(pesquisa) && contadorResutado < 10) {
                    contadorResutado++
                    localArmazenar(document.querySelector('#localMlhResutado'), c)

                    document.querySelector('#localMlhResutado').style.display = 'block'
                    document.querySelector('#h1MelhorResutado').style.display = 'block'

                } else if(NomeMusica.includes(pesquisa) && contadorResutado >= 10 || nomeDoAutor.includes(pesquisa) && contadorResutado >= 10) {
                    contadorResutado++
                    localArmazenar(document.querySelector('#relacionadas'), c)

                    document.querySelector('#relacionadas').style.display = 'block'
                    document.querySelector('#h1Relacionadas').style.display = 'block'
                }

                //! - Vai pesquisar pelo tipo da música
                let Tipo = TodasAsMusicas.Musicas[c].Tipo.toLocaleLowerCase()
                Tipo = Tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                Tipo = Tipo.replace(/\s/g, '') //? Vai remover os espaços

                if(Tipo.includes(pesquisa)) {
                    localArmazenar(document.querySelector('#TipoPesquisa'), c)

                    document.querySelector('#TipoPesquisa').style.display = 'block'
                    document.querySelector('#h1Tipo').style.display = 'block'
                }
            }
        })
    })
}

//? Vai ir para a pág pessoal do User pesquisado
let sobreAutor = document.querySelector('#sobreAutor').addEventListener('click', () => {
    console.log(clonePerfilUserPesquisado)
})


// const menuLinks = document.querySelectorAll("#voltarTopo a[href^=\"#\"]")

// function getDistanceFromTheTop(element) {
// 	const id = element.getAttribute("href")
// 	return document.querySelector(id).offsetTop
// }

// function scrollToSection(event) {
// 	event.preventDefault()
// 	const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90
// 	smoothScrollTo(0, distanceFromTheTop)
// }

// menuLinks.forEach((link) => {
// 	link.addEventListener("click", scrollToSection)
// })

// function smoothScrollTo(endX, endY, duration) {
// 	const startX = window.scrollX || window.pageXOffset
// 	const startY = window.scrollY || window.pageYOffset
// 	const distanceX = endX - startX
// 	const distanceY = endY - startY
// 	const startTime = new Date().getTime()

// 	duration = typeof duration !== "undefined" ? duration : 700

// 	const easeInOutQuart = (time, from, distance, duration) => {
// 		if ((time /= duration / 2) < 1)
// 			return (distance / 2) * time * time * time * time + from
// 		return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
// 	}

// 	const timer = setInterval(() => {
// 		const time = new Date().getTime() - startTime
// 		const newX = easeInOutQuart(time, startX, distanceX, duration)
// 		const newY = easeInOutQuart(time, startY, distanceY, duration)
// 		if (time >= duration) {
// 			clearInterval(timer)
// 		}
// 		window.scroll(newX, newY)
// 	}, 1000 / 60)
// }