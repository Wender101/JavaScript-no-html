// Contrutora -> molde (classe)
function Pessoa(nome, sobrenome) {
    this.nome = nome
    this.sobrenome = sobrenomebre
    this.nomeCompleto = () => this.nome + ' ' + this.sobrenome
}

// intância
const pessoa1 = new Pessoa('Luiz', '0.') // <-Pessoa = Função construtora
const pessoa2 = new Pessoa('Maria', 'A.') // <-Pessoa = Função construtora

console.dir(pessoa1);
console.dir(pessoa2);