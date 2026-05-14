import AddProductForm from "./components/AddProductForm";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import Orders from "./components/Orders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
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
