export default function Card({ product }) {
  if (!product) return null;

  // Handle both products and posts
  const isProduct = product.price !== undefined;
  const title = product.title || product.name;
  const image = product.thumbnail || product.image;

  if (isProduct) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="font-semibold text-gray-800 text-lg mb-1">
          {title}
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

  // Posts card
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-800 text-lg mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.body}
      </p>
      
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {product.reactions && (
        <div className="flex gap-4 text-sm text-gray-500">
          <span>❤️ {product.reactions.likes || 0}</span>
          <span>👁️ {product.views || 0}</span>
        </div>
      )}
    </div>
  );
}
