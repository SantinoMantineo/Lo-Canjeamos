const express = require("express");
const router = require("./src/routes/routes");
const morgan = require("morgan");
const cors = require("cors");
const mercadopago = require("mercadopago");
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', "true")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

server.use(router);

module.exports = server;