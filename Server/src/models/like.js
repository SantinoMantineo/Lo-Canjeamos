const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Like", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
