var b1 = window.prompt('Media do primeiro bimestre:') //Media do primeiro bimestre

        var f1 = window.prompt('Total de faltas do bimestre:') //Conta as faltas do bimestre

        //-------------------------------

        var b2 = window.prompt('Media do segundo bimestre:') //Media do segundo bimestre

        var f2 = window.prompt('Total de faltas do bimestre:') //Conta as faltas do bimestre

        //-------------------------------

        var tf = parseInt(f1) + parseInt(f2) // tf = total de faltas de todos os 4 bimestre

        var tb = parseInt(b1) + parseInt(b2) // tb = total de notas de todos os bimestres

        var media = tb / 2 // media = tira a media da nota

        //-------------------------------

        document.write('Total de faltas: ',tf)

        document.write('Media: ',media)

        if (tf >= 20){
            document.write('Alulo(a) reprovado por falta!')
        }

        if (media < 5){
            document.write('Aluno(a) reprovado por nota!')
        }

        if (media >= 5 || tf < 20){
            document.write('Aluno(a) aprovado!')
        }