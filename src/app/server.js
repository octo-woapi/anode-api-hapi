"use strict";

const { buildServer, addRoutes } = require("./app");
const { routes } = require("../controllers/routes");

const PORT = process.env.PORT || "3000";
const HOST = process.env.HOST || "localhost";

const server = buildServer(HOST, PORT);
addRoutes(server, routes);

exports.server = server;
