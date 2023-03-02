const paragrafos = document.querySelector('.paragrafos')
const ps = document.querySelectorAll('p')

const estiloBody = getComputedStyle(document.body)
const backgroundBody = estiloBody.backgroundColor
console.log(backgroundBody)

for(let p of ps) {
    p.style.background = backgroundBody
    p.style.color = 'white'
}