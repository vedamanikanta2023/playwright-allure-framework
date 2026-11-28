import { test, expect } from "@fixtures/api.fixture";

test.describe("JSONPlaceholder API", () => {
  test("gets a post by id", async ({ jsonPlaceholder }) => {
    const result = await jsonPlaceholder.getPost(1);

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      id: 1,
      userId: 1,
    });
  });

  test("creates a post", async ({ jsonPlaceholder }) => {
    const result = await jsonPlaceholder.createPost({
      userId: 101,
      title: "API framework example",
      body: "Created through the reusable API service.",
    });

    expect(result.status).toBe(201);
    expect(result.body).toMatchObject({
      userId: 101,
      title: "API framework example",
      body: "Created through the reusable API service.",
    });
  });

  test("lists posts", async ({ jsonPlaceholder }) => {
    const result = await jsonPlaceholder.getPosts();

    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });
});
