const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;
const { matchRepository } = require("../../repositories/matches");

describe("DELETE /matches/{matchId}", function () {
  describe("no match exists with given matchId", function (done) {
    it("returns a 404 not found error", function () {
      // GIVEN
      const unknownMatchId = "UNKNOWN_MATCH_ID";

      // WHEN
      request(server.listener)
        .delete("/matches/${unknownMatchId}")

        // THEN
        .expect(404)
        .end(function (err, res) {
          if (err) throw err;
        });
    });
  });

  // describe("a match is found with given matchId", function () {
  //   it("delete match record from database", async function (done) {
  //     // GIVEN
  //     const SOME_MATCH_ID = "5ef9d1df-fcdd-43d5-a5ed-b325e75d8f9e";
  //     const SOME_MATCH = {
  //       id: SOME_MATCH_ID,
  //       name: "SOME MATCH TEST",
  //     };
  //     // await matchRepository.create(SOME_MATCH);

  //     // WHEN
  //     request(server.listener)
  //       .delete("/matches/${SOME_MATCH_ID}")

  //       // THEN
  //       .expect(204, done);
  //   });
  // });
});
