import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createAssignment, updateAssignment, getAllAssignments } from './client';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navi = useNavigate();

  // State for assignment fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("2024-05-13T23:59");
  const [availableFrom, setAvailableFrom] = useState("2024-05-06T00:00");
  const [availableUntil, setAvailableUntil] = useState("");
  const [isLoading, setIsLoading] = useState(!!aid); // Only loading if updating an assignment

  // Fetch assignment data on load
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!aid) {
        setIsLoading(false); // If creating a new assignment, stop loading
        return;
      }

      try {
        const assignments = await getAllAssignments(); // Fetch all assignments
        const selectedAssignment = assignments.find(
          (assignment :any) => assignment._id === aid && assignment.course === cid
        );
        if (selectedAssignment) {
          setTitle(selectedAssignment.title);
          setDescription(selectedAssignment.description);
          setPoints(selectedAssignment.points);
          setDueDate(selectedAssignment.dueDate);
          setAvailableFrom(selectedAssignment.availableFrom);
          setAvailableUntil(selectedAssignment.availableUntil);
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [aid, cid]);

  const handleSave = async () => {
    const updatedAssignmentOBJ = {
      _id: aid || `RS${Date.now()}`,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    try {
      if (aid) {
        await updateAssignment(updatedAssignmentOBJ); // Update existing assignment
      } else {
        await createAssignment(updatedAssignmentOBJ); // Create new assignment
      }
      navi(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
        <input id="wd-name" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Assignment Description */}
      <div className="mb-3">
        <textarea id="wd-description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* Points */}
      <div className="mb-3">
        <label htmlFor="wd-points" className="form-label">Points</label>
        <input id="wd-points" className="form-control" type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
      </div>

      {/* Availability */}
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input
            type="datetime-local"
            id="wd-due-date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="form-label">Available from</label>
          <input
            type="datetime-local"
            id="wd-available-from"
            className="form-control"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="wd-available-until" className="form-label">Available until</label>
          <input
            type="datetime-local"
            id="wd-available-until"
            className="form-control"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
        <button onClick={handleSave} className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
