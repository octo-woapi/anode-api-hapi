const { matchRepository } = require("../../repositories/matches");

exports.createMatchRoute = {
  method: "POST",
  path: "/matches",
  handler: (request, h) => {
    // TODO traiter le payload
    const newMatch = {
      name: "total party",
    };

    matchRepository.create(newMatch);

    return h.response(newMatch).code(201);
  },
};
