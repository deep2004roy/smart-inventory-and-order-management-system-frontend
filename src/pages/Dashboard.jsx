import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [summary, setSummary] = useState({
    lowStockProducts: [],
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      setError("Failed to load dashboard");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

          <p className="mt-1 text-slate-500">
            Inventory and order management overview
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-slate-500">
              Total Products
            </h3>

            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {summary.totalProducts}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-slate-500">Total Stock</h3>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {summary.totalStock}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-slate-500">Total Orders</h3>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {summary.totalOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-slate-500">Revenue</h3>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              ₹
              {summary.revenue?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-yellow-50 p-4 shadow">
            <p className="text-sm text-yellow-700">Pending</p>
            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {summary.pendingOrders}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 shadow">
            <p className="text-sm text-blue-700">Confirmed</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {summary.confirmedOrders}
            </p>
          </div>

          <div className="rounded-xl bg-purple-50 p-4 shadow">
            <p className="text-sm text-purple-700">Shipped</p>
            <p className="mt-2 text-2xl font-bold text-purple-600">
              {summary.shippedOrders}
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-4 shadow">
            <p className="text-sm text-green-700">Delivered</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {summary.deliveredOrders}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4 shadow">
            <p className="text-sm text-red-700">Cancelled</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {summary.cancelledOrders}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            {/* Revenue Trend */}
            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={summary.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} units`, "Sold"]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            {/* Top Selling Products */}
            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Top Selling Products
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.topSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="productName"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />

                <YAxis />

                <Tooltip />

                <Bar dataKey="totalSold" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LOW STOCK */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              Low Stock Products
            </h2>

            {summary.lowStockProducts.length === 0 ? (
              <p className="text-slate-500">No low stock products found.</p>
            ) : (
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left">Product</th>

                      <th className="px-4 py-3 text-left">Quantity</th>

                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {summary.lowStockProducts.map((product) => (
                      <tr
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="cursor-pointer border-t transition hover:bg-slate-50 hover:shadow-sm"
                      >
                        <td className="px-4 py-3">{product.name}</td>

                        <td className="px-4 py-3">{product.quantity}</td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                            Low Stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* RECENT ORDERS */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Recent Orders
              </h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {summary.recentOrders.length} Orders
              </span>
            </div>

            {summary.recentOrders.length === 0 ? (
              <p className="text-slate-500">No recent orders found.</p>
            ) : (
              <div className="space-y-4">
                {summary.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="cursor-pointer rounded-lg border p-4 transition hover:bg-slate-50 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Order #{order.id}
                        </h3>

                        <p className="text-sm text-slate-500">{order.date}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-slate-800">
                          ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                        </p>

                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
