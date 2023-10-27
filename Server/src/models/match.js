const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Match", {
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
