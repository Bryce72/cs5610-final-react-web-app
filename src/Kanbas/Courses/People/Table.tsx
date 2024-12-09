import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import * as peopleClient from "../client";
import React from "react";


export default function PeopleTable() {

  const { cid } = useParams();

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
    if (!cid) return;
    try {
      const courseUsers = await peopleClient.findUsersForCourse(cid);
      setUsers(courseUsers);
    } catch (error) {
      console.error("Error fetching users for course:", error);
    }
  };

  useEffect(() => {
    if (cid) fetchUsersForCourse();
  }, [cid]);


  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <table className="table table-striped fs-5">
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users
            .map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>


      </table>
    </div>
  );
}