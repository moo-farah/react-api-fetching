import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar"
import { fetchRecipes, searchRecipes } from "../../api/recipes"

const RecipeList = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRecipesData() {
      try {
        setLoading(true)
        setError(null)

        const data = query
          ? await searchRecipes(query)
          : await fetchRecipes()

        setRecipes(data.recipes)
        setHasSearched(!!query)
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchRecipesData()

    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Recipes</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="Search recipes (e.g. pizza, salad)" />

      {loading && <p className="text-gray-600">Loading recipes...</p>}
      {error && <p className="text-red-600">Error loading recipes: {error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-600">
          {hasSearched ? `No recipes found for "${query}"` : "No recipes available."}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((r) => (
            <div key={r.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{r.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{r.cuisine}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {r.prepTimeMinutes + r.cookTimeMinutes} min
                </span>
                <span className="text-sm text-gray-500">⭐ {r.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default RecipeList
