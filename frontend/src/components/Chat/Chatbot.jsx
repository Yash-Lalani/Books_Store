import React, { useState } from "react";

const faqs = [
  { question: "How do I find a book?", answer: "You can search for books by title, author, or genre in the search bar." },
  { question: "Can I add books to my favorites?", answer: "Yes! Click on the 'Add to Favorites' button on any book card." },
  { question: "How do I remove a book from favorites?", answer: "Go to your 'Favorites' section and click 'Remove' on the book." },
  { question: "Do you offer book recommendations?", answer: "Yes, we recommend books based on your search history and interests." },
];

const Chatbot = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="chat-container">
      <h2>📚 Book Assistant</h2>
      <p>Tap a question to get an answer:</p>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <button key={index} className="faq-button" onClick={() => setSelectedQuestion(faq)}>
            {faq.question}
          </button>
        ))}
      </div>

      {selectedQuestion && (
        <div className="answer-box">
          <h4>💬 {selectedQuestion.question}</h4>
          <p>{selectedQuestion.answer}</p>
          <button className="close-btn" onClick={() => setSelectedQuestion(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
