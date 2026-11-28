import type { Post } from "../schemas/post.schema";

export function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const post = value as Record<string, unknown>;
  return (
    typeof post.id === "number" &&
    typeof post.userId === "number" &&
    typeof post.title === "string" &&
    typeof post.body === "string"
  );
}

export function assertPost(value: unknown): asserts value is Post {
  if (!isPost(value)) {
    throw new Error(`Invalid Post response: ${JSON.stringify(value)}`);
  }
}

export function assertPostList(value: unknown): asserts value is Post[] {
  if (!Array.isArray(value) || !value.every(isPost)) {
    throw new Error(`Invalid Post[] response: ${JSON.stringify(value)}`);
  }
}
