import { useContext, useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  //--------Add to cart------------------
  const addToCart = (productId, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === Number(productId),
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === Number(productId)
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item,
        );
      }
      return [
        ...prevCart,
        { productId: Number(productId), quantity: Number(quantity) },
      ];
    });
  };

  //------------------remove from cart----------------
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => item.productId !== Number(productId),
      );
      return newCart;
    });
  };

  //----------check out -----------------
  const checkOut = async () => {
    const order = { orderItemRequests: cart };

    try {
      await api.post("/orders", order);

      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.log(error);
      throw error; // important for the toast in Cart.jsx
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, count, checkOut }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
export default CartProvider;
