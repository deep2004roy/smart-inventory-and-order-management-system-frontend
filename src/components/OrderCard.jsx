import "./OrderCard.css";
function OrderCard({ order }) {
  return (
    <div className="order-card">
      <h3>Order #{order.id}</h3>
      <p>Date: {order.date}</p>
      <p>Total Amount: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>
    </div>
  );
}

export default OrderCard;
