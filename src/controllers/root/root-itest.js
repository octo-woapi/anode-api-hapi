const request = require("supertest");
const { server } = require("../../app/server");
const expect = require("chai").expect;

describe("GET /", () => {
  it("responds with json", async () => {
    // GIVEN
    const expected = { msg: "Hello World!" };

    // WHEN
    const { body } = await request(server.listener).get("/");

    // THEN
    expect(body).to.eql(expected);
  });
});
