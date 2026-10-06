import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar"
import { fetchUsers, searchUsers } from "../../api/users"

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsersData() {
      try {
        setLoading(true)
        setError(null)

        const data = query
          ? await searchUsers(query)
          : await fetchUsers()

        setUsers(data.users)
        setHasSearched(!!query)
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchUsersData()

    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Users</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="Search users (e.g. John, Mary)" />

      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-600">Error loading users: {error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-600">
          {hasSearched ? `No users found for "${query}"` : "No users available."}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Email: {user.email}</p>
                <p>Company: {user.company?.name}</p>
                <p>Phone: {user.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default UsersList
