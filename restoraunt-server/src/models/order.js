const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "order",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CREATED",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
