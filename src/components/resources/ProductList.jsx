import { useState, useEffect } from "react";
import Card from "../shared/Card";


const API_URL = "https://dummyjson.com/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

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
        console.log(data);
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
      
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products (e.g. laptop, phone)"
        className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

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
