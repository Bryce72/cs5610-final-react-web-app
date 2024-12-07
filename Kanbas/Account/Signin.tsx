import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as client from "./client";

export default function Signin() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function for when we click the sign in button
    const signin = async () => {
        try {
            const serverResponse = await client.signin(credentials);
            dispatch(setCurrentUser(serverResponse.data));
            navigate("/Kanbas/Dashboard");
        } catch {
            window.alert("unable to log in! please double check your username and password");
        }
    };


    return (
        <div id="wd-signin-screen">
            <h2>Sign In</h2>

            <input id="wd-username"
                placeholder="Username"
                defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="form-control mb-2 mt-2" />

            <input id="wd-password"
                type="password"
                placeholder="Password"
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-control mb-2" />

            <button id="wd-signin-btn"
                className="btn btn-primary w-100 mb-3 mt-3"
                onClick={signin}>
                Sign In
            </button>

            <Link id="wd-signup-link" to="/Kanbas/Account/Signup" className="w-100 mb-2">Sign Up</Link>

        </div>
    );
}