const chai = require("chai");
const expect = chai.expect;
const {
  paginate,
  cleanLimitValue,
  cleanPageNumberValue,
} = require("./pagination-helper");
const { config } = require("../../config/config");

describe("Limit param needs to be checked and clean", () => {
  context("limit is empty or undefined", () => {
    it("returns default limit value", () => {
      // GIVEN
      const UNDEFINED_LIMIT = undefined;
      const expected = config.defaultListLimit;

      // WHEN
      const actual = cleanLimitValue(UNDEFINED_LIMIT);

      // THEN
      expect(actual).to.eq(expected);
    });
  });
});

describe("Page param needs to be checked and clean", () => {
  context("page param is empty or undefined", () => {
    it("returns default page number value", () => {
      // GIVEN
      const UNDEFINED_PAGE_NUMBER = undefined;
      const expected = config.defaultListPage;

      // WHEN
      const actual = cleanPageNumberValue(UNDEFINED_PAGE_NUMBER);

      // THEN
      expect(actual).to.eq(expected);
    });
  });
});

describe("Pagination is needed", () => {
  context("start page number is 1", () => {
    const startAtFirstPage = 1;
    context("total number of records is lower than limit", () => {
      it("returns adapted `rangeEnd` and `partial`", () => {
        // GIVEN
        const limit = 10;
        const page = startAtFirstPage;
        const totalNumberOfRecords = 5;
        const expectedRangeEnd = totalNumberOfRecords;
        const expectedPartial = false;

        // WHEN
        const actual = paginate(limit, page, totalNumberOfRecords);
        // THEN
        expect(expectedRangeEnd).to.eq(actual.rangeEnd);
        expect(expectedPartial).to.eq(actual.partialResult);
      });
    });

    context("total number of records is equal or greater than limit", () => {
      it("return adapted `rangeEnd`", () => {
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
    it("return adapted `rangeStart` and `rangeEnd` values", () => {
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
