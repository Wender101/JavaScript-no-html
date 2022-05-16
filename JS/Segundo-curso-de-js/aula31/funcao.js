// a palavra entre parenteses "nome" é chamada de "parametro"
function saudacao(nome) {
    console.log(`Bom dia ${nome}!`);
    return 123456;
}

// O valor dado nesse parametro vai ser atribuido ao parametro "nome"
saudacao('Wender');

// Tbm é possivel fazer...
const variavel = saudacao('Luiz');
console.log(variavel);