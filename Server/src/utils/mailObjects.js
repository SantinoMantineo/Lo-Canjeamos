const { log } = require('console');
const fs = require('fs');

const registerTemplate = fs.readFileSync(__dirname + '/register.html', 'utf8');
const forgotTemplate = fs.readFileSync(__dirname + '/forgot.html', 'utf8');
const postTemplate = fs.readFileSync(__dirname + '/newPost.html', 'utf8');
const matchTemplate = fs.readFileSync(__dirname + '/matchTemplate.html', 'utf8');

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

const matchMail = (firstUser, secondUser, firstPost, secondPost) => {
  const firstMail = firstUser.email;
  const secondMail = secondUser.email;
  
  const urlPersonalizada = `https://locanjeamos.com.ar/#/exchanges`;
  const currentDateTime = new Date().toLocaleString();

  const notificationEmail = matchTemplate
  .replace('{{currentDateTime}}', currentDateTime)
  .replace('{{user1.username}}', firstUser.username)
  .replace('{{user2.username}}', secondUser.username)
    .replace('{{user1.product}}', firstPost.image[0])
    .replace('{{user2.product}}', secondPost.image[0])
    .replace('{{matchProfileLink}}', urlPersonalizada);

  return {      
      to: firstMail,
      bcc: secondMail,
      subject: "¡Match encontrado!",
      html: notificationEmail,
  }
};

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

module.exports = { registerMail, postCreated, matchMail, passwordForgot };
