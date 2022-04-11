let valores = [2, 3, 4, 5, 6, 7, 8, 9,]

//Primeira forma
for(let pos = 0; pos < valores.length; pos++) {
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`);
}

console.log('------------------------------- Segunda forma');

//Forma mais simplificada de fazer
for(let pos in valores) {
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`);
}

