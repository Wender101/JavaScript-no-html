// let feitoAA = false
// let cloneMusicasPostadas = []
// console.log('rodando 1')
// db.collection('TodasAsMusicas').onSnapshot((data) => {
//     data.docs.map(function(valor) {
//         let TodasAsMusicas = valor.data() 

//         for(let c = 0; c < TodasAsMusicas.Musicas.length; c++) {
//             if(TodasAsMusicas.Musicas[c].EmailUser == 'danielentoni75@gmail.com') {
//                 cloneMusicasPostadas.push(TodasAsMusicas.Musicas[c])
//             }
//         }


//         setTimeout(() => {
//             if(feitoAA == false) {
//                 feitoAA = true
//                 console.log('rodando')
//                 db.collection('Usuarios').onSnapshot((data) => {
//                     data.docs.map(function(val) {
//                         let user = val.data()

//                         if(user.infUser.Email == 'danielentoni75@gmail.com') {
//                             let forma = {
//                                 MusicasCurtidas: [],
//                                 MusicasPostadas: cloneMusicasPostadas,
//                                 Playlist: user.Musica.Playlist
//                             }
//                             db.collection('Usuarios').doc(val.id).update({Musica: forma})
//                         }
//                     })
//                 })
//             }
//         }, 5000)
//     })
// })