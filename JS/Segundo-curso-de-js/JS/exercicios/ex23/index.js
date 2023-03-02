// Meta, Fazer a varíavel A ter o valor de B, B ter o valor de C, e C o valor de A

let varA = 'A';
let varB = 'B';
let varC = 'C';

// Forma antiga de se fazer:

// const varATemp = varA;
// varA = varB;
// varB = varC;
// varC = varATemp;

// Forma mais nova:
[varA, varB, varC] = [varB, varC, varA] // Inverte os valores sem ter que criar uma nova varíavel

console.log(varA, varB, varC );