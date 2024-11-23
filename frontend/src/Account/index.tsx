import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
export default function Account() {
    return (
        <div id="wd-account-screen">
            <table>
            <tr>
          <h2>Account</h2>
        </tr>
                <tr>
                
                    <td valign="top">
                        <AccountNavigation />    
                    </td>
                    <td valign="top">
                    
                        <Routes>
                            <Route path="/" element={<Navigate to="/signin" />} />
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}