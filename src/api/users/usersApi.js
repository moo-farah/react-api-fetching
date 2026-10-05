const BASE_URL = "https://dummyjson.com/users";

export async function fetchUsers(limit = 10, skip = 0) {
  const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return res.json();
}

export async function searchUsers(query, limit = 10) {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to search users: ${res.status}`);
  return res.json();
}
