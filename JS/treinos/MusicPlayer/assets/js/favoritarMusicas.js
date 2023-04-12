function favoritarMusica(musicaFavoritada) {
    let jaTemEssaMusicaNosFavoritos = false
    let feito = false

    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {

                function checarMusica() {
                    return new Promise((resolve, reject) => {
                        if(Usuarios.Musica.MusicasCurtidas.length > 0) {
                            for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {
                                if(Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica == musicaFavoritada.LinkImgiMusica && Usuarios.Musica.MusicasCurtidas[c].LinkAudio == musicaFavoritada.LinkAudio && Usuarios.Musica.MusicasCurtidas[c].EmailUser == musicaFavoritada.EmailUser && Usuarios.Musica.MusicasCurtidas[c].Nome == musicaFavoritada.Nome && feito == false) {
                                    //? Caso já tenha a música add nos favoritos
                                    feito = true
                                    resolve(c)
    
                                } else if(c + 1 == Usuarios.Musica.MusicasCurtidas.length && feito == false) {
                                    feito = true
                                    //? Caso não tenha a música add nos favoritos
                                    reject('Não tem a música')
                                }
                            }
                        } else {
                            reject('Não tem a música')
                        }
                    })
                }

                let feito2 = false
                checarMusica().then((resolve) => {
                    feito2 = true
                    let musica = Usuarios.Musica
                    musica.MusicasCurtidas.splice(resolve, 1)
                    db.collection('Usuarios').doc(valor.id).update({Musica: musica})

                }).catch((reject) => {
                    feito2 = true
                    let musica = Usuarios.Musica
                    musica.MusicasCurtidas.push(musicaFavoritada)
                    db.collection('Usuarios').doc(valor.id).update({Musica: musica})
                })                
            }
        })
    })
}

function cehcarFavoritos(musicaChecar, heart) {
    let feito = false
    let jaTemEssaMusicaNosFavoritos = false

    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {

                for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {
                    if(Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica == musicaChecar.LinkImgiMusica && Usuarios.Musica.MusicasCurtidas[c].LinkAudio == musicaChecar.LinkAudio && Usuarios.Musica.MusicasCurtidas[c].EmailUser == musicaChecar.EmailUser && Usuarios.Musica.MusicasCurtidas[c].NomeMusica == musicaChecar.NomeMusica && feito == false) {
                        feito = true
                        jaTemEssaMusicaNosFavoritos = true
                        heart.src = 'assets/img/icones/icon _heart_.png'
                    }
                }

                function checarMusica() {
                    return new Promise((resolve, reject) => {

                        for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {
                            if(Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica == musicaChecar.LinkImgiMusica && Usuarios.Musica.MusicasCurtidas[c].LinkAudio == musicaChecar.LinkAudio && Usuarios.Musica.MusicasCurtidas[c].EmailUser == musicaChecar.EmailUser && Usuarios.Musica.MusicasCurtidas[c].NomeMusica == musicaChecar.NomeMusica && feito == false) {
                                feito = true
                                resolve('Tem a música')

                            } else if(c + 1 == Usuarios.Musica.MusicasCurtidas.length && feito == false) {
                                feito = true
                                reject('Não tem a música')
                            }
                        }
                    })
                }

                checarMusica().then((resolve) => {
                    heart.src = 'assets/img/icones/icon _heart_.png'

                }).catch((reject) => {
                    heart.src = 'assets/img/icones/icon _heart_ (1).png'
                })                
            }
        })
    })
}

// var p1 = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         resolve("Success!");
//     }, 5000)
//     // or
//     // reject ("Error!");
//   });
  
//   p1.then(function(value) {
//     console.log(value); // Success!
//   }, function(reason) {
//     console.log(reason); // Error!
//   });