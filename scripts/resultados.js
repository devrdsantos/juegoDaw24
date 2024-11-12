 // Obtén el puntaje guardado en sessionStorage
 const lastScore = sessionStorage.getItem('lastScore');
      
 // Muestra el puntaje en el elemento con ID "scoreDisplay"
 document.getElementById('scoreDisplay').textContent = lastScore ? lastScore : '0';

 // Función para redirigir al inicio
 function goToHome() {
   window.location.href = 'menuPrincipal.html';
 }

 console.log(localStorage);
 console.log(sessionStorage);
 let users = JSON.parse(localStorage.getItem('users'));



// Recupera y parsea el array 'games' desde el localStorage
const games = JSON.parse(localStorage.getItem('games'));

// Inicializa una variable para almacenar el puntaje mayor
let maxScore = 0;

// Recorre cada objeto 'game' dentro de 'games' para encontrar el puntaje más alto
games.forEach(game => {
    if (game.score > maxScore) {
        maxScore = game.score;
    }
});

console.log("El puntaje mayor es:", maxScore);

 // Borrar todos los datos del sessionStorage y el localStorage
 //localStorage.clear();
 //sessionStorage.clear();