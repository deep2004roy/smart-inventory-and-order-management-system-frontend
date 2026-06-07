import { Link } from "react-router-dom";
function Product({ product }) {
  return (
    <Link to={`/products/${product.productId}`} className="block">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 bg-white">
        <img
          className="w-full h-48 object-contain"
          src={`http://localhost:8081/uploads/${product.imageUrl}`}
          alt={product.name}
        />

        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <p className="text-gray-700 text-base line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="px-6 py-4 flex justify-between items-center">
          <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
            ₹ {product.price}
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Stock: {product.quantity}
          </span>
        </div>
      </div>
    </Link>
  );
}
export default Product;
