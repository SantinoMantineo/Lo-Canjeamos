const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Image", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
};