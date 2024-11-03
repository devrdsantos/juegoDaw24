// Seleccionar elementos del DOM
const loginButton = document.querySelector(".login");
const usernameInput = document.querySelector(".login-usuario");
const passwordInput = document.querySelector(".password-usuario");

// Función para iniciar sesión
function loginUser() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Obtener el array de usuarios almacenado en localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Buscar un usuario que coincida con el nombre de usuario y la contraseña
  const validUser = users.find(user => user.username === username && user.password === password);

  // Validar si el usuario existe y la contraseña es correcta
  if (validUser) {
    alert("Inicio de sesión exitoso.");
    // Redirigir al usuario al menú principal
    window.location.href = "menuPrincipal.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

// Agregar evento al botón de inicio de sesión
loginButton.addEventListener("click", loginUser);
