import { useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
function Cart() {
  const [summary, setSummary] = useState({});
  const { cart } = useCart();
  const { checkOut } = useCart();
  const fetchCartSummary = async () => {
    try {
      const request = {
        orderItemRequests: cart,
      };
      const response = await api.post("/cart/summary", request);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartSummary();
  }, [cart]);
  return (
    <div>
      <Navbar />
      <div className="cart-container">
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
      </div>
      <div>
        <p>Total items: {summary.totalItems}</p>
      </div>
      <div>
        <p>Total amount: {summary.totalAmount}</p>
      </div>
      <div>
        <button onClick={() => checkOut()}>check out</button>
      </div>
    </div>
  );
}
export default Cart;
