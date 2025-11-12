const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("db_koleksi_lagu", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
module.exports = sequelize;
