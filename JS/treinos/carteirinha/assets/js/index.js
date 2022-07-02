function fecharAdd() {
    const add = document.getElementById('add')
    const sombra = document.getElementById('sombra')

    add.style.display = 'none'
    sombra.style.display = 'none'
}

// Animação de carregando
function processando() {
    const carregando = document.getElementById('carregando')
    carregando.style.display = 'block'

    setTimeout(() => {
        carregando.style.display = 'none'
        fecharAdd()
    }, 1000)
}

function enviar() {
    const inputImg = document.getElementById('inputImg').value
    const inputNome = document.getElementById('inputNome').value
    const inputCargo = document.getElementById('inputCargo').value
    const inputexpedicao = document.getElementById('inputexpedicao').value
    const inputCidade = document.getElementById('inputCidade').value
    const inputNaturalidade = document.getElementById('inputNaturalidade').value
    const inputNascimento = document.getElementById('inputNascimento').value
    const inputCPF = document.getElementById('inputCPF').value
    const inputEstadoCivil = document.getElementById('inputEstadoCivil').value
    const inputMembroDesde = document.getElementById('inputMembroDesde').value
    const inputFiliacao1 = document.getElementById('inputFiliacao1').value
    const inputFiliacao2 = document.getElementById('inputFiliacao2').value

    preeecheCarteirinha(inputImg, inputNome, inputCargo, inputexpedicao, inputCidade, inputNaturalidade, inputNascimento, inputCPF, inputEstadoCivil, inputMembroDesde, inputFiliacao1, inputFiliacao2)

    processando()
} 

function preeecheCarteirinha(inputImg, inputNome, inputCargo, inputexpedicao, inputCidade, inputNaturalidade, inputNascimento, inputCPF, inputEstadoCivil, inputMembroDesde, inputFiliacao1, inputFiliacao2) {

    //* Primeira parte
    const imagem = document.getElementById('imgPessoa')
   const nome = document.getElementById('nome') 
   const cargo = document.getElementById('cargo')
   const expedicao = document.getElementById('expedicao')
   const cidade = document.getElementById('cidade')

   const pnome = document.createElement('p')
   const pcargo = document.createElement('p')
   const pexpedicao = document.createElement('p')
   const pcidade = document.createElement('p')

    imagem.style.backgroundImage = `url('assets/img/${inputImg}')`

   pnome.innerText = inputNome
   nome.appendChild(pnome)

   pcargo.innerText = inputCargo
   cargo.appendChild(pcargo)

   pexpedicao.innerText = inputexpedicao
   expedicao.appendChild(pexpedicao)

   pcidade.innerText = inputCidade
   cidade.appendChild(pcidade)

   //* Segunda parte
   const naturalidade = document.getElementById('naturalidade')
   const nascimento = document.getElementById('nascimento')
   const cpf = document.getElementById('cpf')
   const estadoCivil = document.getElementById('estadoCivil')
   const membroDesde = document.getElementById('membroDesde')
   const filiacao = document.getElementById('filiacao')

    const pnaturalidade = document.createElement('p')
    const pnascimento = document.createElement('p')
    const pcpf = document.createElement('p')
    const pestadoCivil = document.createElement('p')
    const pmembroDesde = document.createElement('p')
    const pfiliacao1 = document.createElement('p')
    const pfiliacao2 = document.createElement('p')

    pnaturalidade.innerText = inputNaturalidade
    naturalidade.appendChild(pnaturalidade)

    pnascimento.innerText = inputNascimento
    nascimento.appendChild(pnascimento)

    pcpf.innerText = inputCPF
    cpf.appendChild(pcpf)

    pestadoCivil.innerText = inputEstadoCivil
    estadoCivil.appendChild(pestadoCivil)

    pmembroDesde.innerText = inputMembroDesde
    membroDesde.appendChild(pmembroDesde)

    pfiliacao1.innerText = inputFiliacao1
    filiacao.appendChild(pfiliacao1)

    pfiliacao2.innerText = inputFiliacao2
    filiacao.appendChild(pfiliacao2)
}