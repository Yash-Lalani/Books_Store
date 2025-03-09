import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruck, FaCheck, FaTimesCircle, FaShoppingCart } from "react-icons/fa"; // Importing icons
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-all-orders", {
          headers,
        });
        setOrders(response.data.data); // Set the fetched orders to state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("An error occurred while fetching orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      // Update the order status in the state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status.");
    }
  };

  // Function to return the status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <FaShoppingCart color="#f39c12" />;
      case "Out for Delivery":
        return <FaTruck color="#3498db" />;
      case "Delivered":
        return <FaCheck color="#2ecc71" />;
      case "Cancelled":
        return <FaTimesCircle color="#e74c3c" />;
      default:
        return <FaShoppingCart color="#95a5a6" />;
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>User</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.book ? order.book.title : "N/A"}</td>
                  <td>{order.book ? `₹${order.book.price}` : "N/A"}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.user ? order.user.username : "N/A"}</td>
                  <td className={`status-cell ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </td>
                  <td>
                    <div className="form-group">
                      <select
                        className="form-control"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
