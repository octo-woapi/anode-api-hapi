const Sequelize = require("sequelize");
<<<<<<< HEAD

exports.database = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "db.sqlite",
});
=======
const { config } = require("../../config/config");

exports.initDatabase = (storage) => {
  return new Sequelize("db", "user", "pass", {
    host: "localhost",
    dialect: "sqlite",
    storage: storage,
  });
};

exports.database = this.initDatabase(config.dbName);
>>>>>>> feat: add sqlite database
