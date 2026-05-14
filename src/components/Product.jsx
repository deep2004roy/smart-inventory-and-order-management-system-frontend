import "./Product.css";
import { Link } from "react-router-dom";
function Product({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="link">
      <div className="product-card">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <h3>₹ {product.price}</h3>
        <p>Stock: {product.quantity}</p>
      </div>
    </Link>
  );
}
export default Product;
