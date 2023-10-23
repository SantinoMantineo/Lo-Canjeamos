require('dotenv').config();
const { Sequelize } = require('sequelize');

const chatModel = require('./models/chat');
const imageModel = require('./models/image');
const plansModel = require('./models/plans');
const postModel = require('./models/posts');
const userModel = require('./models/user');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false,
  native: false,
});

chatModel(sequelize)
imageModel(sequelize)
plansModel(sequelize)
postModel(sequelize)
userModel(sequelize)

const { Chat, Image, Plan, Post, User } = sequelize.models
User.hasOne(Plan);
User.hasMany(Post);
User.hasMany(Chat);
Post.hasMany(Image);


module.exports = {
    Chat,
    Image,
    Plan,
    Post,
    User,
    conn: sequelize,
  };