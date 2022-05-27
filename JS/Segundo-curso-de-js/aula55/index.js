const frutas = ['maça', 'pera', 'uva']

// For normal
for(let c = 0; c < frutas.length; c++) {
    console.log(frutas[c]);
}

console.log('------------------');

for(let i in frutas) {
    console.log(i);
    console.log(frutas[i]);
}

console.log('------------------');

let pessoas = {
    nome: 'Luiz',
    sobrenome: 'Otávio',
    idade: 30
}

console.log(pessoas.nome);
//Ou
console.log(pessoas['nome']);

for(let a in pessoas) {
    console.log(a);
}

console.log('------------------');

for(let a in pessoas) {
    console.log(a, pessoas[a]);
}
