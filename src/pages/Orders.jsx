import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const url = status
        ? `/orders?status=${status}&page=${page}&size=12`
        : `/orders?page=${page}&size=12`;
      const response = await api.get(url);
      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/*header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Orders Management
          </h1>
          <p>{orders.length} orders on this page</p>
          <p className="text-slate-500">View and manage all customer orders</p>
        </div>
        {/*filters */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <select
              value={status}
              onChange={(e) => {
                setPage(0);
                setStatus(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-4
              py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">All Status</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
        {/*loading */}
        {loading && (
          <div className="py-20 text-center">
            <h2 className="text-lg font-medium text-slate-600">
              Loading orders...
            </h2>
          </div>
        )}
        {/*error */}
        {!loading && error && (
          <div className="rounded-lg bg-red-100 p-4 text-center text-red-600">
            {error}
          </div>
        )}
        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <div className="rounded-lg bg-white p-10 text-center shadow-md">
            <h2 className="text-xl font-semibold text-slate-600">
              No orders found
            </h2>
            <p className="mt-2 text-slate-500">
              Try changing filters or check back later
            </p>
          </div>
        )}
        {/*order grid */}
        {!loading && !error && orders.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
            {/*pagination */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className={`rounded-lg px-5 py-2 font-medium transition ${
                  page === 0
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                ← Prev
              </button>
              <span className="rounded-lg bg-white px-5 py-2 shadow">
                Page {page + 1} of {Math.max(totalPages, 1)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={totalPages === 0 || page >= totalPages - 1}
                className={`rounded-lg  px-5 py-2 font-medium  transition ${
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
export default Orders;
