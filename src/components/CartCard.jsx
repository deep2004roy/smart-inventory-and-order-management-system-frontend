import { useState } from "react";
import { useCart } from "../context/CartContext";

function CartCard({ cartSummary, item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="mb-4 rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:8081/uploads/${cartSummary?.imageUrl}`}
            alt={cartSummary?.productName}
            className="h-24 w-24 rounded-lg object-cover border"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">
              {cartSummary?.productName}
            </h3>
            <p className="text-sm text-slate-600">
              Price:
              <span className="ml-2 font-medium text-slate-800">
                ₹{cartSummary?.price?.toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-slate-600">
              Quantity:
              <span className="ml-2 font-medium text-slate-800">
                {cartSummary?.quantity}
              </span>
            </p>
            <p className="text-sm font-semibold text-indigo-600">
              Subtotal: ₹{cartSummary?.subtotal?.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={() => removeFromCart(item.productId)}
          className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartCard;
