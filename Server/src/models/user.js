const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    ubication: {
      type: DataTypes.STRING,
    },
    Rol: {
      type: DataTypes.STRING
    },
    likesExt: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    likesMios: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  });
};
