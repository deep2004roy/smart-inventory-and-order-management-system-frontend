import { useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import "./Orders.css";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8081/orders");
      if (!response.ok) {
        throw new Error("No orders there");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders-container">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
}
export default Orders;
