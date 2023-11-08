const { Like } = require("../DB_config");

const createLike = async (myUserId, likedPostId, myPostId, anotherUserId) => {
  try {
    // Comprueba si ya existe un "like" recíproco para esta publicación
    const existingLike = await Like.create({
        myUserId,
        likedPostId,
        myPostId,
        anotherUserId,
      });

    return existingLike; // El "like" se registró con éxito
  } catch (error) {
    throw new Error('Error al dar like a la publicación: ' + error.message);
  }
};


const getAllLikes = async () => {
  try {
    const likes = await Like.findAll();

    return likes;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createLike,
  getAllLikes
};