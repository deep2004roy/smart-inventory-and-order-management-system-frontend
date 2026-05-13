import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const productDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    productDetails();
  }, [id]);
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p className="category">{product.category}</p>
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>
      <p>Quantity: {product.quantity}</p>
      <div className="product-buttons">
        <Link to={`/products/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
export default ProductDetails;
