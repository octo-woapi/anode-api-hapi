const { config } = require("../../config/config");

exports.computeOffset = (limit, page) => {
  const cleanedLimit = this.cleanLimitValue(limit);
  const cleanedPage = this.cleanPageNumberValue(page);
  return (cleanedPage - 1) * cleanedLimit;
};

exports.paginate = (limit, page, totalCount) => {
  const offset = this.computeOffset(limit, page);
  const rangeStart = offset + 1;
  const rangeEnd = totalCount < offset + limit ? totalCount : offset + limit;
  const fullResult = page === 1 && rangeEnd === totalCount;
  const partialResult = !fullResult;

  return {
    offset,
    rangeStart,
    rangeEnd,
    partialResult,
  };
};

exports.cleanLimitValue = (limit) => {
  const cleanedLimit = limit ? limit : config.defaultListLimit;
  return cleanedLimit;
};

exports.cleanPageNumberValue = (page) => {
  const cleanedPage = page ? page : config.defaultListPage;
  return cleanedPage;
};
