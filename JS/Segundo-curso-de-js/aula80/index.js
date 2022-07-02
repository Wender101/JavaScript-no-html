// Função geradora, ela te da um retorno por vez a cada vez que chamada
function* geradora1() {
    // Código qualquer ...
    yield 'Valor 1';
    // Código qualquer ...
    yield 'Valor 2';
    // Código qualquer ...
    yield 'Valor 3';
    // Código qualquer ...
    yield 'Valor 4';
}

const g1 = geradora1();

// Precisa no '.next()' para funcionar
console.log(g1.next());
console.log(g1.next());

// Se eu quiser pegar apenas o valor, eu uso o 'value'
console.log(g1.next().value);

// Se eu quiser saber o estado da função (se já acabou ou não) eu uso o 'done'
console.log(g1.next().done);

console.log('---------- Usando o for Para Fazer a Chamada -----------');

function* geradora2() {
    // Código qualquer ...
    yield 'Valor 1';
    // Código qualquer ...
    yield 'Valor 2';
    // Código qualquer ...
    yield 'Valor 3';
    // Código qualquer ...
    yield 'Valor 4';
}

const g2 = geradora2();

for(let valor of g2) {
    console.log(valor);
}

console.log('---------- Gerador Infinito -----------');

function* contador() {
    let i = 0;

    while(true) {
        yield i;
        i++;
    } 
}

const c = contador();
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);

console.log('---------- Delegando Funções -----------');

function* geradora3() {
    yield 0;
    yield 1;
    yield 2;
}

function* geradora4() {
    yield* geradora3();
    yield 3;
    yield 4;
    yield 5;
}

const g4 = geradora4();
for(let valor of g4) {
    console.log(valor);
}