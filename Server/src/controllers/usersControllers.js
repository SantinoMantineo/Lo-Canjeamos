const { Post, User } = require("../DB_config");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwtGenerator")

exports.getAllUser = async () => {
  try {
    const users = await User.findAll();

    const simplifiedUsers = users.map((user) => ({
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
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !user.image ||
    !user.ubication ||
    !user.rol
  ) {
    throw new Error("Faltan datos");
  } else {
    const existEmail = await User.findAll({
      where: {
        email: user.email
      }
    });
    const existUsername = await User.findAll({
      where: {
        username: user.username
      }
    });
    if (existEmail.length !== 0 || existUsername.length !== 0) {
      throw new Error("El email o usuario ya están en uso, prueba uno diferente.");
    } else {
      try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const password = user.password;
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
          username: user.username,
          email: user.email,
          password: bcryptPassword,
          image: user.image,
          ubication: user.ubication,
          rol: user.rol,
        });

        const token = jwtGenerator(newUser.id)
        return {newUser, token};
      } catch (error) {
        throw new Error("No se pudo crear el usuario");
      }
    }
  }
};

exports.loginUser = async (user)=>{

  const usuario = await User.findAll({
    where: {
      username: user.username
    }
  });

  if(usuario === 0){
      throw new Error("No existe ningun usuario con ese nombre");
    } else {
      try {
        const validPassword = await bcrypt.compare(user.password, usuario.password)

        if(!validPassword){
          throw new Error("La contraseña es incorrecta");
        } else{
          const token = jwtGenerator(usuario.id);
          return { token }
        }
      } catch (error) {
        throw new Error("Error al iniciar sesion");
      }
    }
  }

exports.updateUser = async (id, updatedData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Post not found");
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
      throw new Error("No users found with the specified id");
    }

    return userById;
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return true;
  } catch (error) {
    throw error;
  }
};
