import { useContext, useState } from "react";
import { createContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  //cart state
  const [cart, setCart] = useState([]);
  const addToCart = (productId, quantity) => {
    setCart((prevCart) => {
      //prevCart -> the Cart present before(let's assume)
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
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
export default CartProvider;
