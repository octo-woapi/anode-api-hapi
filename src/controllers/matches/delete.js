const { matchRepository } = require("../../repositories/matches");

exports.deleteMatchRoute = {
  method: "DELETE",
  path: "/matches/{matchId}",
  handler: async (request, h) => {
    const match = await matchRepository.findOne(request.params.matchId);
    // TODO gérer les objets de réponse en cas d'erreur
    if (null === match) return h.response().code(404);
    await matchRepository.remove(request.params.matchId);
    return h.response().code(204);
  },
};
