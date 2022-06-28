// Filter, map, reduce

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27]

// Retornar os números maiores que 10
const numerosMaioresQue10 = []
for(let c = 0; c < numeros.length; c++) {
    if(numeros[c] > 10) {
        numerosMaioresQue10.push(numeros[c])
    }
    
    if(c == numeros.length -1) {
        console.log(numerosMaioresQue10)
    }
}

// OU ... Forma longa
console.log('Forma longa')
function callbackFilter(valor, indice, array) {
    if(valor > 10) {
        return true
    } else {
        return false
    }
}

const numerosFiltrados = numeros.filter(callbackFilter)
console.log(numerosFiltrados)

// OU ... Forma curta
console.log('Forma curta')

const numerosFiltrados2 = numeros.filter(valor => valor > 10)
console.log(numerosFiltrados2)


// Retorne as pessoas que tem o nome com 5 letras ou mais
// Retorne as pessoas com mais de 50 anos
// Retorne as pessoas cujo nome ternina com a
const pessoas = [
    {nome: 'Wender', idade: 16},
    {nome: 'Luiz', idade: 26},
    {nome: 'Otávio', idade: 60},
    {nome: 'Zé', idade: 56},
    {nome: 'Chico', idade: 76},
    {nome: 'Amanda', idade: 6},
    {nome: 'Astra', idade: 20}
]

// Vai retornar nomes maires ou iguais a 5 letras
const nomeCincoLetrasOuMais = pessoas.filter(obj => obj.nome.length >= 5)
console.log(nomeCincoLetrasOuMais);

// Vai retornar pessoas com mais de 50 anos
const maisDe50Anos = pessoas.filter(anos => anos.idade > 50)
console.log(maisDe50Anos);

// Retorna nomes que terminam com 'A'
const nomeTerminaComA = pessoas.filter(nomePessoa => nomePessoa.nome.toLowerCase().endsWith('a'))
console.log(nomeTerminaComA);
