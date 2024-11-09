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
 console.log("Puntuación máxima actualizada:", users[0].puntuacionMaxima);

