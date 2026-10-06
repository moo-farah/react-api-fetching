import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex gap-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Products
        </Link>
        <Link
          to="/recipes"
          className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Recipes
        </Link>
        <Link
          to="/users"
          className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Users
        </Link>

        <Link
          to="/posts"
          className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Posts
        </Link>
      </div>
    </nav>
  );
}
