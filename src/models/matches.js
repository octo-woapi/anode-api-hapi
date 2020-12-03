const Sequelize = require("sequelize");
const { database } = require("../app/database");

exports.MatchModel = database.define("match", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});
