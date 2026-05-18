import { useEffect, useState } from "react";
import Product from "../../components/ProductCard/Product";
import "./Products.css";
import { Link } from "react-router-dom";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  //-----------------fetching products------------------------
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //logic
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search something..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={`/products/search?keyword=${search}`}>
          <button>Search</button>
        </Link>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default Products;
