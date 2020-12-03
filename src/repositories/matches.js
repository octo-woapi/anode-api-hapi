const { MatchModel } = require("../models/matches");
const { computeOffset, paginate } = require("../helpers/pagination-helper");

const create = async (match) => {
  await MatchModel.create(match);
};

const findAll = async (limit, page) => {
  const offset = computeOffset(limit, page);

  const result = await MatchModel.findAndCountAll({
    limit,
    offset,
  });

  const pagination = paginate(limit, page, result.count);

  return {
    ...result,
    ...pagination,
  };
};

const findOne = async (matchId) => {
  return await MatchModel.findOne({ where: { id: matchId } });
};

const remove = async (matchId) => {
  await MatchModel.destroy({
    where: {
      id: matchId,
    },
  });
};

exports.matchRepository = { create, findAll, findOne, remove };
