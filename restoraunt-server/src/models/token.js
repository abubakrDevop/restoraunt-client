const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define(
    "token",
    {
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
