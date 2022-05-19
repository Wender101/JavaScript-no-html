// Atribuição via desestruturação

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// Forma errada
// const primeiroNumero = numeros[0];
// console.log(primeiroNumero);

// Se vc criar com const todos serão const, e assim por diante
// o 'resto' (ele pode ter qualquer nome, esse foi só um exemplo), é usado para pegar o resto do array que não foi usado
// Vc pode pular valores
// const [um, , três] nesse caso vc pulou o 2 
const [primeiroNumero, segundoNumero, ...resto] = numeros;
console.log(resto);
console.log('--------------------------------------------');

// Array dentro de outra array
const arrayUm = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ];
// pra acessar o valor que está dentro da array dentro da array usa-se
console.log(arrayUm[1][2]); // vai acessar o 6
// ou
const [, [, , seis]] = arrayUm;
console.log(seis);

