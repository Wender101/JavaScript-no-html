var corpo = window.document.body

        var p1 = window.document.getElementsByTagName('p')[0] //esse 0 serve para selecionar apenas o primeiro 'p'

        window.document.write('Está escrito assim: ' + p1.innerText)
        //copia o primeiro paragrafo 'p' e insere na tela
        p1.style.background = 'red'

        corpo = window.document.body.style.background = 'rgb(60, 50, 194)'

        var d = window.document.getElementById('msg')
        d.style.background = 'green'

        var titulo = window.document.getElementsByTagName('h1')[0]
        titulo.style.color = 'black'
        titulo.style.background = 'white'
        /*window.document.getElementsByTagName('h1')[0].innerText = 'Olá! Esse texto foi modificado usando Js, caso queira ver o texto original, abra o codigo fonte.' // este codigo pode ser trocado por...

        titulo.innerText = 'Olá'*/

        var arroiz = window.document.getElementsByName('arroiz')[0]

        arroiz.style.background = 'black'