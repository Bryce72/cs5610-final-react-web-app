import React from 'react';

import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { PiCrosshair } from "react-icons/pi";
import { FaChartBar } from 'react-icons/fa';
import { CiBullhorn } from "react-icons/ci";
import { BiBell } from "react-icons/bi";
import { useSelector } from 'react-redux';



{/* Find more icons */}

export default function CourseStatus() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-course-status" className="d-lg-block d-none" style={{ width: "300px", marginLeft:"30px" }}>
      { currentUser.role === "FACULTY" && (
        <div>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
      {/* Complete the rest of the buttons */}
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <PiCrosshair className="me-2 fs-5" /> Choose Home Page </button>
              <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartBar className="me-2 fs-5" /> View Course Stream </button>
              <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <CiBullhorn className="me-2 fs-5" /> New Announcement </button>
              <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartBar className="me-2 fs-5" /> New Analytics </button>
              <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiBell className="me-2 fs-5" />View Course Notifications </button>
        </div>)}
    </div>
);}



      // <h2>Course Status</h2>
      // <button>Unpublish</button> <button>Publish</button>
      // <br/>
      // <br/>
      // <button>Import Existing Content</button>
      // <br/>
      // <button>Import from Commons</button>
      // <br/>
      // <button>Choose Home Page</button>
      // <br/>
      // <button>View Course Stream</button>
      // <br/>
      // <button>New Announcement</button>
      // <br/>
      // <button>New Analytics</button>
      // <br/>
      // <button>View Course Notifications</button>