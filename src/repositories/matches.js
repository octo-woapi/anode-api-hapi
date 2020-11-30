const { MatchModel } = require("../models/matches");

const create = (match) => {
  MatchModel.create(match);
};

const findAll = async (limit, page) => {
  const result = await MatchModel.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
  });

  return result;
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
