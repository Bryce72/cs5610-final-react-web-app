import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";
export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-account-screen">
            <h2>Account</h2>

            <div className="d-flex mt-4">

                <div className="me-5 pe-3">
                    <AccountNavigation />
                </div>

                <div className="flex-grow-1 mx-1" style={{ maxWidth: "750px" }}>

                    <Routes>
                        {/* default location depends if you're logged in or not */}
                        <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />

                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Users" element={<Users />} />
                        <Route path="/Users/:uid" element={<Users />} />
                    </Routes>
                </div>

            </div>

        </div>
    );
}
