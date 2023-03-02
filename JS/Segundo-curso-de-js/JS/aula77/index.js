// Função construtora retorna objs. Sempre prescisa iniciar o seu nome com letra maiúscula
// Função fabrica, fabrica os objs

// Função construtora
function Pessoa(nome, sobrenome) {
    // Atributos privados, porque não estão disponiveis fora da função
    const ID = 123456;
    const metodoInterno = ()=> {

    };

    // Atributos ou métodos públicos
    this.nome = nome;
    this.sobrenome = sobrenome;

    this.metodo = ()=> {
        console.log(this.nome + ': sou um método');
    }
}

// O new serve para indicar que eu quero criar uma nova pessoa 'nesse caso'.
const p1 = new Pessoa('Luiz', 'Otávio');
const p2 = new Pessoa('Wender', 'Natanael');
p1.metodo();

