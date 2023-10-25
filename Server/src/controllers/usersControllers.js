const { Post, User} = require('../DB_config');

exports.getAllUser = async () => {
  try {
    const users = await User.findAll();

    const simplifiedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      ubication: user.ubication,
      rol: user.rol,
    }));

    return simplifiedUsers;
  } catch (error) {
    throw error;
  }
};


exports.createUser = async (user) => {
  if (!user.username || !user.email || !user.password || !user.image || !user.ubication || !user.rol) {
    throw new Error('Faltan datos');
  }

  try {
    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.image,
      ubication: user.ubication,
      rol: user.rol,
    });

    return newUser;
  } catch (error) {
    throw new Error('No se pudo crear el usuario');
  }
};

exports.updateUser = async (id, updatedData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('Post not found');
    }

    await user.update(updatedData);

    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (id) => {
    try {
      const userById = await User.findByPk(id);
  
      if (!userById) {
        throw new Error('No users found with the specified id');
      }
      
      return userById;
    } catch (error) {
      throw error;
    }
  };


// exports.updatePost = async (id, updatedData) => {
//     try {
//       const user = await User.findByPk(id);
  
//       if (!user) {
//         throw new Error('User not found');
//       }
  
//       await user.update(updatedData);
  
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };


//   exports.deleteUser = async (id) => {
//     try {
//       const user = await User.findByPk(id);
  
//       if (!user) {
//         throw new Error('User not found');
//       }
  
//       await user.destroy();
  
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   };
