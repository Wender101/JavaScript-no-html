// Define property -> Getter e Setters
function Produto(nome, preco, estoque) {
    this.nome = nome
    this.preco = preco

    Object.defineProperty(this, 'estoque', {
        enumerable: true,
        configurable: true,
       get: () => {
        return estoque;
       }, 

       set: valor => {
        
       }
    })
}

const p1 = new Produto('Camisa', 20, 3)
console.log(p1)
p1.estoque = 'O valor que eu quero'
console.log(p1.estoque)