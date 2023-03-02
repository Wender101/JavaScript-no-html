let diaDaSemana = new Date
        let diaMes = new Date
        let mes = new Date
        let ano = new Date
        let hora = new Date
        let min = new Date

        // Saber qual dia da semana é hj
        if(diaDaSemana.getDay() == 0) {
            diaDaSemana = 'Domingo'
        } else if(diaDaSemana.getDay() == 1) {
            diaDaSemana = 'Segunda-feira'
        } else if(diaDaSemana.getDay() == 2) {
            diaDaSemana = 'Terça-feira'
        } else if(diaDaSemana.getDay() == 3) {
            diaDaSemana = 'Quarta-feira'
        } else if(diaDaSemana.getDay() == 4) {
            diaDaSemana = 'Quinta-feira'
        } else if(diaDaSemana.getDay() == 5) {
            diaDaSemana = 'Sexta-feira'
        } else {
            diaDaSemana = 'Sabado'
        }

        // Saber qual mês é hj
        if(mes.getMonth() == 0) {
            mes = 'janeiro'
        } else if(mes.getMonth() == 1) {
            mes = 'fevereiro'
        } else if(mes.getMonth() == 2) {
            mes = 'março'
        } else if(mes.getMonth() == 3) {
            mes = 'abril'
        } else if(mes.getMonth() == 4) {
            mes = 'maio'
        } else if(mes.getMonth() == 5) {
            mes = 'junho'
        } else if(mes.getMonth() == 6) {
            mes = 'julho'
        } else if(mes.getMonth() == 7) {
            mes = 'agosto'
        } else if(mes.getMonth() == 8) {
            mes = 'setembro'
        } else if(mes.getMonth() == 9) {
            mes = 'outubro'
        } else if(mes.getMonth() == 10) {
            mes = 'novembro'
        } else {
            mes = 'dezembro'
        } 

        const body = document.querySelector('body')
        const main = document.createElement('main')
        const h2 = document.createElement('h2')

        // Vai escrever na tela
        h2.innerText = `${diaDaSemana}, ${diaMes.getDate()} de ${mes} de ${ano.getFullYear()} ${hora.getHours()}:${min.getMinutes()}`
        console.log(diaMes.getDate())

        body.appendChild(main)
        main.appendChild(h2)