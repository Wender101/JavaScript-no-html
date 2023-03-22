let configBtn = document.querySelector('#config')
let nav = document.querySelector('nav')

configBtn.addEventListener('click', () => {
    nav.className = 'navVisible'
})

document.addEventListener('click', (e) => {
    let tagElemento = e.target.className
    console.log(tagElemento);

    if(tagElemento != 'menuBtns') {
        nav.className = ''
    }
})