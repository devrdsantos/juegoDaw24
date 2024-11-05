// Seleccionar elementos del DOM
const loginButton = document.querySelector(".login");
const usernameInput = document.querySelector(".login-usuario");
const passwordInput = document.querySelector(".password-usuario");

// Función para iniciar sesión
function loginUser() {
  const username = usernameInput.value.trim(); // Usar trim para evitar espacios
  const password = passwordInput.value;

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Obtener el array de usuarios almacenado en localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Usuarios cargados:", users); // Depuración

  // Buscar un usuario que coincida con el nombre de usuario y la contraseña
  const validUser = users.find(user => user.username === username && user.password === password);

  // Validar si el usuario existe y la contraseña es correcta
  if (validUser) {
    alert("Inicio de sesión exitoso.");
    console.log("Nombre de usuario guardado:", validUser.username); // Depuración
    
    // Guardar el nombre de usuario en sessionStorage
    sessionStorage.setItem('username', validUser.username);
    
    // Crear el array de juegos si no existe
    let games = JSON.parse(localStorage.getItem('games')) || [];
    
    // Crear un objeto para el nuevo juego
    const gameData = {
      username: validUser.username,
      id: Date.now(), // ID único basado en el timestamp
      score: 0, // Inicialmente 0, se actualizará más tarde
      datetime: new Date().toISOString() // Guardar la fecha y hora en formato ISO
    };

    // Agregar el nuevo juego al array
    games.push(gameData);
    
    // Almacenar el array actualizado en sessionStorage
    localStorage.setItem('games', JSON.stringify(games));

    // Redirigir al usuario al menú principal
    window.location.href = "menuPrincipal.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

// Agregar evento al botón de inicio de sesión
loginButton.addEventListener("click", loginUser);
