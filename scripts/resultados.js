 // Obtén el puntaje guardado en sessionStorage
 const lastScore = sessionStorage.getItem('lastScore');
      
 // Muestra el puntaje en el elemento con ID "scoreDisplay"
 document.getElementById('scoreDisplay').textContent = lastScore ? lastScore : '0';

 // Función para redirigir al inicio
 function goToHome() {
   window.location.href = 'menuPrincipal.html';
 }