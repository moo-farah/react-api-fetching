const BASE_URL = "https://dummyjson.com"

export async function apiGet(endpoint, signal) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { signal })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function apiPost(endpoint, body, signal) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
