var n1 = Number.parseFloat(window.prompt('Digite um número: '))
var n2 = Number.parseFloat(window.prompt('Digite outro número: '))//Se vc usar tanto número inteiro quanto número real colocando apenas ("Number") ao inves de ("Number.parseFloat") por exemplo

var soma = n1 + n2

window.alert('A soma dos valores é: ' + soma)
window.alert(`A soma entre ${n1} e ${n2} é ${soma}`)