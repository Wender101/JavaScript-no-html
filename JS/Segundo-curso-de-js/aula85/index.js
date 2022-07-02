// Dobre os valores dos números
const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27]

// Vai retornar a array 'numeros', só que com os seus valores multiplicados por '2'
const numerosEmDobro = numeros.map(valor => valor * 2)
console.log(numerosEmDobro);

// Para cada elemento:
// Retorne apenas uma string com o nome da pessoa
// Remova apenas a chame "nome" do objeto
// Adicione uma chave id em cada objeto
const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Maria', idade: 23},
    {nome: 'Eduardo', idade: 55},
    {nome: 'Wender', idade: 16},
    {nome: 'Letícia', idade: 19},
    {nome: 'Rosana', idade: 32},
    {nome: 'Wallace', idade: 47}
]

const soNomes = pessoas.map(obj => obj.nome)
console.log(soNomes)

const soIdade = pessoas.map(obj => ({idade: obj.idade}))
console.log(soIdade)

// Essa forma vai alterar o obj original
/* const comIds = pessoas.map((obj, indice) => {
    obj.id = indice
    return obj
})*/

// Já essa não vai alterar o valor do array
const comIds = pessoas.map((obj, indice) => {
    const newObj = {...obj}
    newObj.id = indice
    return newObj
})
console.log(comIds);