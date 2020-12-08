const helloJsonReponse = { msg: "Hello World!" };

const rootRoute = {
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return h.response(helloJsonReponse);
  },
};

exports.rootRoutes = [rootRoute];
