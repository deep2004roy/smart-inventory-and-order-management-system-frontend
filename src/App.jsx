import AddProductForm from "./pages/AddProductForm";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddProductForm />{" "}
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditProduct />{" "}
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
