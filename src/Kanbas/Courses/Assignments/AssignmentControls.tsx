import { FaPlus } from "react-icons/fa";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { courses } from "../../Database";



export default function AssignmentControls(
  {
    cid,
    assignmentName,
    setAssignmentName,
    addAssignment,
  }: {
    cid: any;
    assignmentName: string;
    setAssignmentName: (title: string) => void;
    addAssignment: () => void;
  }
) {
  console.log("handleAssignmentClick", cid);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  const { aid } = useParams();
  const course = courses.find((course) => course._id === cid);

  const generateNewId = () => {
    const numbers = assignments.map(a => parseInt(a._id.substring(1)));
    const maxNumber = Math.max(...numbers);
    const newNumber = maxNumber + 1;
    return `A${newNumber}`;
  };

  const handleAssignmentClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/AssignmentEditorNew`);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap d-flex align-items-center">
      {currentUser.role === "FACULTY" && (
        <>
          <div className="input-group me-3" style={{ maxWidth: "250px" }}>
            <span className="input-group-text bg-white border-right-white float-end" id="search-addon">
              <IoIosSearch />
            </span>
            <input
              type="text"
              className="form-control border-left-white btn-lg"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>

          <button id="wd-add-group-btn" className="btn btn-light btn-lg me-1 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </button>

          <button
            id="wd-add-assignment-btn"
            className="btn btn-lg btn-danger me-1 float-end"
            onClick={handleAssignmentClick}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </button>
        </>)}
    </div>
  );
}

