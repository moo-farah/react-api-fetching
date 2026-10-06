import { apiGet } from "./client"

export function fetchProducts(limit = 10, skip = 0) {
  return apiGet(`/products?limit=${limit}&skip=${skip}`)
}

export function searchProducts(query, limit = 10) {
  return apiGet(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`)
}

export function fetchProductById(id) {
  return apiGet(`/products/${id}`)
}

export function fetchProductsByCategory(category, limit = 10) {
  return apiGet(`/products/category/${category}?limit=${limit}`)
}
