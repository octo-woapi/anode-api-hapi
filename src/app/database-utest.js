const request = require("supertest");
const { initDatabase } = require("./database");

const chai = require("chai");
const expect = chai.expect;

describe("When calling the database", function () {
  it("returns a Sequelize database instance", function () {
    // GIVEN
    const expected = "db.sqlite";

    // WHEN
    const database = initDatabase(expected);
    const actual = database.options.storage;

    // THEN
    expect(expected).to.eq(actual);
  });
});
