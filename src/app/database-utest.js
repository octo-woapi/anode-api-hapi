const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const { initDatabase } = require("./database");

describe("When calling the database", () => {
  it("returns a Sequelize database instance", () => {
    // GIVEN
    const expected = "db-test.sqlite";

    // WHEN
    const database = initDatabase(expected);
    const actual = database.options.storage;

    // THEN
    expect(expected).to.eq(actual);
  });
});
