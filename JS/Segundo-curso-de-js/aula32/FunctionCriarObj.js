function criarPessoa(nome, sobrenome, idade) {
    // Forma 1
    return {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade
    };

    // Ou pode ser feito dessa forma pra evitar repetição

    return {
        nome,
        sobrenome,
        idade
    };
}

const pessoa1 = criarPessoa('Luiz', 'Miranda', 25); // O ato de enviar um valor ao parametro, se chama "argumento"
console.log(pessoa1.nome);