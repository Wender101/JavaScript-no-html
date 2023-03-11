Primeiros passos:

O usuário vai entrar na página de acesso via chave. Nela vai checar se o user já possui uma conta:

    Caso não possua o user terá que informar uma chave se acesso

    Caso possua, o user será enviado a página principal do site

Após informar a chave o site vai checar se ela de fato existe, caso exista enviará ele a página de cadastro / login. Após o user fazer o cadastro, será salvo as seguinte informações:

    Nome do usuario,
    Email do user,

    Musicas Curtidas [
        {
            Nome da música,
            Nome do autor(a),
            Link do audio,
            Link da img de perfil da musica,
            Email de qm postou a musica,
            Estado da música: privado ou pública,
        },
    ],

    Musicas Postadas [
        {
            Nome da música,
            Nome do autor(a),
            Link do audio,
            Link da img de perfil da musica,
            Email do user,
            Estado da música: privado ou pública,
        }
    ],

Depois, o user será enviado a página principal do site(Home).


-----------------------------------------------------------

Funções: 

    1 - Postar músicas:

        Vai adicionar a parte "Todas As Musicas" do banco de dados a sua musica e também na parte "Musicas Postadas" usando as seguinte infomações:

            Musicas Postadas [
                {
                    Nome da música,
                    Nome do autor(a),
                    Link do audio,
                    Link da img de perfil da musica,
                    Email do user,
                    Estado da música: privado ou pública,
                }
            ]

    2 - Marcar música como curtida;

        Ao clicar no ícone de curtir na barra de baixo ao ouvir uma música o site vai salvar essa musica no teu perfil do banco de dados: 

            Musicas Curtidas [
                {
                    Nome da música,
                    Nome do autor(a),
                    Link do audio,
                    Link da img de perfil da musica,
                    Email de qm postou a musica,
                    Estado da música: privado ou pública,
                },
            ]
