const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;
const { matchRepository } = require("../../repositories/matches");

describe("GET /matches/{matchId}", () => {
  it("finds a record by its id", async () => {
    // GIVEN
    const EXPECTED_MATCH_ID = "8290e122-682b-408a-835a-05716a15d19a";
    const expected = {
      id: EXPECTED_MATCH_ID,
      name: "SOME MATCH",
    };
    await matchRepository.create(expected);

    // WHEN
    const { body, status } = await request(server.listener).get(
      `/matches/${EXPECTED_MATCH_ID}`
    );

    // THEN
    expect(status).to.equal(200);
    const actual = await matchRepository.findOne(EXPECTED_MATCH_ID);
    expect(actual).not.to.be.undefined;
    expect(actual.id).to.eql(expected.id);

    await matchRepository.remove(EXPECTED_MATCH_ID);
  });
});
