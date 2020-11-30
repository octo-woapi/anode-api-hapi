const Sequelize = require("sequelize");
const { config } = require("../../config/config");

exports.initDatabase = (storage) => {
  return new Sequelize("db", "user", "pass", {
    host: "localhost",
    dialect: "sqlite",
    storage: storage,
  });
};

exports.database = this.initDatabase(process.env.DB_NAME || config.dbName);
