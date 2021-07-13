const { Sequelize } = require("sequelize");
const db = require("../config/db");

//init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const checkIn = db.define(
  "checkIn", //table
  {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    roomType: { type: DataTypes.STRING, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    checkIn: { type: DataTypes.DATE, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true, //option
  }
);
module.exports = checkIn;
