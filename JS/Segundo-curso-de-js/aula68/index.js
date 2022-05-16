// Declaração de função (Função hoisting)
falarOi(); // Chamar a função antes da função
function falarOi() {
    console.log('oi');
}

// As funções são First-class objects (objetos de primeria classe)
// Function expression 
const souUmDado = function() {
    console.log('Sou um dado.');
};

function executarFuncao(funcao) {
    console.log('Vou executar sua função abaixo:');
    funcao();
}
executarFuncao(souUmDado);

// Arroy function
const funcaoArrow = () => {
    console.log('Sou uma arrow function');
};

funcaoArrow()