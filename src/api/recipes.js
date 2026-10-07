import { apiGet } from "./client"

export function fetchRecipes(limit = 10, skip = 0) {
  return apiGet(`/recipes?limit=${limit}&skip=${skip}`)
}

export function searchRecipes(query, limit = 10) {
  return apiGet(`/recipes/search?q=${encodeURIComponent(query)}&limit=${limit}`)
}

export function fetchRecipeById(id) {
  return apiGet(`/recipes/${id}`)
}

export function fetchRecipesByCuisine(cuisine, limit = 10) {
  return apiGet(`/recipes/cuisine/${cuisine}?limit=${limit}`)
}
