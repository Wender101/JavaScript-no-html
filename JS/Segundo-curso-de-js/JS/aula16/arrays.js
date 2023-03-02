// As arrays são listas, coleções de coisas

// As strings são adexissadas, ou sejá, possuem um número para cada letra, Ex:
//          012345
let nome = 'Wender';

// As arrays tbm são indexissadas, só que por elemento e não por letra, Ex:
//                0        1        2
const alunos = ['Luiz', 'Maria', 'João']; // É importante deixar as arrays organizadas, ex: se a array é sobre obj, são terão obj dentro dela
console.log(alunos);
console.log(alunos[1]);

        // Formas de adicionar um valor a array

// Primeira forma de como editar o valor de uma array
alunos[0] = 'Wender'; // O primeiro valor da array vai mudar de Luiz para Wender

// Segunda forma de como editar o valor de uma array
alunos[alunos.length] = 'Zezin'; // Adiciona na ultima posição

// Terceira forma de como editar o valor de uma array
alunos.push('Zezo Cabral'); // Adiciona na ultima posicão

// Terceira forma de como editar o valor de uma array
alunos.unshift('Wislley'); // Adiciona na primeira posição

        // Formas de remover um valor a array

alunos.pop(); // Remove o ultimo individuo 
alunos.shift(); // Remove o primeiro individuo
delete alunos[1]; // Deleta o valor dentro da posição 1, mas não exclui a posição, ou sejá, a posição ficará vazia

// Com essa função tbm é possivel salvar os individuos removidos, Ex
const removido = alunos.pop();

        // Como pegar varios valores de uma array

console.log(alunos.slice(0, 3)); // Vai pegar os elementos 0, 1, 2 o elemento 3 não será incluido
// Ou
console.log(alunos.slice(0, -3));

console.log(removido);
console.log(alunos);
