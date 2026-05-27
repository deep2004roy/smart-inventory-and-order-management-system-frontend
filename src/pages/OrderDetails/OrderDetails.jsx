import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";
import api from "../../services/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("PENDING");
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await api.put(`/orders/${id}/status/${status}`);
      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="order-details">
      <h2>Order Details</h2>

      <p>Order ID: {order.id}</p>
      <p>Date: {order.date}</p>
      <p>Total Amount: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <button onClick={fetchStatus}>Update status</button>
    </div>
  );
}
export default OrderDetails;
