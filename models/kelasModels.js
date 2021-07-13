const { Sequelize } = require("sequelize");
const db = require("../config/db");

//init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Kelas = db.define(
  "kelas", //table
  {
    name: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    freezeTableName: true, //option
  }
);
module.exports = User;
