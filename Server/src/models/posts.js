const { DataTypes } = require("sequelize");
const User = require("./user")

module.exports = (sequelize) => {
  sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    deletedAt: 'Deshabilitado'
  });
};
