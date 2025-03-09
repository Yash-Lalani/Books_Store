import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ profile }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-info">
        <img src={profile.avtar} alt="User Avatar" />
        <h3>{profile.username}</h3>
        <p>{profile.address}</p>
      </div>

      {/* Sidebar Navigation Links */}
      {role === "user" && (
        <>
          <Link className="active" to="/profile/">
            Favourites
          </Link>
          <Link to="/profile/order-history">Order History</Link>
          <Link to="/profile/settings">Settings</Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link className="active" to="/profile/">
            All Order History
          </Link>
          <Link to="/profile/add-book">Add Book</Link>
          <Link to="/profile/settings">Settings</Link>
        </>
      )}

      {/* Logout Link */}
      <a
        href="#logout"
        className="logout"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Sidebar;
