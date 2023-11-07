const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const router = require("./src/routes/routes");
const { Message } = require("./src/DB_config");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
});

io.on("connection", (socket) => {
  console.log('Un cliente se ha conectado');
  socket.on("new-message", async (mensaje) => {
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
      socket.emit("new-message", nuevoMensaje);
    } catch (error) {
      console.error("Error al guardar el mensaje en la base de datos:", error);
    }
  });
});

const morgan = require("morgan");
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
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

app.use(router);

module.exports = httpServer;

// const express = require("express");
// const router = require("./src/routes/routes");
// const morgan = require("morgan");
// const cors = require("cors");
// const mercadopago = require("mercadopago");
// const server = express();

// server.use(morgan("dev"));
// server.use(express.json());
// server.use(cors());

// server.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', "true")
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

// server.use(router);

// module.exports = server;
