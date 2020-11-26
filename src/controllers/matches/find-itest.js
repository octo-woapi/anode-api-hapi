const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;
const { matchRepository } = require("../../repositories/matches");

describe("GET /matches/{matchId}", function () {
  it("find a record by it's id", function (done) {
    // GIVEN
    const EXPECTED_MATCH_ID = "8290e122-682b-408a-835a-05716a15d19a";
    const expected = {
      id: EXPECTED_MATCH_ID,
      name: "SOME MATCH",
    };
    matchRepository.create(expected);

    // WHEN
    request(server.listener)
      .get("/matches/${SOME_MATCH_ID}")

      // THEN
      .expect("200", async (err, resp) => {
        const actual = await matchRepository.findOne(EXPECTED_MATCH_ID);
        expect(actual).not.to.be.undefined;
        expect(actual.id).to.eql(expected.id);

        await matchRepository.remove(EXPECTED_MATCH_ID);

        done();
      });
  });
});
