import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-all-books");
                console.log("API Response:", response.data);
                setData(response.data.data); // Fix: Extract `data`
            } catch (error) {
                console.error("Error fetching books:", error.response ? error.response.data : error.message);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Books</h2>
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

export default AllBooks;