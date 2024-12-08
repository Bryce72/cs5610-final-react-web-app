import React, { useState, useEffect } from 'react';
import { BsGripVertical } from 'react-icons/bs';
import { PiNotePencilThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




export default function Quizzes() {

  const { cid } = useParams();
  const dispatch = useDispatch();





  return (
    <div>


      <ul id="wd-quizzez" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-4 fs-5 border-lightgray">
          <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />

              <span className="dropdown d-inline mr-1">
                <button
                  id="wd-publish-all-btn"
                  className="btn btn-sm btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Option 1</a></li>
                  <li><a className="dropdown-item" href="#">Option 2</a></li>
                </ul>
              </span>


              <strong>QUIZZES</strong>

            </div>
            <div className="d-flex align-items-center">
              <span className="badge rounded-pill bg-light text-dark border fw-normal fs-5">40% of Total</span>
              
            </div>
          </div>

          <ul className="wd-quizzes list-group rounded-0">

          </ul>
        </li>
      </ul>
    </div>
  );
}
