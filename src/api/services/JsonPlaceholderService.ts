import type { ApiResponse } from "../clients/ApiClient";
import { ApiClient } from "../clients/ApiClient";
import { jsonPlaceholderEndpoints } from "../endpoints/JsonPlaceholderEndpoints";
import type { CreatePostRequest, Post } from "../schemas/post.schema";
import { assertPost, assertPostList } from "../validators/post.validator";

export class JsonPlaceholderService {
  constructor(private readonly client: ApiClient) {}

  async getPost(id: number): Promise<ApiResponse<Post>> {
    const result = await this.client.get<Post>(
      jsonPlaceholderEndpoints.post(id),
    );
    assertPost(result.body);
    return result;
  }

  async getPosts(): Promise<ApiResponse<Post[]>> {
    const result = await this.client.get<Post[]>(
      jsonPlaceholderEndpoints.posts,
    );
    assertPostList(result.body);
    return result;
  }

  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    const result = await this.client.post<Post>(
      jsonPlaceholderEndpoints.posts,
      { data },
    );
    assertPost(result.body);
    return result;
  }
}
