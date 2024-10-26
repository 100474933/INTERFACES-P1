// Countdown to December 24th at 23:59
function updateCountdown() {
    const now = new Date();
    const eventDate = new Date(now.getFullYear(), 11, 24, 23, 59, 59);

    if (now.getMonth() === 11 && now.getDate() > 24) {
        eventDate.setFullYear(eventDate.getFullYear() + 1);
    }

    const remainingTime = eventDate - now;
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);

// Display and hide forms
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

// Clear registration form
function clearRegisterForm() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
        document.getElementById('register-form').reset();
        document.getElementById('children-details').innerHTML = '';
    }
}

// Login validation
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.username === username && userData.password === password) {
        alert('Inicio de sesión exitoso.');
        document.querySelector(".auth-buttons").classList.add("hidden");
        document.querySelector(".user-menu").classList.remove("hidden");
        closeLoginForm();

    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}

function logout() {
    // Oculta el icono del perfil y vuelve a mostrar los botones de autenticación
    document.querySelector(".auth-buttons").classList.remove("hidden");
    document.querySelector(".user-menu").classList.add("hidden");
    closeProfileMenu();
}

function toggleUserMenu() {
    document.getElementById("user-dropdown").classList.toggle("hidden");
}

function closeProfileMenu() {
    document.querySelector('.profile-options').style.display = 'none';
}

// Game functions
let gameInterval;
let scores = {};  // Keep track of scores by level

function showGame(level) {
    document.getElementById(`game${level}`).style.display = 'block';
    startGame(level);
}

function startGame(level) {
    scores[level] = 0;  // Initialize score for the level
    let timeRemaining = 90;
    document.getElementById(`score${level}`).textContent = scores[level];
    document.getElementById(`timer${level}`).textContent = '1:30';
    document.getElementById(`gameOver${level}`).style.display = 'none';

    gameInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById(`timer${level}`).textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(gameInterval);
            document.getElementById(`gameOver${level}`).style.display = 'block';
            document.getElementById(`finalScore${level}`).textContent = scores[level];
        }
    }, 1000);

    moveSantaFace(level);
}

function incrementScore(level) {
    scores[level] = scores[level] + 1;  // Update score for the specific level
    document.getElementById(`score${level}`).textContent = scores[level];
    moveSantaFace(level);
}

document.getElementById('santaFace1').addEventListener('click', () => incrementScore(1));

// Handle children fields in registration form
document.getElementById('register-children').addEventListener('input', function () {
    const childrenCount = parseInt(this.value, 10);
    const childrenDetails = document.getElementById('children-details');
    childrenDetails.innerHTML = '';

    for (let i = 0; i < childrenCount; i++) {
        childrenDetails.innerHTML += `
            <div class="child-info">
                <input type="text" id="child-name-${i}" placeholder="Nombre del hijo/hija ${i + 1}" required>
                <input type="number" id="child-age-${i}" min="0" placeholder="Edad del hijo/hija ${i + 1}" required>
                <input type="text" id="child-toys-${i}" placeholder="Juguetes favoritos del hijo/hija ${i + 1}" required>
            </div>
        `;
    }
});

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const repeatPassword = document.getElementById('register-repeat-password').value;
    const email = document.getElementById('register-email').value;
    const city = document.getElementById('register-city').value;
    const country = document.getElementById('register-country').value;
    const gender = document.getElementById('register-gender').value;
    const childrenCount = parseInt(document.getElementById('register-children').value, 10);

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

    for (let i = 0; i < childrenCount; i++) {
        const childName = document.getElementById(`child-name-${i}`).value;
        const childAge = parseInt(document.getElementById(`child-age-${i}`).value, 10);
        const childToys = document.getElementById(`child-toys-${i}`).value;
        userData.children.push({ name: childName, age: childAge, toys: childToys });
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registro exitoso.');
    closeRegisterForm();
}
