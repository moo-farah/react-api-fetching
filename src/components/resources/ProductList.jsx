import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar"
import Card from "../shared/Card"
import { fetchProducts, searchProducts } from "../../api/products"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProductsData() {
      try {
        setLoading(true)
        setError(null)

        const data = query
          ? await searchProducts(query)
          : await fetchProducts()

        setProducts(data.products)
        setHasSearched(!!query)
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchProductsData()

    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Products</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="Search products (e.g. laptop, phone)" />

      {loading && <p className="text-gray-600">Loading products...</p>}
      {error && <p className="text-red-600">Error loading products: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-gray-600">
          {hasSearched ? `No products found for "${query}"` : "No products available."}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
