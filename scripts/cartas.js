document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario está autenticado al cargar la página
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        document.querySelector(".auth-buttons").classList.remove("hidden");
        document.querySelector(".profile-buttons").classList.add("hidden");
    } else {
        document.querySelector(".auth-buttons").classList.add("hidden");
        document.querySelector(".profile-buttons").classList.remove("hidden");
        document.getElementById('user-profile').textContent = userData.username;
    }

    // Enviar carta y verificar datos del usuario
    document.getElementById("cartaForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (!userData) {
            alert("Debes iniciar sesión para enviar una carta.");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const pais = document.getElementById("pais").value;
        const ciudad = document.getElementById("ciudad").value;
        const cartaTexto = document.getElementById("cartaTexto").value;

        if (email !== userData.email) {
            alert("El correo debe coincidir con el registrado.");
            alert("Metete en perfil y vuelve a guardar tu correo");
            return;
        }

        const carta = { nombre, email, pais, ciudad, carta: cartaTexto, fecha: new Date().toISOString() };
        saveCarta(carta);

        document.getElementById("cartaForm").reset();
        renderCartas();
    });

    renderCartas();
});

function saveCarta(carta) {
    const cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    cartas.push(carta);
    localStorage.setItem("cartas", JSON.stringify(cartas));
}

function renderCartas() {
    const cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    const lettersContainer = document.getElementById("MyProfileletters-Container");

    lettersContainer.innerHTML = "";  // Limpiar contenido previo

    if (cartas.length === 0) {
        lettersContainer.innerHTML = "<p>No hay cartas en el buzón de Papá Noel</p>";
    } else {
        cartas.forEach((carta, index) => {
            const cartaElement = document.createElement("div");
            cartaElement.classList.add("carta");
            cartaElement.innerHTML = `
                <h3>${carta.nombre}</h3>
                <p><strong>Email:</strong> ${carta.email}</p>
                <p><strong>País:</strong> ${carta.pais}</p>
                <p><strong>Ciudad:</strong> ${carta.ciudad}</p>
                <p><strong>Mensaje:</strong> ${carta.carta}</p>
                <p><em>${new Date(carta.fecha).toLocaleString()}</em></p>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
                <button class="move-up-btn" data-index="${index}" ${index === 0 ? 'disabled' : ''}>Mover Arriba</button>
                <button class="move-down-btn" data-index="${index}" ${index === cartas.length - 1 ? 'disabled' : ''}>Mover Abajo</button>
            `;
            lettersContainer.appendChild(cartaElement);
        });

        // Add event listeners for the new buttons
        addButtonListeners();
    }
    openLetters();
}

// Add event listeners for delete and move buttons
function addButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const moveUpButtons = document.querySelectorAll(".move-up-btn");
    const moveDownButtons = document.querySelectorAll(".move-down-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute('data-index');
            deleteCarta(index);
        });
    });

    moveUpButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute('data-index');
            moveCarta(index, 'up');
        });
    });

    moveDownButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute('data-index');
            moveCarta(index, 'down');
        });
    });
}

function deleteCarta(index) {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    cartas.splice(index, 1);
    localStorage.setItem("cartas", JSON.stringify(cartas));
    renderCartas();
}

function moveCarta(index, direction) {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    index = parseInt(index);

    if (direction === 'up' && index > 0) {
        const cartaToMove = cartas.splice(index, 1)[0];
        cartas.splice(index - 1, 0, cartaToMove);
    } else if (direction === 'down' && index < cartas.length - 1) {
        const cartaToMove = cartas.splice(index, 1)[0];
        cartas.splice(index + 1, 0, cartaToMove);
    }

    localStorage.setItem("cartas", JSON.stringify(cartas));
    renderCartas();
}

// Abrir y cerrar pop-up de cartas
function openLetters() {
    document.getElementById("MyProfileletters").style.display = "flex";
}

window.closeLetters = function () {
    document.getElementById("MyProfileletters").style.display = "none";
};

// Mostrar cartas en el pop-up al hacer clic en el botón
document.querySelector(".enviar-form").addEventListener("click", renderCartas);

function toggleUserMenu() {
    const profileOptions = document.getElementById("profile-options");
    profileOptions.classList.toggle("hidden");
}
