// Paso 1: Obtener el nombre de usuario logueado desde sessionStorage
const loggedInUsername = sessionStorage.getItem('username');

// Verificar si el usuario está logueado
if (!loggedInUsername) {
    alert("No hay ningún usuario logueado.");
    window.location.href = "login.html"; // Redirige a la página de login si no hay usuario logueado
}

// Paso 2: Obtener los datos de usuarios desde localStorage
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Buscar el usuario logueado en el array de usuarios
let currentUser = users.find(user => user.username === loggedInUsername);

// Si no se encuentra al usuario (algo inesperado), redirigir al login
if (!currentUser) {
    alert("Usuario no encontrado.");
    window.location.href = "login.html";
}

// Paso 3: Seleccionar los elementos de entrada
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const saveButton = document.getElementById('saveButton');
const profileImage = document.getElementById('profileImage');
const fileInput = document.getElementById('fileInput');

// Paso 4: Mostrar los valores de `username`, `password` y `profileImage`
if (currentUser) {
    usernameInput.value = currentUser.username;
    passwordInput.value = currentUser.password;
    if (currentUser.profileImage) {
        profileImage.src = currentUser.profileImage;
    }
}

// Paso 5: Función para guardar cambios
saveButton.addEventListener('click', () => {
    // Validaciones
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const passwordRepeat = passwordRepeatInput.value;

    // Validar username
    if (username.length < 4) {
        alert("El nombre de usuario debe tener al menos 4 caracteres.");
        return;
    }

    // Validar si el nombre de usuario ya existe
    if (users.some(user => user.username === username && user.username !== currentUser.username)) {
        alert("El nombre de usuario ya está en uso.");
        return;
    }

    // Validar password
    if (password.length < 6 || password.length > 20) {
        alert("La contraseña debe tener entre 6 y 20 caracteres.");
        return;
    }

    // Validar que las contraseñas coinciden
    if (password !== passwordRepeat) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Actualizar `username` y `password` con los valores de los inputs
    currentUser.username = username;
    currentUser.password = password;

    // Guardar cambios en `localStorage`
    localStorage.setItem('users', JSON.stringify(users));
    alert('¡Datos actualizados con éxito!');
});


// Paso 6: Activar el selector de archivo al hacer clic en el botón de edición de imagen
document.getElementById('editImage').addEventListener('click', () => {
    fileInput.click(); // Simula un clic en el input de archivo
});

// Paso 7: Leer y mostrar la imagen de perfil seleccionada por el usuario
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const imageBase64 = reader.result;
            currentUser.profileImage = imageBase64;
            profileImage.src = imageBase64;

            // Guardar la imagen en formato Base64 en `localStorage`
            localStorage.setItem('users', JSON.stringify(users));
            alert('¡Imagen de perfil actualizada!');
        };
        reader.readAsDataURL(file); // Convierte el archivo en una URL Base64
    }
});
