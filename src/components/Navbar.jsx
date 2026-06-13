import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [manuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="lg:px-16 px-4 bg-white py-4 shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Smart Inventory</p>

        <div className="hidden md:flex items-center gap-6">
          <Link to={"/products"}>
            <p>Products</p>
          </Link>
          {role === "ADMIN" && (
            <Link to={"/add"}>
              <p>Add product</p>
            </Link>
          )}
          <Link to={"/orders"}>
            <p>Orders</p>
          </Link>
          <Link to={"/cart"}>
            <p>Cart</p>
          </Link>
          <Link to={"/dashboard"}>
            <p>Dashboard</p>
          </Link>
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!manuOpen)}>
          <FaBars size={20} />
        </button>
      </div>
      {manuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link to="/products">Products</Link>

          {role === "ADMIN" && <Link to="/add">Add Product</Link>}

          <Link to="/orders">Orders</Link>

          <Link to="/cart">Cart</Link>

          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
