import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import api from "../../services/api";

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const role = localStorage.getItem("role");

  const productDetails = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/products/${id}`);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const order = {
      orderItemRequests: [
        {
          productId: id,
          quantity: Number(quantity),
        },
      ],
    };
    try {
      const response = await api.post(`/orders`, order);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productDetails();
  }, [id]);
  return (
    <div>
      <Navbar />
      <div className="product-details-card">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <h3>₹ {product.price}</h3>
        <p>Stock: {product.quantity}</p>

        <label htmlFor="qty">Quantity:</label>
        <input
          type="number"
          name="quantity-needed"
          id="qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleBuy}>Buy now</button>
        <button onClick={() => addToCart(Number(id), Number(quantity))}>
          Add to cart
        </button>
        {role === "ADMIN" && (
          <div className="product-buttons">
            <Link to={`/products/edit/${id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductDetails;
