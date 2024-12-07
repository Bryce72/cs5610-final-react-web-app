import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function AccountNavigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const { pathname } = useLocation();
  const arry = [
    { label: "Signin", path: "/Kanbas/Account/Signin" },
    { label: "Signup", path: "/Kanbas/Account/Signup" },
    { label: "Profile", path: "/Kanbas/Account/Profile" }
  ];

  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 position-fixed d-flex d-none d-md-block">
      {/* <Link to={`/Kanbas/Account/Signin`}  id="wd-account-signin" className="list-group-item active border border-0"> Signin </Link>
      <Link to={`/Kanbas/Account/Signup`}  id="wd-account-signup"  className="list-group-item text-danger border border-0"> Signup  </Link>
      <Link to={`/Kanbas/Account/Profile`} id="wd-account-profile"  className="list-group-item text-danger border border-0"> Profile </Link> */}

      {arry.map((link) => (
        <Link key={link.path} to={link.path} className={`
              ${pathname.includes(link.label) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
          {link.label}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)}

    </div>
  );
}