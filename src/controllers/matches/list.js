const { matchRepository } = require("../../repositories/matches");
const { listMatchesQueryParams } = require("./list-schema");

exports.listMatchesRoute = {
  method: "GET",
  path: "/matches",
  options: {
    validate: {
      query: listMatchesQueryParams,
    },
  },
  handler: async (request, h) => {
    // TODO ajouter le tri
    const defaultLimit = 20;
    const limit = request.query.limit ? request.query.limit : defaultLimit;
    const defaultPage = 1;
    const page = request.query.page ? request.query.page : defaultPage;

    const matches = await matchRepository.findAll(limit, page);
    const httpStatus = matches.count == matches.rows.length ? 200 : 206;

    return h.response(matches.rows).code(httpStatus);
  },
};
