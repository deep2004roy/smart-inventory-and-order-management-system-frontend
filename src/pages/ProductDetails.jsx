import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import api from "../services/api";

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
      <div className="mx-auto max-w-6xl px-6 py-10">
        <button
          onClick={() => navigate("/products")}
          className="mb-6 rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
        >
          ← Back to Products
        </button>
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="grid gap-10 p-8 md:grid-cols-2">
            <div className="flex items-center justify-center rounded-xl bg-slate-100 p-6">
              <img
                src={`http://localhost:8081/uploads/${product.imageUrl}`}
                alt={product.name}
                className="max-h-112.5 w-full object-contain"
              />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-slate-800">
                {product.name}
              </h1>
              <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
                {product.category}
              </span>
              <h2 className="mt-6 text-3xl font-bold text-green-600">
                ₹ {product.price}
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Available Stock:{" "}
                <span className="ml-2 font-semibold">{product.quantity}</span>
              </p>
              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 rounded-full px-3 py-1 text-sm font-medium ${product.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {product.active ? "Active" : "Inactive"}
                </span>
              </p>
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">Description</h3>
                <p className="leading-relaxed text-slate-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="qty"
                  className="mb-2 block font-medium text-slate-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  id="qty"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-32 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleBuy}
                  className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Buy now
                </button>
                <button
                  onClick={() => addToCart(Number(id), Number(quantity))}
                  className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {role === "ADMIN" && (
          <div className="mt-8 flex gap-4 border-t pt-6">
            <Link to={`/products/edit/${id}`}>
              <button className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600">
                Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductDetails;
