exports.computeOffset = (limit, page) => {
  return (page - 1) * limit;
};

exports.paginate = (limit, page, totalCount) => {
  const offset = this.computeOffset(limit, page);
  const rangeStart = offset + 1;
  const rangeEnd = totalCount < offset + limit ? totalCount : offset + limit;
  const fullResult = page == 1 && rangeEnd == totalCount;
  const partialResult = !fullResult;

  return {
    offset,
    rangeStart,
    rangeEnd,
    partialResult,
  };
};
