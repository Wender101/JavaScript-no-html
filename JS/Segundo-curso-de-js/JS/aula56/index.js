const nomes = ['Luiz', 'Arroiz', 'Zezin']

// For classico - Geralmente com interáveis (array ou strings)
// For in - Retorna o índice ou chave (string, array ou objs)
// For of -Retorna o valor em si (array ou strings)
for(let c = 0; c < nomes.length; c++) {
    console.log(nomes[c]);
}
console.log('####');

for(let i in nomes) {
    console.log(nomes[i]);
}
console.log('####');

for(let valor of nomes) {
    console.log(valor);
}

console.log('####');

nomes.forEach(function(el) {
    console.log(el);
})

console.log('####');

// O for in funciona melhor com objs
const people = {
    nome: 'Luiz',
    sobrenome: 'Otávio'
}

for(let i in people) {
    console.log(people[i]);
}