const { Like } = require("../DB_config");

// Función para encontrar matches
const findMatches = async () => {
  try {
    const allLikes = await Like.findAll(); // Obtén todos los registros de "likes"
    const matches = [];

    for (let i = 0; i < allLikes.length; i++) {
      for (let j = i + 1; j < allLikes.length; j++) {
        const like1 = allLikes[i];
        const like2 = allLikes[j];

        if (
          like1.myUserId === like2.anotherUserId &&
          like1.myPostId === like2.likedPostId &&
          like1.anotherUserId === like2.myUserId &&
          like1.likedPostId === like2.myPostId
        ) {
          matches.push({ match: [like1, like2] });
        }
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
