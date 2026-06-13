import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const fetchSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <>
      <p>Total products: {summary.totalProducts}</p>
      <p>Total Stock: {summary.totalStock}</p>
      <p>Total Orders: {summary.totalOrders}</p>
      <p>Revenue: {summary.revenue}</p>
    </>
  );
}
export default Dashboard;
