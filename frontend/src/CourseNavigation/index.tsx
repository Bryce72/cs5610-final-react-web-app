import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from 'react-icons/fa';
import CoursesNavigation from './Navigation';
import TempNavigation from '../TempNavigation';

export default function Courses({ courses }: { courses: any[]; }) {
  // const { cid } = useParams();
  const cid = "6744e7072e798610ab356c31";
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex d-none d-md-block sticky-top" style={{ backgroundColor: "white" }}>
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
        <hr className="d-none d-md-block" />
      </h2>
      <div className="d-flex">


        <div className="d-md-block flex-fill">

          <CoursesNavigation />

          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<h1></h1>} />
              <Route path="Modules" element={<h1></h1>} />
              <Route path="Assignments" element={<h1></h1>} />
              <Route path="People" element={<h1></h1>} />
              <Route path="Quizzes" element={<TempNavigation />} />
            </Routes>
          </div>
        </div></div>
    </div>
  );
}

