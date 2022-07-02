/*
Javascriptébaseado em protótipos para passar propriedadesemétodos
de um objeto para outro.

Definição de protótipo
Protótipoéotermo usado para se referir ao que foi criado pela
primeira vez,servindo de modelo ou molde para futuras produções.

/Todos os objetos tem uma referência interna para um protótipo(_proto_)
que vem da propriedade prototype da função construtora que foi usada para
criá-lo.Quando tentamos acessar um membro de um objeto,primeiroomotor
do JS vai tentar encontrar este membro no próprio objetoedepoisacadeia
de protótiposéusada atéotopo (null) até encontrar (ou não) tal membro.
*/

function Pessoa(nome, sobrenome) {
    this.nome = nome
    this.sobrenome = sobrenome
//    this.nomeCompleto = () => 'ORIGINAL' + this.nome + ' ' + this.sobrenome
}

// Pessoa.prototype === pessoa1.__proto__

Pessoa.prototype.nomeCompleto = () => {
    return this.nome + ' ' + this.sobrenome
}

const pessoa1 = new Pessoa('Wender', 'N.') // <- Pessoa = Função construtora
const data = new Date() // <-- Date = função construtora

console.log(pessoa1)
console.log(data)