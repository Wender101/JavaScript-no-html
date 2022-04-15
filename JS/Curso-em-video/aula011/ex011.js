var pais = window.document.getElementById('txtvel')
        var res = window.document.querySelector('div#resposta')
        var btn = window.document.querySelector('button#verificar')

        var conta = Text(pais.TEXT_NODE)

        btn.addEventListener('click', function() {
            res.innerHTML = `Você está vivendo em <strong>${pais}</strong>`

            if(conta === "Brasil") {
                res.innerHTML += `<p>Você é brasileiro!</p>`
            } else {
                res.innerHTML += `<p>Você é estrangeiro!</p>`
            }
        })