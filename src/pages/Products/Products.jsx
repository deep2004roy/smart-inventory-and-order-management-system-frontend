import { useEffect, useState } from "react";
import Product from "../../components/Product";
import "./Products.css";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(
        `/products?search=${search}&category=${category}&sort=${sort}&page=${page}&size=5`,
      );
      setProducts(response.data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (products.length === 0) {
    return <h2>No products found</h2>;
  }
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <input
            type="text"
            placeholder="Search something..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
    </div>
  );
}
export default Products;
