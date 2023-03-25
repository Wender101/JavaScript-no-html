let btnEditarPerfil = document.querySelector('#PagPessoal')

btnEditarPerfil.addEventListener('click', () => {
    console.log(1);
    db.collection('Usuarios').onSnapshot((data) => {
    data.docs.map(function(valor) {
        let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {
                abrirPlaylist(valor.id, Usuarios.Musica.MusicasPostadas)
            }
        })
    })
})