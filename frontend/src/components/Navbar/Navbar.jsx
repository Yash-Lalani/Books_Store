  import React from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";

  const Navbar = () => {
    const Links = [
      { title: "Home", link: "/" },
      
      { title: "All Books", link: "/all-books" },
      // { title: "About", link: "/about" },
      { title: "Cart", link: "/cart" },
      { title: "Profile", link: "/profile" },
      { title: "Admin Profile", link: "/profile" },
      { title: "Chat", link: "/chat" },
      { title: "Search", link: "/search" },
      
    ];
    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    if (isLoggedIn===false){
        Links.splice(2,3);
    }
    if(isLoggedIn==true && role==="user"){
      Links.splice(4,1);
    }
    
    if(isLoggedIn==true && role==="admin"){
      Links.splice(3,1);
    }
    

    return (
      <nav id="scanfcode" className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Navbar Header & Brand */}
          <div className="navbar-header">
            <button
              type="button"
              id="toggle-button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#myNavbar"
              aria-controls="myNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link id="logo" className="navbar-brand" to="/">
              BookStore
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul id="link" className="navbar-nav ms-auto">
              {/* Main Navigation Links */}
              {Links.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link className="nav-link" to={item.link}>{item.title}</Link>
                </li>
              ))}

              

              {/* Sign In & Sign Up */}
            {isLoggedIn===false && <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
              </li>
              <li className="nav-item" id="button-link">
                <Link className="btn btn-primary" to="/signup">Sign Up</Link>
              </li>
            </>}
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
