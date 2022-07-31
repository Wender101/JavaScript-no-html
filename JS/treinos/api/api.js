fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL').then(resposta => {
    return resposta.json()

}).then(corpo => {
    const valor = Number(corpo.USDBRL.ask)
    const h1 = document.querySelector('h1')
    h1.innerText += ` ${valor.toFixed(2)}`
})