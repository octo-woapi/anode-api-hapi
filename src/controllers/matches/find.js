const { matchRepository } = require("../../repositories/matches");

exports.findOneMatchRoute = {
  method: "GET",
  path: "/matches/{matchId}",
  handler: async (request, h) => {
    const match = await matchRepository.findOne(request.params.matchId);
    return h.response(match).code(200);
  },
};
