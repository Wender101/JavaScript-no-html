let FriendsBtn = document.querySelector('#FriendsBtn')
FriendsBtn.addEventListener('click', () => {
    document.querySelector('#abaFriends').style.right = '0px'
    document.querySelector('#sombraAboutMusicaUser').style.display = 'block'

    if(document.querySelector('#menuTocandoMusica').style.bottom == '0px') {
        document.querySelector('#abaFriends').style.height = 'calc(100vh - 100px)'
    } else {
        document.querySelector('#abaFriends').style.height = '100vh'
    }
})

document.querySelector('#sombraAboutMusicaUser').addEventListener('click', () => {
    document.querySelector('#abaFriends').style.right = '-100vw'
    document.querySelector('#sombraAboutMusicaUser').style.display = 'none'
    document.querySelector('#aboutMusicaUser').style.display = 'none'
})

let addFriendBtn = document.querySelector('#addFriend')

addFriendBtn.addEventListener('click', () => {
    //? Vai add o novo amigo
    let inputEmailNewFriend = document.querySelector('#emailNewFriend')
    if(inputEmailNewFriend.value.length > 0) {
        checarSePedidoJaFoiEnviado(inputEmailNewFriend.value).then((resolve) => {
            addNewFriend(inputEmailNewFriend.value).then((resolve) => {
                setTimeout(() => {
                    alert(resolve)
                    inputEmailNewFriend.value = ''
                }, 200)
    
            }).catch((reject) => {
                setTimeout(() => {
                    alert(reject)
                    inputEmailNewFriend.value = ''
                }, 200)
            })
        }).catch((reject) => {
            alert(reject)
            inputEmailNewFriend.value = ''
        })
    }
})

function checarSePedidoJaFoiEnviado(emailQuemFezPedido) {
    let feito = false
    return new Promise((resolve, reject) => {
        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Usuarios = valor.data()

                if(Usuarios.infUser.Email == emailQuemFezPedido && feito == false) {
                    feito = true
                    let encontrado = false

                    try {
                        if(Usuarios.infUser.Amigos.Pendentes.length <= 0) {
                            resolve()
                            
                        } else {
                            for(let c = 0; c < Usuarios.infUser.Amigos.Pendentes.length; c++) {
                                if(Usuarios.infUser.Amigos.Pendentes[c] == email) {
                                    encontrado = true
                                    reject('Você já tem um pedido pendente, espere a resposta.')
    
                                } else if(c + 1 == Usuarios.infUser.Amigos.Pendentes.length && encontrado == false) {
                                    resolve()
                                }
                            }
                        }
                    } catch (error) {
                        resolve()
                    }
                }
            })
        })
    })
}

//? Função add novo amigo
function addNewFriend(emailAmigoAdd) {
    let feito = false
    return new Promise((resolve, reject) => {
        db.collection('Usuarios').onSnapshot((data) => {
            data.docs.map(function(valor) {
                let Usuarios = valor.data()

                if(Usuarios.infUser.Email == emailAmigoAdd && feito == false) {
                    feito = true

                    //? Caso haja a parte Amigos no perfil do user add, ele vai add em pendentes o email do user atual
                    if(Usuarios.infUser.Amigos != undefined && Usuarios.infUser.Amigos != null) {
                        try {
                            let clonePerfilNewFriend = Usuarios.infUser
                            clonePerfilNewFriend.Amigos.Pendentes.push(email)
                            db.collection('Usuarios').doc(valor.id).update({infUser: clonePerfilNewFriend})
                            resolve('Pedido enviado com sucesso!')
                        } catch (error) {
                            reject('Houve um erro ao enviar o pedido de amizade, error: ' + error)
                        }

                    } else {
                        try {
                            let FotoPerfil = ''
                            let ImgParedePerfil = ''
                            let Online = 0
                            let userEstaOuvindo = {}

                            if(Usuarios.infUser.FotoPerfil != undefined && Usuarios.infUser.FotoPerfil != null) {
                                FotoPerfil = Usuarios.infUser.FotoPerfil
                            }

                            if(Usuarios.infUser.ImgParedePerfil != undefined && Usuarios.infUser.ImgParedePerfil != null) {
                                ImgParedePerfil = Usuarios.infUser.ImgParedePerfil
                            }

                            if(Usuarios.infUser.Online != undefined && Usuarios.infUser.Online != null) {
                                Online = Usuarios.infUser.Online
                            }

                            if(Usuarios.infUser.userEstaOuvindo != undefined && Usuarios.infUser.userEstaOuvindo != null) {
                                userEstaOuvindo = Usuarios.infUser.userEstaOuvindo
                            }

                            let clonePerfilNewFriend = {
                                Amigos: {
                                    Pendentes: [],
                                    ListaAmigos: []
                                },
                                Email: Usuarios.infUser.Email,
                                Nome: Usuarios.infUser.Nome,
                                FotoPerfil,
                                ImgParedePerfil,
                                Online,
                                userEstaOuvindo
                            }
    
                            clonePerfilNewFriend.Amigos.Pendentes.push(email)
                            db.collection('Usuarios').doc(valor.id).update({infUser: clonePerfilNewFriend})
                            resolve('Pedido enviado com sucesso!')
                            
                        } catch (error) {
                            reject('Houve um erro ao enviar o pedido de amizade, error: ' + error)
                        }

                    }
                }
            })
        })
    })
}

//! Vai checar se não há pedidos de amizade
function checarPedidosDeAmizade() {
    let contadorPedido = 0
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()

            if(Usuarios.infUser.Email == email) {
                try {
                    if(Usuarios.infUser.Amigos.Pendentes.length > 0) {

                        //? Vai pesquisar qm enviou o pedido de amizade
                        function pesquisarQmEnvoouPedidoDeAmizade(contador) {
                            let feito = false
                            return new Promise((resolve, reject) => {
                                db.collection('Usuarios').onSnapshot((data) => {
                                    data.docs.map(function(valor2) {
                                        let Usuarios2 = valor2.data()
    
                                        try {
                                            if(Usuarios2.infUser.Email == Usuarios.infUser.Amigos.Pendentes[contador] && feito == false) {
                                                //feito = true
                                                
                                                document.querySelector('#perfilPedido').querySelector('img').src = Usuarios2.infUser.FotoPerfil
                                                document.querySelector('#perfilPedido').querySelector('strong').innerText = Usuarios2.infUser.Nome
    
                                                let aceitarPedido = document.querySelector('#aceitarPedido')
                                                let recusarPedidoBtn = document.querySelector('#recusarPedido')
                            
                                                aceitarPedido.addEventListener('click', () => {
                                                    //? Vai add o amigo no perfil pessoal do user
                                                    let clonePerfilNewFriend = Usuarios.infUser
                                                    clonePerfilNewFriend.Amigos.ListaAmigos.push(Usuarios.infUser.Amigos.Pendentes[contador])
                                                    clonePerfilNewFriend.Amigos.Pendentes.splice(contador, 1)
                                                    db.collection('Usuarios').doc(valor.id).update({infUser: clonePerfilNewFriend})
                                                    //amigos()
    
                                                    //? Vai add o user no perfil pessoal no novo amigo
                                                    if(Usuarios2.infUser.Amigos == undefined || Usuarios2.infUser.Amigos == null) {
                                                        let FotoPerfil = ''
                                                        let ImgParedePerfil = ''
                                                        let Online = 0
                                                        let userEstaOuvindo = {}

                                                        if(Usuarios2.infUser.FotoPerfil != undefined && Usuarios2.infUser.FotoPerfil != null) {
                                                            FotoPerfil = Usuarios2.infUser.FotoPerfil
                                                        }

                                                        if(Usuarios2.infUser.ImgParedePerfil != undefined && Usuarios2.infUser.ImgParedePerfil != null) {
                                                            ImgParedePerfil = Usuarios2.infUser.ImgParedePerfil
                                                        }

                                                        if(Usuarios2.infUser.Online != undefined && Usuarios2.infUser.Online != null) {
                                                            Online = Usuarios2.infUser.Online
                                                        }

                                                        if(Usuarios2.infUser.userEstaOuvindo != undefined && Usuarios2.infUser.userEstaOuvindo != null) {
                                                            userEstaOuvindo = Usuarios2.infUser.userEstaOuvindo
                                                        }
                                                        
                                                        let clonePerfilDoNovoAmigo = {
                                                            Amigos: {
                                                                Pendentes: [],
                                                                ListaAmigos: []
                                                            },
                                                            Email: Usuarios2.infUser.Email,
                                                            Nome: Usuarios2.infUser.Nome,
                                                            FotoPerfil,
                                                            ImgParedePerfil,
                                                            Online,
                                                            userEstaOuvindo
                                                        }
                                                        clonePerfilDoNovoAmigo.Amigos.ListaAmigos.push(email)
                                                        db.collection('Usuarios').doc(valor2.id).update({infUser: clonePerfilDoNovoAmigo})
                                                        document.querySelector('#pedidosPendentes').style.right = '-100vw'

                                                    } else {
                                                        let clonePerfilDoNovoAmigo = Usuarios2.infUser
                                                        clonePerfilDoNovoAmigo.Amigos.ListaAmigos.push(email)
                                                        db.collection('Usuarios').doc(valor2.id).update({infUser: clonePerfilDoNovoAmigo})
                                                        document.querySelector('#pedidosPendentes').style.right = '-100vw'
                                                    }
                                                })
    
                                                resolve()
                                            }
                                        } catch{}
                                    })
                                })
                            })
                        } pesquisarQmEnvoouPedidoDeAmizade(contadorPedido).then((resolve) => {
                            document.querySelector('#pedidosPendentes').style.right = '25px'
        
                            if(Usuarios.infUser.Amigos.Pendentes.length > 1) {
                                document.getElementsByClassName('btnsPedido')[0].style.display = 'block'
                                document.getElementsByClassName('btnsPedido')[1].style.display = 'block'
                            }
                        }).catch((reject) => {})
    
                    }
                } catch{}
            }
        })
    })
} setTimeout(() => {
    checarPedidosDeAmizade()
}, 3000)

//! Vai mostrar os amigos na tela
function amigos() {
    let feito1 = false
    let feito = false
    db.collection('Usuarios').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let Usuarios = valor.data()
            
            if(Usuarios.infUser.Email == email && feito == false) {
                let localPefilAmigo = document.querySelector('#abaFriends').querySelector('ul')
                //feito = true
                
                try {
                    if(Usuarios.infUser.Amigos.ListaAmigos.length > 0 && feito1 == false) {
                        localPefilAmigo.innerHTML = ''
                        feito1 = true
                        setTimeout(() => {
                            feito1 = false
                        }, 500)
                        
                        for (let c = 0; c < Usuarios.infUser.Amigos.ListaAmigos.length; c++) {
    
                            let feito = false
                            db.collection('Usuarios').onSnapshot((data) => {
                                data.docs.map(function(valor2) {
                                    let Usuarios2 = valor2.data()
                        
                                    if(Usuarios2.infUser.Email == Usuarios.infUser.Amigos.ListaAmigos[c] && feito == false) {
                                        feito = true
                                        let li = document.createElement('li')
                                        let bollOnline= document.createElement('div')
                                        let divNome = document.createElement('div')
                                        let strong = document.createElement('strong')
                                        let p = document.createElement('p')
                                        bollOnline.className = 'bollOnline'
    

                                        //? Vai checar se o user está on, ausente ou off
                                        let estadoAmigo = 'off'
                                        try {
                                            fetch("https://worldtimeapi.org/api/ip").then(response => response.json()).then(data => {
                                                var hora_servidor = new Date(data.datetime)
                                                var horas = hora_servidor.getHours()
                                                var minutos = hora_servidor.getMinutes()
                                                var ano = hora_servidor.getFullYear()
                                                var mes = hora_servidor.getMonth()
                                                var dia = hora_servidor.getDate()
                                            
                                        
                                                let Data = `${mes}${dia}${ano}`
                                                let Horas = `${horas}${minutos}`
                                                let resData = parseInt(Data) - Usuarios2.infUser.Online.Data
                                                let resHoras = parseInt(Horas) - Usuarios2.infUser.Online.Horas
                                                if(resData == 0 && resHoras <= 5) {
                                                    bollOnline.style.background = '#0DCBA9'
                                                    document.querySelector('#bollOnline2').style.background = '#0DCBA9'
                                                    p.innerHTML = `Ouvindo: <span>${Usuarios2.infUser.userEstaOuvindo.NomeMusica}</span>`
                                                    estadoAmigo = 'on'

                                                } else if(resData == 0 && resHoras > 5 && resHoras <= 8) {
                                                    bollOnline.style.background = 'orange'
                                                    document.querySelector('#bollOnline2').style.background = 'orange'
                                                    p.innerHTML = `<span style="color: orange;">Ausente...</span>`
                                                    estadoAmigo = 'ausente'

                                                } else {
                                                    bollOnline.style.background = 'red'
                                                    document.querySelector('#bollOnline2').style.background = 'red'
                                                    p.innerHTML = `<span style="color: red;">Offline...</span>`
                                                    estadoAmigo = 'off'
                                                }

                                                //! ---

                                                li.innerHTML = `<img src="${Usuarios2.infUser.FotoPerfil}" onerror = "this.onerror=null; this.src='assets/img/icones/icon _profile_.png'; this.style='object-fit: contain'">`
                                                //li.style.backgroundImage=`url("${Usuarios2.infUser.ImgParedePerfil}")`
                                                strong.innerText = Usuarios2.infUser.Nome
            
                                                divNome.appendChild(strong)
                                                divNome.appendChild(p)
                                                li.appendChild(bollOnline)
                                                li.appendChild(divNome)
                                                localPefilAmigo.appendChild(li)

                                                function segundaAba() {
                                                    return new Promise((resolve, reject) => {
                                                        if(li.querySelector('img').src != 'assets/img/icones/icon _profile_.png') {
                                                            document.querySelector('#perfilMusica').querySelector('img').src = Usuarios2.infUser.FotoPerfil
                                                            document.querySelector('#perfilMusica').querySelector('img').style.objectFit = 'cover'
                                                        } else {
                                                            document.querySelector('#perfilMusica').querySelector('img').src = 'assets/img/icones/icon _profile_.png'
                                                            document.querySelector('#perfilMusica').querySelector('img').style.objectFit = 'contain'
                                                        }
    
                                                        document.querySelector('#perfilMusica').querySelector('strong').innerText = Usuarios2.infUser.Nome
    
                                                        try {
                                                            document.querySelector('#perfilMusica').style.backgroundImage=`url("${Usuarios2.infUser.ImgParedePerfil}")`
                                                        } catch{}
    
                                                        document.querySelector('#aboutSongFriend').querySelector('div').querySelector('img').src = Usuarios2.infUser.userEstaOuvindo.LinkImgiMusica
                                                        if(estadoAmigo != 'off') {
                                                            if(estadoAmigo == 'on') {
                                                                document.querySelector('#bollOnline2').style.background = '#0DCBA9'
                                                            } else {
                                                                document.querySelector('#bollOnline2').style.background = 'orange'
                                                            }
    
                                                            document.querySelector('#aboutSongFriend').style.display = 'flex'
                                                            document.querySelector('#aboutSongFriend').querySelector('div').querySelector('div').querySelector('strong').innerText = Usuarios2.infUser.userEstaOuvindo.NomeMusica
                                                            document.querySelector('#aboutSongFriend').querySelector('div').querySelector('div').querySelector('p').innerText = Usuarios2.infUser.userEstaOuvindo.NomeAutor
                
                                                            document.querySelector('#aboutSongFriend').querySelector('div').addEventListener('click', () => {
                                                                darPlayNaMusica(Usuarios2.infUser.userEstaOuvindo)
                                                            })
                                                        } else {
                                                            document.querySelector('#bollOnline2').style.background = 'red'
                                                            document.querySelector('#aboutSongFriend').style.display = 'none'
                                                        }

                                                        resolve()
                                                    })
                                                } document.querySelector('#aboutMusicaUser').style.display = 'none'

                                                //! Funções de click
                                                li.addEventListener('mouseenter', () => {
                                                    segundaAba().then((resolve) => {
                                                        document.querySelector('#aboutMusicaUser').style.display = 'block'
                                                    }).catch((reject) => {})
                                                })

                                            }).catch(error => console.error(error))

                                        } catch{}

                                        // li.addEventListener('mouseleave', () => {
                                        //     document.querySelector('#aboutMusicaUser').style.display = 'none'
                                        // })
                                    }
                                })
                            })
                        }
                    }
                } catch{}
            }
        })
    })
} amigos()