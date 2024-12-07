import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
    const { uid } = useParams();

    const [users, setUsers] = useState<any[]>([]);
    const [searchName, setName] = useState("");
    const [searchRole, setRole] = useState("");

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const createUser = async () => {
        //make default empty user
        const newUser = await client.createUser(
            {
                firstName: "New",
                lastName: `User${users.length + 1}`,
                username: `newuser${Date.now()}`,
                password: "password123",
                email: `email${users.length + 1}@neu.edu`,
                section: "S101",
                role: "STUDENT",
            }
        );
        setUsers([...users, newUser]);
    };

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers(); //this then calls setUsers
        }
    };

    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    return (
        <div>
            <button onClick={createUser} className="float-end btn btn-primary wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>

            <h3>Users</h3>

            {/* filter users by name */}
            <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                className="form-control float-start w-25 me-2 wd-filter-by-name" />

            {/* filter users by role */}
            <select value={searchRole} onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role" >
                <option value="">All Roles</option>    <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </select>

            <PeopleTable users={users} />
        </div>
    );
}
