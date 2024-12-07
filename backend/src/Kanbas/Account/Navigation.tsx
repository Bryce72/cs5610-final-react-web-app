import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 const active = (path: string) => (pathname.includes(path) ? "active" : "");
 const { pathname } = useLocation();
 return (
   <div id="wd-account-navigation" className="list-group">
     {links.map((link) => (
       <Link key={link} to={`/Kanbas/Account/${link}`} className={`list-group-item ${active(link)}`}> {link} </Link>
     ))}
     {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
   </div>
);}





// import { Link, useLocation } from "react-router-dom";
// import './Navigation.css'; 

// import { useSelector } from "react-redux";


// export default function Navigation() {
//   const location = useLocation();
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const links = currentUser
//   ? [{ to: "/Kanbas/Account/Profile", label: "Profile" }]
//   : [
//       { to: "/Kanbas/Account/Signin", label: "Sign in" },
//       { to: "/Kanbas/Account/Signup", label: "Sign up" }
//     ];

// return (
//   <div id="wd-account-navigation" className="nav flex-column">
//     {links.map(({ to, label }) => (
//       <Link
//         key={label}
//         to={to}
//         className={`nav-link ${location.pathname === to ? "active" : "text-danger"}`}
//       >
//         {label}
//       </Link>
//     ))}
//      {currentUser && currentUser.role === "ADMIN" && (
//        <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
//   </div>
// );}
