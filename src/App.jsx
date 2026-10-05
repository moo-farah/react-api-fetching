import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import ProductList from "./components/resources/ProductList";
import RecipeList from "./components/resources/RecipeList";

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to React API Fetching</h1>
      <p className="text-gray-600 mb-8">
        This app demonstrates fetching data from DummyJSON APIs including products and recipes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Products</h2>
          <p className="text-gray-600 mb-4">
            Browse our catalog of products with search and filtering capabilities.
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Recipes</h2>
          <p className="text-gray-600 mb-4">
            Explore delicious recipes from around the world.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
