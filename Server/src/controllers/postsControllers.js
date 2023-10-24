const { Post, User } = require('../DB_config');

exports.getAllPosts = async () => {
  try {
    const posts = await Post.findAll({
      include: User //trae toda la informacion del usuario, hay que elegir las porpiedades necesarias en vez de TODAS como esta configurado ahora
    });

    return posts;
  } catch (error) {
    throw error;
  }
};


exports.getPostById = async (id) => {
    try {
      const post = await Post.findByPk(id);
  
      if (!post) {
        throw new Error('Post not found');
      }
  
      return post;
    } catch (error) {
      throw error;
    }
  };


exports.updatePost = async (id, updatedData) => {
    try {
      const post = await Post.findByPk(id);
  
      if (!post) {
        throw new Error('Post not found');
      }
  
      await post.update(updatedData);
  
      return post;
    } catch (error) {
      throw error;
    }
  };


  exports.deletePost = async (id) => {
    try {
      const post = await Post.findByPk(id);
  
      if (!post) {
        throw new Error('Post not found');
      }
  
      await post.destroy();
  
      return true;
    } catch (error) {
      throw error;
    }
  };