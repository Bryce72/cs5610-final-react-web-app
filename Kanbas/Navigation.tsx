/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { GoBeaker } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function KanbasNavigation() {
    // variable for our current location while running this code
    const { pathname } = useLocation()

    //json info for every link in our nav menu
    const links = [
        { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
        { label: "Courses", path: "/Kanbas/Dashboard", icon: LiaBookSolid },
        { label: "Calendar", path: "/Kanbas/Calendar", icon: IoCalendarOutline },
        { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
        { label: "Labs", path: "/Labs", icon: GoBeaker },
    ]

    return (
        <div id="wd-kanbas-navigation" style={{ width: 120 }} className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block z-2 bg-black">

            {/* northeastern logo that links to the website */}
            <a id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/" className="list-group-item bg-black border-0">
                <img src="images/NEU.png" width={"75px"} />
            </a>

            {/* make the account icon different */}
            <Link
                to="/Kanbas/Account"
                className={`list-group-item text-center border-0 bg-black ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}
            >
                <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                <br />
                Account
            </Link>

            {/* creates the rest of the nav menu items */}
            {links.map(
                (link) => (
                    <Link key={`link-${link.label}`}
                        to={link.path}
                        className={`list-group-item bg-black text-center border-0 ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}
                    >
                        {link.icon({ className: "fs-1 text-danger" })}
                        <br />
                        {link.label}
                    </Link>
                ))
            }

        </div>
    );
}