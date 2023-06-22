let inputName = document.querySelector('#nomeUser')

let email1
let email2
function login() {
    if(inputName.value.length > 0) {
        auth.signInWithPopup(provider).then((result) => {

            //? Caso o user log em uma conta já existente vai ser direcionado pro Home
            if(result.operationType == 'signIn' && result.user.email == email2) {
                location.href = 'Home.html'
            }
        })

    } else {
        //? Caso aperte logar sem escrever seu nome
        inputName.className = 'inputVazio'
        setTimeout(() => {
            inputName.className = ''
        }, 2000)
    }
}

auth.onAuthStateChanged((val) => {

    try {
        if(val.email) {
            let feito = false
            email1 = val.email

            if(email2 == undefined) {
                email2 = val.email
            }

            //? Vai checar se o user logado tem uma conta ou não
            let temConta = false
            function checkUsers() {
                return new Promise((resolve, reject) => {
                    db.collection('Users').onSnapshot((data) => {
                    data.docs.map(function (valor) {
                        let Users = valor.data()

                        //? Vai checar se o user já tem uma conta
                        if (Users.Email == email1) {
                            temConta = true
                        }
                    })

                        resolve() //? Indica que a verificação foi concluída
                    })
                })
            }

            checkUsers()
            .then(() => {

                if (!temConta) {
                    //? Caso o user não tenha uma conta vai criar para ele
                    console.log('Email não encontrado. criamos uma conta novinha para vc!')
                    const ContaUser = {
                        Email: email1,
                        NomeUsers: inputName.value,
                        PlanoDaConta: 'Normal',
                        FotoDePerfil: 'Normal',

                        SalaUser: {
                            BackgroundImg: 'Normal',
                        },
                    } 
                    
                    if(feito == false) {
                        feito = true
                        db.collection('Users').add(ContaUser).then(() => {
                            location.href = 'Home.html'
                        })
                    }

                } else {
                    //? Caso uma conta for encontrada, vai perguntar se o user quer logar nela
                    if(confirm(`Você já tem uma conta cadastrada: ${email1} Deseja se conectar com este email?`)) {
                        location.href = 'Home.html'
                    }
                }
            })
            .catch((error) => {
                //? Lida com possíveis erros na verificação
                console.error(error)
            })
        }
    }catch(e){console.warn(e)}
})