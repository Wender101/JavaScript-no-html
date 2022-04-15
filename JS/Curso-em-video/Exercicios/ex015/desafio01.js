function contar() {
    let ini = document.getElementById('txti')
    let fim = document.getElementById('txtf')
    let passo = document.getElementById('txtp')
    let res = document.getElementById('res')

    //Testar se o valor dado foi  igaul a 0
    if(ini.value.length == 0 || fim.value.length == 0 || passo.value.length == 0) {
        res.innerHTML = 'Imposível contar!'

    } else {
        res.innerHTML = 'Contando: <br>' //Quando usa-se o 'innerHTML' vc pode adicionar tags normalmente! Já o 'innerText' não
        let i = Number(ini.value)
        let f = Number(fim.value)
        let p = Number(passo.value)

        if(p <= 0) {
            window.alert(`Passo invalido! Considerando passo 1`)
            p = 1
        }

        if(i < f) {
            for(let c = i; c <= f; c += p) {
                //forma de colocar um emoji no Js
                res.innerHTML += `\u{1f449} ${c}` 
            } 

        } else {
            for(let c = i; c >= f; c -= p) {
                res.innerHTML += `\u{1f449} ${c}`
            }
        }
        res.innerHTML += `\u{1f3c1}`
    }
}