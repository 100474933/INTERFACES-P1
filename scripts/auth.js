function openLoginForm() {
    document.getElementById("login-form").style.display = "flex";
}

function closeLoginForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        localStorage.setItem('userData', JSON.stringify({ username }));
        closeLoginForm();
        updateNavOnAuth(true);
        alert("Inicio de sesión exitoso.");
    } else {
        alert("Por favor, ingresa tu nombre de usuario y contraseña.");
    }
}

function logout() {
    const confirmation = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmation) {
        localStorage.removeItem('userData');
        updateNavOnAuth(false);
        alert("Has cerrado sesión.");
    }
}

function openProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        document.getElementById("username").value = userData.username || "";
        document.getElementById("email").value = userData.email || "";
    }

    document.getElementById("MyProfile").style.display = "flex";
}

function closeProfile() {
    document.getElementById("MyProfile").style.display = "none";
}

function saveProfileChanges() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData.username = username;
    userData.email = email;

    localStorage.setItem('userData', JSON.stringify(userData));
    alert("Cambios guardados exitosamente.");
    closeProfile();
}
