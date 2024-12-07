import React, { useEffect, useState } from 'react';
import { BsGripVertical, BsThreeDotsVertical } from 'react-icons/bs';
import { FaCheckCircle, FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
//import { addAssignment, updateAssignment, deleteAssignment } from './reducer';
import { getAssignmentsForCourse, deleteAssignment } from './client';

export default function Assignments() {
  const { cid } = useParams(); 
  //const assignments = useSelector((state :  any) => state.assignmentReducer.assignments);
  //const courseAssignments = assignments.filter((assignment : any) => assignment.course === cid);
  const dispatched = useDispatch();

  const [assignments, setAssignments] = useState([]);

  const getAssignment = async () => {
    try{
      if(!cid){return;}
      const result = await getAssignmentsForCourse(cid);
      setAssignments(result);
    }catch(e){
        console.log(e)
    }
  };
  useEffect(() => {getAssignment()}, [cid])



  const deleteAssignmentINDEX = async (aid : any) => {
    try{
      const result = await deleteAssignment(aid);
      getAssignment();
    }catch(e){
        console.log(e)
    }
  };







  return (
    <div className="container-fluid px-0">
      <div className="row mb-4">
        <div className="col-12 d-flex mb-3">
          <input
            id="wd-search-assignment"
            className="form-control me-3"
            placeholder="Search..."
          />
          <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-3">
            + Group
          </button>

          <button id="wd-add-assignment" className="btn btn-danger">
          <Link to={`/Kanbas/Courses/${cid}/Assignments/new`}
           style={{ color: 'white', textDecoration: 'none' }}>
            + Assignment
            </ Link>
          </button>
          
        </div>
      </div>

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 mb-4 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <h5 className="fw-bold mb-0">ASSIGNMENTS</h5>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2">40% of Total</span>
              <button className="btn btn-light">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>

          <ul className="wd-assignments-list list-group rounded-0">
            {assignments.map((assignment : any) => (
              <li
                key={assignment._id}
                className="wd-assignment wd-lesson list-group-item py-3 px-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-4" />
                  <div>
                    <Link
                      className="fw-bold text-dark"
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <br />
                    <span className="text-muted">Multiple Modules</span> |{' '}
                    <span><b>Not available until</b> May 6 at 12:00am</span>
                    <br />
                    <strong>Due:</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success fs-4 me-3" />
                  {/* <button onClick={handleSave} className="btn btn-danger">Save</button> */}
                  <button  onClick={ () => deleteAssignmentINDEX(assignment._id)} className= "btn-danger"><FaRegTrashAlt /></button>
                  
                  <button className="btn btn-light">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
