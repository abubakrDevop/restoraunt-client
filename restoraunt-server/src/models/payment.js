const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "payment",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
