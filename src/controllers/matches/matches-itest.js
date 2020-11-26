const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;

describe("GET /matches", function () {
  it("returns a collection of matches", function (done) {
    // WHEN
    request(server.listener)
      .get("/matches")

      // THEN
      .expect("200", (err, resp) => {
        expect(resp.body).to.be.array();

        const firstMatch = resp.body[0];
        if (firstMatch) {
          expect(firstMatch).to.have.property("id");
          expect(firstMatch).to.have.property("name");
          expect(firstMatch).to.have.property("createdAt");
          expect(firstMatch).to.have.property("updatedAt");
        }

        done();
      });
  });
});
