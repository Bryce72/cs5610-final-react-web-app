import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../Account/client";


export default function PeopleDetails() {
    const navigate = useNavigate();
    const { uid } = useParams();

    // used to map options for the roles drop down
    const ROLES = [
        { value: "STUDENT", displayAs: "Student" },
        { value: "TA", displayAs: "Teaching Assistant" },
        { value: "FACULTY", displayAs: "Faculty" },
        { value: "ADMIN", displayAs: "Administrator" }
    ];

    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName, role, email };
        console.debug(`updated user =${JSON.stringify(updatedUser, null, 2)}`);

        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        navigate(-1);
    };

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };

    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };

    //if user ID changes then fetch the user from the server again
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);

    useEffect(() => {
        console.log("PEOPLE DETAILS - updating state variables with new user")
        setName(`${user.firstName} ${user.lastName}`);
        setRole(user.role);
        setEmail(user.email);
    }, [user]);

    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => { navigate(-1); }} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary me-2 fs-1" />
            </div><hr />

            <div className="text-danger fs-4">
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit text-primary" />)
                }
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-4 mt-2 me-2 wd-save text-success" />)
                }
                {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}</div>)
                }
                {user && editing && (
                    // FIXME: randomly losing the first name?
                    <input className="form-control w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />)
                }

            </div>

            <div className="mt-3">
                {/* if we are NOT editing then just show role as plain text */}
                {!editing && (
                    <div>
                        <b>Role: </b>
                        <span className="wd-role">{user.role}</span>
                    </div>
                )}

                {/* if we ARE editing then show dropdown menu */}
                {user && editing && (
                    // FIXME: not working
                    <span className="wd-role">
                        <label htmlFor="wd-role" className="fw-bold">Role: </label>
                        <select id="wd-role"
                            className="form-control wd-select-role"
                            onChange={e => setRole(e.target.value)}
                        >
                            {ROLES.map(r =>
                                <option value={r.value} selected={user.role === r.value} >{r.displayAs}</option>
                            )}
                        </select>
                    </span>
                )}
            </div>

            <div>
                {/* if we are NOT editing just show email as plain text */}
                {user && !editing && (
                    <span className="wd-email"><b>Email: </b> <span>{user.email}</span> </span>
                )}

                {/* otherwise have the email inside of an input box */}
                {user && editing && (
                    // fixme: not working
                    <span className="wd-email">
                        <label htmlFor="wd-user-email" className="fw-bold">Email: </label>
                        <input id="wd-user-email"
                            defaultValue={user.email}
                            type="email"
                            className="form-control"
                            onChange={e => setEmail(e.target.value)} />
                    </span>
                )}
            </div>

            <b>Login ID: </b>
            <span className="wd-login-id">{user.loginId}</span> <br />

            <b>Section: </b>
            <span className="wd-section">{user.section}</span> <br />

            <b>Total Activity: </b>
            <span className="wd-total-activity">{user.totalActivity}</span>

            <hr />
            <button onClick={() => deleteUser(uid)}
                className="btn btn-danger float-end wd-delete" >
                Delete
            </button>

            {/* question: assignment says we need this button but it does the same thing as the x on the top right? */}
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel" >
                Cancel
            </button>

        </div >
    );
}