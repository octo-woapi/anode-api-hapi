const chai = require("chai");
const expect = chai.expect;
const { paginate } = require("./pagination-helper");

describe("Pagination is needed", function () {
  context("start page number is 1", () => {
    const startAtFirstPage = 1;
    context("total number of records is lower than limit", () => {
      it("returns adapted `rangeEnd` and `partial`", function () {
        // GIVEN
        const limit = 10;
        const page = startAtFirstPage;
        const totalNumberOfRecords = 5;
        const expectedRangeEnd = totalNumberOfRecords;
        const expectedPartial = false;

        // WHEN
        const actual = paginate(limit, page, totalNumberOfRecords);
        console.log(actual);
        // THEN
        expect(expectedRangeEnd).to.eq(actual.rangeEnd);
        expect(expectedPartial).to.eq(actual.partialResult);
      });
    });

    context("total number of records is equal or greater than limit", () => {
      it("return adapted  `rangeEnd", function () {
        // GIVEN
        const limit = 10;
        const page = startAtFirstPage;
        const totalNumberOfRecords = 20;
        const expectedRangeEnd = limit;

        // WHEN
        const actual = paginate(limit, page, totalNumberOfRecords);

        // THEN
        expect(expectedRangeEnd).to.eq(actual.rangeEnd);
      });
    });
  });

  context("start page number is greater than 1", () => {
    it("return adapted `rangeStart` and `rangeEnd` values", function () {
      // GIVEN
      const limit = 10;
      const page = 2;
      const totalNumberOfRecords = 30;
      const expectedRangeStart = 11;
      const expectedRangeEnd = 20;

      // WHEN
      const actual = paginate(limit, page, totalNumberOfRecords);

      // THEN
      expect(expectedRangeStart).to.eq(actual.rangeStart);
      expect(expectedRangeEnd).to.eq(actual.rangeEnd);
    });
  });
});
