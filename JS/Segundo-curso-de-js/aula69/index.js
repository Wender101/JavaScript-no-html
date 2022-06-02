// arguments sustenta todos os argumentos enviados
function funcao() {
    console.log('Oie,', arguments[0]);
}
funcao('Valor', 1, 2, 3, 4, 5, 6, 7, 8,9);

function funcao2() {
    let total = 0;
    for (let argumentos of arguments) {
        total += argumentos;
    }
    console.log(total);
}

funcao2(1, 2, 3, 4, 5, 6, 7, 8, 9);

// Primeira forma de envitar que dê erro caso o b não seja enviado
function funcao3(a, b) {
    b = b || 0;
    console.log(a + b);
}
funcao3(2);

// Segunda e mais recente forma de envitar que dê erro caso o b não seja enviado
function funcao4(a, b = 0) {
    console.log(a + b);
}
funcao4(2);

// Unica maneira de pular o um valor
function funcao5(a, b = 2, c = 4) {
    console.log(a + b + c);
}
funcao5(2, undefined, 20);

function funcao6({nome, sobrenome, idade}) {
    console.log(nome, sobrenome, idade);
}
funcao6({nome: 'Luiz', sobrenome: 'Otávio', idade: 20});

// Esses 3 pontinho "..." faz com que todo o resto va pra ele
const conta = function(operador, acumulador, ...numeros) {
    for (let numero of numeros) {
        if (operador == '+') acumulador += numero;
        if (operador == '-') acumulador -= numero;
        if (operador == '*') acumulador *= numero;
        if (operador == '/') acumulador /= numero;
        console.log(acumulador);
    }
};
conta('+', 0, 20, 30, 40, 50);
