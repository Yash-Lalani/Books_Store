    import React, { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router";
    import { useDispatch } from "react-redux";
    import { authActions } from "../store/auth";

    const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (!formData.username || !formData.password) {
            alert("All fields are required");
            return;
        }

        console.log("Sending login request...", formData);

        // Send login request to server
        const response = await axios.post(
            "http://localhost:3000/api/v1/sign-in",
            formData
        );

        console.log("Server Response:", response.data);

        if (response.data.token) {
            // Store token and user details
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            console.log("Login Successful. Token stored in localStorage.");

            // Dispatch login action to update Redux state
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));
            

            console.log("Dispatched login action to Redux");

            // Redirect user to home page
            navigate("/Profile");
        } else {
            alert("Login failed. Invalid response from server.");
        }
        } catch (error) {
        console.error("Login Error:", error);
        alert("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-5">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
                </form>
                <p className="text-center mt-3">
                Don't have an account?{" "}
                <button
                    className="btn btn-link p-0"
                    onClick={() => navigate("/Signup")}
                >
                    Register
                </button>
                </p>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Login;
