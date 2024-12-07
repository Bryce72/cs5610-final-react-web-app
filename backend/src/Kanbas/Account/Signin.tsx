import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import * as client from "./client";

import './Signin.css';  

//console.log("User found:", user);
//alert("User not found. Please check your username and password.");
export default function Signin() {

  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  
  //to="/Kanbas/Dashboard"
  return (
    <div id="wd-signin-screen" className="p-4">
      <h2 className="mb-4">Sign in</h2>
      <input
      defaultValue={credentials.username}
      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        id="wd-username"
        className="form-control mb-3"
        placeholder="username"
      />
      <input
       defaultValue={credentials.password}
       onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        id="wd-password"
        className="form-control mb-3"
        placeholder="password"
        type="password"
      />
      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary btn-block mb-3">
        Sign in
      </button>
      
      <Link id="wd-signup-link" className="text-primary" to="/Kanbas/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
