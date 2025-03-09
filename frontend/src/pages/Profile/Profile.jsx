import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <Sidebar profile={profile} />

      {/* Main Content */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
