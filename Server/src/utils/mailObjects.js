const fs = require('fs');

const registerTemplate = fs.readFileSync(__dirname + '/register.html', 'utf8');

const registerMail = (user) => {
  return {
    to: user.email,
    subject: "Registro completado",
    html: registerTemplate,
  };
};

const postCreated = (email, PostData) => {
  return {
    to: email,
    subject: "Publicación Creada",
    html: `
    <h2>¡Felicidades por tu nuevo producto!</h2>
    <p>Tu producto se ha creado correctamente, te detallamos su información:</p>
    <br>
    <img src=${PostData.image} alt="Imagen de tu publicacicón" style="width: 180px; height: 180px">
    <br>
    <b>Título: </b><p>${PostData.title}</p>
    <b>Descripción: </b><p>${PostData.description}</p>
    <b>Categoría: </b><p>${PostData.category}</p>
    <b>Ubicación: </b><p>${PostData.ubication}</p>
    <br>
    <p>Puedes visualizarla en el Home o en tu Perfil para editar sus detalles.</p>
    <p>¡PTSSS...! Si quieres que tu publicación triunfe o conocer detalles más a fondo, te recomendamos mirar nuestra sección de Premium 😉</p>
    <p> Saludos, <i>LoCanjeamos</i></p>
    `
  }
}

const passwordForgot = (email, id) => {
  
  return {
    to: email,
    subject: "Registro completado",
    html: `
    <h2>Recupera tu contraseña</h2>
    <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no has realizado esta solicitud, puedes ignorar este mensaje.</p>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
    <a href=http://localhost:5173/#/resetpassword/${id}>Restablecer contraseña</a>
    <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
    <p>http://localhost:5173/#/resetpassword/${id}</p>
    <p>Este enlace expirará en 1 hora.</p>
    <p>Si no deseas restablecer tu contraseña, no es necesario que realices ninguna acción.</p>
    `
  }
}

module.exports = { registerMail, postCreated, passwordForgot };
