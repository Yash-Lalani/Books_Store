import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Trash icon for delete
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-user-cart", { headers });
                setCart(response.data.data);
            } catch (error) {
                console.error("Error fetching cart:", error.response ? error.response.data : error.message);
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        let newTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
        setTotal(newTotal);
    }, [cart]);

    const deleteItem = async (bookId) => {
        try {
            await axios.put(`http://localhost:3000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
            setCart(cart.filter(book => book._id !== bookId));
        } catch (error) {
            console.error("Error removing book:", error.response ? error.response.data : error.message);
        }
    };

    const placeOrder = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items before placing an order.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/place-order`, { order: cart }, { headers });
            alert(response.data.message);
            navigate("/Profile/order-history"); // Redirect to order history page after placing an order
        } catch (error) {
            console.error("Error placing order:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Your Cart</h2>

            {/* Total Price */}
            <h4 className="mb-3">Total: ₹ {total.toFixed(2)}</h4>

            {/* Place Order Button */}
            {cart.length > 0 && (
                <button className="btn btn-success mb-3" onClick={placeOrder}>
                    Place Your Order
                </button>
            )}

            {/* Cart List */}
            <div className="cart-container">
                {cart.length === 0 ? (
                    <p>No books in cart</p>
                ) : (
                    cart.map((book) => (
                        <div className="cart-item d-flex align-items-center justify-content-between p-3 mb-2" key={book._id}>
                            {/* Book Image */}
                            <img
                                src={book.url || "https://via.placeholder.com/60x80"}
                                alt={book.title}
                                className="cart-item-img"
                            />

                            {/* Book Info */}
                            <div className="cart-item-details" style={{ backgroundColor: "#333", padding: "10px", borderRadius: "8px" }}>
                                <h5 className="mb-1" style={{ color: "white", fontWeight: "bold" }}>
                                    {book.title}
                                </h5>
                                <p style={{ color: "white" }}>
                                    {book.desc && book.desc.length > 60 ? book.desc.slice(0, 60) + "..." : book.desc || "No description"}
                                </p>
                            </div>

                            {/* Price & Delete Button */}
                            <div className="cart-item-actions d-flex align-items-center">
                                <h6 className="text-white me-3">₹ {book.price}</h6>
                                <button className="btn btn-danger" onClick={() => deleteItem(book._id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;
