const { Sequelize } = require("sequelize");
const db = require("../config/db");

//init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const room = db.define(
  "room", //table
  {
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: false,
    freezeTableName: true, //option
  }
);
module.exports = room;
