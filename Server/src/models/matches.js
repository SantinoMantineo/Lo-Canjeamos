const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Matches = sequelize.define("Matches", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PostId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PostId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    EmailSended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
