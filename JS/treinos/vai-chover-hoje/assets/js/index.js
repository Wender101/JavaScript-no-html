//? Vai alterar a cor do fundo de acordo com o horario do user
function corDoFundo() {
    let HoraAtual1 = new Date()
    let HoraAtual = HoraAtual1.getHours()

    let body = document.querySelector('body')
    if(HoraAtual > 0 && HoraAtual < 12) {
        body.style.background = '#ffc890'

    } else if(HoraAtual >= 12 && HoraAtual < 18) {
        body.style.background = '#6a75f9'
    } else {
        body.style.background = '#24295c'
    }
} corDoFundo()

document.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        novaPrevicaoDoTemp()
    }
})

const apiKey = 'd573a0bba2c06434d039442c1d19f7d7'
function novaPrevicaoDoTemp(latidute = undefined, longitude = undefined) {
    let city = document.querySelector('#inputLocal').value

    if(latidute == undefined, longitude == undefined) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`).then(resposta => {
        return resposta.json()
    
        }).then(corpo => {
            const imgTempo = document.querySelector('#imgTempo')
            const h1 = document.querySelector('#temperatura')
            const estadoTempo = document.querySelector('#estadoTempo')
            const porcetangemDaUmidade = document.querySelector('#porcetangemDaUmidade strong')
            const vento = document.querySelector('#vento strong')
    
            
            try {
                console.log(corpo)
    
                
                let temperaturaAtual = corpo.main.temp
    
                imgTempo.src = `http://openweathermap.org/img/wn/${corpo.weather[0].icon}.png`   
                h1.innerHTML = ` ${temperaturaAtual.toFixed(0)}<span>ºC</span>`
                estadoTempo.innerText = corpo.weather[0].description
                porcetangemDaUmidade.innerText = `${corpo.main.humidity}%`
                vento.innerText = `${corpo.wind.speed}Km/h`
            } catch (error) {
                imgTempo.src = 'assets/img/world-financial.png'
                h1.innerHTML = `0<span>ºC</span>`
                estadoTempo.innerText = 'Não encontrado'
                porcetangemDaUmidade.innerText = `0%`
                vento.innerText = `0Km/h`
            }
        })

        //? Vai pesquisar usando as cordenadas de localização do user
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latidute}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`).then(resposta => {
            return resposta.json()
        
            }).then(corpo => {
                const imgTempo = document.querySelector('#imgTempo')
                const h1 = document.querySelector('#temperatura')
                const estadoTempo = document.querySelector('#estadoTempo')
                const porcetangemDaUmidade = document.querySelector('#porcetangemDaUmidade strong')
                const vento = document.querySelector('#vento strong')
        
                
                try {
                    console.log(corpo)
        
                    
                    let temperaturaAtual = corpo.main.temp
        
                    imgTempo.src = `http://openweathermap.org/img/wn/${corpo.weather[0].icon}.png`   
                    h1.innerHTML = ` ${temperaturaAtual.toFixed(0)}<span>ºC</span>`
                    estadoTempo.innerText = corpo.weather[0].description
                    porcetangemDaUmidade.innerText = `${corpo.main.humidity}%`
                    vento.innerText = `${corpo.wind.speed}Km/h`
                } catch (error) {
                    imgTempo.src = 'assets/img/world-financial.png'
                    h1.innerHTML = `0<span>ºC</span>`
                    estadoTempo.innerText = 'Não encontrado'
                    porcetangemDaUmidade.innerText = `0%`
                    vento.innerText = `0Km/h`
                }
            })
    }
}

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function(position){
        novaPrevicaoDoTemp(position.coords.latitude, position.coords.longitude)

        console.log('lat: ' + position.coords.latitude, 'log: ' + position.coords.longitude);
    })
}