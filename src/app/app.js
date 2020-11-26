const Hapi = require("@hapi/hapi");
const { database } = require("./database");

exports.buildServer = (host, port) =>
  Hapi.server({
    port: port,
    host: host,
    router: {
      stripTrailingSlash: true,
    },
  });

exports.addRoutes = (server, routes) => {
  routes.forEach((route) => {
    server.route(route);
  });
};

exports.init = async (server) => {
  await database
    .authenticate()
    .then(() => {
      console.log("Connection to database established successfully.");

      server.start();
      console.log("Server running on %s", server.info.uri);
    })
    .catch((err) => {
      console.log("Unable to connect to the database: ", err);
    });
};
