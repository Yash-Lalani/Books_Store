import React from "react";

const Hero = () => {
  return (
    
    <section className="mt-5 py-lg-16 py-8">

      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Text Content */}
          <div className="col-lg-6 col-md-12 text-lg-start text-center mb-6 mb-lg-0">
            <div>
              <h5 className="text-dark mb-4">
                <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2"></i>
                Your Favorite Online Bookstore
              </h5>

              <h1 className="display-4 fw-bold mb-3">
                Discover, Read & Expand Your Knowledge
              </h1>

              <p className="pe-lg-10 mb-5">
                Explore a vast collection of books across genres. Find bestsellers, new arrivals, and exclusive editions with great discounts. Your next favorite book is just a click away!
              </p>

              <a href="#" className="btn btn-primary btn-lg">
                Browse Books
              </a>
            </div>
          </div>

          {/* Right Side: Image Section */}
          <div className="col-lg-6 col-md-12 d-flex justify-content-center">
            <div className="position-relative">
              <img
                src="./src/Img/book.jpg"
                alt="Bookstore"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "90%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
