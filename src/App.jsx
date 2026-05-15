import AddProductForm from "./pages/AddProduct/AddProductForm";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import EditProduct from "./pages/EditProduct/EditProduct";
import Orders from "./components/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add" element={<AddProductForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
