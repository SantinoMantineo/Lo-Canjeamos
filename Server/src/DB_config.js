require('dotenv').config();
const { Sequelize } = require('sequelize');

const chatModel = require('./models/chat');
const plansModel = require('./models/plans');
const postModel = require('./models/posts');
const userModel = require('./models/user');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/locanjeamos`, {
  logging: false,
  native: false,
});

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