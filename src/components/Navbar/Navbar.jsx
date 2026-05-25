//import
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom"; //loading css

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    //UI
    <nav className="navbar">
      <div>
        <p>Smart Inventory</p>
      </div>

      <div className="rightContainer">
        <Link to={"/products"}>
          <p>Products</p>
        </Link>
        <Link to={"/add"}>
          <p>Add product</p>
        </Link>
        <Link to={"/orders"}>
          <p>Orders</p>
        </Link>
        <Link to={"/cart"}>
          <p>Cart</p>
        </Link>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
