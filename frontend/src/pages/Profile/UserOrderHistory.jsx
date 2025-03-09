import { useEffect, useState } from "react";
import axios from "axios";

const UserOrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Number of orders per page

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/get-order-history",
                    { headers }
                );
                setOrderHistory(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderHistory();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    // Get current orders for pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle page change
    const nextPage = () => {
        if (currentPage < Math.ceil(orderHistory.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Order History</h2>
            {orderHistory.length > 0 ? (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Mode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.book ? order.book.title : "No title"}</td>
                                    <td>{order.book ? order.book.desc : "No description"}</td>
                                    <td>{order.book ? `₹ ${order.book.price}` : "No price"}</td>
                                    <td>{order.status}</td>
                                    <td>{order.mode || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        <button className="btn btn-primary me-2" onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {Math.ceil(orderHistory.length / ordersPerPage)}</span>
                        <button className="btn btn-primary ms-2" onClick={nextPage} disabled={currentPage === Math.ceil(orderHistory.length / ordersPerPage)}>
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default UserOrderHistory;
