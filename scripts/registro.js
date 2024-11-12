// Seleccionar elementos del DOM
const registerButton = document.getElementById("registerButton");
const usernameInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("repeat-password");

// Función para registrar usuario
function registerUser() {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  // Validar que todos los campos estén llenos
  if (!username || !password || !repeatPassword) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Validar longitud del nombre de usuario (4-10 caracteres)
  if (username.length < 4 || username.length > 10) {
    alert("El nombre de usuario debe tener entre 4 y 10 caracteres.");
    return;
  }

  // Validar longitud de la contraseña (6-20 caracteres)
  if (password.length < 6 || password.length > 20) {
    alert("La contraseña debe tener entre 6 y 20 caracteres.");
    return;
  }

  // Validar que las contraseñas coincidan
  if (password !== repeatPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Crear el objeto usuario
  const user = {
    username: username,
    password: password,
    profileImage: "",
  };

  // Obtener el array de usuarios de localStorage (o crear uno vacío si no existe)
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Validar que el usuario no exista ya en el array
  const userExists = users.some(u => u.username === username);
  if (userExists) {
    alert("El nombre de usuario ya está en uso. Elige otro.");
    return;
  }

  // Agregar el nuevo usuario al array
  users.push(user);

  // Guardar el array actualizado en localStorage
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario registrado exitosamente.");
  
  // Limpiar campos después de registrar
  usernameInput.value = "";
  passwordInput.value = "";
  repeatPasswordInput.value = "";
}

// Agregar evento al botón de registro
registerButton.addEventListener("click", registerUser);
