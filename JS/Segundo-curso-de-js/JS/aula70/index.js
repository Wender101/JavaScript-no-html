// return
// retorna um valor
// termina a função
function soma(a, b) {
    return a + b;
}
console.log(soma(2, 4));

function criaPessoa(nome, sobrenome) {
    return {nome, sobrenome}
}

const p1 = criaPessoa('Luiz', 'Otávio');
console.log(p1);

function falaFrase(comeco) {
    function falaResto(resto) {
        return `${comeco} ${resto}`;
    }
    return falaResto;
}

const olaMundo = falaFrase('Olá');
console.log(olaMundo('Mundo!'));

// Onde isso seria utíu
function duplica(n) {
    return n * 2;
}

function triplica(n) {
    return n * 3;
}

function quadriplica(n) {
    return n * 4;
}

console.log(`1º forma: ${duplica(2)} - ${triplica(2)} - ${quadriplica(2)}`);

// Melhor forma de fazer o mesmo
function criaMultiplicador(multiplicador) {
    return function(n) {
        return n * multiplicador;
    };
}

const duplica2 = criaMultiplicador(2);
const triplica2 = criaMultiplicador(3);
const quadriplica2 = criaMultiplicador(4);

console.log(`2º forma: ${duplica2(2)} - ${triplica2(2)} - ${quadriplica2(2)}`);
