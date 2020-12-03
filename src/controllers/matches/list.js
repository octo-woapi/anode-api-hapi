const { matchRepository } = require("../../repositories/matches");
const { listMatchesQueryParamsSchema } = require("./list-schema");

exports.listMatchesRoute = {
  method: "GET",
  path: "/matches",
  options: {
    validate: {
      query: listMatchesQueryParamsSchema,
    },
  },
  handler: async (request, h) => {
    const queryResult = await matchRepository.findAll(
      request.query.limit,
      request.query.page
    );

    const httpStatus = queryResult.partialResult ? 206 : 200;
    const contentRangeHeader = `${queryResult.rangeStart}-${queryResult.rangeEnd}/${queryResult.count}`;

    return h
      .response(queryResult.rows)
      .code(httpStatus)
      .header("content-range", contentRangeHeader);
  },
};
