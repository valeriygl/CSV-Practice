const request = require("supertest");
const app = require("../src/app");
describe("Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/languages")
      .send({
        name: "F#",
        description: "Even don't know",
        rate: "5"
      });
    expect(res.statusCode).toEqual(201);
  });
  it("should get 1 item", async () => {
    const res = await request(app).get("/languages/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ID");
  });
  it("should get all items", async () => {
    const res = await request(app).get("/languages");
    expect(res.statusCode).toEqual(200);
    //expect(res.body).toHaveProperty("ID");
    expect(res.body).toHaveLength(19);
  });
  it("should update a post", async () => {
    const res = await request(app)
      .put("/languages/1")
      .send({
        ID: 1,
        Name: "updated title",
        Description: "Lorem ipsum",
        Rate: "a"
      });

    expect(res.statusCode).toEqual(204);
  });
  it("should delete a post", async () => {
    const res = await request(app).delete("/languages/3");
    expect(res.statusCode).toEqual(204);
  });

  it("should respond with status code 404 if resource is not found", async () => {
    const postId = 335;
    const res = await request(app).get(`/languages/${postId}`);
    expect(res.statusCode).toEqual(404);
  });
});
