import { useEffect, useState } from "react";
import Product from "../../components/ProductCard/Product";
import "./Products.css";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/products?search=${search}&category=${category}&sort=${sort}&page=${page}&size=5`,
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setProducts(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search something..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Cloths">Cloths</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price,asc">Low to high</option>
          <option value="price,desc">High to Low</option>
        </select>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
export default Products;
