// Os números negativos representam o tamanho da array menos o índice do elemento passado. 
// Ex: tamanho da array = 4, e o índice = 2: 2 -4 = -2
//               -4         -3       -2       -1 
//                0          1        2        3
const nomes = ['Wender', 'Otávio', 'Luiz', 'Maria']

// nomes.splice(índice, delete, elementos para adicionar)
const removidos = nomes.splice(-4, 1)
console.log(nomes, removidos);

// OBS: o Number.MAX_VALUE pega o maior número que determinada coisa possui. Ex:
// const removidos = nomes.splice(-4, Number.MAX_VALUE)

// Para adicionar algo usando o splice...
const add = nomes.splice(2, 0, 'Zé')
console.log(nomes);

