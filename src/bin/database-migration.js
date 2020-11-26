const { database } = require("../app/database");
require("../models/matches");

database.sync({ alter: true });
