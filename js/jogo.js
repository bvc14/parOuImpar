window.addEventListener("load", function () {
    var selectElement = document.getElementById('nivel');
    var tempoElement = document.getElementById('tempo');
    var btnIniciar = document.getElementById('btnIniciar');
    var btnParar = document.getElementById('btnParar');
    var btnPausar = document.getElementById('btnPausar');
    var btnSair = document.getElementById('btnSair');
    var numAleatorio = document.getElementById('numAleatorio');
    numAleatorio.style.pointerEvents = 'none';
    var paresSorteados = document.getElementById('paresSorteados');
    var porcentagemAcertos = document.getElementById('porcentagemAcertos');
    var numAcertos = document.getElementById('acertos');
    var numErros = document.getElementById('erros');
    var intervalo;
    var tempIntervalo;
    var milisegundos;
    var gerador;
    var contPares = 0;
    var acertos = 0;
    var erros = 0;
    var total = 0;
    var tempoSegundos = 0;
    var audioFundo = new Audio('../audio/fundo.mp3') ;

    audioFundo.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play(); 
    });

    audioFundo.play();


    // Função para alterar o tempo
    selectElement.addEventListener('change', function () {
        tempoSegundos = parseInt(selectElement.value);
        atualizarTempo(tempoSegundos);

        if (tempoSegundos == 90) {
            milisegundos = 1000;
        } else if (tempoSegundos == 60) {
            milisegundos = 750;
        } else if (tempoSegundos == 30) {
            milisegundos = 500;
        }   
    });

    function atualizarTempo(tempoSegundos) {
        var minutos = Math.floor(tempoSegundos / 60);
        var segundos = tempoSegundos % 60;
        var minutosStr = minutos < 10 ? '0' + minutos : minutos;
        var segundosStr = segundos < 10 ? '0' + segundos : segundos;
        tempoElement.textContent = minutosStr + ':' + segundosStr;

        
    }

    // Função para gerar o número aleatório, e contar os pares sorteados assim como exibir a porcentagem de acertos
    function exibir() {
        gerador = Math.round(Math.random() * 100) + 1;
        numAleatorio.textContent = gerador;
        total++;
        if (gerador % 2 == 0) {
            contPares++;
            paresSorteados.textContent = contPares;
            var porcentagem = (acertos / contPares) * 100;
            porcentagemAcertos.textContent = porcentagem.toFixed(1) + '%';
        }

        // Mudar a cor do número aleatório e altera o ponteiro do mouse impossibilitando que o usuario clique novamente no mesmo numero
        numAleatorio.addEventListener('click', function () {
            if (gerador % 2 == 0) {
                numAleatorio.style.color = 'green';
                numAleatorio.style.pointerEvents = 'none';
            } else {
                numAleatorio.style.color = 'red';
                numAleatorio.style.pointerEvents = 'none';
            }
        });
        numAleatorio.style.color = 'white';
        numAleatorio.style.pointerEvents = 'auto';
    }

    // Função para iniciar os intervalos tanto de tempo quanto o de exibição do número aleatório, fica mais rapido de acordo com a dificuldade escolhida
    function iniciarIntervalo() {
        intervalo = setInterval(exibir, milisegundos);

        tempIntervalo = setInterval(function () {
            if (tempoSegundos <= 0) {
                clearInterval(intervalo);
                clearInterval(tempIntervalo);
                tempoElement.textContent = "00:00";
                btnIniciar.style.display = 'block';
                btnPausar.style.display = 'none';
                numAleatorio.style.pointerEvents = 'none';
                selectElement.style.pointerEvents = 'block';
                audioFundo.play();
                alertWifi('Tempo esgotado!', false, 0, "", 30, "");
                return;
            }


            atualizarTempo(tempoSegundos);
            tempoSegundos--;  

        }, 1000);

        numAleatorio.style.pointerEvents = 'auto';
        btnIniciar.style.display = 'none';
        btnPausar.style.display = 'block';
        btnParar.style.display = 'block';
    }

    // Iniciar o intervalo
    btnIniciar.addEventListener('click', function () {
        while (tempoSegundos <= 0) {
            alertWifi('selecione um nível!', false, 0, "", 30, "");
            return;
        }
        iniciarIntervalo();
        audioFundo.pause();
        selectElement.style.pointerEvents = 'block';
    });

    // Parar o intervalo
    btnParar.addEventListener('click', function () {
        clearInterval(intervalo);
        clearInterval(tempIntervalo);
        numAleatorio.textContent = '_';
        numAleatorio.style.color = '';
        contPares = 0;
        paresSorteados.textContent = contPares;
        porcentagemAcertos.textContent = "0.0%";
        numAcertos.textContent = "0";
        numErros.textContent = "0";
        tempoElement.textContent = "00:00";
        numAleatorio.style.pointerEvents = 'none';
        btnIniciar.style.display = 'block';
        btnPausar.style.display = 'none';
        btnParar.style.display = 'none';
        acertos = 0;
        erros = 0;
        total = 0;

        

        audioFundo.play();
    });

    // Pausar o intervalo
    btnPausar.addEventListener('click', function () {
        clearInterval(intervalo);
        clearInterval(tempIntervalo);
        btnIniciar.style.display = 'block';
        btnPausar.style.display = 'none';
        audioFundo.play();
    });

    btnSair.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // Contar acertos e erros
    numAleatorio.addEventListener('click', function () {
        if (gerador % 2 == 0) {
            acertos++;
        } else {
            erros++;
        }
        numAcertos.textContent = acertos;
        numErros.textContent = erros;
    });

    // adiciona audio aos erros e acertos
    numAleatorio.addEventListener('click', function () {
        if (gerador % 2 == 0) {
            var audio = new Audio('audio/acerto.mp3');
            audio.play();
        } else {
            var audio = new Audio('audio/erro.mp3');
            audio.play();
        }
    });
});
