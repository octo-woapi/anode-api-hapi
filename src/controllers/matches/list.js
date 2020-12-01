const { matchRepository } = require("../../repositories/matches");
const { listMatchesQueryParams } = require("./list-schema");
const { config } = require("../../../config/config");

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
    const limit = request.query.limit
      ? request.query.limit
      : config.defaultListLimit;
    const page = request.query.page
      ? request.query.page
      : config.defaultListPage;

    const queryResult = await matchRepository.findAll(limit, page);

    const httpStatus = queryResult.partialResult ? 206 : 200;
    const contentRangeHeader = `${queryResult.rangeStart}-${queryResult.rangeEnd}/${queryResult.count}`;

    return h
      .response(queryResult.rows)
      .code(httpStatus)
      .header("content-range", contentRangeHeader);
  },
};
