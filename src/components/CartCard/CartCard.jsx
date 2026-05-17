import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./CartCard.css";

function CartCard({ cartSummary, item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="cart-card">
      <div className="cart-card-header">
        <p>Product name: {cartSummary?.productName}</p>
        <p>Price: {cartSummary?.price}</p>
        <p>Quantity: {cartSummary?.quantity}</p>
        <p>Subtotal: {cartSummary?.subtotal}</p>
      </div>
      <div className="remove-button">
        <button onClick={() => removeFromCart(item.productId)}>remove</button>
      </div>
    </div>
  );
}

export default CartCard;
