const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "locanjeamos@gmail.com",
      pass: "tucr tvww qwpz rydo",
    },    tls: {
      rejectUnauthorized: false
    },
  },
  {
    from: '"LoCanjeamos" <registro@locanjeamos.com>',
  }
);

module.exports = { transporter };
