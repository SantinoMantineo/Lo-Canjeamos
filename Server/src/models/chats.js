const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Chat = sequelize.define("Chat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Otros campos que puedas necesitar, como descripción, fecha de creación, etc.
  });
}