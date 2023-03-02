// Obj em js é basicamente uma array, só que mais comentada.
const pessoa1 = {
    nome: 'Luiz',
    sobrenome: 'Miranda',
    idade: 25
};

console.log(pessoa1.nome);

// pode se criar uma função dentro de um obj, EX:
const pessoa2 = {
    nome: 'José',
    sobrenome: 'Zezin',
    idade: 35,

    fala() {
        console.log(`${this.nome} ${this.sobrenome} está falando a minha idade atual é ${this.idade}.`);
    },

    incrementoIdade() {
        this.idade++;
    }
};

pessoa2.fala();
pessoa2.incrementoIdade();
pessoa2.fala();