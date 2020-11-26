const { matchRepository } = require("../../repositories/matches");

exports.listMatchesRoute = {
  method: "GET",
  path: "/matches",
  handler: async (request, h) => {
    // TODO ajouter la pagination
    const matches = await matchRepository.findAll();
    return h.response(matches).code(200);
  },
};
