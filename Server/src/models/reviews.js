const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        reviewedUserId: {
            type: DataTypes.INTEGER,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: true,
              min: 1,
              max: 5,
            },
          },
    });
};
