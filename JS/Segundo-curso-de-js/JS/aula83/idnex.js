const a1 = [1, 2, 3]
const a2 = [4, 5, 6]
const a3 = a1.concat(a2, [7, 8, 9], 'Wender'); // Vai concatenar o a1 com o a2
console.log(a3);

// Segunda forma
console.log('Segunda forma');
const a4 = [...a1, ...a2, ...[7, 8, 9], 'Wender']
console.log(a4);
