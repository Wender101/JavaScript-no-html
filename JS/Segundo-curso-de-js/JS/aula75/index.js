// This
// O this sempre vai se referir a quem o chamou, é como se ele recebece o valor de quem o chamou

// Factory function (Função fábrica)
function criarPessoa(nome, sobrenome, altura, peso) {
    return {
        nome,
        sobrenome,
        get nomeCompleto() {
            return `${this.nome} ${this.sobrenome}`;
        },

        set nomeCompleto(valor) {
           valor = valor.split(' ');
           this.nome = valor.shift();
           this.sobrenome = valor.join(' ');
           console.log(valor); 
        },

        fala: function(assunto = 'falando sobre NADA') {
            return `${this.nome} está ${assunto}.`;
        },

        altura,
        peso,

        // Esse get serve pra transformar uma função em atributo
        get imc() {
            const indice = this.peso / (this.altura ** 2);
            return indice.toFixed(2);
        }
    };
}

const p1 = criarPessoa('Wender', 'Natanael', 1.8, 80);
const p2 = criarPessoa('Zezin', 'Gostoso', 1.6, 42);
console.log(p1.fala('falando sobre JS'), p1.imc);
console.log(p2.fala('falando sobre JS'), p2.imc);
p1.nomeCompleto = 'Maria Oliveira Silva';
console.log(p1.nomeCompleto);
console.log(p1.sobrenome);
console.log(p1.fala());