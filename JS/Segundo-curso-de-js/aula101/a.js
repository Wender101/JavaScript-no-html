// Map()
// É usado quando for preciso traduzir ou mapear todos os elementos de um arary para outro conjunto de valores

const numbers = [1, 4, 56, 7, 87, 78]
const dobraValores = numbers.map( elem => elem * 2)
console.log(dobraValores, numbers)

const pessoas = [
    { id: 3, nome: 'Luiz' },
    { id: 2, nome: 'Wender' },
    { id: 1, nome: 'Maria' },
]
const novasPessoas = new Map()
for(const pessoa of pessoas) {
    const { id } = pessoa 
    novasPessoas.set(id, { ...pessoa})
}