const request = require("supertest");
const { server } = require("../app/server");
const expect = require("chai").expect;

describe("GET /", function () {
  it("responds with json", function (done) {
    // GIVEN
    const expected = { msg: "Hello World!" };

    // WHEN
    request(server.listener)
      .get("/")

      // THEN
      .expect(200, (err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});
