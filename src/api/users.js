import { apiGet } from "./client"

export function fetchUsers(limit = 10, skip = 0) {
  return apiGet(`/users?limit=${limit}&skip=${skip}`)
}

export function searchUsers(query, limit = 10) {
  return apiGet(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}`)
}

export function fetchUserById(id) {
  return apiGet(`/users/${id}`)
}
