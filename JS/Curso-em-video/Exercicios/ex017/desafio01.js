let num // Input
let selec = document.getElementById('selec') // Onde os valores vão ficar quando adicionados
let c = 0 // Vai  adicionar o valor em um local diferente dentro da Array
let valores = [] // Onde os valores vão ficar armazenados 

function add() {
    num = document.getElementById('num').value // Chama o input

    // Caso o número digitado seja menor que 1 ou maior que 100 vai aparecer uma janela de alerta na tela
    if(num < 1 || num > 100) {
        window.alert('Por favor, informe um número ENTRE 1 e 100.') // Alerta que vai aparecer quando o usuario colocar um número invalido

    } else {
        addSelec = document.createElement('option') // Vai criar um no option para cada valor adicionado
        addSelec.text = `Valor ${num} adicionado` // Vai escrever isso no option
        selec.appendChild(addSelec) // Vai adicionar o option no select
        valores[c] = num // Vai adicionar o valor digitado em um novo lugar na Array
        valores.sort()  // Vai deixar a Array em ordem crescente
        c ++ // Vai mudar o número da variavel c

        let res = document.getElementById('res') // Chama a div#res
        res.innerText = '' // Limpa a div#res
    }

    num.value = ''
    num.focus()
}

function fim() {

    let arr = valores.map(Number); // Passa a Array de string para número

    let soma = arr.reduce(function(soma, i) { // Soma os números da arrey
        return soma + i;
    });

    let aoTodo = document.createElement('p') // Cria um 'p'
    let maioNumero = document.createElement('p') // Cria um 'p'
    let menorNumero = document.createElement('p') // Cria um 'p'
    let somaDosValores = document.createElement('p') // Cria um 'p'
    let media = document.createElement('p') // Cria um 'p'

    aoTodo.innerText = `Ao todo, temos ${c} números cadastrados.` // Escreve no 'p' quantos números foram adicionados ao todo
    maioNumero.innerText = `O maior valor é ${valores[c -1 ]}.` // Escreve o maior valor
    menorNumero.innerText = `O menor valor é ${valores[0]}.` // Escreve o menor valor
    somaDosValores.innerText = `Somando todos os valores, temos: ${soma}.` // Escreve a soma de todos os valores adicionados na Array
    media.innerText = `A média dos valores digitados é ${soma / c}.` // Calcula a média dos valores digitados

    res.appendChild(aoTodo) // Adiciona a div#res o total de números cadastrados
    res.appendChild(maioNumero) // Adiociona a div#res o maior número cadastrado
    res.appendChild(menorNumero) // Adiciona a div#res o menor número cadastrado
    res.appendChild(somaDosValores) // Adiciona a div#res a soma  de todos os valores da Array 
    res.appendChild(media) // Adiciona a div#res a média dos valores que foram digitados
}
