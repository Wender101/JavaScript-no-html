let inputp
let inputh2

// Pega a lista salva do navegador
const tarefas = localStorage.getItem('tarefas');
const listaDeTarefas = JSON.parse(tarefas);

//Abre uma aba para criar uma nova tarefa
function addTarefa() {
    inputp = document.getElementById('description')
    inputh2 = document.getElementById('name')
    let sectionCriar = document.getElementById('criar')
    let sombra = document.getElementById('sombra')
    sectionCriar.style.display = 'block'
    sombra.style.display = 'block'

    inputp.value = ''
    inputh2.value = ''
}

let btnNovaTarefa = document.getElementById('nova-tarefa')
let obj = {}
let salvarlista = []

btnNovaTarefa.addEventListener('click', function() {
    inputp = document.getElementById('description').value
    inputh2 = document.getElementById('name').value

    if(inputp.length ==  0|| inputh2.length == 0) {
        window.alert('Por Favor, preencha todos os campos.')
    } else {
        criaTarefa(inputp, inputh2)
        document.addEventListener('mousemove', function() {
            for(let c = 0; c < listaDeTarefas.length; c++) {
                let btnsApagar = document.getElementsByClassName('apagar')[c]
                let divs = document.getElementsByClassName('div')[c]
                btnsApagar.addEventListener('click', function() {
                    divs.remove()
                    salvarlista.splice(c, 1)
                    var tarefasJSON = JSON.stringify(salvarlista);
                    localStorage.setItem('tarefas', tarefasJSON);
                })
            }
        })
    }
})

function criaTarefa(x, y) {
    let sectionCriar = document.getElementById('criar')
    let sombra = document.getElementById('sombra')
    const main = document.querySelector('main')

    //Vai fazer a aba de criar tarefa sumir
    sectionCriar.style.display = 'none'
    sombra.style.display = 'none'

    //Vai criar uma div
    let novaTarefa = document.createElement('div')
    novaTarefa.className = 'div'
    main.appendChild(novaTarefa)

    //Vai criar um p e um h2 na div com o texto dos inputs
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let btnApagar = document.createElement('button')
    let divbtn = document.createElement('div')
    p.innerText = x
    h2.innerText = y
    btnApagar.className = 'apagar'
    btnApagar.innerText = 'Apagar'
    novaTarefa.appendChild(h2)
    novaTarefa.appendChild(p)
    novaTarefa.appendChild(divbtn)
    divbtn.appendChild(btnApagar)
    
    obj = {
        titulo: y,
        desc: x
    }
    
    salvarlista.push(obj)
    
    var tarefasJSON = JSON.stringify(salvarlista);
    localStorage.setItem('tarefas', tarefasJSON);
    
}

// Vai Adicionar as tarefas salvas 
function adicionaTarefasSalvas() {
    let c = 0
    for(let tarefa of listaDeTarefas) {
        criaTarefa(listaDeTarefas[c].desc, listaDeTarefas[c].titulo);
        c++
    }

    document.addEventListener('mousemove', function() {
        for(let c = 0; c < listaDeTarefas.length; c++) {
            let btnsApagar = document.getElementsByClassName('apagar')[c]
            let divs = document.getElementsByClassName('div')[c]
            btnsApagar.addEventListener('click', function() {
                divs.remove()
                salvarlista.splice(c, 1)
                var tarefasJSON = JSON.stringify(salvarlista);
                localStorage.setItem('tarefas', tarefasJSON);
            })
        }
    })
}
adicionaTarefasSalvas();

// Vai fechar a div de criar uma nova tarefa
function fecharSombra() {
    let sombra = document.getElementById('sombra')
    let criar = document.getElementById('criar')
    sombra.style.display = 'none'
    criar.style.display = 'none'
}
