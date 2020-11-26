const { rootRoute } = require("./root/root");
const { listMatchesRoute } = require("./matches/list");
const { createMatchRoute } = require("./matches/create");
const { findOneMatchRoute } = require("./matches/find");
const { deleteMatchRoute } = require("./matches/delete");

exports.routes = [
  rootRoute,
  listMatchesRoute,
  createMatchRoute,
  findOneMatchRoute,
  deleteMatchRoute,
];
