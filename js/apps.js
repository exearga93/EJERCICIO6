let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;

const display = document.getElementById('display');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const iniciarPararBtn = document.getElementById('iniciarParar');
const pausarBtn = document.getElementById('pausar');
const reiniciarBtn = document.getElementById('reiniciar');

iniciarPararBtn.addEventListener('click', iniciar);
pausarBtn.addEventListener('click', pausar);
reiniciarBtn.addEventListener('click', reiniciar);

function iniciar() {
    const minutes = parseInt(inputMinutes.value);
    const seconds = parseInt(inputSeconds.value);

    if (!running && !isNaN(minutes) && !isNaN(seconds) && (minutes > 0 || seconds > 0)) {
        if (savedTime === 0) {
            savedTime = (minutes * 60 + seconds) * 1000;
        }

        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);  // Actualiza cada 10 milisegundos
        iniciarPararBtn.innerText = 'Parar';
        running = true;
    } else {
        alert('Por favor, ingresa un valor válido para minutos y segundos.');
    }
}

function pausar() {
    if (running) {
        clearInterval(tInterval);
        savedTime -= new Date().getTime() - startTime;
        iniciarPararBtn.innerText = 'Iniciar';
        running = false;
    }
}

function reiniciar() {
    clearInterval(tInterval);
    display.innerText = '00:00:00.000';
    iniciarPararBtn.innerText = 'Iniciar';
    running = false;
    savedTime = 0;
    inputMinutes.value = '';
    inputSeconds.value = '';
}

function updateTime() {
    if (savedTime > 0) {
        updatedTime = new Date().getTime();
        difference = savedTime - (updatedTime - startTime);

        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor(difference % 1000);

        if (difference <= 0) {
            clearInterval(tInterval);
            display.innerText = '00:00:00.000';
            iniciarPararBtn.innerText = 'Iniciar';
            savedTime = 0;
            running = false;
            alert('¡Tiempo terminado!');
        } else {
            display.innerText = (hours < 10 ? '0' + hours : hours) + ':' +
                                (minutes < 10 ? '0' + minutes : minutes) + ':' +
                                (seconds < 10 ? '0' + seconds : seconds) + '.' +
                                (milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds);
        }
    }
}
