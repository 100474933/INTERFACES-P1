document.addEventListener("DOMContentLoaded", function() {
    const userData = localStorage.getItem('userData');
    updateNavOnAuth(userData);

    if (userData) {
        document.getElementById('user-profile').textContent = JSON.parse(userData).username;
    }

    document.getElementById('register-children').addEventListener('input', updateChildrenFields);
    document.getElementById("profileButton").addEventListener("click", openProfile);
    document.getElementById("save-profile-button").addEventListener("click", function() {
        saveProfileChanges();
        closeProfile();
    });
});

function updateNavOnAuth(userData) {
    const authButtons = document.querySelector(".auth-buttons");
    const profileButtons = document.querySelector(".profile-buttons");
    const profileOptions = document.getElementById("profile-options");

    if (userData) {
        authButtons.classList.add("hidden");
        profileButtons.classList.remove("hidden");
        profileOptions.classList.remove("hidden");
    } else {
        authButtons.classList.remove("hidden");
        profileButtons.classList.add("hidden");
        profileOptions.classList.add("hidden");
    }
}

function updateChildrenFields() {
    const childrenCount = parseInt(this.value);
    const childrenDetails = document.getElementById('children-details');
    childrenDetails.innerHTML = ''; 

    if (childrenCount > 0) {
        for (let i = 0; i < childrenCount; i++) {
            childrenDetails.innerHTML += `
                <div class="child-info">
                    <h3>Información del hijo/hija ${i + 1}</h3>
                    <input class="formulario-input" type="text" id="child-name-${i}" minlength="3" placeholder="Nombre del hijo/hija ${i + 1}" required>
                    <input class="formulario-input" type="number" id="child-age-${i}" min="0" placeholder="Edad del hijo/hija ${i + 1}" required>
                    <input class="formulario-input" type="text" id="child-toys-${i}" placeholder="Juguetes favoritos del hijo/hija ${i + 1}" required>
                </div>
            `;
        }
    }
}
