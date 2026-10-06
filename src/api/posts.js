import { apiGet } from "./client"

export function fetchPosts(limit = 10, skip = 0) {
  return apiGet(`/posts?limit=${limit}&skip=${skip}`)
}

export function searchPosts(query, limit = 10) {
  return apiGet(`/posts/search?q=${encodeURIComponent(query)}&limit=${limit}`)
}

export function fetchPostById(id) {
  return apiGet(`/posts/${id}`)
}

export function fetchPostsByTag(tag, limit = 10) {
  return apiGet(`/posts/tag/${tag}?limit=${limit}`)
}
