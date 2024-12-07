import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import * as peopleClient from "../client";


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



{/* <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span>{" "}
              <span className="wd-last-name">Wayne</span>
            </td>
            <td className="wd-login-id">001233121S</td>
            <td className="wd-section">S201</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2024-10-01</td>
            <td className="wd-total-activity">15:23:32</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span>{" "}
              <span className="wd-last-name">Rogers</span>
            </td>
            <td className="wd-login-id">004434561S</td>
            <td className="wd-section">S105</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2023-05-01</td>
            <td className="wd-total-activity">11:21:13</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{" "}
              <span className="wd-last-name">Romanoff</span>
            </td>
            <td className="wd-login-id">003214561S</td>
            <td className="wd-section">S501</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2022-09-15</td>
            <td className="wd-total-activity">18:20:32</td>
          </tr>
                    <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span>{" "}
              <span className="wd-last-name">Wayne</span>
            </td>
            <td className="wd-login-id">001233121S</td>
            <td className="wd-section">S201</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2024-10-01</td>
            <td className="wd-total-activity">15:23:32</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span>{" "}
              <span className="wd-last-name">Rogers</span>
            </td>
            <td className="wd-login-id">004434561S</td>
            <td className="wd-section">S105</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2023-05-01</td>
            <td className="wd-total-activity">11:21:13</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{" "}
              <span className="wd-last-name">Romanoff</span>
            </td>
            <td className="wd-login-id">003214561S</td>
            <td className="wd-section">S501</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2022-09-15</td>
            <td className="wd-total-activity">18:20:32</td>
          </tr>
         </tbody> */}