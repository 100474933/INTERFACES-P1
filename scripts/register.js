function openRegisterForm() {
    document.getElementById('register-form').style.display = 'flex';
}

function closeRegisterForm() {
    if (confirm('¿Estás seguro de que quieres cancelar el registro? Se perderán los datos no guardados.')) {
        document.getElementById('register-form').style.display = 'none';
    }
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
    const childrenCount = parseInt(document.getElementById('register-children').value);

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
        const childAge = document.getElementById(`child-age-${i}`).value;
        const childToys = document.getElementById(`child-toys-${i}`).value;
        userData.children.push({ name: childName, age: childAge, toys: childToys });
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registro exitoso.');
    closeRegisterForm();
    updateNavOnAuth(userData);
}
