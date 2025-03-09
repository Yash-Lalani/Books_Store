import React, { useState } from "react";
import axios from "axios";
import annyang from "annyang";
import BookCard from "../BookCard/BookCard";

const VoiceSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (annyang) {
      setListening(true);
      annyang.start({ autoRestart: false, continuous: true });

      annyang.addCallback("result", (phrases) => {
        const voiceQuery = phrases[0]; // First recognized phrase
        setSearchQuery(voiceQuery);
        fetchBooks(voiceQuery);
        annyang.abort(); // Stop listening after capturing input
        setListening(false);
      });
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/search?q=${query}`);
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="voice-search-container">
      {/* Header */}
      <h2 className="title">🎙️ Voice Search for Books</h2>

      {/* Search Bar & Voice Button */}
      <div className="search-box">
        <button onClick={startListening} disabled={listening} className="voice-btn">
          {listening ? "🎧 Listening..." : "🎤 Speak"}
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book..."
          className="search-input"
        />
        <button onClick={() => fetchBooks(searchQuery)} className="search-btn">Search</button>
      </div>

      {/* Book List */}
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} data={book} />)
        ) : (
          <p className="no-books">No books found</p>
        )}
      </div>
    </div>
  );
};

export default VoiceSearch;
