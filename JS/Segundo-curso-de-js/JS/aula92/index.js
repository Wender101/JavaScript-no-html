/*
Object.values
Object.entries
Object.assign(des,any)
Object.getown Property Descriptor(0,'prop')
...(spread)
Já vimos
Object.keys(retorna as chaves)
Object.freeze(congelaoobjeto)
Object.defineProperties

Object.defineProperties(define várias propriedades)
Object.defineProperty(define uma propriedade)
*/

//& Fomas de copiar um objeto

//* 1º Forma
console.log('-------Primeira forma')
const produto = {nome: 'Caneca', preco: 1.80}
const caneca = {...produto}

caneca.nome = 'Outro nome'
caneca.preco = 2.5
console.log(produto)
console.log(caneca)

//* 2º Forma
console.log('-------Segunda forma')
const produto2 = {nome: 'Caneca', preco: 1.80}
const caneca2 = Object.assign({}, produto, {material: 'porcelana'})

caneca2.nome = 'Outro nome'
caneca2.preco = 2.5
console.log(produto2)
console.log(caneca2)

//* 3º Forma
console.log('-------Terceira forma')

//^ Forma mais manual
const produto3 = {nome: 'Caneca', preco: 1.80}
const caneca3 = {
    nome: produto3.nome, 
    preco: produto3.preco
}

caneca3.nome = 'Outro nome'
caneca3.preco = 2.5
console.log(produto3)
console.log(caneca3)



