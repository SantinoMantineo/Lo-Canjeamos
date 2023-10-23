const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Chat", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    addresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.TIME,
    },
    connected: {
      type: DataTypes.BOOLEAN,
    },
    writing: {
      type: DataTypes.BOOLEAN,
    },
  });
};
