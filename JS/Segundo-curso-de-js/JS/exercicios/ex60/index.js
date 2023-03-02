// Escreva uma função que receba 2 números e retorne i maior deles
function max(x, y) {
    return x > y ? x : y;
}

console.log(max(10, 2));

// ou

const max2 = (x, y) => x > y ? x : y;
console.log(max2(100, 2));
