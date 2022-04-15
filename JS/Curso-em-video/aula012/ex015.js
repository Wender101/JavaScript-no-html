var op1 = document.getElementById('op1') 
        var op2 = document.getElementById('op2') 

        var submenu1 = document.getElementById('submenu1')
        var submenu2 = document.getElementById('submenu2')

        op1.addEventListener('click', function() {
            if(submenu1.style.display === 'block') {
                submenu1.style.display = 'none'

            } else {
                submenu1.style.display = 'block'
            }
        })

        op2.addEventListener('click', function() {
            if(submenu2.style.display === 'block') {
                submenu2.style.display = 'none'
                
            } else {
                submenu2.style.display = 'block'
            }
        })

        //-------------------------------------------------------

        var data = new Date()
        var agora = data.getHours()
        var UmaHora = 1
        var resposta = null
        var hj = document.getElementById('hoje')
        var amanha = document.getElementById('amanha')
        var dps = document.getElementById('dps')

        hj.addEventListener('click', function() {
            var input = document.querySelector('input').value
            var tmp = input

                if(agora > tmp) {
                    resposta =  agora - tmp

                } else {
                    resposta = (tmp - agora )
                }

                if(resposta > 1) {
                    var final = document.querySelector('p').innerHTML = `${resposta} horas.`

                } else {
                    var final = document.querySelector('p').innerText = `${resposta} hora.`
                }
        })

        amanha.addEventListener('click', function() {
            var input = document.querySelector('input').value
            var tmp = input

                if(agora > tmp) {
                resposta =  (tmp - (agora - 24))

                } else {
                    resposta = (tmp - (agora - 24))
                }

                if(resposta > 1) {
                    var final = document.querySelector('p').innerHTML = `${resposta} horas.`

                } else {
                    var final = document.querySelector('p').innerText = `${resposta} hora.`
                }
        })

        dps.addEventListener('click', function() {
            var input = document.querySelector('input').value
            var tmp = input
            
                if(agora > tmp) {
                resposta =  (tmp - (agora - 48))

                } else {
                    resposta = (tmp - (agora - 48))
                }

                if(resposta > 1) {
                    var final = document.querySelector('p').innerHTML = `${resposta} horas.`

                } else {
                    var final = document.querySelector('p').innerText = `${resposta} hora.`
                }
        })