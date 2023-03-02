function soma(x, y) {
    const resultado = x + y;
    console.log('Soma de ' + x + ' e ' + y);
    return resultado; // A partir do momento que o interpertador do Js encontrar o "return", nada mais da função será execultado, Ex:
    console.log('Isso não será execultado!');
}

console.log(soma(2, 2));
const resultado = console.log(soma(1, 5)); // Essa variável tem o mesmo nome da variável de dentro da função, mas ela não foge de escopo, e por isso eu posso usar uma variável de mesmo nome aqui.

// Caso os parametros não recebam valor, e vc não quiser que o resultado sejá "NaN" vc pode fazer como no Ex abaixo
function subtracao(a = 0, b = 0) {
    const resultado = a - b;
    console.log('Subtração de ' + a + ' e '+ b);
    return resultado;
}
console.log(subtracao());

//                                 Função Anonima

// Neste caso, a função precisa do ponto e virgula
const raiz = function (n) {
    console.log('---------------------------');
    console.log('Raiz  quadrada de: ' + n);
    return n ** 0.5;
};

console.log(raiz(9));
console.log(raiz(19));
console.log(raiz(89));
console.log('---------------------------');

//                                  Arrow Function

// Caso haja apenas 1 parametro
const ArrowFunction = z => z + 'Natanael';
console.log(ArrowFunction('Wender '));

// Caso haja mais de um parametro 
const ArrowFunction2 = (u, t) => u + t;
console.log(ArrowFunction2('Wislley ', 'Marques'));
