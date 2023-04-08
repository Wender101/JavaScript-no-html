function favoritarMusica(musicaFavoritada) {
    let jaTemEssaMusicaNosFavoritos = false
    let feito = false

    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {

                for(let c = 0; c < Usuarios.Musica.MusicasCurtidas.length; c++) {
                    if(Usuarios.Musica.MusicasCurtidas[c].LinkImgiMusica == musicaFavoritada.LinkImgiMusica && Usuarios.Musica.MusicasCurtidas[c].LinkAudio == musicaFavoritada.LinkAudio && Usuarios.Musica.MusicasCurtidas[c].EmailUser == musicaFavoritada.EmailUser && Usuarios.Musica.MusicasCurtidas[c].Nome == musicaFavoritada.Nome && feito == false) {
                        feito = true
                        jaTemEssaMusicaNosFavoritos = true

                        let musica = Usuarios.Musica
                        musica.MusicasCurtidas.splice(c, 1)

                        db.collection('Usuarios').doc(valor.id).update({Musica: musica})
                    }
                }

                setTimeout(() => {
                    if(jaTemEssaMusicaNosFavoritos == false) {
                        jaTemEssaMusicaNosFavoritos = true
                        feito = true
                        let musica = Usuarios.Musica
                        musica.MusicasCurtidas.push(musicaFavoritada)

                        db.collection('Usuarios').doc(valor.id).update({Musica: musica})
                    }
                }, 500)
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
                        console.log('Tem a música');
                    }
                }

                setTimeout(() => {
                    if(jaTemEssaMusicaNosFavoritos == false) {
                        jaTemEssaMusicaNosFavoritos = true
                        feito = true
                        heart.src = 'assets/img/icones/icon _heart_ (1).png'
                        console.log('N tem a música');
                    }
                }, 500)
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