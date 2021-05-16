const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var assert = require("assert");
const rewire = require("rewire");
const request = require("supertest");

var app = rewire("./app.js");
describe("app", () => {
  context("GET /", () => {
    it("should get /", (done) => {
      request(app).get("/").expect(200);
      done();
    });
  });
  context("GET /v1", () => {
    it("should get /v1/bootcamps", (done) => {
      request(app).get("/v1/bootcamps").expect(200);
      done();
    });
    it("should check properties of v1", (done) => {
      request(app)
        .get("/v1/bootcamps")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("success").to.equal(true);

          done(err);
        });
    });
    it("Post", (done) => {
      request(app)
        .post("/v1/bootcamps")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("success").to.equal(true);
          expect(response.body)
            .to.have.property("message")
            .to.equal("Create new bootcamp");
          done(err);
        });
    });
    it("Put a particular bootcamp", (done) => {
      request(app)
        .put("/v1/bootcamps/5")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("success").to.equal(true);

          expect(response.body).to.have.property("message").to.include("5");
          done(err);
        });
    });
    it("Get a particular bootcamp", (done) => {
      request(app)
        .get("/v1/bootcamps/15")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("success").to.equal(true);
        });
    });
    it("Delete a particular bootcamp", (done) => {
      request(app)
        .delete("/v1/bootcamps/25")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("success").to.equal(true);

          expect(response.body).to.have.property("message").to.include("25");
          expect(response.body)
            .to.have.property("message")
            .to.include("Delete");
          done();
        });
    });
  });
});
