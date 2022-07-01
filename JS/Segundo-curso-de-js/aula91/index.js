// Define property -> Getter e Setters
function Produto(nome, preco, estoque) {
    this.nome = nome
    this.preco = preco

    Object.defineProperty(this, 'estoque', {
        enumerable: true,
        value: true,
       get: () => {
        return estoqeu;
       }
    })
}

const p1 = new Produto('Camisa', 20, 3)
console.log(p1)