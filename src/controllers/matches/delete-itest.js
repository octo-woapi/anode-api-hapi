const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;
const { matchRepository } = require("../../repositories/matches");

describe("DELETE /matches/{matchId}", () => {
  describe("no match exists with given matchId", () => {
    it("returns a 404 not found error", async () => {
      // GIVEN
      const unknownMatchId = "UNKNOWN_MATCH_ID";

      // WHEN
      const { body, status } = await request(server.listener).delete(
        `/matches/${unknownMatchId}`
      );

      // THEN
      expect(status).to.eq(404);
    });
  });

  describe("a match is found with given matchId", () => {
    it("delete match record from database", async () => {
      // GIVEN
      const SOME_MATCH_ID = "5ef9d1df-fcdd-43d5-a5ed-b325e75d8f9e";
      const SOME_MATCH = {
        id: SOME_MATCH_ID,
        name: "SOME MATCH TEST",
      };
      await matchRepository.create(SOME_MATCH);

      // WHEN
      const { status } = await request(server.listener).delete(
        `/matches/${SOME_MATCH_ID}`
      );

      // THEN
      expect(status).to.eq(204);
    });
  });
});
