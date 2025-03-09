import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookData.url ||
      !bookData.title ||
      !bookData.author ||
      !bookData.price ||
      !bookData.description ||
      !bookData.language
    ) {
      setMessage("❌ All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/add-book",
        {
          url: bookData.url,
          title: bookData.title,
          author: bookData.author,
          price: bookData.price,
          desc: bookData.description,
          language: bookData.language,
        },
        { headers }
      );

      if (response.status === 201) {
        setMessage("✅ Book added successfully!");
        setBookData({
          url: "",
          title: "",
          author: "",
          price: "",
          description: "",
          language: "",
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      if (error.response) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ Failed to add book.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">📚 Add a New Book</h2>

      {message && <p className="alert alert-info text-center">{message}</p>}

      <form className="card p-4 shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Image URL</label>
          <input
            type="text"
            className="form-control"
            name="url"
            value={bookData.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={bookData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Language</label>
          <input
            type="text"
            className="form-control"
            name="language"
            value={bookData.language}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Adding Book..." : "📖 Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
