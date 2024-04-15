const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "category",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
