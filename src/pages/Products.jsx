import { useEffect, useState } from "react";
import Product from "../components/Product";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(
        `/products?search=${search}&category=${category}&sort=${sort}&page=${page}&size=12`,
      );
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* search | filter | sort */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            {/*search */}
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            {/*Category */}
            <select
              value={category}
              onChange={(e) => {
                setPage(0);
                setCategory(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Cloths">Cloths</option>
            </select>
            {/*sort */}
            <select
              value={sort}
              onChange={(e) => {
                setPage(0);
                setSort(e.target.value);
              }}
              className="rounded-lg border border-gray-300
              px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">Sort By</option>
              <option value="price,asc">Price: Low → High</option>
              <option value="price,desc">Price: High → Low</option>
            </select>
          </div>
        </div>
        {/*loading */}
        {loading && (
          <div className="py-20 text-center">
            <h2 className="text-lg font-medium text-slate-600">
              Loading products...
            </h2>
          </div>
        )}
        {/*error */}
        {!loading && error && (
          <div className="rounded-lg bg-red-100 p-4 text-center text-red-600">
            {error}
          </div>
        )}
        {/* No Products */}
        {!loading && !error && products.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold text-slate-600">
              No products found
            </h2>
          </div>
        )}

        {/*product grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Product key={product.productId} product={product} />
              ))}
            </div>
            {/*pagination */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className={`rounded-lg px-5 py-2 font-medium transition ${page === 0 ? "cursor-not-allowed bg-gray-300 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
              >
                ← Prev
              </button>
              <span className="rounded-lg bg-white px-5 py-2 shadow">
                Page {page + 1} of {Math.max(totalPages, 1)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                className={`rounded-lg px-5 py-2 font-medium transition ${
                  page >= totalPages - 1
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Products;
