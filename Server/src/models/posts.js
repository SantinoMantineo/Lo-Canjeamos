const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
  });
};
