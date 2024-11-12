function formatDate(datetime) {
    const date = new Date(datetime);  // Crear un objeto Date a partir de la cadena ISO 8601
    const day = String(date.getDate()).padStart(2, '0');  // Obtener el día y agregar un 0 si es menor que 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Obtener el mes (los meses empiezan desde 0, así que sumamos 1)
    const year = date.getFullYear();  // Obtener el año
    
    return `${day}/${month}/${year}`;  // Devolver la fecha en formato dd/mm/yyyy
  }


// Paso 1: Obtener los datos de localStorage
const games = JSON.parse(localStorage.getItem('games') || '[]');
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Paso 2: Ordenar los juegos por puntuación de mayor a menor
const topGames = games.sort((a, b) => b.score - a.score).slice(0, 10);

// Paso 3: Generar el HTML para mostrar el ranking
const rankingContainer = document.querySelector('.container');

// Función para obtener la imagen de perfil de un usuario
function getProfileImage(username) {
  const user = users.find(user => user.username === username);
  // Comprobamos si hay imagen en Base64 y si existe, la devolvemos correctamente
  return user ? user.profileImage || '../assets/paw.png' : '../assets/paw.png';
}

// Limpiar el contenedor de usuario si contiene elementos antiguos
rankingContainer.innerHTML = `
  <div class="encabezado">
    <img src="../assets/encabezado-ranking-g.png" alt="">
    <h1>Top Puppy Clickers</h1>
  </div>
`;

// Paso 4: Crear y agregar los elementos de usuario al ranking
topGames.forEach(game => {
  const profileImage = getProfileImage(game.username);
  const formattedDate = formatDate(game.datetime);
  const usuarioHTML = `
    <div class="usuario">
      <div class="sub-cont-usuario">
        <img src="${profileImage}" alt="Imagen de perfil" class="profileImage" />
        <a href="#">${game.username}</a>
      </div>
      <p>${formattedDate}</p>
      <p>${game.score}</p>  
    </div>
  `;
  rankingContainer.insertAdjacentHTML('beforeend', usuarioHTML);
});

// Paso 5: Agregar funcionalidad al botón de reiniciar ranking
document.getElementById('reiniciarRanking').onclick = function() {
    // Eliminar el array de juegos del localStorage
    localStorage.removeItem('games');
    
    // Limpiar el contenedor del ranking
    rankingContainer.innerHTML = `
      <div class="encabezado">
        <img src="../assets/encabezado-ranking-g.png" alt="">
        <h1>Top Puppy Clickers</h1>
      </div>
      <p>El ranking ha sido reiniciado.</p>
    `;
    alert('¡Ranking reiniciado con éxito!');
};