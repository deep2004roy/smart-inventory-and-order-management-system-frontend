import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/orders/${id}`);
      if (!response.ok) {
        throw new Error("No such order available");
      }
      const data = await response.json();
      setOrder(data);
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
    </div>
  );
}
export default OrderDetails;
