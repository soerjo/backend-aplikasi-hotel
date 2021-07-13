const { Sequelize } = require("sequelize");
const db = require("../config/db");

//init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const User = db.define(
  "user", //table
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true, //option
  }
);
module.exports = User;
