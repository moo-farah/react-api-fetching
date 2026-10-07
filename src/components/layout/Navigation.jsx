import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/recipes", label: "Recipes" },
  { to: "/users", label: "Users" },
  { to: "/posts", label: "Posts" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isFirstRender = useRef(true)

  // Close menu on route change (skip on initial mount to avoid ESLint warning)
  useEffect(() => {
    if (!isFirstRender.current) {
      setIsOpen(false)
    }
    isFirstRender.current = false
  }, [location.pathname])

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              API Fetcher
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
