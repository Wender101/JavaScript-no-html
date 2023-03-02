function Produto(nome, preco) {
    this.nome = nome
    this.preco = preco
}

//^ Desconto
Produto.prototype.desconto = function(percentual) {
    this.preco = this.preco - (this.preco * (percentual / 100))
} 

//^ Almenta preço
Produto.prototype.aumento = function(percentual) {
    this.preco = this.preco + (this.preco * (percentual / 100))
} 

const p1 = new Produto('Camiseta', 50)

// Literal
const p2 = {
    nome: 'Caneca',
    preco: 15
}
Object.setPrototypeOf(p2, Produto.prototype)
p2.aumento(10)

const p3 = Object.create(Produto.prototype)
p3.preco = 113
p3.aumento(10)

p1.desconto(100)
console.log(p1);
console.log(p2);
console.log(p3);