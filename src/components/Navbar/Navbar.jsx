//import
import "./Navbar.css";
import { Link } from "react-router-dom"; //loading css

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;
