class Pessoa {
    constructor(nome, sobrenone) {
        this.nome = nome;
        this.sobrenome = sobrenone;
    }

    get nomeCompleto() {
        return this.nome + ' ' + this.sobrenome;
    }

    set nomeCompleto(valor) {
        valor = valor.split(' ');
        this.nome = valor.shift();
        this.sobrenome = valor.join(' ');
    }
}

const p1 = new Pessoa('Wender Natanael', 'M. V. dos Santos')
p1.nomeCompleto = 'Wender Natanael M. V. dos Santos'
console.log(p1.nome);
console.log(p1.sobrenome);