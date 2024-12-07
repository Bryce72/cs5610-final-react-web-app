import { MdAssignment } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addAssignment, deleteAssignment, setAssignments } from "./reducer";
import FacultyPrivileges from "../../Account/FacultyPrivileges";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get assignments from our server when we first load
  const fetchAssignments = async () => {
    if (typeof cid === "string") {
      const serverAssignments = await assignmentsClient.getAssignments(cid);
      dispatch(setAssignments(serverAssignments));
    } else {
      throw new TypeError(`'cid' should be a string but is actually ${typeof cid}`)
    }
  };
  useEffect(() => { fetchAssignments(); }, []);

  //deletes an assignment
  const deleteCurrAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  //create new empty assignment and navigate to editor
  const createNewAssignment = async () => {
    const newAssignment = await assignmentsClient.createAssignment({ course: cid });
    dispatch(addAssignment(newAssignment));

    navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignment._id}/new`);
  }

  return (
    <div id="wd-assignments" className="d-flex flex-column me-4">

      {/* search bar buttons*/}
      <div className="d-flex align-items-center mb-4">

        {/* search bar*/}
        <span className="input-group me-5 px-2 ms-4">
          <span className="input-group-text" id="basic-addon1">
            <BsSearch className="fs-5" />
          </span>
          <input id="wd-search-assignment" type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
        </span>

        <FacultyPrivileges>
          {/* add assignment group button */}
          <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary dropdown-toggle mx-1" >+ Group</button>

          {/* new assignment button */}
          <button id="wd-add-assignment" className="btn btn-lg btn-danger ms-1 text-nowrap" onClick={createNewAssignment}>
            + Assignment
          </button>
        </FacultyPrivileges>

      </div>

      {/* list of assignments */}
      <ul id="wd-assignment-list list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray" key="list-of-assignments">

          {/* title bar with controls */}
          <div className="wd-title d-flex align-content-center justify-content-between p-3 ps-2 bg-secondary">
            <span>
              <BsGripVertical className="me-2 fs-3" />
              <b className="fs-4">ASSIGNMENTS</b>
            </span>

            <span>
              <i >40% of Total</i>
              <FacultyPrivileges>
                <button className="ms-4">
                  +
                </button>
                <BiDotsVerticalRounded className="mx-2 fs-3" />
              </FacultyPrivileges>
            </span>

          </div>

          {/* list of actual assignments */}
          <ul className="wd-lessons list-group rounded-0">

            {assignments.map((assignment: any) => {
              return (
                <li key={`li-${assignment._id}`} className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="row">
                    {/* left most icons */}
                    <div className="d-flex col-auto align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdAssignment className="me-2 fs-3" />
                    </div>

                    <div className="col d-flex flex-column align-items-start">

                      <a className="wd-assignment-link fw-bold fs-4" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`}>
                        {assignment.title}
                      </a>

                      <span>
                        <span className="text-danger fw-bold">Multiple Modules </span> | <b>Not available until</b> {assignment.available_date} at {assignment.available_time} | <b>Due</b> {assignment.due_by_date} at {assignment.due_by_time} | {assignment.points} pts
                      </span>
                    </div>

                    {/* rightmost buttons */}
                    <div className="d-flex col-auto align-items-center">
                      <AssignmentControlButtons assignmentId={assignment._id} deleteAssignment={deleteCurrAssignment} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div >
  );
}
