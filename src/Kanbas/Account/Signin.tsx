import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import * as db from "../Database";
import * as client from "./client";

import React from "react";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    if (!credentials.username || !credentials.password) {
      alert("Both username and password are required.");
      return;
    }
    // console.log(`attempting to sign in with ${JSON.stringify(credentials)}`)

    try {
      const user = await client.signin(credentials);
      if (!user) throw Error;
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (Error) {
      alert("unable to log in\nplease try again!");
      console.log(`${JSON.stringify(Error, null, 2)}`);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <input defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2" placeholder="username" id="wd-username" />

      <input defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2" placeholder="password" type="password" id="wd-password" />

      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>

      <Link id="wd-signup-link" to="/Kanbas/Account/Signup"> Sign up </Link>
    </div>
  );
}
