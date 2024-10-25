

    function updateCountdown() {
        const now = new Date();
        const eventDate = new Date(now.getFullYear(), 11, 24, 23, 59, 59); // 24 de diciembre a las 23:59

        if (now.getMonth() === 11 && now.getDate() > 24) {
            eventDate.setFullYear(eventDate.getFullYear() + 1); // Si ya pasó el 24 de diciembre, cuenta para el próximo año
        }

        const currentTime = now.getTime();
        const eventTime = eventDate.getTime();
        const remainingTime = eventTime - currentTime;

        const seconds = Math.floor(remainingTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const remHours = hours % 24;
        const remMinutes = minutes % 60;
        const remSeconds = seconds % 60;

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = remHours;
        document.getElementById('minutes').textContent = remMinutes;
        document.getElementById('seconds').textContent = remSeconds;
    }

    setInterval(updateCountdown, 1000); // Actualiza el contador cada segundo

    // JavaScript para los formularios
    function openLoginForm() {
        document.getElementById('login-form').style.display = 'flex';
    }

    function closeLoginForm() {
        document.getElementById('login-form').style.display = 'none';
    }

    function openRegisterForm() {
        document.getElementById('register-form').style.display = 'flex';
    }

    function closeRegisterForm() {
        document.getElementById('register-form').style.display = 'none';
    }

    function clearRegisterForm() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
            document.getElementById('register-username').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-repeat-password').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-city').value = '';
            document.getElementById('register-country').value = '';
            document.getElementById('register-gender').selectedIndex = 0;
            document.getElementById('register-children').value = '';
            document.getElementById('children-details').innerHTML = '';
        }
    }

    function register() {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const repeatPassword = document.getElementById('register-repeat-password').value;
        const email = document.getElementById('register-email').value;
        const city = document.getElementById('register-city').value;
        const country = document.getElementById('register-country').value;
        const gender = document.getElementById('register-gender').value;
        const children = document.getElementById('register-children').value;

        if (password !== repeatPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const userData = {
            username,
            password,
            email,
            city,
            country,
            gender,
            children: []
        };

        if (children > 0) {
            for (let i = 0; i < children; i++) {
                const childName = document.getElementById(`child-name-${i}`).value;
                const childAge = document.getElementById(`child-age-${i}`).value;
                const childToys = document.getElementById(`child-toys-${i}`).value;
                userData.children.push({ name: childName, age: childAge, toys: childToys });
            }
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Registro exitoso.');
        closeRegisterForm();
    }

    document.getElementById('register-children').addEventListener('input', function () {
        const childrenCount = this.value;
        const childrenDetails = document.getElementById('children-details');
        childrenDetails.innerHTML = '';

        for (let i = 0; i < childrenCount; i++) {
            childrenDetails.innerHTML += `
                <input class="formulario-input" type="text" id="child-name-${i}" minlength="3" placeholder="Nombre del hijo/hija ${i + 1}" required>
                <input class="formulario-input" type="number" id="child-age-${i}" min="0" placeholder="Edad del hijo/hija ${i + 1}" required>
                <input class="formulario-input" type="text" id="child-toys-${i}" placeholder="Juguetes favoritos del hijo/hija ${i + 1}" required>
            `;
        }
    });

    function login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.username === username && userData.password === password) {
            alert('Inicio de sesión exitoso.');
            closeLoginForm();
        } else {
            alert('Nombre de usuario o contraseña incorrectos.');
        }
    }

    function showGame(level) {
        document.getElementById(`game${level}`).style.display = 'block';
        startGame(level);
    }

    let gameInterval;

    function startGame(level) {
        let score = 0;
        let timeRemaining = 90; // 1:30 en segundos
        document.getElementById(`score${level}`).textContent = score;
        document.getElementById(`timer${level}`).textContent = '1:30';
        document.getElementById(`gameOver${level}`).style.display = 'none';
        gameInterval = setInterval(() => updateTimer(level, score, timeRemaining, gameInterval), 1000);
        moveSantaFace(level);
    }

    function restartGame(level) {
        clearInterval(gameInterval);
        startGame(level);
    }

    function updateTimer(level, score, timeRemaining, gameInterval) {
        if (timeRemaining > 0) {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById(`timer${level}`).textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(gameInterval);
            document.getElementById(`gameOver${level}`).style.display = 'block';
            document.getElementById(`finalScore${level}`).textContent = score;
        }
    }


