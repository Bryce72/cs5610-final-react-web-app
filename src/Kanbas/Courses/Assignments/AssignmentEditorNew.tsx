import React, { useState, useEffect } from 'react';
import './AssignmentEditor.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAssignment } from './reducer' // Adjust path as needed
import * as client from './client';


function AssignmentEditorNew({ cid }: { cid: any }) {
  // const { cid } = useParams();
  // console.log('Saving assignment...', cid);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // create assignment
  // const createAssignment = async (assignment: any) => {
  //   const newAssignment = { course: cid, name: assignment.name };
  //   const createdAssignment = await client.createAssignmentNew(newAssignment);
  //   dispatch(addAssignment(createdAssignment));
  // };

  // const createAssignment = async (assignment: any) => {
  //   if (!cid) {
  //     console.error("Course ID (cid) is missing");
  //     return;
  //   }
  //   if (!assignment.title) {
  //     console.error("Assignment name is missing");
  //     return;
  //   }

  //   const newAssignment = { course: cid, title: assignment.name };
  //   try {
  //     const createdAssignment = await client.createAssignmentNew(newAssignment);
  //     dispatch(addAssignment(createdAssignment));
  //   } catch (error) {
  //     console.error("Failed to create assignment:", error.message);
  //     console.error("Axios config:", error.config);
  //     console.error("Axios request:", error.request);
  //   }
  // }
  const createAssignment = async (assignment: any) => {
    const assignmentCopy = { ...assignment }; // 创建副本
    console.log("Before calling client:", assignmentCopy);
    try {
      const createdAssignment = await client.createAssignmentNew(assignmentCopy);
      dispatch(addAssignment(createdAssignment));
    } catch (error) {
      console.error("Failed to create assignment:", error);
    }
  };


  // Local state for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(100);
  const [group, setGroup] = useState('option1');
  const [gradeDisplay, setGradeDisplay] = useState('option1');
  const [submissionType, setSubmissionType] = useState('option1');
  const [dueDate, setDueDate] = useState('2024-05-13');
  const [availableFrom, setAvailableFrom] = useState('2024-05-06');
  const [availableUntil, setAvailableUntil] = useState('2024-05-20');

  // Save handler
  // const handleSave = () => {
  //   const newAssignment = {
  //     // _id: new Date().getTime().toString(), // Generate a unique ID
  //     title,
  //     description,
  //     points,
  //     group,
  //     gradeDisplay,
  //     submissionType,
  //     dueDate,
  //     availableFrom,
  //     availableUntil,
  //     course: cid, // Associate assignment with the course ID
  //   };

  //   console.log('Creating assignment in editor:', newAssignment);
  //   createAssignment(newAssignment);

  //   // console.log('Assignment created:', newAssignment);
  //   // Navigate back to Assignments page
  //   navigate(`/Kanbas/Courses/${cid}/Assignments`);
  // };

  const handleSave = () => {
    const newAssignment = {
      title,
      description,
      points,
      group,
      gradeDisplay,
      submissionType,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    console.log("Creating assignment in editor:", newAssignment);
    createAssignment({ ...newAssignment }); // 传递副本以避免引用问题
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-2" id="wd-assignments-editor">
      <div className="wd-main-content-offset p-3">
        <div key="test">
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label fw-bold">
              Assignment Name
            </label>
            <input
              id="wd-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="wd-description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              id="wd-description"
              className="form-control"
              rows={5}
              defaultValue="The assignment is available online. Submit a link to the landing page of the test"
              onChange={(e) => setDescription(e.target.value)}

            />
          </div>

          {/* Points */}
          <div className="row mb-3 justify-content-end align-items-center">
            <div className="col-md-4 d-flex align-items-end">
              <label htmlFor="wd-points" className="form-label">
                Points
              </label>
            </div>
            <div className="col-md-8">
              <input id="wd-points" defaultValue={100} className="form-control"
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Assignment Group */}
          <div className="row mb-3 justify-content-end align-items-center">
            <div className="col-md-4">
              <label htmlFor="wd-group" className="form-label">
                Assignment Group
              </label>
            </div>
            <div className="col-md-8">
              <select id="wd-group" className="form-select"
                onChange={(e) => setGroup(e.target.value)}>
                <option value="option1">ASSIGNMENTS</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>

          {/* Display Grade As */}
          <div className="row mb-3 justify-content-end align-items-center">
            <div className="col-md-4">
              <label htmlFor="wd-display-grade-as" className="form-label">
                Display Grade as
              </label>
            </div>
            <div className="col-md-8">
              <select id="wd-display-grade-as" className="form-select"
                onChange={(e) => setGradeDisplay(e.target.value)}>
                <option value="option1">Percentage</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>

          {/* Submission Type */}
          <div className="row mb-3 justify-content-end">
            <div className="col-md-4 d-flex align-items-start">
              <label htmlFor="wd-submission-type" className="form-label">
                Submission Type
              </label>
            </div>
            <div className="col-md-8">
              <div className="card p-3">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <select id="wd-submission-type" className="form-select"
                      onChange={(e) => setSubmissionType(e.target.value)}>
                      <option value="option1">Online</option>
                      <option value="option2">Option 2</option>
                    </select>
                  </div>
                </div>

                {/* Online Entry Options */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Online Entry Options</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-text-entry"
                    />
                    <label className="form-check-label" htmlFor="wd-text-entry">
                      Text Entry
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-website-url"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="wd-website-url">
                      Website URL
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-media-recordings"
                    />
                    <label className="form-check-label" htmlFor="wd-media-recordings">
                      Media Recordings
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-student-annotation"
                    />
                    <label className="form-check-label" htmlFor="wd-student-annotation">
                      Student Annotation
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-file-upload"
                    />
                    <label className="form-check-label" htmlFor="wd-file-upload">
                      File Uploads
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Section */}
          <div className="row mb-3 justify-content-end">
            <div className="col-md-2 d-flex align-items-start">
              <label htmlFor="wd-assign-to" className="form-label">
                Assign
              </label>
            </div>
            <div className="col-md-10">
              <div className="card p-3">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="wd-assign-to" className="form-label">
                      Assign to
                    </label>
                    <div className="input-group">
                      <div className="form-control d-flex align-items-center">
                        <span className="badge bg-light text-dark">
                          Everyone
                          <button
                            type="button"
                            className="btn-close ms-2"
                            aria-label="Remove"
                          ></button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="wd-due-date" className="form-label">
                      Due
                    </label>
                    <input
                      type="date"
                      id="wd-due-date"
                      value="2024-05-13"
                      className="form-control"
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Available From / Until */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="wd-available-from" className="form-label">
                      Available from
                    </label>
                    <input
                      type="date"
                      id="wd-available-from"
                      value="2024-05-06"
                      className="form-control"
                      onChange={(e) => setAvailableFrom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="wd-available-until" className="form-label">
                      Until
                    </label>
                    <input
                      type="date"
                      id="wd-available-until"
                      value="2024-05-20"
                      className="form-control"
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-5" />

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-secondary me-2"
              type="submit"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AssignmentEditorNew;