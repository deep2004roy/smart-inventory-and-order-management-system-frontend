import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CartProvider from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
);
