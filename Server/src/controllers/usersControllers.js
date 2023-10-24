const { Post, User } = require('../DB_config');

exports.getAllUser = async () => {
  try {
    const users = await User.findAll({
      include: User //trae toda la informacion del usuario, hay que elegir las porpiedades necesarias en vez de TODAS como esta configurado ahora
    });

    return users;
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
      const user = await User.findByPk(id);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      await user.update(updatedData);
  
      return user;
    } catch (error) {
      throw error;
    }
  };


  exports.deleteUser = async (id) => {
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      await user.destroy();
  
      return true;
    } catch (error) {
      throw error;
    }
  };