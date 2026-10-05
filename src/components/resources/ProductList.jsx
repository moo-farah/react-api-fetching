import { useState, useEffect } from "react";
import Card from "../shared/Card";
import SearchBar from "../shared/SearchBar";

const API_URL = "https://dummyjson.com/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProductsData() {
      try {
        setLoading(true);
        setError(null);

        const url = query
          ? `${API_URL}/search?q=${encodeURIComponent(query)}`
          : API_URL;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const data = await res.json();
        setProducts(data.products);
        setHasSearched(!!query);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProductsData();

    return () => controller.abort();
  }, [query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
      
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
  );
}
