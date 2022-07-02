// Define property -> Getter e Setters
function Produto(nome, preco, estoque) {
    this.nome = nome
    this.preco = preco

    let estoquePrivado = estoque
    Object.defineProperty(this, 'estoque', {
        enumerable: true,
        configurable: true,
        get: () => {
            return estoquePrivado;
        }, 

        // Vai fazer com que o valor só seja alterado se for um número
        set: valor => {
            if(typeof valor != 'number') {
                throw new TypeError('Mensagem') // Vai dar um erro casso o valor sejá uma string
            }

            estoquePrivado = valor
        }
    })
}

function criaProduto(nome) {
    return {
        get nome() {
            return nome
        },

        set nome(valor) {
            valor = valor.replace(' coisa.', '') // vai subistituir "coisa" por nada
            nome = valor
        }
    }
}

const p1 = new Produto('Camisa', 20, 3)
console.log(p1)
//p1.estoque = 'O valor que eu quero'
console.log(p1.estoque)

const p2 = criaProduto('Camiseta')
p2.nome = 'Qualquer coisa.'
console.log(p2.nome)