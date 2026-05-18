import { useEffect } from "react";
import { useState } from "react";
import Product from "../../components/ProductCard/Product";
import { useSearchParams } from "react-router-dom";

function SearchedProducts() {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("keyword");
  const fetchSearchProducts = async () => {
    try {
      if (search.trim() === "") return;
      const response = await fetch(
        `http://localhost:8081/products/search?keyword=${search}`,
      );
      if (!response.ok) {
        throw new Error("Nothing matching to your search");
      }
      const data = await response.json();
      console.log(data);
      setSearchedProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearchProducts();
  }, [search]);

  return (
    <div>
      {searchedProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
export default SearchedProducts;
