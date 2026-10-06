import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar";

const API_URL = "https://dummyjson.com/users"

const UsersList = () => {
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Handles the search
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsersData() {
      try {
        setLoading(true);
        setError(null);

      const url = query
      ? `${API_URL}/search?q=${encodeURIComponent(query)}`
      : API_URL;

      const res = await fetch(url, {signal: controller.signal});
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const data = await res.json();
      setUsers(data.users);
      setHasSearched(!!query);
      console.log(data);

      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchUsersData();

    return () => controller.abort();
    
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <img src={user.image} 
                alt={user.firstName}
                className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address?.address}</p>
                <p>City: {user.address?.city}</p>
                <p>Company: {user.company?.department}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default UsersList