let contador = 1
document.addEventListener('keydown', e => {
    if(e.keyCode == 13) {
        const input = document.querySelector('input').value
        if(input == Number()) {
            api(input)
            
        } else {
            const input = document.querySelector('input')
            api(input.value.toLowerCase())
            input.value = ''
        }  
    }
})

function proximo() {
    if(contador < 649) {
        contador++
        api(contador)
    }
}

function voltar() {
    if(contador > 649) {
        contador = 649
        api(contador)

    } else if(contador > 1) {
        contador = contador - 1
        api(contador)
    }
}

function api(c) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${c}`).then(resposta => {
        return resposta.json()
    
    }).then(corpo => {
        contador = corpo.id
        const localGif = document.getElementById('gif')
        const localName = document.getElementById('name')
        const localNumber = document.getElementById('number')
        
        if(c > 649) {
            localGif.style.display = 'none'
            localNumber.style.display = 'none'
            localName.style.color = 'red'
            localName.innerText = 'Não encontrado...'

        } else {
            localGif.style.display = 'block'
            localNumber.style.display = 'inline-block'
            localName.style.color = 'black'

            localGif.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${corpo.id}.gif`
            localNumber.innerText = `${corpo.id} - `
            localName.innerText = `${corpo.name}`
        }
    })
} api(1)