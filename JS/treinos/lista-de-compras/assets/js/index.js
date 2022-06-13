const salvar1 = localStorage.getItem('listaSalva');
const produtoSalvo = JSON.parse(salvar1);
let arraySalvar = [] 

for(let c = 0; c < produtoSalvo.length; c++) {
    arraySalvar.push(produtoSalvo[c])
}

const feito1 = localStorage.getItem('listaSalva');
const produtoFeito = JSON.parse(feito1);
let salvarFeito = [] 

for(let c = 0; c < produtoFeito.length; c++) {
    salvarFeito.push(produtoFeito[c])
}

function abrirAdd() {
    const addProduto = document.getElementById('addProduto')
    const quantidade = document.getElementById('quantidade')
    const sombra = document.getElementById('sombra')
    const nome = document.getElementById('nome')
    addProduto.style.display = 'block'
    sombra.style.display = 'block'
    
    quantidade.value = ''
    nome.value = ''
}

function enviar() {
    criarProduto()
}

// Criar produtos
function criarProduto() {
    // Valor dos inputs
    const quantidade = document.getElementById('quantidade').value
    const nome = document.getElementById('nome').value
    
    if(nome && quantidade > 0) {
        const produtos = document.getElementById('produtos')
        const addProduto = document.getElementById('addProduto')
        const sombra = document.getElementById('sombra')
        produtos.style.display = 'block'
        addProduto.style.display = 'none'
        sombra.style.display = 'none'

        const localProdutos = document.getElementById('localProdutos')
        const div = document.createElement('div')
        const p = document.createElement('p')
        const btnApagar = document.createElement('button')
        const btnFeito = document.createElement('button')
    
        p.innerText = `${quantidade} ${nome}`
        btnApagar.className = 'apagar'
        btnFeito.className = 'feito'
        div.className = 'div'
        div.appendChild(p)
        div.appendChild(btnApagar)
        div.appendChild(btnFeito)
        localProdutos.appendChild(div)

        salvarProduto(p.innerText)

        // Clicar em excluir
        for(let c = 0; c < arraySalvar.length; c++) {
            let btnsApagar = document.getElementsByClassName('apagar')[c]
            let btnFeito = document.getElementsByClassName('feito')[c]
            let divs = document.getElementsByClassName('div')[c]
            let ps = document.getElementsByTagName('p')[c]

            // Ao clicar no btn apagar...
            btnsApagar.addEventListener('click', function() {
                divs.remove()
                arraySalvar.splice(c, 1)
                salvarProduto()
            })

            btnFeito.addEventListener('click', function() {
                criarProdutoFeito(ps.innerText)
                salvarProdutoFeito(ps.innerText)
                divs.remove()
                arraySalvar.splice(c, 1)
                salvarProduto()
            })
        }

    } else {
        window.alert('Preencha todos os campos antes de continuar.')
    }

}

function salvarProduto(a) {
        arraySalvar.push(a)
        var salvarJSON = JSON.stringify(arraySalvar);
        localStorage.setItem('listaSalva', salvarJSON);
}

function escreverProdutoSalvo() {
    for(let c = 0; c < arraySalvar.length; c++) {
        const produtos = document.getElementById('produtos')
        produtos.style.display = 'block'
        if(arraySalvar[c] != null) {
            const localProdutos = document.getElementById('localProdutos')
            const div = document.createElement('div')
            const p = document.createElement('p')
            const btnApagar = document.createElement('button')
            const btnFeito = document.createElement('button')
        
            p.innerText = arraySalvar[c]
            btnApagar.className = 'apagar'
            btnFeito.className = 'feito'
            div.className = 'div'
            div.appendChild(p)
            div.appendChild(btnApagar)
            div.appendChild(btnFeito)
            localProdutos.appendChild(div)     
        }
    }

    for(let c = 0; c < salvarFeito.length; c++) {
        criarProdutoFeito(salvarFeito[c])
    }
}

escreverProdutoSalvo()

// Clicar em excluir
for(let c = 0; c < arraySalvar.length; c++) {
    let btnsApagar = document.getElementsByClassName('apagar')[c]
    let btnFeito = document.getElementsByClassName('feito')[c]
    let divs = document.getElementsByClassName('div')[c]
    let ps = document.getElementsByTagName('p')[c]

    // Ao clicar no btn apagar...
    btnsApagar.addEventListener('click', function() {
        divs.remove()
        arraySalvar.splice(c, 1)
        salvarProduto()
    })

    btnFeito.addEventListener('click', function() {
        criarProdutoFeito(ps.innerText)
        salvarProdutoFeito(ps.innerText)
        divs.remove()
        arraySalvar.splice(c, 1)
        salvarProduto()
    })
}

// Vai criar o produto marcado como feito
function criarProdutoFeito(a) {
    const feitos = document.getElementById('feitos')
    const div = document.createElement('div')
    const p = document.createElement('p')

    p.innerText = a
    div.appendChild(p)
    feitos.appendChild(div)
}
criarProdutoFeito()

// Vai salvar os produtos marcados como feito
function salvarProdutoFeito(a) {
    salvarFeito.push(a)
    var feitoJSON = JSON.stringify(salvarFeito);
    localStorage.setItem('feito', feitoJSON);
}
