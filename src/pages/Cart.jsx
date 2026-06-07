import { useState } from "react";
import CartCard from "../components/CartCard";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Cart() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { cart, checkOut } = useCart();
  const navigate = useNavigate();
  const fetchCartSummary = async () => {
    try {
      setLoading(true);
      const request = {
        orderItemRequests: cart,
      };
      const response = await api.post("/cart/summary", request);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart summary");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartSummary();
  }, [cart]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-lg font-medium text-slate-600">Loading cart...</p>
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="mb-4 text-3xl font-bold text-slate-700">
            Your cart is empty
          </h2>
          <p className="mb-6 text-slate-500">
            Looks like you haven't added any products yet.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        {cart.map((item) => {
          const summaryItem = summary.cartSummaryItems?.find(
            (s) => s.productId === item.productId,
          );

          return (
            <CartCard
              key={item.productId}
              cartSummary={summaryItem}
              item={item}
            />
          );
        })}
        <div className="mt-8 max-w-md rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Order Summary
          </h2>

          <div className="flex justify-between py-2">
            <span>Total Items</span>
            <span>{summary.totalItems}</span>
          </div>

          <div className="flex justify-between py-2 font-semibold">
            <span>Total Amount</span>
            <span>₹{summary.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/products")}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-gray-50"
          >
            Continue Shopping
          </button>

          <button
            disabled={checkoutLoading}
            onClick={async () => {
              if (window.confirm("Proceed to checkout?")) {
                try {
                  await checkOut();
                  toast.success("Order placed successfully");
                } catch (error) {
                  toast.error("Checkout failed");
                }
              }
            }}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            {checkoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
