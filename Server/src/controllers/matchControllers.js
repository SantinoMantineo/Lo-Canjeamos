const { Like } = require("../DB_config");

// Función para encontrar matches
const findMatches = async () => {
  try {
    const allLikes = await Like.findAll(); // Obtén todos los registros de "likes"
    const matches = [];

    for (let i = 0; i < allLikes.length; i++) {
      const currentLike = allLikes[i];
      const { myUserId, anotherUserId, myPostId, likedPostId } = currentLike;
      let isMatch = true;

      for (let j = 0; j < allLikes.length; j++) {
        if (i !== j) {
          const otherLike = allLikes[j];
          const { myUserId: otherMyUserId, anotherUserId: otherAnotherUserId, myPostId: otherMyPostId, likedPostId: otherLikedPostId } = otherLike;

          // Compara los valores de las columnas
          if (
            myUserId === otherAnotherUserId &&
            myPostId === otherLikedPostId &&
            anotherUserId === otherMyUserId &&
            likedPostId === otherMyPostId
          ) {
            // Coinciden todos los valores
            isMatch = true;
            break;
          } else {
            // No coinciden los valores, sigue buscando
            isMatch = false;
          }
        }
      }

      if (isMatch) {
        matches.push(currentLike);
      }
    }

    return matches;
  } catch (error) {
    throw new Error('Error al buscar coincidencias: ' + error.message);
  }
};

module.exports = {
  findMatches,
};