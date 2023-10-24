require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs'); // fs de node read/create/detete/update/rename local files
const path = require('path'); // trabaja con rutas de archivos y directorios. 

const chatModel = require('./models/chat');
const plansModel = require('./models/plans');
const postModel = require('./models/posts');
const userModel = require('./models/user');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/locanjeamos`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename); // obtener el nombre del archivo actual en el que se encuentra este código.

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

chatModel(sequelize)
plansModel(sequelize)
postModel(sequelize)
userModel(sequelize)

const { Chat, Plan, Post, User } = sequelize.models
User.hasOne(Plan);
Plan.hasOne(User)
User.hasMany(Post);
Post.hasOne(User)
User.hasMany(Chat);
Chat.hasOne(User);


module.exports = {
    Chat,
    Plan,
    Post,
    User,
    conn: sequelize,
  };