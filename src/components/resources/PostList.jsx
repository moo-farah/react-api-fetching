import { useEffect, useState } from "react"
import SearchBar from "../shared/SearchBar"
import Card from "../shared/Card"
import { fetchPosts, searchPosts } from "../../api/posts"

const PostList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPostsData() {
      try {
        setLoading(true)
        setError(null)

        const data = query
          ? await searchPosts(query)
          : await fetchPosts()

        setPosts(data.posts)
        setHasSearched(!!query)
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPostsData()

    return () => controller.abort()
  }, [query])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Posts</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search posts..." />

      {loading && <p className="text-gray-600">Loading posts...</p>}
      {error && <p className="text-red-600">Error loading posts: {error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-600">
          {hasSearched ? `No posts found for "${query}"` : "No posts available."}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card key={post.id} product={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export default PostList
