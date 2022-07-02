// defineProperty - defineProperties

// Deixar o estoque como "privado"
function Produto(nome, preco, estoque) {
    Object.defineProperty(this, 'estoque', {
        enumerable: true, // Mostra chave
        value: estoque, // Mostra valor
        writable: true, // Diz se o valor pode ou não ser alterado
        configurable: false // Diz se a chave pode ser configurada (Deletada, alterada etc...)
    })

    Object.defineProperties(this, {
        nome: {
            enumerable: true,
            value: nome,
            writable: true,
            configurable: true
        },

        preco: {
            enumerable: true,
            value: preco,
            writable: true,
            configurable: true
        }
    })
}

const p1 = new Produto('Camiseta', 20, 3)
p1.estoque = 5000 // vai alterar o valor caso o "writable" esetiver como "true"
delete p1.estoque // vai deletar o estoque caso o "configurable" estiver como "true"
console.log(p1)