import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, updateAssignment } from "./reducer";
import FacultyPrivileges from "../../Account/FacultyPrivileges";
import StudentPrivileges from "../../Account/StudentPrivileges";
import * as assignmentsClient from "./client";
import { Assignment, canBeAssignment } from "./assignment.type";

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cid, aid, mode } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [assignmentEdits, setAssignmentEdits] = useState<any>();
  const [currentAssignment, setCurrentAssignment] = useState<Assignment>();

  const fetchAssignment = async () => {
    if (typeof cid === "string" && typeof aid === "string") {
      const serverAssignment = await assignmentsClient.getAssignment(aid, cid);
      setCurrentAssignment(serverAssignment);
      //console.log(`assignment from server = \n${JSON.stringify(serverAssignment, null, 2)}`)
    } else {
      throw new Error("unable to find assignment!");
    }
  }
  useEffect(() => { fetchAssignment() }, []);

  //function that updates server AND updates redux state
  const saveAssignment = async () => {
    console.log(`edits to assignment =\n${JSON.stringify(assignmentEdits, null, 3)}`)

    const editedAssignment = { ...currentAssignment, ...assignmentEdits };
    console.log(`after applying edits:\n${JSON.stringify(editedAssignment, null, 3)}`)

    //make sure we have required fields first
    if (canBeAssignment(editedAssignment)) {
      await assignmentsClient.replaceAssignment(aid as string, editedAssignment);
      dispatch(updateAssignment(editedAssignment));
      return true;
    } else {
      console.log("unable to save assignment")
      return false;
    }
  };

  //if we were making a new assignment but changed our mind cancel making the new assignment
  const cancelAssignment = async () => {
    if (mode === "new") {
      await assignmentsClient.deleteAssignment(aid as string);
      dispatch(deleteAssignment(aid));
    }
  };

  return (

    <div id="wd-assignments-editor" className="mx-3">

      {currentAssignment ?
        (<div id="wd-assignment-undefined-barrier">
          {assignmentNameEditor(currentAssignment, assignmentEdits, setAssignmentEdits, currentUser)}
          {assignmentDescriptionEditor(currentAssignment, assignmentEdits, setAssignmentEdits, currentUser)}

          <div className="container d-flex flex-column justify-content-end">

            {pointsEditor(currentAssignment, assignmentEdits, setAssignmentEdits, currentUser)}
            {assignmentGroupEditor(currentAssignment, currentUser, assignmentEdits, setAssignmentEdits)}
            {gradeDisplayChooser(currentAssignment, currentUser, assignmentEdits, setAssignmentEdits)}
            {submissionTypeChooser(currentAssignment, currentUser, assignmentEdits, setAssignmentEdits)}

            {/* Assign Section */}
            <div className="row my-4">
              <div className="col d-flex align-items-center justify-content-end">
                <label className="form-label"> <h5>Assign</h5> </label>
              </div>

              <div className="col ms-4 me-2 form-control d-flex flex-column align-items-start ">
                <div className="container">
                  <div className="row">
                    <label className="form-label">
                      <b>Assign To</b>
                      <input className="form-control" id="wd-assign-to" defaultValue="Everyone" readOnly={currentUser.role === "STUDENT"} />
                    </label>
                  </div>

                  {assignmentDateEditors(currentAssignment, assignmentEdits, setAssignmentEdits, currentUser)}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row my-5">
              <hr />
              <div className="d-flex justify-content-end">
                <StudentPrivileges>
                  <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                    <button type="button" className="btn btn-secondary btn-lg mx-2">
                      Back
                    </button>
                  </Link>
                </StudentPrivileges>
                <FacultyPrivileges>
                  <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                    <button type="button"
                      className="btn btn-secondary btn-lg mx-2"
                      onClick={e => { cancelAssignment(); }}
                    >
                      Cancel
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger btn-large btn-lg mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      saveAssignment().then((value) => {
                        if (value === false) {
                          console.log("FAILED TO SAVE ASSIGNMENT - I don't want to leave this page!")
                          window.alert("Assignment must have a name, number of points and value for all dates!");
                        } else {
                          navigate(`/Kanbas/Courses/${cid}/Assignments`);
                        }
                      })
                    }}
                  >
                    Save
                  </button>

                </FacultyPrivileges>
              </div>
            </div>
          </div>
        </div>)
        :
        (<p className="text-danger fs-3">unable to find assignment!</p>)
      }
    </div>
  );
}

function assignmentNameEditor(assignment: any, assignmentEdits: any, setEditedAssignment: any, currentUser: any) {
  const isStudent = currentUser.role === "STUDENT";
  return <div className="my-4 me-3">
    <label htmlFor="wd-name" className="form-label">
      <h5>Assignment Name*</h5>
    </label>

    <input id="wd-name"
      type="text"
      className="form-control form-control-lg"
      placeholder="Assignment Name"
      defaultValue={assignment.title}
      onChange={(e) => {
        const editedAssignment = { ...assignmentEdits, title: e.target.value };
        setEditedAssignment(editedAssignment);
      }}
      readOnly={isStudent}
    />
  </div>;
}

function assignmentDescriptionEditor(assignment: any, assignmentEdits: any, setEditedAssignment: any, currentUser: any) {
  const isStudent = currentUser.role === "STUDENT";

  return <div className="mt-3 mb-5 me-3">
    <label htmlFor="wd-description" className="form-label">
      <h5>Description</h5>
    </label>
    <textarea id="wd-description"
      className="form-control form-control-lg"
      cols={30} rows={10} defaultValue={assignment.description}
      onChange={(e) => {
        const editedAssignment = { ...assignmentEdits, description: e.target.value };
        setEditedAssignment(editedAssignment);
      }}
      readOnly={isStudent} />
  </div>;
}

function pointsEditor(assignment: any, assignmentEdits: any, setEditedAssignment: any, currentUser: any) {
  const isStudent = currentUser.role === "STUDENT";
  return <div className="row my-4">
    <div className="col d-flex align-items-center justify-content-end">
      <label htmlFor="wd-points" className="form-label">
        <h5>Points*</h5>
      </label>
    </div>

    <div className="col align-items-center d-flex align-items-center justify-content-end">
      <input id="wd-points"
        type="number"
        min="0"
        defaultValue={assignment.points}
        className="form-control"
        onChange={(e) => {
          const editedAssignment = { ...assignmentEdits, points: e.target.value };
          setEditedAssignment(editedAssignment);
        }}
        readOnly={isStudent}
      />
    </div>
  </div>;
}

//TODO
function assignmentGroupEditor(assignment: any, currentUser: any, assignmentEdits: any, setEditedAssignment: any) {
  const isStudent = currentUser.role === "STUDENT";

  const groupOptions = ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"];

  return <div className="row my-4">
    <div className="col d-flex align-items-center justify-content-end">
      <label htmlFor="wd-group" className="form-label">
        <h5>Assignment Group</h5>
      </label>
    </div>

    {/* NOTE: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option> */}
    <div className="col align-items-center d-flex align-items-center">
      <select id="wd-group" className="form-select" onChange={(e) => { setEditedAssignment({ ...assignmentEdits, group: e.target.value }) }}>
        {groupOptions.map((group) => {
          if (assignment.group === group) {
            return (
              <option selected value={group} disabled={isStudent} key={group}>
                {group}
              </option>);
          } else {
            return (
              <option value={group} disabled={isStudent} key={group}>
                {group}
              </option>);
          }
        })}
      </select>
    </div>
  </div>;
}

//TODO?
function gradeDisplayChooser(assignment: any, currentUser: any, assignmentEdits: any, setEditedAssignment: any) {
  const isStudent = currentUser.role === "STUDENT";
  const gradeDisplayOptions = ["Percentage", "Letter Grade"];

  return <div className="row my-4">
    <div className="col d-flex align-items-center justify-content-end">
      <label htmlFor="wd-display-group-as" className="form-label">
        <h5>Display Grade As</h5>
      </label>
    </div>

    <div className="col align-items-center d-flex align-items-center">
      <select id="wd-display-group-as" className="form-select" onChange={(e) => setEditedAssignment({ ...assignmentEdits, grade_display: e.target.value })}>
        {gradeDisplayOptions.map((display) => {
          if (assignment.grade_display === display) {
            return (<option selected value={display} disabled={isStudent}>{display}</option>);
          } else {
            return (<option value={display} disabled={isStudent}>{display}</option>);
          }
        })}
      </select>
    </div>
  </div>;
}

//TODO
function submissionTypeChooser(assignment: any, currentUser: any, assignmentEdits: any, setEditedAssignment: any) {
  const isStudent = currentUser.role === "STUDENT";
  const submissionTypeOptions = ["Online", "Physical"];
  const entryOptions = ["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"];

  return <div className="row my-4">
    <div className="col d-flex align-items-center justify-content-end">
      <label className="form-label">
        <h5>Submission Type</h5>
      </label>
    </div>

    <div className="col ms-3 me-2 form-control d-flex flex-column align-items-start ">
      <select id="wd-submission-type" className="form-select mt-2 mb-4" onChange={(e) => setEditedAssignment({ ...assignmentEdits, submission_type: e.target.value })}>
        {submissionTypeOptions.map((submissionType) => {
          if (assignment.submission_type === submissionType) {
            return (
              <option selected value={submissionType} disabled={isStudent}>
                {submissionType}
              </option>);
          } else {
            return (
              <option value={submissionType} disabled={isStudent}>
                {submissionType}
              </option>);
          }
        })}
      </select>

      <b>Online Entry Options</b>
      {entryOptionsEditor(entryOptions, assignment, currentUser, assignmentEdits, setEditedAssignment)}
    </div>
  </div>;
}

//TODO
function entryOptionsEditor(entryOptions: string[], assignment: any, currentUser: any, assignmentEdits: any, setEditedAssignment: any) {
  const isStudent = currentUser.role === "STUDENT";

  return <form className="form-check" >
    {entryOptions.map((entry) => {
      if (assignment.entry_options === null || assignment.entry_options === undefined || !assignment.entry_options.includes(entry)) {
        return (
          <div>
            <label className="form-check-label my-2">
              <input name="wd-entry-options" type="checkbox" id="wd-text-entry" className="form-check-input" disabled={isStudent} />
              {entry}
            </label>
            <br />
          </div>
        );
      }
      else {
        return (
          <div>
            <label className="form-check-label my-2">
              <input defaultChecked={true} name="wd-entry-options" type="checkbox" id="wd-text-entry" className="form-check-input" disabled={isStudent} />
              {entry}
            </label>
            <br />
          </div>
        );
      }
    })}
  </form>;
}

function assignmentDateEditors(assignment: any, assignmentEdits: any, setEditedAssignment: any, currentUser: any) {
  const isStudent = currentUser.role === "STUDENT";

  return <span>
    <div className="row">
      <label className="form-label">
        <b>Due*</b>
        <input className="form-control" id="wd-due-date" type="date" defaultValue={assignment.due_by_date} onChange={(e) => {
          const editedAssignment = { ...assignmentEdits, due_by_date: e.target.value };
          setEditedAssignment(editedAssignment);
        }} readOnly={isStudent} />
      </label>
    </div>

    <div className="row text-nowrap">

      <div className="col">
        <label className="form-label d-flex flex-column">
          <b>Available From:*</b>
          <input id="wd-available-from" className="form-control" type="date" defaultValue={assignment.available_date} onChange={(e) => {
            const editedAssignment = { ...assignmentEdits, available_date: e.target.value };
            setEditedAssignment(editedAssignment);
          }} readOnly={isStudent} />
        </label>
      </div>

      <div className="col">
        <label className="form-label d-flex flex-column">
          <b>Until:*</b>
          <input id="wd-available-until" className="form-control" type="date" defaultValue={assignment.available_until} onChange={(e) => {
            const editedAssignment = { ...assignmentEdits, available_until: e.target.value };
            setEditedAssignment(editedAssignment);
          }} readOnly={isStudent} />
        </label>
      </div>
    </div>
  </span>;
}
