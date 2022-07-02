// Some todos os números (Reduce)
// Retorne um array com os pares (Filter)
// Retorne um array com o dobro dos valores (Map)

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27]

// Somando os números
console.log('Soma');
const total = numeros.reduce((acumulador, valor, indice, array) => {
    acumulador += valor
    return acumulador
}, 0) // Valor inicial
console.log(total);

// Só os pares
// OBS não é recomendado fazer isso com o reduce, faça isso com a função filter
console.log('Apenas os números pares');
const pares = numeros.reduce((acumulador, valor) => {
    if(valor % 2 === 0) acumulador.push(valor)
    return acumulador
}, [])
console.log(pares);

// Dobro dos valores
// OBS não é recomendado fazer isso com o reduce, faça isso com a função map
console.log('Valor em dobro');
const dobro = numeros.reduce((acumulador, valor) => {
    acumulador.push(valor * 2)  
    return acumulador
}, [])
console.log(dobro);

// Retorne o pessoa mais velha
const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Maria', idade: 23},
    {nome: 'Wender', idade: 16},
    {nome: 'Eduardo', idade: 18},
    {nome: 'Wallace', idade: 78}
]

console.log('Mais velho');
const maisVelho = pessoas.reduce((acumulador, valor,) => {
    if(acumulador.idade > valor.idade) return acumulador
    return valor
})
console.log(maisVelho);


