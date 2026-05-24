import AddProductForm from "./pages/AddProduct/AddProductForm";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products/Products";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import EditProduct from "./pages/EditProduct/EditProduct";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Cart from "./pages/Cart/Cart";
import LoginPage from "./pages/LoginPage/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Navbar />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/add" element={<AddProductForm />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
