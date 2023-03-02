// Escopo léxico

const nome = 'Luiz';

function falaNome() {
    console.log(nome);
}

function usaFalaNome() {
    const nome = 'Wender'
    falaNome()
}
usaFalaNome()

