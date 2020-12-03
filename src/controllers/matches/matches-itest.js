const request = require("supertest");
const { server } = require("../../app/server");
const chai = require("chai");
const expect = chai.expect;
const assertArrays = require("chai-arrays");
chai.use(assertArrays);

describe("GET /matches", () => {
  context("when no query params is set", () => {
    it("returns a collection of matches", async () => {
      // WHEN
      const { body, status } = await request(server.listener).get("/matches");
      const expectedStatuses = [200, 206];

      // THEN
      expect(expectedStatuses).to.include(status);
      expect(body).to.be.array();

      const firstMatch = body[0];
      if (firstMatch) {
        expect(firstMatch).to.have.property("id");
        expect(firstMatch).to.have.property("name");
        expect(firstMatch).to.have.property("createdAt");
        expect(firstMatch).to.have.property("updatedAt");
      }
    });
  });

  context("when `limit` query param is set", () => {
    context("when `limit` query param is not an integer", () => {
      it("returns a 400 error", (done) => {
        // GIVEN
        const badLimit = "ABC";

        // WHEN
        request(server.listener)
          .get(`/matches?limit=${badLimit}`)
          // THEN
          .expect(400, done);
      });
    });
    context("when `limit` query param is higher than the max value", () => {
      it("returns a 400 error", async () => {
        // GIVEN
        const tooHighLimit = 101;

        // WHEN
        const { status } = await request(server.listener).get(
          `/matches?limit=${tooHighLimit}`
        );
        //THEN
        expect(status).to.eq(400);
      });
    });
    context("when `limit` query param is lower than the min value", () => {
      it("returns a 400 error", async () => {
        // GIVEN
        const tooLowLimit = 0;

        // WHEN
        const { status } = await request(server.listener).get(
          `/matches?limit=${tooLowLimit}`
        );
        //THEN
        expect(status).to.eq(400);
      });
    });

    context(
      "when `limit` query param is a integer (n) between min and max",
      () => {
        it("returns a collection of n matches", async () => {
          // GIVEN
          const limit = 3;

          // WHEN
          const { body, status } = await request(server.listener).get(
            `/matches?limit=${limit}`
          );

          //THEN
          expect(status).to.be.eq(206);
          expect(body).to.be.array();
          expect(body.length).to.be.eq(limit);

          const firstMatch = body[0];
          if (firstMatch) {
            expect(firstMatch).to.have.property("id");
            expect(firstMatch).to.have.property("name");
            expect(firstMatch).to.have.property("createdAt");
            expect(firstMatch).to.have.property("updatedAt");
          }
        });
      }
    );
  });
  context("`page` query param is set", () => {
    context("when page is not an integer", () => {
      it("throws a 400 error", async () => {
        // GIVEN
        const badPageNumber = "ABC";

        // WHEN
        const { status } = await request(server.listener).get(
          `/matches?page=${badPageNumber}`
        );
        // THEN
        expect(status).to.eq(400);
      });
    });
    context("when `page` query param is lower than the min value", () => {
      it("returns a 400 error", async () => {
        // GIVEN
        const tooLowPageNumber = 0;

        // WHEN
        const { status } = await request(server.listener).get(
          `/matches?page=${tooLowPageNumber}`
        );
        //THEN
        expect(status).to.eq(400);
      });
    });
    context(
      "when `page` query param is a integer (n) between min and max",
      () => {
        it("returns a collection of n matches", async () => {
          // GIVEN
          const page = 2;

          // WHEN
          const { status, body } = await request(server.listener).get(
            `/matches?page=${page}`
          );
          //THEN

          expect(status).to.be.eq(206);
          expect(body).to.be.array();
        });
      }
    );
  });
  context("request has no query param", () => {
    it("returns an array of matches with default page and default page number", async () => {
      // WHEN
      const { headers } = await request(server.listener).get(`/matches`);

      //THEN
      expect(headers).to.have.property("content-range");
    });
  });
});
