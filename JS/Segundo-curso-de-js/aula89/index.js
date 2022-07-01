const pessoa = {
    nome: 'Luiz',
    sobrenome: 'Otávio'
}

const chave = 'nome'
console.log(pessoa[chave]); // É uma forma dinâmica de pegar um valor do obj, assim eu posso ultilizar uma var
console.log(pessoa['sobrenome'])

// Formas de criar um objeto
const pessoa1 = new Object();
pessoa1.nome = 'Wender Natanael'
pessoa1.sobrenome = 'M. V. dos Santos'
pessoa1.idade = 17
pessoa1.falarnome = function() {
    return (`${this.nome} está falando seu nome.`)
}
pessoa1.getDataNascimento = function() {
    const dataAtual = new Date
    return dataAtual.getFullYear() - this.idade
}
pessoa1.falarnome()
console.log(pessoa1.getDataNascimento())

for(let chave in pessoa1) {
    console.log(pessoa1[chave]);
}