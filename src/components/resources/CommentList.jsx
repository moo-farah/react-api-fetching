import { useEffect, useState } from "react"
import { fetchCommentsByPost } from "../../api/comments"

const CommentList = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [postId, setPostId] = useState(1)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCommentsData() {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchCommentsByPost(postId, 10)
        setComments(data.comments || [])
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchCommentsData()

    return () => controller.abort()
  }, [postId])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-6">Comments</h1>
      
      <div className="flex gap-4 mb-6 items-center">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Post ID</label>
          <input
            type="number"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            className="w-32 px-3 py-2 rounded border border-gray-300"
            min="1"
            max="100"
          />
        </div>
      </div>

      {loading && <p className="text-gray-600">Loading comments...</p>}
      {error && <p className="text-red-600">Error loading comments: {error}</p>}
      {!loading && !error && comments.length === 0 && (
        <p className="text-gray-600">No comments available.</p>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <p className="text-gray-700 mb-2">{comment.body}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>by {comment.email}</span>
                <span>👍 {comment.likes} | 👎 {comment.dislikes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CommentList
