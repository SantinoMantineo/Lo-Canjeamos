const { Post, User } = require("../DB_config");
const bcrypt = require('bcrypt');
const { transporter } = require("../config/mailer")
const { registerMail, passwordForgot} = require("../utils/mailObjects")
const jwtGenerator = require("../utils/jwtGenerator")
const nodemailer = require('nodemailer')

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
exports.createGoogleUser = async (user) => {
  console.log("esto esta llegando",user);
  try {
    const createdUser = await User.create({
      username: user.nickname,
      ubication:"Buenos Aires,Palermo",
      password:"contraseña",
      email: user.email, 
      image: user.picture,
      rol: "user",
    });

    return createdUser;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};
exports.createUser = async (user) => {
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !user.image ||
    !user.ubication
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
        });

        const token = jwtGenerator(newUser.id)
        await transporter.sendMail(registerMail(user))
        return {newUser, token};
      } catch (error) {
        throw new Error("Hubo un error al crear el usuario: " + error);
      }
    }
  }
};

exports.loginUser = async (user) => {
  const usuarios = await User.findAll({
    where: {
      username: user.username
    }
  });

  if (usuarios.length === 0) {
    throw new Error("No existe ningún usuario con ese nombre");
  } else {
    try {
      const usuario = usuarios[0]; // Acceder al primer usuario en el array

      const validPassword = await bcrypt.compare(user.password, usuario.password);

      if (!validPassword) {
        throw new Error("La contraseña es incorrecta");
      } else {
        const token = jwtGenerator(usuario.id);
        return { token };
      }
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  }
};

exports.getUserId = async (user) => {
  try {
    const userId = await User.findByPk(user)
    return userId;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
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

exports.forgotPassword = async (email) => {
  try{
    const usuario = await User.findOne({where: {email}})

    if(!usuario){
        throw new Error("El usuario no existe")
    }
    await transporter.sendMail(passwordForgot(email, usuario.id))
    return "El mail fue enviado correctamente";

  } catch (error) {
    throw error;
  }
};

exports.resetPassword = async (id, newPassword) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found', error);
    } 
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: bcryptPassword });

    return "Contraseña actualizada correctamente";
  } catch (error) {
    console.error(error);
  throw new Error("No se pudo actualizar la contraseña", error);
  }
};