const registerMail = (user) => {
  return {
    to: user.email,
    subject: "Registro completado",
    html: `
    <b>Felicitaciones ${user.username}! 🎉</b>
    <br>
    <p>Completaste exitosamente el formulario de registro 📑</p>
    <p>Te invitamos a explorar todos los productos que están esperando a ser canjeados por los usuarios de todo el país 🔥</p>
    <p>Este es un mail automático de verificación así que no lo respondas directamente. Si tenes alguna consulta podes enviarnos un nuevo mail a <i>locanjeamos@gmail.com</i> y responderemos tu consulta a la brevedad 📩.</p>
    <br>
    <p>Saludos, LoCanjeamos</p>
    `,
  };
};

module.exports = { registerMail };
