// Tratando erros
try {
    console.log(naoExisto);

} catch(err) {
    console.log('nãoExisto não existe');
}

function soma(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw('x e y precisam ser números.');
    }
    return x + y;
}

try {
    console.log(soma(1, 2));
    console.log(soma(1, 'o'));

} catch(error) {
    console.log(error);
} finally {
    console.log('Finally: Eu sempre sou executado');
}