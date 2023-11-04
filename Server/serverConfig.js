const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const router = require("./src/routes/routes");
const { Message } = require("./src/DB_config");


const morgan = require("morgan");
const cors = require("cors");
const mercadopago = require("mercadopago");
const server = express();
const serverIo = http.createServer(server);
const socketServer = socketIo(serverIo, {
  cors: {
    origin: ['http://localhost:5173', 'https://locanjeamos.com.ar', 'https://lo-canjeamos-production.up.railway.app'],
  },
}); // Cambio de nombre a socketServer

socketServer.on("connection", (socketServer) => {
  // Escucha el evento "nuevo-mensaje" desde el cliente
  socketServer.on("new-message", async (mensaje) => {
    try {
      // Guarda el mensaje en la base de datos utilizando el modelo de mensajes
      const nuevoMensaje = await Message.create({
        contenido: mensaje.contenido,
        remitenteId: mensaje.remitenteId, // ID del remitente
        chatId: mensaje.chatId, // ID del chat al que pertenece
        fechaEnvio: new Date(), // Fecha y hora actual
        // Otros campos del mensaje
      });

      // Notifica a todos los clientes (incluido el remitente) sobre el nuevo mensaje
      socketServer.emit("live-message", nuevoMensaje); // Cambio de nombre a socketServer
    } catch (error) {
      console.error("Error al guardar el mensaje en la base de datos:", error);
    }
  });
});

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:5173', 'https://locanjeamos.com.ar', 'https://lo-canjeamos-production.up.railway.app']; // Lista de URLs permitidas
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  next();
});



server.use(router);

module.exports = serverIo;
