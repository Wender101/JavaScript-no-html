// Tipos de funções

// Factory functions
function criaPessoa(nome, sobrenome) {
    return {
        nome,
        sobrenome,
        get nomeCompleto() {
            return `${this.nome} ${this.sobrenome}`
        }
    }
}

const p1 = criaPessoa('Wender Natanael', 'M. V. dos Santos')
console.log(p1.nomeCompleto);

// Controctor functions
function Pessoa(nome, sobrenome) {
    this.nome = nome
    this.sobrenome = sobrenome
}

const p2 = new Pessoa('Wislley', 'M. V. dos Santos')
console.log(`${p2.nome} ${p2.sobrenome}`);

// Impedir que o objeto seje modificado
Object.freeze(p2)