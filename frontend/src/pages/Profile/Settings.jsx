import { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

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
        setNewAddress(response.data.address); // Pre-fill the address input
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleEditAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/update-address",
        { address: newAddress },
        { headers }
      );

      if (response.status === 200) {
        setProfile({ ...profile, address: newAddress }); // Update UI instantly
        setIsEditing(false);
        setMessage("Address updated successfully! ✅");
        setTimeout(() => setMessage(""), 3000); // Hide message after 3 sec
      }
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      setMessage("❌ Failed to update address. Please try again.");
    }
  };

  if (!profile) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container-fluid p-5">
      <div className="card p-4">
        <h4>Profile Information</h4>
        <hr />

        {message && <p className="alert alert-info">{message}</p>}

        <div className="row">
        <div className="col-md-6">
            <h6>UserName</h6>
            <p className="text-muted">{profile.username}</p>
          </div>
          <div className="col-md-6">
            <h6>Email</h6>
            <p className="text-muted">{profile.email}</p>
          </div>
          <div className="col-md-6">
            <h6>Password</h6>
            <p className="text-muted">*********</p>
          </div>
          <div className="col-md-6">
            <h6>Address</h6>
            {isEditing ? (
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleEditAddress}>
                  Save
                </button>
                <button className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-muted">{profile.address}</p>
                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                  Edit Address
                </button>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Settings;
