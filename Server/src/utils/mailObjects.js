const fs = require('fs');

const registerTemplate = fs.readFileSync(__dirname + '/register.html', 'utf8');

const registerMail = (user) => {
  return {
    to: user.email,
    subject: "Registro completado",
    html: registerTemplate,
  };
};

const passwordForgot = (email, id) => {
  return {
    to: email,
    subject: "Registro completado",
    html: `
    <h2>Recupera tu contraseña</h2>
    <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no has realizado esta solicitud, puedes ignorar este mensaje.</p>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
    <a href=http://localhost:3001/users/reset-password/${id}>Restablecer contraseña</a>
    <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
    <p>http://localhost:3001/users/reset-password/${id}</p>
    <p>Este enlace expirará en 1 hora.</p>
    <p>Si no deseas restablecer tu contraseña, no es necesario que realices ninguna acción.</p>
    `
  }
}

module.exports = { registerMail, passwordForgot };
