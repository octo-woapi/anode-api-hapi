const { MatchModel } = require("../models/matches");
const { computeOffset, paginate } = require("../helpers/pagination-helper");

const create = (match) => {
  MatchModel.create(match);
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

// TODO ajouter les exceptions
const findOne = async (matchId) => {
  const matchFound = await MatchModel.findAll({
    where: {
      id: matchId,
    },
  });

  if (matchFound.length > 1) {
    // erreur too much row
    return null;
  }
  if (matchFound.length === 0) {
    // erreur no data found
    return null;
  }
  return matchFound[0];
};

const remove = async (matchId) => {
  MatchModel.destroy({
    where: {
      id: matchId,
    },
  });
};

exports.matchRepository = { create, findAll, findOne, remove };
