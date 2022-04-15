function calcular() {
    var txtv = window.document.querySelector('input#txtvel')
    var res = window.document.querySelector('div#res')
    var vel = Number(txtv.value)

    res.innerHTML = `<p>Sua Velocidade atal é de: <strong>${vel}</strong> Km/h</p>`

    if(vel > 60) {
      res.innerHTML += `<p>Você está <strong>MUTADO</strong> por exesso de velocidade</p>`
    }
    res.innerHTML += `<p>Dirija sempre com o cinto de segurança!</p>`
  } 