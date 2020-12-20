const supertest = require("supertest");
const app = require("../index");
const request = supertest(app);

process.env.NODE_ENV = "test";

describe("POST /new create new ride", function() {
  it("responds with json", function(done) {
    request
      .post("/v1/ride/new")
      .send({
        ride: {
          userId: "u3u3uu3222211",
          busLine: "ul5o1now",
          userEmail: "okashafci@gmail.com"
        }
      })
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

describe("GET /list get rides list", function() {
  it("responds with array of rides", function(done) {
    request.get("/v1/ride/list").expect(200, done);
    // .end(function(err, res) {
    //   expect(res.body).toBe(Array);
    //   done();
    // });
  });
});
