import type { APIRequestContext, APIResponse } from "@playwright/test";

export interface ApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  body: T;
  response: APIResponse;
}

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async get<T>(
    path: string,
    options?: Parameters<APIRequestContext["get"]>[1],
  ): Promise<ApiResponse<T>> {
    const response = await this.request.get(this.url(path), options);
    return this.parse<T>(response);
  }

  async post<T>(
    path: string,
    options?: Parameters<APIRequestContext["post"]>[1],
  ): Promise<ApiResponse<T>> {
    const response = await this.request.post(this.url(path), options);
    return this.parse<T>(response);
  }

  private url(path: string): string {
    return `${this.baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }

  private async parse<T>(response: APIResponse): Promise<ApiResponse<T>> {
    let body: T;

    try {
      body = await response.json() as T;
    } catch {
      const text = await response.text();
      throw new Error(
        `Expected JSON response from ${response.url()}, got ${response.status()}: ${text}`,
      );
    }

    return {
      status: response.status(),
      headers: await response.headers(),
      body,
      response,
    };
  }
}
