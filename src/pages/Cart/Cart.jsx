import { useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
function Cart() {
  const [summary, setSummary] = useState({});
  const { cart } = useCart();
  const { checkOut } = useCart();
  const fetchCartSummary = async () => {
    try {
      const request = {
        orderItemRequests: cart,
      };
      const response = await fetch("http://localhost:8081/cart/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error("request failed");
      }
      const data = await response.json();
      console.log(data);
      setSummary(data);
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
