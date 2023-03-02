// IIFE -> immediately invoked function expression
(function(idade, peso, altura) {
    const sobrenome = 'Natanael'
    function criarNome(nome) {
        return nome + ' ' + sobrenome;
    }

    function falaNome() {
        console.log(criarNome('Wender'));
    }

    falaNome();
    console.log(idade, peso, altura);
})(30, 80, 1.80);