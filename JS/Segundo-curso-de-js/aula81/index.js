// Outra forma de construir um array
const nome = new Array('zezin', 'zé');
console.log(nome);

console.log('--------------');
// OBS: se uma variavél receber uma array e o valor dessa variavél for alterado, o da array tbm será! Ex:
const numeros = [1, 2, 3, 4, 5, 6]
const novo = numeros

novo.pop();
console.log(numeros);

console.log('--------------');
// Para evitar isso, usamos:
const numeros2 = [1, 2, 3, 4, 5, 6]
const novo2 = [...numeros2] // Com isso eu faço uma cópia

novo2.pop();
console.log(numeros2);
console.log(novo2);

console.log('-------- Converter string em array ------');
const nomeCompleto = 'Wender Natanael Marques Vieira dos Santos'
const arrayNome = nomeCompleto.split(' ')
console.log(arrayNome);

// para voltar a ser uma string, usa-se o 'join(' ')'

