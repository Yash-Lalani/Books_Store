import React from "react";


const About = () => {
  return (
    <div>
      {/* Hero Section */}
    
      {/* Who We Are Section */}
      <section className="container my-1">
        <h2 className="text-center mb-4">Who We Are</h2>
        <p className="text-muted text-center">
          At <strong>Book Haven</strong>, we believe that books have the power to transform lives. We are dedicated to providing book lovers with a curated collection of novels, self-help guides, academic books, and rare classics.
        </p>
      </section>

      {/* Our Collection Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Our Collection</h2>
          <p className="text-muted">
            We offer a wide variety of books across different genres, including:
          </p>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card shadow p-3">
                <h5>📖 Fiction</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow p-3">
                <h5>🎓 Academic</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow p-3">
                <h5>💡 Self-Help</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow p-3">
                <h5>🔍 Rare & Classics</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-3 border rounded">
              <h5>📦 Free & Fast Shipping</h5>
              <p>We deliver books to your doorstep quickly and for free.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded">
              <h5>🎁 Exclusive Discounts</h5>
              <p>Get amazing discounts on new and bestselling books.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded">
              <h5>🤝 24/7 Support</h5>
              <p>Our team is available anytime to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Meet Our Team</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h5>👨‍💼 John Doe</h5>
                <p>Founder & CEO</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h5>👩‍💻 Jane Smith</h5>
                <p>Head of Operations</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h5>📚 Alex Brown</h5>
                <p>Lead Curator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="container my-5 text-center">
        <h2>Contact Us</h2>
        <p>
          Have any questions? Reach out to us at:
          <br />
          📧 <strong>support@bookhaven.com</strong>
        </p>
      </section>
    </div>
  );
};

export default About;
