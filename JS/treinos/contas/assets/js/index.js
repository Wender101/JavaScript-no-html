let pagar = 0
let status
let pago = false
let total = 0
let articleID = 0
const salvar = []

// Ao clicar no botão adicionar
function adicionar() {
    const sectionAdicionar = document.getElementById('adicionar')
    sectionAdicionar.className = 'adicionar'
    sectionAdicionar.style.top = '140px'
    const sombra = document.getElementById('sombra')
    sombra.style.display = 'block'
}

// Ao clicar no botão enviar
function enviar() {
    fecharAdd()
    // Vai pegar os dados dos inputs
    const vencimento = document.getElementById('vencimento').value
    const desc = document.getElementById('desc').value
    const valor = document.getElementById('valor').value

    criaConta(vencimento, desc, valor, pago, articleID)
    salvarConta(vencimento, desc, valor, pago, articleID)
    const totalPagar = document.getElementById('totalPagar')
    pagar += Number(valor)
    totalPagar.innerText = `Total a pagar: ${pagar.toFixed(2)}`
}

function fecharAdd() {
    // vai adicioar as animações
    const sectionAdicionar = document.getElementById('adicionar')
    sectionAdicionar.className = ''
    sectionAdicionar.style.transition = '400ms top linear'
    sectionAdicionar.style.top = '-600px'
    const sombra = document.getElementById('sombra')
    sombra.style.display = 'none'
    
    const sectionPagar = document.getElementById('pagar')
    sectionPagar.className = ''
    sectionPagar.style.top = '-600px'  
}

// Função responsavel por criar a "conta"
function criaConta(vencimento, desc, valor, pago, id) {
    const emDias = document.getElementById('emDias')
    const vencidas = document.getElementById('vencidas')
    const pagas = document.getElementById('pagas')

    var article = document.createElement('article')
    const p = document.createElement('p')
    const div = document.createElement('div')
    const h4Vencimento = document.createElement('h4')
    const h4Valor = document.createElement('h4')
    
    article.id = id
    p.innerText = desc
    h4Vencimento.innerText = `Vencimento: ${vencimento}`
    h4Valor.innerText = `Valor: ${valor}`
    div.appendChild(h4Vencimento)
    div.appendChild(h4Valor)
    article.appendChild(p)
    article.appendChild(div)
    
    calcularVencimento(vencimento)
    
    if(pago === true) {
        pagas.appendChild(article)
        article.style.background = '#3178E8'
        
    } else if(status === 'Vencida') {
        vencidas.appendChild(article)
        article.style.background = 'rgba(245, 39, 39, 0.808)'
        
    } else if(status === 'Em Dia') {
        emDias.appendChild(article)
    }

    article.addEventListener('click', (e) => {
        const el = e.target.id
        pagarConta(el)
    })
    
    articleID++
}

// Vai identificar se a conta já vencel
function calcularVencimento(vencimento) {
    const data = new Date()
    const hoje = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()

    if(mes < 9 && hoje > 9) {
        var resul = `${ano}0${mes}${hoje}`

    } else if(hoje < 9 && mes > 9) {
        var resul = `${ano}${mes}0${hoje}`

    } else if(mes < 9 && hoje < 9) {
        var resul = `${ano}0${mes}0${hoje}`

    } else {
        var resul = `${ano}${mes}${hoje}`
    }

    const v = vencimento.replace('-', '').trim()
    const ve = v.replace('-', '').trim()
    
    let resultado = Number(resul)
    let datavencimento = Number(ve)

    console.log(resultado)
    console.log(datavencimento)

    if(resultado <= datavencimento) {
        status = 'Em Dia'
    } else {
        status = 'Vencida'
    }
}

function pagarConta(el) {
    const sectionPagar = document.getElementById('pagar')
    sectionPagar.className = 'adicionar'
    sectionPagar.style.top = '140px'
    const sombra = document.getElementById('sombra')
    sombra.style.display = 'block'

    const nao = document.getElementById('nao')
    nao.addEventListener('click', () => {
        fecharAdd()
    })

    const sim = document.getElementById('sim')
    sim.addEventListener('click', () => {
        if(salvar[el].pago === false) {
            salvar[el].pago = true
            var salvarJSON = JSON.stringify(salvar)
            localStorage.setItem('conta', salvarJSON)
            location.reload()

        } else {
            alert('Essa conta já foi paga!')
            return
        }

    })

    const deletarConta = document.getElementById('deletarConta')
    deletarConta.addEventListener('click', () => {
        salvar.splice(el, 1)
        var salvarJSON = JSON.stringify(salvar)
        localStorage.setItem('conta', salvarJSON)
        location.reload()
    })
}

function salvarConta(vencimento, desc, valor, pago, id) {
    const objSalvar = {
        vencimento,
        desc,
        valor,
        pago,
        id
    }

    salvar.push(objSalvar)

    var salvarJSON = JSON.stringify(salvar)
    localStorage.setItem('conta', salvarJSON)
}

function escreverContaSalva() {
    const conta1 = localStorage.getItem('conta')
    const conta2 = JSON.parse(conta1)

    let c = 0
    for(let q of conta2) {
        articleID = c
        salvar.push(conta2[c])
        criaConta(conta2[c].vencimento, conta2[c].desc, conta2[c].valor, conta2[c].pago, c)
        c++
    }

    // Vai adicionar o valor ao menu
    for(let c = 0; c < salvar.length; c++) {
        if(salvar[c].pago == false) {
            const totalPagar = document.getElementById('totalPagar')
            pagar += Number(salvar[c].valor)
            totalPagar.innerText = `Total a pagar: ${pagar.toFixed(2)}`

        } else if(salvar[c].pago == true) {
            const totalPago = document.getElementById('totalPago')
            total += Number(salvar[c].valor)
            totalPago.innerText = `Total pago: ${total.toFixed(2)}`
        }
    }
}
escreverContaSalva()

// Vai ditar a ordem na qual as contas vão ser exibidas
function ordem() {
    const ordem = document.getElementById('ordem').value
    const emDias = document.getElementById('emDias')
    const vencidas = document.getElementById('vencidas')
    const pagas = document.getElementById('pagas')


    if(ordem == 'Todas') {
        emDias.style.display = 'block'
        vencidas.style.display = 'block'
        pagas.style.display = 'block'

    } else if(ordem == 'Em dias') {
        emDias.style.display = 'block'
        vencidas.style.display = 'none'
        pagas.style.display = 'none'

    } else if(ordem == 'Vencidas') {
        emDias.style.display = 'none'
        vencidas.style.display = 'block'
        pagas.style.display = 'none'
        
    } else {
        emDias.style.display = 'none'
        vencidas.style.display = 'none'
        pagas.style.display = 'block'
    }
}