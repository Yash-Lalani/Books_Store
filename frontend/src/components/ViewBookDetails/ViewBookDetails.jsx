import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate here
import { FaShoppingCart, FaHeart, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const [message, setMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
        setUpdatedBook(response.data.data); // Initialize form with current book details
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!data) {
    return <p className="loading">Loading book details...</p>;
  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-book-to-favorite",
        {},
        { headers }
      );
      toast.success(response.data.message);
      <ToastContainer />
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while adding to favorites.");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message, { theme: "colored" });
    } catch (error) {
      console.error("Error adding to Cart:", error);
      toast.error("An error occurred while adding to cart.", { theme: "colored" });
    }
  };
  

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/update-book",
        updatedBook,
        { headers }
      );
      setMessage("✅ Book updated successfully!");
      setData({ ...data, ...updatedBook }); // Update UI with new data
    } catch (error) {
      setMessage("❌ Error updating book");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/delete-book",
        { headers }
      );
      alert("✅ Book deleted successfully!");
      navigate("/all-books"); // Redirect to books list after delete
    } catch (error) {
      alert("❌ Error deleting book");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row align-items-center">
        {/* Book Image */}
        <div className="col-md-5 text-center">
          <img
            src={data.url}
            alt={data.title}
            className="img-fluid book-image"
          />
        </div>

        {/* Book Details */}
        <div className="col-md-7">
          <h1 className="fw-bold">{data.title}</h1>
          <h4 className="text-muted">by {data.author}</h4>
          <p className="mt-3">{data.desc}</p>
          <h3 className="text-success">₹{data.price}</h3>
          <p><strong>Language:</strong> {data.language}</p>

          {/* User Actions */}
          {isLoggedIn && role === "user" && (
            <div className="mt-4">
              <button className="btn btn-primary me-3" onClick={handleCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
              <button className="btn btn-danger" onClick={handleFavorite}>
                <FaHeart className="me-2" /> Add to Favorites
              </button>
            </div>
          )}

          {/* Admin Actions */}
          {/* Admin Actions */}
          {isLoggedIn && role === "admin" && (
            <div className="mt-4">
              <button
                className="btn btn-warning me-3"
                data-bs-toggle="modal"
                data-bs-target="#editBookModal"
              >
                <FaEdit className="me-2" /> Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                <FaTrash className="me-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Book Modal */}
      <div
        className="modal fade"
        id="editBookModal"
        tabIndex="-1"
        aria-labelledby="editBookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editBookModalLabel">
                Edit Book
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={updatedBook.title}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, title: e.target.value })
                }
              />
              <label>Author</label>
              <input
                type="text"
                className="form-control"
                value={updatedBook.author}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, author: e.target.value })
                }
              />
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={updatedBook.price}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, price: e.target.value })
                }
              />
              <label>URL</label>
              <input
                type="text"
                className="form-control"
                value={updatedBook.url}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, url: e.target.value })
                }
              />
              <label>Description</label>
              <textarea
                className="form-control"
                value={updatedBook.desc}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, desc: e.target.value })
                }
              ></textarea>
              <label>Language</label>
              <input
                type="text"
                className="form-control"
                value={updatedBook.language}
                onChange={(e) =>
                  setUpdatedBook({ ...updatedBook, language: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Book
              </button>
            </div>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;