import { Link } from "react-router-dom";
function OrderCard({ order }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purplee-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <Link to={`/orders/${order.id}`} className="block">
      <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/*header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Order #{order.id}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{order.date}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(order.status)}`}
          >
            {order.status}
          </span>
        </div>
        {/*divider */}
        <div className="mb-4 border-t border-slate-200"></div>
        {/*order info */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold text-slate-800">
              ₹{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        {/*Footer*/}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-slate-500">Click to view details</span>
          <span className="font-medium text-indigo-600"> →</span>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
