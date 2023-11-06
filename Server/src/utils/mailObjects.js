const fs = require('fs');

const registerTemplate = fs.readFileSync(__dirname + '/register.html', 'utf8');
const forgotTemplate = fs.readFileSync(__dirname + '/forgot.html', 'utf8');
const postTemplate = fs.readFileSync(__dirname + '/newPost.html', 'utf8');

const registerMail = (user) => {
  return {
    to: user.email,
    subject: "Registro completado",
    html: registerTemplate,
  };
};

const postCreated = (email, PostData) => {
  const { title, description, category, ubication, image } = PostData;
  const urlPersonalizada = `https://www.locanjeamos.com.ar/#/login`;
  // const urlPersonalizada = `http://localhost:5173/#/login`;
  const notificationEmail = postTemplate
    .replace('{{title}}', title)
    .replace('{{description}}', description)
    .replace('{{category}}', category)
    .replace('{{ubication}}', ubication)
    .replace('{{image}}', image[0])
    .replace('{{link}}', urlPersonalizada);


  return {
    to: email,
    subject: "Publicación Creada",
    html: notificationEmail,
  }
}

const passwordForgot = (email, id) => {

  const idUsuario = id
  const urlPersonalizada = `https://www.locanjeamos.com.ar/#/resetpassword/${idUsuario}`;
  // const urlPersonalizada = `http://localhost:5173/#/resetpassword/${idUsuario}`;
  const forgotTemplateWithLink = forgotTemplate.replace("{{reset_password_link}}", urlPersonalizada);
  
  return {
    to: email,
    subject: "Recuperacion de contraseña",
    html: forgotTemplateWithLink,
  }
}

module.exports = { registerMail, postCreated, passwordForgot };
