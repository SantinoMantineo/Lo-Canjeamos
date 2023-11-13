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
const getLikesRecibidos = async (myUserId) => {
  try {
    const likesRecibidos = await Like.findAll({
      where: {
        anotherUserId: myUserId,
      },
    });

    const posts = [];
    
    const likes = likesRecibidos.forEach((post)=>{
      posts.push(post.likedPostId, post.myPostId)
    })

    return posts;
  } catch (error) {
    throw new Error('Error al dar obtener likes recibidos: ' + error.message);
  }
};

const removeLike = async (likeId) => {
  try {
    // Busca el like por la propiedad "likedPostId"
    const likeToRemove = await Like.findOne({
      where: { likedPostId: likeId },
    });

    // Verifica si el like existe
    if (!likeToRemove) {
      throw new Error('No se encontró el like con el likedPostId proporcionado');
    }

    // Obtiene el ID del post que le dio like
    const likedPostId = likeToRemove.likedPostId;

    // Elimina el like
    await likeToRemove.destroy();

    return likedPostId; // Devuelve el ID del post que le dio like
  } catch (error) {
    throw new Error('Error al eliminar el like: ' + error.message);
  }
};


module.exports = {
  createLike,
  getAllLikes,
  getLikesRecibidos,
  removeLike
};