const { Post, User } = require("../DB_config");
const bcrypt = require('bcrypt');
const { transporter } = require("../config/mailer")
const { registerMail } = require("../utils/mailObjects")
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
        throw new Error(error);
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

  const check = await User.findOne({where: {email}})

  if(check === null){
      return res.send({Status: "User doesnt exist"})
  }
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //? chequear que se hace aca
    port: 465, //? chequear que se hace aca
    secure: true, //? chequear que se hace aca
    auth: {
      user: "locanjeamos@gmail.com",
      pass: "lmlg nyse vzrc thuc", //? chequear que se hace aca
    },
    });
    
    const mailOptions = {
      from: 'locanjeamos@gmail.com',
      to: check.email,
      subject: 'Reset Password',
      html: `
      <html>
<head>
   <style>
      /* Style the anchor to look like a button */
      .button-link {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff; /* Change the background color to your preference */
          color: #fff; /* Change the text color to your preference */
          text-decoration: none;
          border: 1px solid #007bff; /* Add a border to make it look like a button */
          border-radius: 4px; /* Add rounded corners */
      }

      .button-link:hover {
          background-color: #0056b3; /* Change the background color on hover */
      }
    </style>
</head>
<body>
  <a class="button-link" href=""/reset-password/${check.userId}">Reset Password</a>
</body>
</html
  `
    };
    
    await transporter.sendMail(mailOptions);
    return { status: 'Success' };
  } catch (error) {
    console.log(error);
    return { status: 'Error' };
  }
};

exports.resetPassword = async (id, newPassword) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return { status: 'User not found' };
    }

    await user.update({ passwordHash: newPassword });

    return { status: 'Success' };
  } catch (error) {
    console.error(error);
    return { status: 'Error' };
  }
};
