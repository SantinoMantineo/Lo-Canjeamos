const { Like } = require("../DB_config");

const createLike = async (myUserId, likedPostId, myPostId, anotherUserId) => {
  try {
    // Comprueba si ya existe un "like" recíproco para esta publicación
    const existingLike = await Like.findOne({
      where: {
        likedPostId: likedPostId,
        myUserId: myUserId,
        myPostId: myPostId,
        anotherUserId, anotherUserId,
        isMatch: true,
      },
    });

    if (existingLike) {
      // Si existe un "like" recíproco, actualiza ambos "likes" a isMatch=true
      await Like.update(
        { isMatch: true },
        { where: { id: [existingLike.id, myUserId] } }
      );
    } else {
      // Si no existe un "like" recíproco, crea un nuevo "like"
      await Like.create({
        myUserId,
        likedPostId,
        myPostId,
        anotherUserId,
        isMatch: false,
      });
    }

    return true; // El "like" se registró con éxito
  } catch (error) {
    throw new Error('Error al dar like a la publicación: ' + error.message);
  }
};

module.exports = {
  createLike,
};