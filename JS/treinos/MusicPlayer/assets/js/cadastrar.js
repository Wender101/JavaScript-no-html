document.querySelector('button').addEventListener('click', () => {
    let inputNome = document.querySelector('input').value

    if(inputNome.length > 0) {
       login()
    }
})