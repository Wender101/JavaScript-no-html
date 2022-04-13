let num
let selec = document.getElementById('selec')
let c = 0
let valores = []

function add() {
    num = document.getElementById('num').value

    if(num < 2 || num > 99) {
        window.alert('Por favor, informe um número ENTRE 1 e 100.')

    } else {
        addSelec = document.createElement('option')
        addSelec.text = `Valor ${num} adicionado`
        selec.appendChild(addSelec)
        valores[c] = num
        valores.sort()
        c ++
    }

}

function fim() {

    console.log(`Ao todo, temos ${c} números cadastrados`)
    console.log(`O maior valor é ${valores[c -1 ]}`)
    console.log(`O menor valor é ${valores[0]}`)
    console.log(`Somando todos os valores, temos: ${soma}`);
    
}
