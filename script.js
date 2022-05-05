let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let segundos

var sino = new Audio("./audio/bell.mp3")
var volta = new Audio("./audio/volta.mp3")
var final = new Audio("./audio/final.mp3")

var music = document.getElementById('music')
var pause = document.getElementById('pause')
var play = document.getElementById('play')
var text = document.getElementById('text')


function iniciar() {

    if (acao.value == 0) {
        document.getElementById('erro_acao').innerHTML = "Adicione os minutos"
        acao.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro_pausa').innerHTML = "Adicione a pausa"
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro_sessoes').innerHTML = "Adicione as sessões"
        sessoes.focus()
    } else {
        music.play()
        pause.style.setProperty('display', 'block', 'important')

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.getElementById('set').style.setProperty('display', 'none', 'important')
        document.getElementById('clock').style.setProperty('display', 'block', 'important')

        funcaoAcao()
    }
}

function funcaoAcao() {
    let valorSessao = localStorage.getItem('sessoes')

    if (valorSessao != '1') {
        document.getElementById('texto_sessao').innerHTML = valorSessao + ' sessões restantes'
    } else {
        document.getElementById('texto_sessao').innerHTML = valorSessao + ' sessão restante'
    }

    let titulo = document.getElementById('titulo')
    titulo.innerHTML = "AÇÃO"
    titulo.style.fontSize = '25pt'
    titulo.style.fontWeight = 'bold'
    titulo.style.setProperty('color', '#7BDFF2', 'important')

    minutos = Number(localStorage.getItem('acao'))

    minutos = minutos - 1
    segundos = 59

    document.getElementById('minutes').innerHTML = minutos
    document.getElementById('seconds').innerHTML = segundos

    var minutoIntervalo = setInterval(minTimer, 60000)
    var segundoInvervalo = setInterval(segTimer, 1000)

    function minTimer() {
        minutos = minutos - 1
        document.getElementById('minutes').innerHTML = minutos
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds').innerHTML = segundos

        if (segundos <= 0) {
            if (minutos <= 0) {
                clearInterval(minutoIntervalo)
                clearInterval(segundoInvervalo)

                sino.play();

                funcaoPausa()
            }
            segundos = 60
        }

    }

}

 
function funcaoPausa() {

    let titulo = document.getElementById('titulo')
    titulo.innerHTML = "Pausa"
    titulo.style.fontSize = '25pt'
    titulo.style.fontWeight = 'bold'
    titulo.style.setProperty('color', '#7BDFF2', 'important')

    minuto_pausa = Number(localStorage.getItem('pausa'))

    minuto_pausa = minuto_pausa - 1
    segundos = 59

    document.getElementById('minutes').innerHTML = minuto_pausa
    document.getElementById('seconds').innerHTML = segundos

    var minutoIntervalo = setInterval(minTimer, 60000)
    var segundoInvervalo = setInterval(segTimer, 1000)

    function minTimer() {
        minuto_pausa = minuto_pausa - 1
        document.getElementById('minutes').innerHTML = minuto_pausa
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds').innerHTML = segundos

        if (segundos <= 0) {
            if (minuto_pausa <= 0) {
                ses = Number(localStorage.getItem('sessoes'))
                ses = ses - 1
                localStorage.setItem('sessoes', String(ses))

                clearInterval(minutoIntervalo)
                clearInterval(segundoInvervalo)

                if (ses <= 0) {
                    final.play()
                    localStorage.clear()
                    document.getElementById('set').style.setProperty('display', 'none', 'important')
                    document.getElementById('clock').style.setProperty('display', 'none', 'important')
                    document.getElementById('fim').style.setProperty('display', 'block', 'important')
                } else {
                    volta.play();
                    funcaoAcao()
                }
            }
            segundos = 60
        }

    }

}

function execMusic() {
    music.play()
    play.style.setProperty('display', 'none', 'important')
    pause.style.setProperty('display', 'block', 'important')

}

function pauseMusic() {
    music.pause()
    play.style.setProperty('display', 'block', 'important')
    pause.style.setProperty('display', 'none', 'important')
}   

function openText() {
    text.style.setProperty('display', 'block', 'important')
    document.getElementById('set').style.setProperty('display', 'none', 'important')
}