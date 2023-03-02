function ePaisagem (largura, altura) {
    if(largura > altura) {
        return true
    } else {
        return false
    }
}

console.log(ePaisagem(900, 100));

// ou

const ePaisagem2 = (largura, altura) => largura > altura;

console.log(ePaisagem2(900, 1000));