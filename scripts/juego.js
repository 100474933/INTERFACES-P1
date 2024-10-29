
document.addEventListener("DOMContentLoaded", () => {
    let score1 = 0, score2 = 0;
    let timer1 = 90, timer2 = 90;
    let interval1, interval2;
    let lightSequence = [];
    let userSequence = [];
    let currentStep = 0;
    let gameEnded = false;
    const lights = document.querySelectorAll(".light");

    // Juego 1: Click Santa's Face (lo dejamos igual que antes)
    const santaFace1 = document.getElementById("santaFace1");
    const scoreDisplay1 = document.getElementById("score1");
    const timerDisplay1 = document.getElementById("timer1");
 
    function startGame1() {
        score1 = 0;
        timer1 = 90;
        gameEnded = false;
        document.getElementById("score1").textContent = score1;
        document.getElementById("timer1").textContent = "1:30";

        // Iniciar temporizador
        interval1 = setInterval(() => {
            if (timer1 <= 0) {
                gameEnded = true;
                clearInterval(interval1);
                endGame1();
            } else {
                timer1--;
                let minutes = Math.floor(timer1 / 60);
                let seconds = timer1 % 60;
                document.getElementById("timer1").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }
        }, 1000);

        /// Evento de clic para mover a Santa y aumentar el puntaje
        santaFace1.addEventListener("click", () => {
            if (!gameEnded) { // Solo permite clics mientras el juego está activo
                score1++;
                document.getElementById("score1").textContent = score1;
                moveSanta(); // Mueve a Santa a una posición aleatoria
            }
        });
        moveSanta();
    }


    // Función para mover a Santa a una posición aleatoria
    function moveSanta() {
        // Obtener las dimensiones del área de juego
        const gameAreaWidth = gameArea1.clientWidth;
        const gameAreaHeight = gameArea1.clientHeight;
        
        // Obtener las dimensiones de la imagen de Santa
        const santaWidth = santaFace1.offsetWidth;
        const santaHeight = santaFace1.offsetHeight;
        
        // Calcular posición aleatoria dentro del área de juego
        const randomX = Math.floor(Math.random() * (gameAreaWidth - santaWidth));
        const randomY = Math.floor(Math.random() * (gameAreaHeight - santaHeight));
        
        // Aplicar nueva posición a Santa
        santaFace1.style.left = `${randomX}px`;
        santaFace1.style.top = `${randomY}px`;
    }
 
    santaFace1.addEventListener("click", () => {
        score1++;
        scoreDisplay1.textContent = score1;
    });

    function endGame1() {
        finalScore.textContent = score1; // Muestra el puntaje final
        gameOverMessage.style.display = "block"; // Muestra el mensaje de "Game Over"
    }

    window.restartGame1 = function() {
        gameOverMessage.style.display = "none"; // Oculta el mensaje de "Game Over"
        startGame1(); // Reinicia el juego
    }
 
    // Juego 2: Christmas Lights Memory Game
    const scoreDisplay2 = document.getElementById("score2");
    const timerDisplay2 = document.getElementById("timer2");

    function startGame2() {
        score2 = 0;
        timer2 = 90;
        scoreDisplay2.textContent = score2;
        timerDisplay2.textContent = "1:30";

        lightSequence = [];
        userSequence = [];
        generateSequence();
        playSequence();

        const countdown2 = setInterval(() => {
            if (timer2 <= 0) {
                clearInterval(countdown2);
                alert("Tiempo terminado para Christmas Lights Memory Game");
            } else {
                timer2--;
                let minutes = Math.floor(timer2 / 60);
                let seconds = timer2 % 60;
                timerDisplay2.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }
        }, 1000);
    }

    function generateSequence() {
        for (let i = 0; i < 4; i++) {
            lightSequence.push(Math.floor(Math.random() * lights.length));
        }
    }

    function playSequence() {
        let i = 0;
        const interval = setInterval(() => {
            if (i < lightSequence.length) {
                const light = lights[lightSequence[i]];
                light.classList.add("active");
                setTimeout(() => light.classList.remove("active"), 500);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }

    lights.forEach((light, index) => {
        light.addEventListener("click", () => {
            userSequence.push(index);
            checkSequence();
        });
    });

    function checkSequence() {
        if (userSequence[currentStep] === lightSequence[currentStep]) {
            currentStep++;
            if (currentStep === lightSequence.length) {
                score2++;
                scoreDisplay2.textContent = score2;
                userSequence = [];
                currentStep = 0;
                generateSequence();
                setTimeout(playSequence, 1000);
            }
        } else {
            alert("¡Fallaste! Intenta de nuevo.");
            userSequence = [];
            currentStep = 0;
            setTimeout(playSequence, 1000);
        }
    }

    // Mostrar y ocultar juegos según botón
    document.getElementById("button1").addEventListener("click", () => {
        document.getElementById("game1").style.display = "block";
        document.getElementById("game2").style.display = "none";
        startGame1();
    });

    document.getElementById("button2").addEventListener("click", () => {
        document.getElementById("game2").style.display = "block";
        document.getElementById("game1").style.display = "none";
        startGame2();
    });
});



