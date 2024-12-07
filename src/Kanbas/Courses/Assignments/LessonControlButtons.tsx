import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function LessonControlButtons({ 
  assignmentID, 
  deleteAssignment 
}: { 
  assignmentID: string; 
  deleteAssignment: (assignmentID: string) => void; 
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteAssignment(assignmentID);
    setShowModal(false); // Close the modal after confirming
  };

  return (
    <>
      <div className="float-end d-flex align-items-center ms-5">
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={() => setShowModal(true)} // Show modal on click
          style={{ cursor: 'pointer' }}
        />
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4 ms-4" />
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this assignment?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  No
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
