var Anonasceu
        var img = document.querySelector('div#img')
        var mulher = document.querySelector('button#mulher')
        var homem = document.querySelector('button#homem')
        var btn = document.querySelector('button#btn')
        var p = document.querySelector('p')
        var anoAtual = new Date()
        var ano = anoAtual.getFullYear()


        homem.addEventListener('click', function() {
            homem.style.background = 'black'
            mulher.style.background = 'white'

            btn.addEventListener('click', function() {
            Anonasceu = document.querySelector('input#ano').value

            var idade = ano - Anonasceu

            if(idade < 3) {
                var genero = 'um bebê'
                img.style.backgroundImage = 'url(imgEx2/bb-homem.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else if(idade < 14) {
                var genero = 'um menino'
                img.style.backgroundImage = 'url(imgEx2/menino.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else if(idade > 14 && idade < 50){
                var genero = 'um homem'
                img.style.backgroundImage = 'url(imgEx2/homem.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else {
                var genero = 'um senhor'
                img.style.backgroundImage = 'url(imgEx2/senhor.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'
            }

            var resultado = p.innerText = `Detectamos ${genero} com ${idade} anos`
        })
        })

        mulher.addEventListener('click', function() {
            mulher.style.background = 'black'
            homem.style.background = 'white'

            btn.addEventListener('click', function() {
            Anonasceu = document.querySelector('input#ano').value

            var idade = ano - Anonasceu

            if(idade < 3) {
                var genero = 'um bebê'
                img.style.backgroundImage = 'url(imgEx2/bb-menina.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else if(idade < 14) {
                var genero = 'uma menina'
                img.style.backgroundImage = 'url(imgEx2/menina.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else if(idade > 14 && idade < 50){
                var genero = 'uma mulher'
                img.style.backgroundImage = 'url(imgEx2/mulher.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'

            } else {
                var genero = 'uma senhora'
                img.style.backgroundImage = 'url(imgEx2/senhora.jpg)'
                img.style.backgroundPosition = 'center center'
                img.style.backgroundSize = 'cover'
                img.style.display = 'block'
            }

            var resultado = p.innerText = `Detectamos ${genero} com ${idade} anos`
        })
        })