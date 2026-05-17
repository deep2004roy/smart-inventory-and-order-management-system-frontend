import { useEffect, useState } from "react";
import Product from "../../components/ProductCard/Product";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
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
    <div className="products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
export default Products;
