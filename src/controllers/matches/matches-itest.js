const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const expect = chai.expect;

describe("GET /matches", () => {
  context("when no query params is set", () => {
    it("returns a collection of matches", (done) => {
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

  context("when `limit` query param is set", () => {
    context("when `limit` query param is not an integer", () => {
      it("returns a 400 error", (done) => {
        // GIVEN
        const badLimit = "ABC";

        // WHEN
        request(server.listener)
          .get("/matches?limit=" + badLimit)
          // THEN
          .expect(400, done);
      });
    });
    context("when `limit` query param is higher than the max value", () => {
      it("returns a 400 error", (done) => {
        // GIVEN
        const tooHighLimit = 101;

        // WHEN
        request(server.listener)
          .get(`/matches?limit=${tooHighLimit}`)
          //THEN
          .expect(400, done);
      });
    });
    context("when `limit` query param is lower than the min value", () => {
      it("returns a 400 error", (done) => {
        // GIVEN
        const tooLowLimit = 0;

        // WHEN
        request(server.listener)
          .get(`/matches?limit=${tooLowLimit}`)
          //THEN
          .expect(400, done);
      });
    });

    context(
      "when `limit` query param is a integer (n) between min and max",
      () => {
        it("returns a collection of n matches", (done) => {
          // GIVEN
          const limit = 3;

          // WHEN
          request(server.listener)
            .get(`/matches?limit=${limit}`)
            //THEN
            .expect("partial response", (err, resp) => {
              expect(resp.statusCode).to.be.eq(206);
              expect(resp.body).to.be.array();
              expect(resp.body.length).to.be.eq(limit);

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
      }
    );
  });
  context("`page` query param is set", () => {
    context("when page is not an integer", () => {
      it("throws a 400 error", (done) => {
        // GIVEN
        const badPageNumber = "ABC";

        // WHEN
        request(server.listener)
          .get(`/matches?page=${badPageNumber}`)
          // THEN
          .expect(400, done);
      });
    });
    context("when `page` query param is lower than the min value", () => {
      it("returns a 400 error", (done) => {
        // GIVEN
        const tooLowPageNumber = 0;

        // WHEN
        request(server.listener)
          .get(`/matches?page=${tooLowPageNumber}`)
          //THEN
          .expect(400, done);
      });
    });
    context(
      "when `page` query param is a integer (n) between min and max",
      () => {
        it("returns a collection of n matches", (done) => {
          // GIVEN
          const page = 2;

          // WHEN
          request(server.listener)
            .get(`/matches?page=${page}`)
            //THEN
            .expect("partial content", (err, resp) => {
              expect(resp.statusCode).to.be.eq(206);
              expect(resp.body).to.be.array();
              done();
            });
        });
      }
    );
  });
});
