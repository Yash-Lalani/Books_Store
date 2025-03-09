import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/remove-book-from-favorite", {}, { headers });
    console.log("Response:", response.data.message);  
  };

  return (
    <div className="card book-card mt-5 ms-5" style={{ width: "18rem" }}>
      {/* Image Wrapper */}
      <div className="image-wrapper" style={{ height: "250px", overflow: "hidden" }}>
        <img
          src={data.url || "https://via.placeholder.com/200x300"}
          className="card-img-top"
          alt={data.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        {/* Book Title */}
        <h5 className="card-title">{data.title}</h5>

        {/* Short Description */}
        <p className="card-text">
          {data.desc && data.desc.length > 100 ? data.desc.slice(0, 100) + "..." : data.desc || "No description available."}
        </p>

        {/* Price */}
        <h6 className="text-primary">R. {data.price}</h6>

        {/* View Details Button */}
        <Link to={`/view-book-details/${data._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>

      {favourite && <button onClick={handleRemoveBook}>Remove from favourite</button>}
    </div>
  );
};

export default BookCard;
