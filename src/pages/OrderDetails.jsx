import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setPageLoading(true);
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      setLoading(true);
      await api.put(`/orders/${id}/status/${status}`);
      await fetchOrderDetails();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Order not found
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/*header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            {" "}
            Order #{order.id}
          </h1>
          <p className="text-slate-500">View and manage order details</p>
        </div>
        {/*order summary */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order Information</h2>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyles(order.status)}`}
            >
              {order.status}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="font-semibold text-green-600">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        {/*Order Items */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium text-slate-800">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="font-semibold text-slate-800">
                  {" "}
                  ₹{item.subtotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t pt-4">
            <span className="text-lg font-semibold">Grand Total</span>
            <span className="text-lg font-bold text-green-600">
              ₹{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        {/*update status */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Update Status</h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button
              onClick={updateStatus}
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
