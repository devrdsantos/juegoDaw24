document.getElementById("comenzarPartida").onclick = function() {
    // Obtener el nombre de usuario desde sessionStorage
    const validUser = sessionStorage.getItem("username");  // Aquí recuperamos el nombre de usuario directamente como un string
  
    // Verificar si validUser existe
    if (validUser) {
      // Crear el array de juegos si no existe
      let games = JSON.parse(localStorage.getItem('games')) || [];
  
      // Crear un objeto para el nuevo juego
      const gameData = {
        username: validUser,  // Usamos directamente el nombre de usuario como string
        id: Date.now(), // ID único basado en el timestamp
        score: 0, // Inicialmente 0, se actualizará más tarde
        datetime: new Date().toISOString() // Guardar la fecha y hora en formato ISO
      };
  
      // Agregar el nuevo juego al array de juegos
      games.push(gameData);
  
      // Almacenar el array actualizado en localStorage
      localStorage.setItem('games', JSON.stringify(games));
        window.location.href = "../pages/gamePage.html";   
    } else {
      alert("No se encontró el usuario válido.");
    }
  };
  


document.getElementById("IrAlPerfil").onclick = function() {
        window.location.href = "../pages/perfil.html";   
};

document.getElementById("VerRanking").onclick = function() {
        window.location.href = "../pages/ranking.html";    
};

document.getElementById("cerrarSesion").onclick = function() {
    window.location.href = "../pages/index.html";
};