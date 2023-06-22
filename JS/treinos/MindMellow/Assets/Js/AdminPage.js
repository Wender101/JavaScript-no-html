//? Vai carregar as infos do adminLogado
function infoAdmin() {
    db.collection('Users').onSnapshot((data) => {
        data.docs.map(function (valor) {
            let Users = valor.data()

            if(Users.Email == emailUser) {
                document.querySelector('#adminName').innerHTML = Users.NomeUsers

                if(Users.FotoDePerfil == 'Normal') {
                    auth.onAuthStateChanged((val) => {
                        if(val.email) {
                            document.querySelector('#imgPerfilAdmin').src = val.photoURL
                        }
                    })

                } else {
                    document.querySelector('#imgPerfilAdmin').innerHTML = Users.FotoDePerfil
                }
            }
        })
    })
} infoAdmin()


document.querySelector('#buttonMenu').addEventListener('click', () => {
    if(document.querySelector('nav').className == 'navAberto') {
        document.querySelector('nav').className = ''
    } else {
        document.querySelector('nav').className = 'navAberto'
    }
})

document.addEventListener('click', function(event) {
    var elemento = document.querySelector('nav')
    var clicouDentro = elemento.contains(event.target)
    
    if (!clicouDentro) {
      elemento.className = ''
    }
})
