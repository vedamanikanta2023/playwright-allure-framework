export const jsonPlaceholderEndpoints = {
  posts: "/posts",
  post: (id: number) => `/posts/${id}`,
  comments: "/comments",
  postComments: (postId: number) => `/posts/${postId}/comments`,
} as const;
