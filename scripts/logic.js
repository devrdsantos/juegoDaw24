document.addEventListener('DOMContentLoaded', () => {
    const gameWindow = document.querySelector('.game-window');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('points');
    let score = 0;
    let timeLeft = 60;
    let interval;
  
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
  
        const image = document.createElement('img');
        image.src = '../assets/imagen_juego.png'; // Ruta a tu imagen
        image.classList.add('image');
        image.style.top = Math.random() * (gameWindow.clientHeight - 50) + 'px';
        image.style.left = Math.random() * (gameWindow.clientWidth - 50) + 'px';
  
        image.addEventListener('click', () => {
          score++;
          scoreDisplay.textContent = `Puntuacion: ${score}`;
          image.remove();
        });
  
        gameWindow.appendChild(image);
  
        setTimeout(() => {
          if (image.parentNode) {
            image.remove();
          }
        }, 1000 - timeLeft * 10); // Aumenta la velocidad al avanzar el tiempo
      }, 1000);
    }
  
    function endGame() {
      // Guardar la puntuación actual en sessionStorage
      sessionStorage.setItem('lastScore', score);
  
      // Verificar y actualizar la puntuación máxima en localStorage
      let highScore = localStorage.getItem('highScore');
      if (!highScore || score > parseInt(highScore)) {
        localStorage.setItem('highScore', score);
      }
  
      // Guardar la fecha y hora de juego
      const currentDate = new Date();
      sessionStorage.setItem('gameDate', currentDate.toLocaleString());
  
      // Redirigir a otra página al finalizar
      window.location.href = 'resultados.html'; // Cambia por la URL de tu página de resultados
    }
  
    startGame();
  });
  