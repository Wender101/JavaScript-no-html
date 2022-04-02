var idade  = 40  
var resposta = ''  

if(idade < 16) {
    resposta = 'você ainda não vota!'

} else if(idade >= 16 && idade < 18 || idade > 65) {

    resposta = 'o seu voto é opcional!'

} else if(idade >= 18) {

    resposta = 'o seu voto é obrigatório!'
}

console.log(`Você tem ${idade} anos, ${resposta}`)