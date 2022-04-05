var data = new Date()
        var agora = data.getHours()
        var UmaHora = 1
        var acabar = window.prompt('Que horas você quer que acabe?')
        var resposta = null


        if(agora > acabar) {
            resposta =  (acabar - (agora - 24))

        } else {
            resposta = (acabar - agora )
        }

        if(resposta > 1) {
            var final = document.getElementById('h1').innerHTML = `Vai acabar em ${resposta} horas.`

        } else {
            var final = document.getElementById('h1').innerText = `Vai acabar em ${resposta} hora.`
        }