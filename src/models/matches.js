const Sequelize = require("sequelize");
const { database } = require("../app/database");

exports.MatchModel = database.define("match", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  //   team: Sequelize.ARRAY,
  name: Sequelize.STRING,
  winner: Sequelize.STRING,
});
