import React, { useState, useEffect } from 'react';
import './AssignmentEditor.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignment } from './reducer';
import * as client from './client';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();

  // update assignment
  const saveAssignment = async (assignment: any) => {
    console.log("assignment", assignment);
    const status = await client.updateClientAssignment(assignment);
    console.log("status", status);
    dispatch(updateAssignment(status));
  };

  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const navigate = useNavigate();
  const aidUpdate = aid?.split(":")[1];

  const assignment = assignments.find(
    (assignment: any) => assignment.course === cid && assignment._id === aidUpdate
  );
  // Local state for editable fields
  const [title, setTitle] = useState(assignment?.title || '');
  const [description, setDescription] = useState(assignment?.description || '');
  const [points, setPoints] = useState(assignment?.points || 0);
  const [dueDate, setDueDate] = useState(assignment?.dueDate || '');
  const [availableFrom, setAvailableFrom] = useState(assignment?.availableFrom || '');
  const [availableUntil, setAvailableUntil] = useState(assignment?.availableUntil || '');

  const handleSave = () => {
    const updatedAssignment = {
      _id: aidUpdate,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    }
    console.log("updated", updatedAssignment)
      ;
    saveAssignment(updatedAssignment);
    navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to assignments screen
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back without saving
  };

  return (
    <div className="container mt-2" id="wd-assignments-editor">
      <div className="wd-main-content-offset p-3">
        {/* Assignment Name */}
        {assignments
          .filter((assignment: any) => assignment.course === cid && assignment._id === aidUpdate)
          .map((assignment: any) => (

            <div key={assignment._id}>
              <div className="mb-3">
                <label htmlFor="wd-name" className="form-label fw-bold">
                  Assignment Namea
                </label>
                <input
                  id="wd-name"
                  defaultValue={assignment.title}
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
                  <input id="wd-points" defaultValue={100}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="form-control" />
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
                  <select id="wd-group" className="form-select">
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
                  <select id="wd-display-grade-as" className="form-select">
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
                        <select id="wd-submission-type" className="form-select">
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
                          defaultValue="2024-05-13"
                          onChange={(e) => setDueDate(e.target.value)}
                          className="form-control"
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
                          defaultValue="2024-05-06"
                          onChange={(e) => setAvailableFrom(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="wd-available-until" className="form-label">
                          Until
                        </label>
                        <input
                          type="date"
                          id="wd-available-until"
                          defaultValue="2024-05-20"
                          onChange={(e) => setAvailableUntil(e.target.value)}
                          className="form-control"
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
                  onClick={handleCancel}
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
          ))}
      </div>
    </div>
  );
}

