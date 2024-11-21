import React from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input id="wd-username" defaultValue="alice" placeholder="username" /><br/>
      <input id="wd-password" defaultValue="123" placeholder="password"
             type="password" /><br/>
      <input id="wd-firstname" defaultValue="Alice" placeholder="First Name" /><br/>
      <input id="wd-lastname" defaultValue="Wonderland" placeholder="Last Name" /><br/>
      <input id="wd-dob" defaultValue="2000-01-01" type="date" /><br/>
      <input id="wd-email" defaultValue="alice@wonderland" type="email" /><br/>
      <select id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>
      <Link to="/account/Signin" >Sign out</Link>
    </div>
);}