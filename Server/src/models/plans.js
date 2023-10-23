const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Plan", {
    subscription: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};