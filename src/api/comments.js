import { apiGet } from "./client"

export function fetchCommentsByPost(postId, limit = 10, skip = 0) {
  return apiGet(`/posts/${postId}/comments?limit=${limit}&skip=${skip}`)
}

export function fetchCommentsByUser(userId, limit = 10, skip = 0) {
  return apiGet(`/users/${userId}/comments?limit=${limit}&skip=${skip}`)
}

export function addComment(postId, comment) {
  return apiGet(`/posts/${postId}/comments`, { comment })
}
