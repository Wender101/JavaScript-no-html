// Closures é a abilidade que a função tem em acessar o seu corpo léxico
function retornaFuncao() {
    const nome = 'Luiz';
    return function () {
        return nome;
    };
}

const funcao = retornaFuncao();
console.log(funcao);
