const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "locanjeamos@gmail.com",
      pass: "tucr tvww qwpz rydo",
    },
  },
  {
    from: '"LoCanjeamos" <registro@locanjeamos.com>',
  }
);

module.exports = { transporter };
