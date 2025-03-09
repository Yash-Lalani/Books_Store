import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Import BookCard component

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
        setData(response.data); // Assuming response.data is an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Recently Added Books</h2>
      {data.length > 0 ? (
        <div className="row">
          {data.map((item, i) => (
            <div key={i} className="col-md-4 mb-4 d-flex justify-content-center">
              <BookCard data={item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading books...</p>
      )}
    </div>
  );
};

export default RecentlyAdded;
