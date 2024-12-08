import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      alert("Signin successful!"); // Success message
      navigate("/Kanbas/Dashboard");
    } catch (error: any) {
      // Handle specific errors from the backend
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "Username not found") {
        alert("The username you entered does not exist."); // Username not found
      } else if (errorMessage === "Incorrect password") {
        alert("The password you entered is incorrect."); // Incorrect password
      } else {
        alert("An error occurred during signin. Please try again."); // Generic error
      }
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <input
        defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      <input
        defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
