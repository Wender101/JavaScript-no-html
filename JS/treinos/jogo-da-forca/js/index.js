let palavra = window.prompt('')
let quantasLetras = palavra.length
const section = document.getElementById('letras')

//Vai criar uma linha pra cada letra
for(let totalLetras = 0; totalLetras < quantasLetras; totalLetras +=1) {
    let div = document.createElement('div')
    section.appendChild(div)
}




