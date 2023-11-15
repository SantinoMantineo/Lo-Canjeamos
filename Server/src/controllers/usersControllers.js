const { Post, User } = require("../DB_config");
require("dotenv").config();
const bcrypt = require('bcrypt');
const { transporter } = require("../config/mailer")
const { registerMail, passwordForgot} = require("../utils/mailObjects")
const jwtGenerator = require("../utils/jwtGenerator")
const nodemailer = require('nodemailer')
const { ADMIN_USERS } = process.env;

const adminList = ADMIN_USERS.split(", ")

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

exports.getAllDisabled = async () => {
  try {
    const disabledUsers = await User.findAll({
      where: {paranoid: false}
    })

    return disabledUsers
  } catch (error) {
    throw "Ocurrió un error al traer los usuarios: " + error;
  }
};

exports.getAllExisting = async () => {
  try {
    const existingUsers = await User.findAll({
      paranoid: false,
      order: [['id', 'ASC']],
    })

    return existingUsers
  } catch (error) {
    throw "Ocurrió un error al traer los usuarios: " + error;
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
    if (existEmail.length !== 0) {
      throw new Error("El email ya se encuentra registrado");
    } 
    else if (existUsername.length !== 0) {
      throw new Error("El nombre de usuario ya se encuentra registrado");
    } 
    // if (existEmail.length !== 0 && existUsername.length !== 0) {
    //   throw new Error("El email y usuario ya están en uso, prueba uno diferente.");
    // }
    else {
      try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const password = user.password;
        const bcryptPassword = await bcrypt.hash(password, salt);

        if(adminList.includes(user.email) && user.origin === "google"){
          const newUser = await User.create({
            username: user.username,
            email: user.email,
            password: bcryptPassword,
            image: user.image,
            ubication: user.ubication,
            rol: "admin",
            origin: "google"
          });
          const token = jwtGenerator(newUser.id)
          await transporter.sendMail(registerMail(user))
          return {newUser, token};
        } else if(adminList.includes(user.email)){
          const newUser = await User.create({
            username: user.username,
            email: user.email,
            password: bcryptPassword,
            image: user.image,
            ubication: user.ubication,
            rol: "admin"
          });
          const token = jwtGenerator(newUser.id)
          await transporter.sendMail(registerMail(user))
          return {newUser, token};
        } else if(user.origin === "google"){
        const newUser = await User.create({
          username: user.username,
          email: user.email,
          password: bcryptPassword,
          image: user.image,
          ubication: user.ubication,
          origin: user.origin
        });
        const token = jwtGenerator(newUser.id)
        await transporter.sendMail(registerMail(user))
        return {newUser, token};
      } else {
        const newUser = await User.create({
          username: user.username,
          email: user.email,
          password: bcryptPassword,
          image: user.image,
          ubication: user.ubication,
          origin: "google"
        });
        const token = jwtGenerator(newUser.id)
        await transporter.sendMail(registerMail(user))
        return {newUser, token};
      }

      } catch (error) {
        throw new Error("Hubo un error al crear el usuario: " + error);
      }
    }
  }
};

exports.loginUser = async (user) => {
  if(user.origin === "google"){
    const usuarios = await User.findAll({
      where: {
        email: user.email
      }
    });

    if (usuarios.length === 0) {
      throw new Error("No existe ningún usuario con ese nombre");
    }

    try{
      const usuario = usuarios[0]; // Acceder al primer usuario en el array
      const token = jwtGenerator(usuario.id);
      return {usuario, token };

    } catch (error){
      console.log(error)
    }
  } else {
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
        return {usuario, token };
      }
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
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

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id)

    return user;
  } catch (error) {
    throw error;
  }
}

exports.userLogueado = async ({email}) => {
  try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      return user !== null;
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

exports.restoreUser = async (id) => {
  try {
    const userDisabled = await User.findByPk(id, {paranoid:false})

    if(!userDisabled) {
      throw new Error("El usuario que intenta restaurar no se encuentra.")
    }
    
    await userDisabled.restore()
    return userDisabled;
  } catch (error) {
    throw (error)
  }
};

exports.getAnotherUser= async (id) => {
  try {
    const userId = await User.findByPk(id)

    return userId;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
}