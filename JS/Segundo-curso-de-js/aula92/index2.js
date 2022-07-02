const produto = {nome: 'Caneca', preco: 1.8}
console.log(Object.getOwnPropertyDescriptor(produto, 'nome'))

console.log(Object.values(produto)) //^ Pega apenas os valores do produto
console.log(Object.entries(produto)) //^ Retorna chave e valor dentro de uma array
