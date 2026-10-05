export default function Card({ product }) {
  if (!product) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow grid">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-gray-800 text-lg mb-1">
        {product.title}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-900 font-bold text-lg">
          ${product.price}
        </span>
        <span className="text-sm text-gray-500">
          {product.rating} ⭐
        </span>
      </div>
    </div>
  );
}
