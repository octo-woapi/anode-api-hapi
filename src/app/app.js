const Hapi = require("@hapi/hapi");

const buildServer = (host, port) => Hapi.server({ port: port, host: host });
const addRoutes = (server, routes) => {
  routes.forEach((route) => {
    server.route(route);
  });
};

const init = async (server) => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

exports.buildServer = buildServer;
exports.addRoutes = addRoutes;
exports.init = init;
