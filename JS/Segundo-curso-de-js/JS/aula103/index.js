// //const _velocidade = Symbol('velocidade');
// class Carro {
//     constructor(nome) {
//         this.nome = nome;
//         this.velocidade = 0;
//     }

//     acelerar() {
//         if(this.velocidade >= 100) return;
//         this.velocidade++;
//     }

//     freiar() {
//         if(this.velocidade <= 0) return;
//         this.velocidade--;
//     }
// }

// const c1 = new Carro('Fusca');

// for(let c = 0; c < 200; c++) {
//     c1.acelerar();
// }

// //! isso vai almentar a velocidade acima do permitido lá na função, para evitar isso podemos usar uma chaver
// c1.velocidade = 1500;

// console.log(c1);

const _velocidade = Symbol('velocidade');
class Carro {
    constructor(nome) {
        this.nome = nome;
        this[_velocidade] = 0;
    }
    
    set velocidade(valor) {
        console.log('SETTER');
        if(typeof valor != 'number') return;
        if(valor >= 100 || valor <= 0) return;
        this[_velocidade] = valor;
    }

    //! Vai pegar a 'velocidade', e enviar o 'symbol _velocidade'
    get velocidade() {
        console.log('GETTER');
        return this[_velocidade];
    }

    acelerar() {
        if(this[_velocidade] >= 100) return;
        this[_velocidade]++;
    }

    freiar() {
        if(this[_velocidade] <= 0) return;
        this[_velocidade]--;
    }
}

const c1 = new Carro('Fusca');

for(let c = 0; c < 200; c++) {
    c1.acelerar();
}

c1.velocidade = 1500;

console.log(c1.velocidade);