const { Sequelize } = require("sequelize");

//create db connection
const db = new Sequelize("db_hotel", "soerjo", "sury@sury0", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
