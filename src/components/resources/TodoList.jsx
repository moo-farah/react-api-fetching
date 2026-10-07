import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar"
import { fetchTodos, searchTodos } from "../../api/todos"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTodosData() {
      try {
        setLoading(true)
        setError(null)

        const data = query
          ? await searchTodos(query)
          : await fetchTodos()

        setTodos(data.todos)
        setHasSearched(!!query)
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchTodosData()

    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Todos</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="Search todos..." />

      {loading && <p className="text-gray-600">Loading todos...</p>}
      {error && <p className="text-red-600">Error loading todos: {error}</p>}
      {!loading && !error && todos.length === 0 && (
        <p className="text-gray-600">
          {hasSearched ? `No todos found for "${query}"` : "No todos available."}
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-3 max-w-2xl">
          {todos.map((todo) => (
            <div key={todo.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="mt-1 w-5 h-5 text-green-600 rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{todo.todo}</h3>
                  <p className="text-sm text-gray-500">
                    User: {todo.userId} · Completed: {todo.completed ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TodoList
