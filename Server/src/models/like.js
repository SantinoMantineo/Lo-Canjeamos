const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    myUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    myPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    anotherUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likedPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
