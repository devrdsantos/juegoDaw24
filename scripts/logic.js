document.addEventListener('DOMContentLoaded', () => {
    const gameWindow = document.querySelector('.game-window');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('points');
    const intentos = document.getElementById('intentos');
    let score = 0;
    let timeLeft = 60;
    let interval;
  
    // Aquí se puede establecer el username del usuario que está jugando
    // Asegúrate de que este valor se establezca en el momento del inicio de sesión
    const username = sessionStorage.getItem('username') || 'Invitado'; // Cambia a un valor predeterminado si no hay
  
    // Verifica y actualiza el número de intentos en sessionStorage
    let attempts = sessionStorage.getItem('attempts');
    attempts = attempts ? parseInt(attempts) + 1 : 1;
    sessionStorage.setItem('attempts', attempts);
  
    function startGame() {
      interval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(interval);
          endGame();
          return;
        }
        timeLeft--;
        timeDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 15) {
          gameWindow.style.backgroundImage = "url('../assets/psycho_gif.webp')";
        }
        generateImages();
      }, 1000);
    }
  
    function generateImages() {
      const imagePaths = [
        '../assets/imagen_juego1.png',
        '../assets/imagen_juego2.png',
        '../assets/imagen_juego3.png',
        '../assets/imagen_juego4.png'
      ];
  
      const imageCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < imageCount; i++) {
        const image = document.createElement('img');
        const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        image.src = randomImage;
  
        image.classList.add('image');
        image.style.top = Math.random() * (gameWindow.clientHeight - 100) + 'px';
        image.style.left = Math.random() * (gameWindow.clientWidth - 100) + 'px';
  
        image.addEventListener('click', () => {
          score++;
          scoreDisplay.textContent = `Puntuación: ${score}`;
          image.remove();
        });
  
        gameWindow.appendChild(image);
  
        setTimeout(() => {
          if (image.parentNode) {
            image.remove();
          }
        }, Math.max(1000, 1000 - timeLeft * 10));
      }
    }
  
    function endGame() {
        // Guardar la puntuación actual en sessionStorage
        sessionStorage.setItem('lastScore', score);
    
        // Obtener la puntuación más alta actual
        let highScore = localStorage.getItem('highScore');
        highScore = highScore ? parseInt(highScore) : 0; // Asegurarse de que sea un número
    
        // Verificar y actualizar la puntuación máxima
        if (score > highScore) {
            updateUserHighScore(score); // Actualiza la puntuación máxima del usuario
        }
    
        // Actualizar el array de juegos en localStorage
        updateGameData(score);
    
        // Redirigir a otra página al finalizar
        window.location.href = 'resultados.html'; // Cambia por la URL de tu página de resultados
    }
    
    function updateGameData(finalScore) {
        // Obtener el nombre de usuario del sessionStorage
        const username = sessionStorage.getItem('username');
        // Obtener el array de juegos del sessionStorage
        let games = JSON.parse(localStorage.getItem('games')) || [];
    
        // Buscar el último juego del usuario
        const gameIndex = games.findIndex(game => game.username === username && game.score === 0);
    
        // Si se encuentra el juego, actualizar su puntaje y datetime
        if (gameIndex !== -1) {
            games[gameIndex].score = finalScore; // Actualiza el puntaje
            games[gameIndex].datetime = new Date().toISOString(); // Actualiza la fecha y hora
        }
    
        // Almacenar el array actualizado en sessionStorage
        localStorage.setItem('games', JSON.stringify(games));
    }
    
  
    function updateUserHighScore(username, newHighScore) {
      // Obtener usuarios del localStorage
      let users = JSON.parse(localStorage.getItem('users'));
  
      // Verificar que los usuarios existan
      if (users) {
        // Buscar el usuario que corresponde al username
        const user = users.find(user => user.username === username);
        if (user) {
          // Actualizar la puntuación máxima del usuario encontrado
          user.puntuacionMaxima = newHighScore;
          // Guardar de nuevo el array de usuarios en localStorage
          localStorage.setItem('users', JSON.stringify(users));
          console.log("Puntuación máxima actualizada para el usuario:", username, user.puntuacionMaxima); // Para depuración
        }
      }
    }
  
    startGame();
  });

  // Recupera el valor de attempts desde sessionStorage
let attempts = sessionStorage.getItem('attempts');

// Verifica si attempts existe y es válido
if (attempts !== null) {
  intentos.textContent = `Intentos: ${attempts}`;
} else {
  // Si no hay un valor almacenado en sessionStorage, maneja el caso de manera apropiada
  intentos.textContent = 'Intentos: 0';
}

  